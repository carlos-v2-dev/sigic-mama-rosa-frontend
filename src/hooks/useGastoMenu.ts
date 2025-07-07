
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface GastoMenu {
  id: string;
  product: string;
  input_quantity: number;
  departament_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface GastoMenuInsert {
  product: string;
  input_quantity: number;
  departament_id: string;
}

interface GastoMenuUpdate {
  product?: string;
  input_quantity?: number;
  departament_id?: string;
}

export const useGastoMenu = () => {
  const [gastoMenu, setGastoMenu] = useState<GastoMenu[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGastoMenu = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gasto_menu')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGastoMenu(data || []);
    } catch (error) {
      console.error('Error fetching gasto_menu:', error);
      toast.error('Error al cargar los gastos del menú');
    } finally {
      setLoading(false);
    }
  };

  const addGastoMenu = async (newGastoMenu: GastoMenuInsert) => {
    try {
      const { data, error } = await supabase
        .from('gasto_menu')
        .insert([newGastoMenu])
        .select()
        .single();

      if (error) throw error;
      
      setGastoMenu(prev => [data, ...prev]);
      toast.success('Gasto del menú agregado exitosamente');
      return data;
    } catch (error: any) {
      console.error('Error adding gasto_menu:', error);
      const errorMsg = error.message || 'Error al agregar el gasto del menú';
      toast.error(errorMsg);
      throw error;
    }
  };

  const updateGastoMenu = async (id: string, updates: GastoMenuUpdate) => {
    try {
      const { data, error } = await supabase
        .from('gasto_menu')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGastoMenu(prev => prev.map(item => item.id === id ? data : item));
      toast.success('Gasto del menú actualizado exitosamente');
      return data;
    } catch (error) {
      console.error('Error updating gasto_menu:', error);
      toast.error('Error al actualizar el gasto del menú');
      throw error;
    }
  };

  const deleteGastoMenu = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gasto_menu')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setGastoMenu(prev => prev.filter(item => item.id !== id));
      toast.success('Gasto del menú eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting gasto_menu:', error);
      toast.error('Error al eliminar el gasto del menú');
      throw error;
    }
  };

  useEffect(() => {
    fetchGastoMenu();
  }, []);

  return {
    gastoMenu,
    loading,
    addGastoMenu,
    updateGastoMenu,
    deleteGastoMenu,
    refetch: fetchGastoMenu,
  };
};
