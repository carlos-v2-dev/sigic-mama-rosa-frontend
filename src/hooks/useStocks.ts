
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

type Stock = Database['public']['Tables']['stocks']['Row'];
type StockInsert = Database['public']['Tables']['stocks']['Insert'];

export const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) throw error;
      setStocks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching stocks');
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addStock = async (stockData: { product: string; input_quantity: number; departament_id: string }) => {
    try {
      const insertData: StockInsert = {
        id: crypto.randomUUID(),
        product: stockData.product,
        input_quantity: stockData.input_quantity,
        departament_id: stockData.departament_id,
        is_active: true
      };

      const { data, error } = await supabase
        .from('stocks')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      
      await fetchStocks();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding stock');
      throw err;
    }
  };

  const updateStock = async (id: string, stockData: { product: string; input_quantity: number; departament_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('stocks')
        .update({
          product: stockData.product,
          input_quantity: stockData.input_quantity,
          departament_id: stockData.departament_id,
          updated_at: new Date().toISOString().split('T')[0]
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchStocks();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating stock');
      throw err;
    }
  };

  const deleteStock = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stocks')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchStocks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting stock');
      throw err;
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return {
    stocks,
    loading,
    error,
    addStock,
    updateStock,
    deleteStock,
    refetch: fetchStocks
  };
};
