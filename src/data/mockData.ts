
export const mockUsers = [
  {
    id: 1,
    nombreCompleto: 'Juan Pérez García',
    cedula: '12345678',
    genero: 'Masculino',
    contacto: '3001234567',
    ocupacion: 'Ingeniero',
    patologia: 'Ninguna'
  },
  {
    id: 2,
    nombreCompleto: 'María González López',
    cedula: '87654321',
    genero: 'Femenino',
    contacto: '3009876543',
    ocupacion: 'Doctora',
    patologia: 'Diabetes'
  }
];

export const mockServices = [
  {
    id: 1,
    usuario: 'Juan Pérez García',
    descripcion: 'Consulta médica general',
    area: 'Medicina General'
  },
  {
    id: 2,
    usuario: 'María González López',
    descripcion: 'Examen de laboratorio',
    area: 'Laboratorio'
  }
];

export const mockInventory = [
  {
    id: 1,
    nombre: 'Jeringa 5ml',
    cantidad: 250
  },
  {
    id: 2,
    nombre: 'Gasas estériles',
    cantidad: 180
  }
];

export const mockAreas = [
  {
    id: 1,
    nombre: 'Medicina General',
    descripcion: 'Atención médica primaria y consultas generales'
  },
  {
    id: 2,
    nombre: 'Laboratorio',
    descripcion: 'Análisis clínicos y pruebas diagnósticas'
  }
];

export const ocupaciones = [
  'Ingeniero',
  'Doctora',
  'Profesor',
  'Abogado',
  'Contador',
  'Arquitecto',
  'Enfermero',
  'Estudiante',
  'Comerciante',
  'Otro'
];

export const patologias = [
  'Ninguna',
  'Diabetes',
  'Hipertensión',
  'Asma',
  'Artritis',
  'Depresión',
  'Ansiedad',
  'Migraña',
  'Gastritis',
  'Otro'
];

export const areas = [
  'Medicina General',
  'Laboratorio',
  'Radiología',
  'Cardiología',
  'Neurología',
  'Pediatría',
  'Ginecología',
  'Traumatología',
  'Psicología',
  'Fisioterapia'
];
