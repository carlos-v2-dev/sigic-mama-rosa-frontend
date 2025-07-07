
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface Despacho {
  id: string;
  product: string;
  input_quantity: number;
  departament_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface DespachoInsert {
  product: string;
  input_quantity: number;
  departament_id: string;
}

interface DespachoUpdate {
  product?: string;
  input_quantity?: number;
  departament_id?: string;
}

export const useDespacho = () => {
  const [despacho, setDespacho] = useState<Despacho[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDespacho = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('despacho')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDespacho(data || []);
    } catch (error) {
      console.error('Error fetching despacho:', error);
      toast.error('Error al cargar los despachos');
    } finally {
      setLoading(false);
    }
  };

  const addDespacho = async (newDespacho: DespachoInsert) => {
    try {
      const { data, error } = await supabase
        .from('despacho')
        .insert([newDespacho])
        .select()
        .single();

      if (error) throw error;
      
      setDespacho(prev => [data, ...prev]);
      toast.success('Despacho agregado exitosamente');
      return data;
    } catch (error) {
      console.error('Error adding despacho:', error);
      toast.error('Error al agregar el despacho');
      throw error;
    }
  };

  const updateDespacho = async (id: string, updates: DespachoUpdate) => {
    try {
      const { data, error } = await supabase
        .from('despacho')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setDespacho(prev => prev.map(item => item.id === id ? data : item));
      toast.success('Despacho actualizado exitosamente');
      return data;
    } catch (error) {
      console.error('Error updating despacho:', error);
      toast.error('Error al actualizar el despacho');
      throw error;
    }
  };

  const deleteDespacho = async (id: string) => {
    try {
      const { error } = await supabase
        .from('despacho')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setDespacho(prev => prev.filter(item => item.id !== id));
      toast.success('Despacho eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting despacho:', error);
      toast.error('Error al eliminar el despacho');
      throw error;
    }
  };

  useEffect(() => {
    fetchDespacho();
  }, []);

  return {
    despacho,
    loading,
    addDespacho,
    updateDespacho,
    deleteDespacho,
    refetch: fetchDespacho,
  };
};
