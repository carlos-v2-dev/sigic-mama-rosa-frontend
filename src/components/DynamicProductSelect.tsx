
import React from 'react';
import ProductSelect from './ProductSelect';

interface DynamicProductSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DynamicProductSelect: React.FC<DynamicProductSelectProps> = ({ value, onChange }) => {
  return (
    <ProductSelect
      value={value}
      onChange={onChange}
      placeholder="Seleccionar o agregar producto"
      required={true}
    />
  );
};

export default DynamicProductSelect;
