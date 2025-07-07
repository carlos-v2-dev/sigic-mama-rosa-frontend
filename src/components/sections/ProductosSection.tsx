
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useProductos } from '../../hooks/useProductos';

interface ProductosSectionProps {
  onDelete: (item: any, type: string) => void;
}

const ProductosSection: React.FC<ProductosSectionProps> = ({ onDelete }) => {
  const { productos, addProducto, updateProducto } = useProductos();

  return (
    <DataTable
      title="Gestión de Productos"
      columns={[
        { key: 'name', label: 'Nombre' },
        { key: 'description', label: 'Descripción' },
        { key: 'created_at', label: 'Fecha de Creación' },
      ]}
      data={productos.map(producto => ({
        id: producto.id,
        name: producto.name,
        description: producto.description || 'Sin descripción',
        created_at: new Date(producto.created_at).toLocaleDateString('es-ES')
      }))}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Producto',
          fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'description', label: 'Descripción', type: 'text', required: false },
          ],
          onSubmit: async (data) => {
            try {
              await addProducto({
                name: data.name,
                description: data.description || null
              });
            } catch (error) {
              console.error('Error adding producto:', error);
            }
          },
        });
      }}
      onEdit={(producto) => {
        const originalProducto = productos.find(p => p.id === producto.id);
        if (!originalProducto) return;

        showDynamicFormModal({
          title: 'Editar Producto',
          fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'description', label: 'Descripción', type: 'text', required: false },
          ],
          initialData: {
            name: originalProducto.name,
            description: originalProducto.description || ''
          },
          onSubmit: async (data) => {
            try {
              await updateProducto(producto.id, {
                name: data.name,
                description: data.description || null
              });
            } catch (error) {
              console.error('Error updating producto:', error);
            }
          },
        });
      }}
      onDelete={(producto) => onDelete(producto, 'productos')}
    />
  );
};

export default ProductosSection;
