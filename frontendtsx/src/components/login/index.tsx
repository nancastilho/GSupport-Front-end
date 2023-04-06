import axios, {AxiosResponse} from 'axios';
import React, { useState } from 'react';
import  {NavigateFunction, useNavigate}  from 'react-router-dom';

interface Credentials {
  Usuario: string;
  Senha: string;
}

const Login = () => {

  const navigate: NavigateFunction = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    Usuario: '',
    Senha: '',
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios.post<{ token: string }>('http://localhost:8080/login', credentials)
      .then((response: AxiosResponse<{ token: string }>) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
        // exibe uma mensagem de erro para o usuário
      });
  }

  
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }
  function handleInputEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Faça login na sua conta</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Endereço de e-mail
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={handleInputEmailChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
