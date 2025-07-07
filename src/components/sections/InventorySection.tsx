
import React from 'react';
import DataTable from '../DataTable';
import { showDynamicFormModal } from '../DynamicFormModal';
import { useStocks } from '../../hooks/useStocks';
import { useDepartments } from '../../hooks/useDepartments';

interface InventorySectionProps {
  onDelete: (item: any, type: string) => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ onDelete }) => {
  const { stocks, addStock, updateStock } = useStocks();
  const { departments } = useDepartments();

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Sin área asignada';
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Área no encontrada';
  };

  const inventoryPDFFormatters = {
    created_at: (value: string) => new Date(value).toLocaleDateString('es-ES'),
    input_quantity: (value: number) => value.toString(),
  };

  return (
    <DataTable
      title="Gestión de Inventario"
      columns={[
        { key: 'product', label: 'Producto' },
        { key: 'input_quantity', label: 'Cantidad' },
        { key: 'area', label: 'Área' },
        { key: 'created_at', label: 'Fecha de Creación' },
      ]}
      data={stocks.map(stock => ({
        id: stock.id,
        product: stock.product || '',
        input_quantity: stock.input_quantity || 0,
        area: getDepartmentName(stock.departament_id),
        created_at: new Date(stock.created_at).toLocaleDateString('es-ES')
      }))}
      enableDateFilter={true}
      enablePDFExport={true}
      pdfFormatters={inventoryPDFFormatters}
      onAdd={() => {
        showDynamicFormModal({
          title: 'Agregar Item al Inventario',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          onSubmit: async (data) => {
            try {
              await addStock({
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error adding stock:', error);
            }
          },
        });
      }}
      onEdit={(item) => {
        const originalStock = stocks.find(s => s.id === item.id);
        if (!originalStock) return;

        showDynamicFormModal({
          title: 'Editar Item del Inventario',
          fields: [
            { name: 'product', label: 'Producto', type: 'dynamic-product', required: true },
            { name: 'input_quantity', label: 'Cantidad', type: 'number', required: true },
            { name: 'departament_id', label: 'Área', type: 'dynamic-department', required: true },
          ],
          initialData: {
            product: originalStock.product,
            input_quantity: originalStock.input_quantity,
            departament_id: originalStock.departament_id || ''
          },
          onSubmit: async (data) => {
            try {
              await updateStock(item.id, {
                product: data.product,
                input_quantity: parseInt(data.input_quantity),
                departament_id: data.departament_id
              });
            } catch (error) {
              console.error('Error updating stock:', error);
            }
          },
        });
      }}
      onDelete={(item) => onDelete(item, 'inventory')}
    />
  );
};

export default InventorySection;
