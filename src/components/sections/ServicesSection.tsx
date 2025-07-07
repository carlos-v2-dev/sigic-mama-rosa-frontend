
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useServices } from '../../hooks/useServices';
import { useUsers } from '../../hooks/useUsers';
import { useDepartments } from '../../hooks/useDepartments';

interface ServicesSectionProps {
  onDelete: (item: any, type: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onDelete }) => {
  const { services, addService, updateService } = useServices();
  const { users } = useUsers();
  const { departments } = useDepartments();

  const getUserDisplayName = (userId: string | null) => {
    if (!userId) return 'Usuario no encontrado';
    const user = users.find(u => u.id === userId);
    return user ? `${user.name} (${user.dni})` : 'Usuario no encontrado';
  };

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Sin área asignada';
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Área no encontrada';
  };

  const servicesPDFFormatters = {
    created_at: (value: string) => new Date(value).toLocaleDateString('es-ES'),
  };

  return (
    <DataTable
      title="Gestión de Servicios"
      columns={[
        { key: 'usuario', label: 'Usuario' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'area', label: 'Área' },
        { key: 'created_at', label: 'Fecha de Creación' },
      ]}
      data={services.map(service => ({
        id: service.id,
        usuario: getUserDisplayName(service.user_id),
        descripcion: service.description || '',
        area: getDepartmentName(service.departament_id),
        created_at: new Date(service.created_at).toLocaleDateString('es-ES')
      }))}
      enableDateFilter={true}
      enablePDFExport={true}
      pdfFormatters={servicesPDFFormatters}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Servicio',
          fields: [
            { name: 'usuario', label: 'Usuario', type: 'dynamic-user-search', required: true },
            { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
            { name: 'area', label: 'Área', type: 'dynamic-department', required: true },
          ],
          onSubmit: async (data) => {
            try {
              await addService({
                user_id: data.usuario,
                departament_id: data.area,
                description: data.descripcion
              });
            } catch (error) {
              console.error('Error adding service:', error);
            }
          },
        });
      }}
      onEdit={(service) => {
        const originalService = services.find(s => s.id === service.id);
        if (!originalService) return;

        showDynamicFormModal({
          title: 'Editar Servicio',
          fields: [
            { name: 'usuario', label: 'Usuario', type: 'dynamic-user-search', required: true },
            { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
            { name: 'area', label: 'Área', type: 'dynamic-department', required: true },
          ],
          initialData: {
            usuario: originalService.user_id || '',
            descripcion: originalService.description || '',
            area: originalService.departament_id || ''
          },
          onSubmit: async (data) => {
            try {
              await updateService(service.id, {
                user_id: data.usuario,
                departament_id: data.area,
                description: data.descripcion
              });
            } catch (error) {
              console.error('Error updating service:', error);
            }
          },
        });
      }}
      onDelete={(service) => onDelete(service, 'services')}
    />
  );
};

export default ServicesSection;
