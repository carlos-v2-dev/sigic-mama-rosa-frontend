
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

interface User {
  id: string;
  name: string | null;
  dni: string | null;
}

interface SearchableUserSelectProps {
  label: string;
  users: User[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const SearchableUserSelect: React.FC<SearchableUserSelectProps> = ({
  label,
  users,
  value,
  onChange,
  required = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    (user.dni?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    user.dni && user.name
  );

  const selectedUser = users.find(user => user.id === value);

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <div
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 outline-none transition-all bg-white text-gray-900 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-400" />
              <span className={selectedUser ? "text-gray-900" : "text-gray-500"}>
                {selectedUser ? `${selectedUser.name} (${selectedUser.dni})` : "Seleccionar usuario..."}
              </span>
            </div>
            <Search size={18} className="text-gray-400" />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cédula o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                    onClick={() => {
                      onChange(user.id);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">Cédula: {user.dni}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  <User size={24} className="mx-auto mb-2 text-gray-300" />
                  <p>No se encontraron usuarios</p>
                  <p className="text-sm">Intenta con otros términos de búsqueda</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        type="hidden"
        value={value}
        required={required}
      />
    </div>
  );
};

export default SearchableUserSelect;
