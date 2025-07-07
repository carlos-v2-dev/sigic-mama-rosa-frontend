
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface Producto {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface ProductoInsert {
  name: string;
  description?: string;
}

interface ProductoUpdate {
  name?: string;
  description?: string;
}

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      setProductos(data || []);
    } catch (error) {
      console.error('Error fetching productos:', error);
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (newProducto: ProductoInsert) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .insert([newProducto])
        .select()
        .single();

      if (error) throw error;
      
      setProductos(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      toast.success('Producto agregado exitosamente');
      return data;
    } catch (error) {
      console.error('Error adding producto:', error);
      toast.error('Error al agregar el producto');
      throw error;
    }
  };

  const updateProducto = async (id: string, updates: ProductoUpdate) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProductos(prev => prev.map(item => item.id === id ? data : item).sort((a, b) => a.name.localeCompare(b.name)));
      toast.success('Producto actualizado exitosamente');
      return data;
    } catch (error) {
      console.error('Error updating producto:', error);
      toast.error('Error al actualizar el producto');
      throw error;
    }
  };

  const deleteProducto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('productos')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setProductos(prev => prev.filter(item => item.id !== id));
      toast.success('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting producto:', error);
      toast.error('Error al eliminar el producto');
      throw error;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    addProducto,
    updateProducto,
    deleteProducto,
    refetch: fetchProductos,
  };
};
