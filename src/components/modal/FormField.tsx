
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import SearchableUserSelect from '../SearchableUserSelect';
import DynamicSelect from '../DynamicSelect';
import DynamicProductSelect from '../DynamicProductSelect';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'tel' | 'select' | 'dynamic-user-search' | 'dynamic-department' | 'dynamic-employment' | 'dynamic-pathology' | 'dynamic-product';
  required?: boolean;
  options?: string[];
}

interface FormFieldProps {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
  users: any[];
  departments: any[];
  employments: any[];
  pathologies: any[];
  addDepartment: (data: { name: string }) => Promise<any>;
  addNewEmployment: (name: string) => Promise<any>;
  addNewPathology: (name: string) => Promise<any>;
}

const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  users,
  departments,
  employments,
  pathologies,
  addDepartment,
  addNewEmployment,
  addNewPathology
}) => {
  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => onChange(field.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Seleccionar ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'dynamic-user-search':
        return (
          <SearchableUserSelect
            label={field.label}
            users={users}
            value={value}
            onChange={(val) => onChange(field.name, val)}
            required={field.required}
          />
        );

      case 'dynamic-department':
        return (
          <DynamicSelect
            label={field.label}
            options={departments.map(dept => ({ id: dept.id, name: dept.name }))}
            value={value}
            onChange={(val) => onChange(field.name, val)}
            onAddNew={async (name: string) => {
              const newDept = await addDepartment({ name });
              return { id: newDept.id, name: newDept.name };
            }}
          />
        );

      case 'dynamic-employment':
        return (
          <DynamicSelect
            label={field.label}
            options={employments.map(emp => ({ id: emp.id, name: emp.name }))}
            value={value}
            onChange={(val) => onChange(field.name, val)}
            onAddNew={async (name: string) => {
              const newEmp = await addNewEmployment(name);
              return { id: newEmp.id, name: newEmp.name };
            }}
          />
        );

      case 'dynamic-pathology':
        return (
          <DynamicSelect
            label={field.label}
            options={pathologies.map(path => ({ id: path.id, name: path.name }))}
            value={value}
            onChange={(val) => onChange(field.name, val)}
            onAddNew={async (name: string) => {
              const newPath = await addNewPathology(name);
              return { id: newPath.id, name: newPath.name };
            }}
          />
        );

      case 'dynamic-product':
        return (
          <DynamicProductSelect
            value={value}
            onChange={(val) => onChange(field.name, val)}
          />
        );

      default:
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

export default FormFieldComponent;
