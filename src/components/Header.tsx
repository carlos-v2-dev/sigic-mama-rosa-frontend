
import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, getLastSignIn, getCurrentSession, isAuthenticated } = useAuth();

  const currentSession = getCurrentSession();
  const lastSignIn = getLastSignIn();

  // Display values based on authentication status
  const displayUserName = isAuthenticated && user?.email ? user.email : 'Usuario Invitado';
  const displayRole = isAuthenticated ? 'Usuario Autenticado' : 'Invitado';
  const displayLastAccess = lastSignIn ? `${lastSignIn.date} - ${lastSignIn.time}` : 'Sin acceso previo';

  return (
    <header className="relative bg-brand-green overflow-hidden z-40">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-32 h-32 bg-brand-blue rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-4 right-20 w-24 h-24 bg-brand-yellow rounded-full opacity-12 animate-bounce" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-2 left-1/3 w-28 h-28 bg-brand-red rounded-full opacity-8 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Session Information */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">Sesión Actual</span>
                <span className="text-xs text-gray-600">{currentSession.date} - {currentSession.time}</span>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Último Acceso</span>
                <span className="text-xs text-gray-500">{displayLastAccess}</span>
              </div>
            </div>
          </div>

          {/* User Info - Simplified */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{displayUserName}</p>
              <p className="text-xs text-gray-600">{displayRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
