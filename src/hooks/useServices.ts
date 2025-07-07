
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      console.log('Fetching services...');
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      
      console.log('Services fetched:', data);
      setServices(data || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching services';
      setError(errorMessage);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: { user_id: string; departament_id: string; description: string }) => {
    try {
      console.log('Adding service:', serviceData);
      
      const insertData: ServiceInsert = {
        id: crypto.randomUUID(),
        user_id: serviceData.user_id,
        departament_id: serviceData.departament_id,
        description: serviceData.description,
        is_active: true
      };

      const { data, error } = await supabase
        .from('services')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error adding service:', error);
        throw error;
      }
      
      console.log('Service added:', data);
      await fetchServices();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error adding service';
      setError(errorMessage);
      console.error('Error adding service:', err);
      throw err;
    }
  };

  const updateService = async (id: string, serviceData: { user_id: string; departament_id: string; description: string }) => {
    try {
      console.log('Updating service:', id, serviceData);
      
      const { data, error } = await supabase
        .from('services')
        .update({
          user_id: serviceData.user_id,
          departament_id: serviceData.departament_id,
          description: serviceData.description,
          updated_at: new Date().toISOString().split('T')[0]
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating service:', error);
        throw error;
      }
      
      console.log('Service updated:', data);
      await fetchServices();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating service';
      setError(errorMessage);
      console.error('Error updating service:', err);
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      console.log('Deleting service:', id);
      
      const { error } = await supabase
        .from('services')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        console.error('Error deleting service:', error);
        throw error;
      }
      
      console.log('Service deleted (soft delete):', id);
      await fetchServices();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting service';
      setError(errorMessage);
      console.error('Error deleting service:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};
