
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

type Department = Database['public']['Tables']['departaments']['Row'];
type DepartmentInsert = Database['public']['Tables']['departaments']['Insert'];

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      console.log('Fetching departments...');
      
      const { data, error } = await supabase
        .from('departaments')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching departments:', error);
        throw error;
      }
      
      console.log('Departments fetched:', data);
      setDepartments(data || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching departments';
      setError(errorMessage);
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (departmentData: { name: string; description?: string }) => {
    try {
      console.log('Adding department:', departmentData);
      
      const insertData: DepartmentInsert = {
        id: crypto.randomUUID(),
        name: departmentData.name,
        description: departmentData.description || null,
        is_active: true
      };

      const { data, error } = await supabase
        .from('departaments')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error adding department:', error);
        throw error;
      }
      
      console.log('Department added:', data);
      await fetchDepartments();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error adding department';
      setError(errorMessage);
      console.error('Error adding department:', err);
      throw err;
    }
  };

  const updateDepartment = async (id: string, departmentData: { name: string; description?: string }) => {
    try {
      console.log('Updating department:', id, departmentData);
      
      const { data, error } = await supabase
        .from('departaments')
        .update({
          name: departmentData.name,
          description: departmentData.description || null,
          updated_at: new Date().toISOString().split('T')[0]
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating department:', error);
        throw error;
      }
      
      console.log('Department updated:', data);
      await fetchDepartments();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating department';
      setError(errorMessage);
      console.error('Error updating department:', err);
      throw err;
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      console.log('Deleting department:', id);
      
      const { error } = await supabase
        .from('departaments')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        console.error('Error deleting department:', error);
        throw error;
      }
      
      console.log('Department deleted (soft delete):', id);
      await fetchDepartments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting department';
      setError(errorMessage);
      console.error('Error deleting department:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    refetch: fetchDepartments
  };
};
