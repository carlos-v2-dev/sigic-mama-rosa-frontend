
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '@/pages/login';
import PrincipalLayout from './auth-layout';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PrincipalLayout>
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
            <span className="text-gray-700 font-medium">Cargando...</span>
          </div>
      </PrincipalLayout>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
