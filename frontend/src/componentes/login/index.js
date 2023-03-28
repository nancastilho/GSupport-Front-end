import React from 'react';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form className="flex flex-col items-center">
        <input type="email" placeholder="Email" className="border border-gray-400 rounded-md px-4 py-2 mb-4" />
        <input type="password" placeholder="Senha" className="border border-gray-400 rounded-md px-4 py-2 mb-4" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Entrar</button>
      </form>
    </div>
  );
}

export default Login;