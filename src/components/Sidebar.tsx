
import React from 'react';
import { Home, Users, Briefcase, Package, MapPin, ChevronLeft, ChevronRight, LogOut, Truck, ShoppingCart, Utensils } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Tablero', icon: Home },
  { id: 'services', label: 'Servicios', icon: Briefcase },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'inventory', label: 'Inventario', icon: Package },
  { id: 'despacho', label: 'Despacho', icon: Truck },
  { id: 'gasto-menu', label: 'Gasto para el Menú', icon: Utensils },
  { id: 'productos', label: 'Productos', icon: ShoppingCart },
  { id: 'areas', label: 'Áreas', icon: MapPin },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  activeSection, 
  setActiveSection 
}) => {
  const { signOut } = useAuth();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const handleSectionChange = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(sectionId);
  };

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-56'
    } relative shadow-sm z-20 flex flex-col`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center justify-center">
              <div className="w-30 h-30 bg-brand-blue rounded-lg flex items-center justify-center mr-3 mb-6">
                <img src="/logo.png" alt="logo paz y vida" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Comedor
              </h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-brand-green transition-colors text-gray-600 hover:text-gray-900"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      <nav className="px-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={handleSectionChange(item.id)}
            className={`w-full flex items-center px-3 py-2.5 mb-2 text-left rounded-xl transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-brand-blue text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-brand-green'
            }`}
          >
            <item.icon size={18} className={`${activeSection === item.id ? 'text-white' : 'text-gray-500'}`} />
            {!isCollapsed && (
              <span className="ml-3 font-medium transition-opacity duration-200 text-sm">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-2.5 text-left rounded-xl transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut size={18} />
          {!isCollapsed && (
            <span className="ml-3 font-medium transition-opacity duration-200 text-sm">Cerrar Sesión</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
