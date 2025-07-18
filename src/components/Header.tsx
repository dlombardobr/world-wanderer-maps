
import React from 'react';

const Header = () => {
  return (
    <div className="container">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white flex items-center justify-between">
          <h1 className="text-2xl font-bold font-title">Mapa de Rotas Logísticas</h1>
          <div className="flex items-center">
            <img 
              src="https://famcargo.com.br/wp-content/uploads/2024/07/logo-e1720459385736-1024x737.png" 
              alt="FAM Cargo Logo" 
              className="h-28 w-auto drop-shadow-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
