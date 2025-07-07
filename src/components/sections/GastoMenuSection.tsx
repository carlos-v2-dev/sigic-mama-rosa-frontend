
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useGastoMenu } from '../../hooks/useGastoMenu';
import { useDepartments } from '../../hooks/useDepartments';

interface GastoMenuSectionProps {
  onDelete: (item: any, type: string) => void;
}

const GastoMenuSection: React.FC<GastoMenuSectionProps> = ({ onDelete }) => {
  const { gastoMenu, addGastoMenu, updateGastoMenu } = useGastoMenu();
  const { departments } = useDepartments();

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Sin área asignada';
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Área no encontrada';
  };

  const gastoMenuPDFFormatters = {
    created_at: (value: string) => new Date(value).toLocaleDateString('es-ES'),
    input_quantity: (value: number) => value.toString(),
  };

  return (
    <DataTable
      title="Gestión de Gasto para el Menú"
      columns={[
        { key: 'product', label: 'Producto' },
        { key: 'input_quantity', label: 'Cantidad' },
        { key: 'area', label: 'Área' },
        { key: 'created_at', label: 'Fecha de Creación' },
      ]}
      data={gastoMenu.map(item => ({
        id: item.id,
        product: item.product || '',
        input_quantity: item.input_quantity || 0,
        area: getDepartmentName(item.departament_id),
        created_at: new Date(item.created_at).toLocaleDateString('es-ES')
      }))}
      enableDateFilter={true}
      enablePDFExport={true}
      pdfFormatters={gastoMenuPDFFormatters}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Gasto para el Menú',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          onSubmit: async (data) => {
            try {
              await addGastoMenu({
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error adding gasto menu:', error);
            }
          },
        });
      }}
      onEdit={(item) => {
        const originalGastoMenu = gastoMenu.find(g => g.id === item.id);
        if (!originalGastoMenu) return;

        showDynamicFormModal({
          title: 'Editar Gasto para el Menú',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          initialData: {
            product: originalGastoMenu.product,
            input_quantity: originalGastoMenu.input_quantity,
            departament_id: originalGastoMenu.departament_id || ''
          },
          onSubmit: async (data) => {
            try {
              await updateGastoMenu(item.id, {
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error updating gasto menu:', error);
            }
          },
        });
      }}
      onDelete={(item) => onDelete(item, 'gasto-menu')}
    />
  );
};

export default GastoMenuSection;
