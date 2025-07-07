
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Employment = Database['public']['Tables']['employments']['Row'];
type Pathology = Database['public']['Tables']['pathologies']['Row'];
type EmploymentInsert = Database['public']['Tables']['employments']['Insert'];
type PathologyInsert = Database['public']['Tables']['pathologies']['Insert'];

export const useEmploymentsAndPathologies = () => {
  const [employments, setEmployments] = useState<Employment[]>([]);
  const [pathologies, setPathologies] = useState<Pathology[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployments = async () => {
    const { data, error } = await supabase
      .from('employments')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching employments:', error);
      return [];
    }
    return data || [];
  };

  const fetchPathologies = async () => {
    const { data, error } = await supabase
      .from('pathologies')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching pathologies:', error);
      return [];
    }
    return data || [];
  };

  const addNewEmployment = async (name: string) => {
    const insertData: EmploymentInsert = {
      id: crypto.randomUUID(),
      name,
      is_active: true
    };

    const { data, error } = await supabase
      .from('employments')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding employment:', error);
      throw error;
    }
    
    setEmployments(prev => [...prev, data]);
    return data;
  };

  const addNewPathology = async (name: string) => {
    const insertData: PathologyInsert = {
      id: crypto.randomUUID(),
      name,
      is_active: true
    };

    const { data, error } = await supabase
      .from('pathologies')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding pathology:', error);
      throw error;
    }
    
    setPathologies(prev => [...prev, data]);
    return data;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [employmentsData, pathologiesData] = await Promise.all([
        fetchEmployments(),
        fetchPathologies()
      ]);
      
      setEmployments(employmentsData);
      setPathologies(pathologiesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    employments,
    pathologies,
    loading,
    addNewEmployment,
    addNewPathology,
    refreshData: loadData
  };
};
