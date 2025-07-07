
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useDepartments } from '../../hooks/useDepartments';

interface AreasSectionProps {
  onDelete: (item: any, type: string) => void;
}

const AreasSection: React.FC<AreasSectionProps> = ({ onDelete }) => {
  const { departments, addDepartment, updateDepartment } = useDepartments();

  return (
    <DataTable
      title="Gestión de Áreas"
      columns={[
        { key: 'name', label: 'Nombre' },
        { key: 'description', label: 'Descripción' },
      ]}
      data={departments}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Área',
          fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'description', label: 'Descripción', type: 'text', required: true },
          ],
          onSubmit: async (data) => {
            try {
              await addDepartment({
                name: data.name,
                description: data.description
              });
            } catch (error) {
              console.error('Error adding department:', error);
            }
          },
        });
      }}
      onEdit={(area) => {
        showDynamicFormModal({
          title: 'Editar Área',
          fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'description', label: 'Descripción', type: 'text', required: true },
          ],
          initialData: area,
          onSubmit: async (data) => {
            try {
              await updateDepartment(area.id, {
                name: data.name,
                description: data.description
              });
            } catch (error) {
              console.error('Error updating department:', error);
            }
          },
        });
      }}
      onDelete={(area) => onDelete(area, 'areas')}
    />
  );
};

export default AreasSection;
