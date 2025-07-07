
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedBackground from '../components/AnimatedBackground';
import UsersSection from '../components/sections/UsersSection';
import ServicesSection from '../components/sections/ServicesSection';
import InventorySection from '../components/sections/InventorySection';
import DespachoSection from '../components/sections/DespachoSection';
import GastoMenuSection from '../components/sections/GastoMenuSection';
import ProductosSection from '../components/sections/ProductosSection';
import AreasSection from '../components/sections/AreasSection';
import { useStocks } from '../hooks/useStocks';
import { useDespacho } from '../hooks/useDespacho';
import { useGastoMenu } from '../hooks/useGastoMenu';
import { useProductos } from '../hooks/useProductos';
import { useDepartments } from '../hooks/useDepartments';
import { useUsers } from '../hooks/useUsers';
import { useServices } from '../hooks/useServices';
import Swal from 'sweetalert2';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Supabase hooks
  const { deleteStock } = useStocks();
  const { deleteDespacho } = useDespacho();
  const { deleteGastoMenu } = useGastoMenu();
  const { deleteProducto } = useProductos();
  const { deleteDepartment } = useDepartments();
  const { deleteUser } = useUsers();
  const { deleteService } = useServices();

  const handleDelete = (item: any, type: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case 'users':
            deleteUser(item.id);
            break;
          case 'services':
            deleteService(item.id);
            break;
          case 'inventory':
            deleteStock(item.id);
            break;
          case 'despacho':
            deleteDespacho(item.id);
            break;
          case 'gasto-menu':
            deleteGastoMenu(item.id);
            break;
          case 'productos':
            deleteProducto(item.id);
            break;
          case 'areas':
            deleteDepartment(item.id);
            break;
        }
        Swal.fire('¡Eliminado!', 'El registro ha sido eliminado', 'success');
      }
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersSection onDelete={handleDelete} />;
      case 'services':
        return <ServicesSection onDelete={handleDelete} />;
      case 'inventory':
        return <InventorySection onDelete={handleDelete} />;
      case 'despacho':
        return <DespachoSection onDelete={handleDelete} />;
      case 'gasto-menu':
        return <GastoMenuSection onDelete={handleDelete} />;
      case 'productos':
        return <ProductosSection onDelete={handleDelete} />;
      case 'areas':
        return <AreasSection onDelete={handleDelete} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex w-full relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="fixed left-0 top-0 h-full z-30">
          <Sidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        
        <div className={`flex-1 flex flex-col relative z-10 transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-56'
        }`}>
          <Header />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
