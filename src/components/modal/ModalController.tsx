
import React, { useState, useEffect } from 'react';
import DynamicFormModal from './DynamicFormModal';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'tel' | 'select' | 'dynamic-user-search' | 'dynamic-department' | 'dynamic-employment' | 'dynamic-pathology' | 'dynamic-product';
  required?: boolean;
  options?: string[];
}

interface DynamicFormModalConfig {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

let modalInstance: {
  show: (config: DynamicFormModalConfig) => void;
  hide: () => void;
} | null = null;

export const showDynamicFormModal = (config: DynamicFormModalConfig) => {
  if (modalInstance) {
    modalInstance.show(config);
  }
};

export const DynamicFormModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<DynamicFormModalConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    modalInstance = {
      show: (config) => {
        setModalConfig(config);
        setIsOpen(true);
      },
      hide: () => {
        setIsOpen(false);
        setTimeout(() => setModalConfig(null), 300);
      }
    };

    return () => {
      modalInstance = null;
    };
  }, []);

  return (
    <>
      {children}
      {modalConfig && (
        <DynamicFormModal
          {...modalConfig}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
