
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, X } from 'lucide-react';
import { useProductos } from '../hooks/useProductos';

interface ProductSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  value,
  onChange,
  placeholder = "Seleccionar producto",
  required = false
}) => {
  const { productos, addProducto } = useProductos();
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewProduct = async () => {
    if (!newProductName.trim()) return;

    try {
      setIsAdding(true);
      const newProduct = await addProducto({
        name: newProductName.trim(),
        description: newProductDescription.trim() || null
      });
      
      onChange(newProduct.name);
      setNewProductName('');
      setNewProductDescription('');
      setShowNewProduct(false);
    } catch (error) {
      console.error('Error adding new product:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleCancelNewProduct = () => {
    setNewProductName('');
    setNewProductDescription('');
    setShowNewProduct(false);
  };

  if (showNewProduct) {
    return (
      <div className="space-y-2">
        <Input
          placeholder="Nombre del producto"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          required
        />
        <Input
          placeholder="Descripción (opcional)"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <Button 
            type="button"
            onClick={handleAddNewProduct}
            disabled={!newProductName.trim() || isAdding}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {isAdding ? 'Agregando...' : 'Agregar'}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={handleCancelNewProduct}
            size="sm"
          >
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {productos.map((producto) => (
            <SelectItem key={producto.id} value={producto.name}>
              {producto.name}
              {producto.description && (
                <span className="text-gray-500 text-sm ml-2">
                  - {producto.description}
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        type="button"
        variant="outline" 
        onClick={() => setShowNewProduct(true)}
        size="sm"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar nuevo producto
      </Button>
    </div>
  );
};

export default ProductSelect;
