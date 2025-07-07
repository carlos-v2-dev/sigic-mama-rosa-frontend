
import React from 'react';
import Swal from 'sweetalert2';
import { useEmploymentsAndPathologies } from '../hooks/useEmploymentsAndPathologies';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'email' | 'tel' | 'dynamic-employment' | 'dynamic-pathology';
  options?: string[];
  required?: boolean;
}

interface FormModalProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
  initialData?: any;
}

export const showFormModal = ({
  title,
  fields,
  onSubmit,
  initialData = {},
}: FormModalProps) => {
  const generateFormHTML = (employments: any[], pathologies: any[]) => {
    return fields
      .map((field) => {
        const value = initialData[field.name] || '';
        
        if (field.type === 'select' && field.options) {
          const options = field.options
            .map((option) => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`)
            .join('');
          
          return `
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">${field.label}</label>
              <select name="${field.name}" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900" ${field.required ? 'required' : ''}>
                <option value="">Seleccionar...</option>
                ${options}
              </select>
            </div>
          `;
        } else if (field.type === 'dynamic-employment') {
          const options = employments
            .map((emp) => `<option value="${emp.name}" ${value === emp.name ? 'selected' : ''}>${emp.name}</option>`)
            .join('');
          
          return `
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">${field.label}</label>
              <div class="relative">
                <select name="${field.name}" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900" ${field.required ? 'required' : ''}>
                  <option value="">Seleccionar...</option>
                  ${options}
                </select>
                <button type="button" onclick="showAddEmploymentInput()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors" title="Agregar nuevo empleo">
                  ➕
                </button>
              </div>
              <div id="add-employment-container" class="mt-2 hidden">
                <div class="flex items-center space-x-2">
                  <input type="text" id="new-employment" placeholder="Nuevo empleo" class="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900">
                  <button type="button" onclick="addNewEmployment()" class="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">✓</button>
                  <button type="button" onclick="cancelAddEmployment()" class="px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all">✗</button>
                </div>
              </div>
            </div>
          `;
        } else if (field.type === 'dynamic-pathology') {
          const options = pathologies
            .map((path) => `<option value="${path.name}" ${value === path.name ? 'selected' : ''}>${path.name}</option>`)
            .join('');
          
          return `
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">${field.label}</label>
              <div class="relative">
                <select name="${field.name}" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900" ${field.required ? 'required' : ''}>
                  <option value="">Seleccionar...</option>
                  ${options}
                </select>
                <button type="button" onclick="showAddPathologyInput()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors" title="Agregar nueva patología">
                  ➕
                </button>
              </div>
              <div id="add-pathology-container" class="mt-2 hidden">
                <div class="flex items-center space-x-2">
                  <input type="text" id="new-pathology" placeholder="Nueva patología" class="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900">
                  <button type="button" onclick="addNewPathology()" class="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">✓</button>
                  <button type="button" onclick="cancelAddPathology()" class="px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all">✗</button>
                </div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">${field.label}</label>
              <input 
                type="${field.type}" 
                name="${field.name}" 
                value="${value}"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900" 
                placeholder="${field.label}"
                ${field.required ? 'required' : ''}
              />
            </div>
          `;
        }
      })
      .join('');
  };

  // Hook para obtener datos de Supabase
  const { employments, pathologies, addNewEmployment, addNewPathology } = useEmploymentsAndPathologies();

  // Funciones globales para manejar los inputs dinámicos
  (window as any).showAddEmploymentInput = () => {
    const container = document.getElementById('add-employment-container');
    if (container) {
      container.classList.remove('hidden');
      const input = document.getElementById('new-employment') as HTMLInputElement;
      if (input) input.focus();
    }
  };

  (window as any).cancelAddEmployment = () => {
    const container = document.getElementById('add-employment-container');
    const input = document.getElementById('new-employment') as HTMLInputElement;
    if (container) container.classList.add('hidden');
    if (input) input.value = '';
  };

  (window as any).addNewEmployment = async () => {
    const input = document.getElementById('new-employment') as HTMLInputElement;
    const select = document.querySelector('select[name="ocupacion"]') as HTMLSelectElement;
    
    if (input && input.value.trim() && select) {
      try {
        const newEmployment = await addNewEmployment(input.value.trim());
        const option = document.createElement('option');
        option.value = newEmployment.name;
        option.textContent = newEmployment.name;
        option.selected = true;
        select.appendChild(option);
        (window as any).cancelAddEmployment();
      } catch (error) {
        console.error('Error adding employment:', error);
        Swal.fire('Error', 'No se pudo agregar el empleo', 'error');
      }
    }
  };

  (window as any).showAddPathologyInput = () => {
    const container = document.getElementById('add-pathology-container');
    if (container) {
      container.classList.remove('hidden');
      const input = document.getElementById('new-pathology') as HTMLInputElement;
      if (input) input.focus();
    }
  };

  (window as any).cancelAddPathology = () => {
    const container = document.getElementById('add-pathology-container');
    const input = document.getElementById('new-pathology') as HTMLInputElement;
    if (container) container.classList.add('hidden');
    if (input) input.value = '';
  };

  (window as any).addNewPathology = async () => {
    const input = document.getElementById('new-pathology') as HTMLInputElement;
    const select = document.querySelector('select[name="patologia"]') as HTMLSelectElement;
    
    if (input && input.value.trim() && select) {
      try {
        const newPathology = await addNewPathology(input.value.trim());
        const option = document.createElement('option');
        option.value = newPathology.name;
        option.textContent = newPathology.name;
        option.selected = true;
        select.appendChild(option);
        (window as any).cancelAddPathology();
      } catch (error) {
        console.error('Error adding pathology:', error);
        Swal.fire('Error', 'No se pudo agregar la patología', 'error');
      }
    }
  };

  Swal.fire({
    title: `<h2 style="color: #111827; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">${title}</h2>`,
    html: `
      <div style="text-align: left;">
        <p style="color: #6B7280; margin-bottom: 1.5rem; font-size: 0.9rem;">Completa la información requerida</p>
        <form id="dynamic-form" style="text-align: left;">
          ${generateFormHTML(employments, pathologies)}
        </form>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#111827',
    cancelButtonColor: '#6B7280',
    width: '500px',
    padding: '2rem',
    background: '#ffffff',
    backdrop: 'rgba(0, 0, 0, 0.4)',
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster'
    },
    customClass: {
      popup: 'rounded-2xl shadow-2xl border-0',
      confirmButton: 'px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200',
      cancelButton: 'px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition-all duration-200 mr-3',
      title: 'text-left',
      htmlContainer: 'text-left'
    },
    buttonsStyling: false,
    preConfirm: () => {
      const form = document.getElementById('dynamic-form') as HTMLFormElement;
      const formData = new FormData(form);
      const data: any = {};
      
      fields.forEach((field) => {
        data[field.name] = formData.get(field.name) || '';
      });
      
      // Validación simple
      const missingFields = fields
        .filter((field) => field.required && !data[field.name])
        .map((field) => field.label);
      
      if (missingFields.length > 0) {
        Swal.showValidationMessage(`
          <div style="color: #EF4444; font-weight: 500;">
            Campos requeridos: ${missingFields.join(', ')}
          </div>
        `);
        return false;
      }
      
      return data;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onSubmit(result.value);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Los datos se guardaron correctamente',
        icon: 'success',
        confirmButtonColor: '#10B981',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-6 py-3 rounded-xl font-semibold'
        },
        buttonsStyling: false
      });
    }
  });
};
