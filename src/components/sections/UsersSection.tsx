
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useUsers } from '../../hooks/useUsers';
import { useEmploymentsAndPathologies } from '../../hooks/useEmploymentsAndPathologies';

interface UsersSectionProps {
  onDelete: (item: any, type: string) => void;
}

const UsersSection: React.FC<UsersSectionProps> = ({ onDelete }) => {
  const { users, addUser, updateUser } = useUsers();
  const { employments, pathologies } = useEmploymentsAndPathologies();

  const getEmploymentName = (employmentId: string | null) => {
    if (!employmentId) return 'Sin ocupación';
    const employment = employments.find(e => e.id === employmentId);
    return employment ? employment.name : 'Ocupación no encontrada';
  };

  const getPathologyName = (pathologyId: string | null) => {
    if (!pathologyId) return 'Sin patología';
    const pathology = pathologies.find(p => p.id === pathologyId);
    return pathology ? pathology.name : 'Patología no encontrada';
  };

  return (
    <DataTable
      title="Gestión de Usuarios"
      columns={[
        { key: 'name', label: 'Nombre Completo' },
        { key: 'dni', label: 'Cédula' },
        { key: 'gender', label: 'Género' },
        { key: 'contact', label: 'Contacto' },
        { key: 'age', label: 'Edad' },
        { key: 'occupation', label: 'Ocupación' },
        { key: 'pathology', label: 'Patología' },
      ]}
      data={users.map(user => ({
        id: user.id,
        name: user.name,
        dni: user.dni,
        gender: user.gender,
        contact: user.contact || 'Sin contacto',
        age: user.age,
        occupation: getEmploymentName(user.employment_id),
        pathology: getPathologyName(user.pathology_id)
      }))}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Usuario',
          fields: [
            { name: 'name', label: 'Nombre Completo', type: 'text', required: true },
            { name: 'dni', label: 'Cédula', type: 'text', required: true },
            { name: 'gender', label: 'Género', type: 'select', options: ['Masculino', 'Femenino'], required: true },
            { name: 'contact', label: 'Contacto', type: 'tel', required: false },
            { name: 'age', label: 'Edad', type: 'number', required: true },
            { name: 'employment_id', label: 'Ocupación', type: 'dynamic-employment', required: false },
            { name: 'pathology_id', label: 'Patología', type: 'dynamic-pathology', required: false },
          ],
          onSubmit: async (data) => {
            try {
              const employmentId = data.employment_id ? 
                employments.find(e => e.name === data.employment_id)?.id : undefined;
              const pathologyId = data.pathology_id ? 
                pathologies.find(p => p.name === data.pathology_id)?.id : undefined;

              await addUser({
                name: data.name,
                dni: data.dni,
                gender: data.gender,
                contact: data.contact,
                age: parseInt(data.age),
                employment_id: employmentId,
                pathology_id: pathologyId,
              });
            } catch (error) {
              console.error('Error adding user:', error);
            }
          },
        });
      }}
      onEdit={(user) => {
        const originalUser = users.find(u => u.id === user.id);
        if (!originalUser) return;

        const currentEmploymentName = originalUser.employment_id ? 
          employments.find(e => e.id === originalUser.employment_id)?.name || '' : '';
        const currentPathologyName = originalUser.pathology_id ? 
          pathologies.find(p => p.id === originalUser.pathology_id)?.name || '' : '';

        showDynamicFormModal({
          title: 'Editar Usuario',
          fields: [
            { name: 'name', label: 'Nombre Completo', type: 'text', required: true },
            { name: 'dni', label: 'Cédula', type: 'text', required: true },
            { name: 'gender', label: 'Género', type: 'select', options: ['Masculino', 'Femenino'], required: true },
            { name: 'contact', label: 'Contacto', type: 'tel', required: false },
            { name: 'age', label: 'Edad', type: 'number', required: true },
            { name: 'employment_id', label: 'Ocupación', type: 'dynamic-employment', required: false },
            { name: 'pathology_id', label: 'Patología', type: 'dynamic-pathology', required: false },
          ],
          initialData: {
            name: originalUser.name,
            dni: originalUser.dni,
            gender: originalUser.gender,
            contact: originalUser.contact || '',
            age: originalUser.age,
            employment_id: currentEmploymentName,
            pathology_id: currentPathologyName,
          },
          onSubmit: async (data) => {
            try {
              const employmentId = data.employment_id ? 
                employments.find(e => e.name === data.employment_id)?.id : undefined;
              const pathologyId = data.pathology_id ? 
                pathologies.find(p => p.name === data.pathology_id)?.id : undefined;

              await updateUser(user.id, {
                name: data.name,
                dni: data.dni,
                gender: data.gender,
                contact: data.contact,
                age: parseInt(data.age),
                employment_id: employmentId,
                pathology_id: pathologyId,
              });
            } catch (error) {
              console.error('Error updating user:', error);
            }
          },
        });
      }}
      onDelete={(user) => onDelete(user, 'users')}
    />
  );
};

export default UsersSection;
