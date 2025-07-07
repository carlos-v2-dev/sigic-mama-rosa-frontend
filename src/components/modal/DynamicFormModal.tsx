
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import FormFieldComponent from './FormField';
import { useUsers } from '../../hooks/useUsers';
import { useDepartments } from '../../hooks/useDepartments';
import { useEmploymentsAndPathologies } from '../../hooks/useEmploymentsAndPathologies';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'tel' | 'select' | 'dynamic-user-search' | 'dynamic-department' | 'dynamic-employment' | 'dynamic-pathology' | 'dynamic-product';
  required?: boolean;
  options?: string[];
}

interface DynamicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { users } = useUsers();
  const { departments, addDepartment } = useDepartments();
  const { employments, pathologies, addNewEmployment, addNewPathology } = useEmploymentsAndPathologies();

  // Initialize form data when modal opens and we have initial data
  useEffect(() => {
    if (isOpen && Object.keys(formData).length === 0) {
      setFormData(initialData || {});
    }
  }, [isOpen, initialData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({});
    }
  }, [isOpen]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const processFormData = (data: any) => {
    const processedData = { ...data };
    
    fields.forEach(field => {
      if (field.type === 'dynamic-department' && processedData[field.name]) {
        const value = processedData[field.name];
        if (typeof value === 'string' && !value.includes('-')) {
          const department = departments.find(dept => dept.name === value);
          if (department) {
            processedData[field.name] = department.id;
          }
        }
      }
      
      if (field.type === 'dynamic-employment' && processedData[field.name]) {
        const value = processedData[field.name];
        if (typeof value === 'string' && !value.includes('-')) {
          const employment = employments.find(emp => emp.name === value);
          if (employment) {
            processedData[field.name] = employment.id;
          }
        }
      }
      
      if (field.type === 'dynamic-pathology' && processedData[field.name]) {
        const value = processedData[field.name];
        if (typeof value === 'string' && !value.includes('-')) {
          const pathology = pathologies.find(path => path.name === value);
          if (pathology) {
            processedData[field.name] = pathology.id;
          }
        }
      }
    });
    
    return processedData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      alert(`Por favor complete los campos requeridos: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setIsSubmitting(true);
      const processedData = processFormData(formData);
      await onSubmit(processedData);
      setFormData({});
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <FormFieldComponent
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              users={users}
              departments={departments}
              employments={employments}
              pathologies={pathologies}
              addDepartment={addDepartment}
              addNewEmployment={addNewEmployment}
              addNewPathology={addNewPathology}
            />
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicFormModal;
