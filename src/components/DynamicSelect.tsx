
import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface DynamicSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onAddNew: (name: string) => Promise<Option>;
  placeholder?: string;
  required?: boolean;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  label,
  options,
  value,
  onChange,
  onAddNew,
  placeholder = "Seleccionar...",
  required = false
}) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNew = async () => {
    if (!newValue.trim()) return;
    
    setIsAdding(true);
    try {
      const newOption = await onAddNew(newValue.trim());
      onChange(newOption.name);
      setNewValue('');
      setShowAddNew(false);
    } catch (error) {
      console.error('Error adding new option:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewValue('');
    setShowAddNew(false);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      
      {!showAddNew ? (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 appearance-none"
            required={required}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          
          <button
            type="button"
            onClick={() => setShowAddNew(true)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
            title="Agregar nuevo"
          >
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={`Nuevo ${label.toLowerCase()}`}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
            disabled={isAdding}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNew();
              }
              if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            autoFocus
          />
          
          <button
            type="button"
            onClick={handleAddNew}
            disabled={isAdding || !newValue.trim()}
            className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Confirmar"
          >
            <Check size={18} />
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            disabled={isAdding}
            className="p-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Cancelar"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicSelect;
