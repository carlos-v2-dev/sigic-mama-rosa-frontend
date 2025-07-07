
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users...');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Users fetched:', data);
      setUsers(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching users';
      console.error('Error fetching users:', err);
      setError(errorMessage);
      // If RLS error, provide empty array instead of failing
      if (errorMessage.includes('row-level security') || errorMessage.includes('permission denied')) {
        setUsers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData: { 
    name: string; 
    dni: string; 
    gender: string; 
    contact?: string; 
    age: number;
    employment_id?: string;
    pathology_id?: string;
  }) => {
    try {
      const insertData: UserInsert = {
        id: crypto.randomUUID(),
        name: userData.name,
        dni: userData.dni,
        gender: userData.gender,
        contact: userData.contact || null,
        age: userData.age,
        employment_id: userData.employment_id || null,
        pathology_id: userData.pathology_id || null,
        is_active: true
      };

      const { data, error } = await supabase
        .from('users')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      
      await fetchUsers();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding user');
      throw err;
    }
  };

  const updateUser = async (id: string, userData: { 
    name: string; 
    dni: string; 
    gender: string; 
    contact?: string; 
    age: number;
    employment_id?: string;
    pathology_id?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          dni: userData.dni,
          gender: userData.gender,
          contact: userData.contact || null,
          age: userData.age,
          employment_id: userData.employment_id || null,
          pathology_id: userData.pathology_id || null,
          updated_at: new Date().toISOString().split('T')[0]
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchUsers();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting user');
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers
  };
};
