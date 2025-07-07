
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useDespacho } from '../../hooks/useDespacho';
import { useDepartments } from '../../hooks/useDepartments';

interface DespachoSectionProps {
  onDelete: (item: any, type: string) => void;
}

const DespachoSection: React.FC<DespachoSectionProps> = ({ onDelete }) => {
  const { despacho, addDespacho, updateDespacho } = useDespacho();
  const { departments } = useDepartments();

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Sin área asignada';
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Área no encontrada';
  };

  const despachoPDFFormatters = {
    created_at: (value: string) => new Date(value).toLocaleDateString('es-ES'),
    input_quantity: (value: number) => value.toString(),
  };

  return (
    <DataTable
      title="Gestión de Despacho"
      columns={[
        { key: 'product', label: 'Producto' },
        { key: 'input_quantity', label: 'Cantidad' },
        { key: 'area', label: 'Área' },
        { key: 'created_at', label: 'Fecha de Creación' },
      ]}
      data={despacho.map(item => ({
        id: item.id,
        product: item.product || '',
        input_quantity: item.input_quantity || 0,
        area: getDepartmentName(item.departament_id),
        created_at: new Date(item.created_at).toLocaleDateString('es-ES')
      }))}
      enableDateFilter={true}
      enablePDFExport={true}
      pdfFormatters={despachoPDFFormatters}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Item al Despacho',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          onSubmit: async (data) => {
            try {
              await addDespacho({
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error adding despacho:', error);
            }
          },
        });
      }}
      onEdit={(item) => {
        const originalDespacho = despacho.find(d => d.id === item.id);
        if (!originalDespacho) return;

        showDynamicFormModal({
          title: 'Editar Item del Despacho',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          initialData: {
            product: originalDespacho.product,
            input_quantity: originalDespacho.input_quantity,
            departament_id: originalDespacho.departament_id || ''
          },
          onSubmit: async (data) => {
            try {
              await updateDespacho(item.id, {
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error updating despacho:', error);
            }
          },
        });
      }}
      onDelete={(item) => onDelete(item, 'despacho')}
    />
  );
};

export default DespachoSection;
