import React from 'react';

const Navbar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen ">
      <div className="bg-gray-900 text-white text-xl font-bold p-4">GSuporte</div>
      <div className="flex-grow p-4">
        <a href={'a'} className="block text-gray-300 hover:text-white mb-4">Relatorios</a>
        <a href={'a'} className="block text-gray-300 hover:text-white mb-4">Testes</a>
        
      </div>
    </div>
  );
};

export default Navbar;