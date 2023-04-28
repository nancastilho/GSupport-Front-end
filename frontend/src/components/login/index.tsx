import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Credentials {
  Usuario: string;
  Senha: string;
}

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    Usuario: "",
    Senha: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('ta enviando')
    try {
      const result = await axios.post<{ senhaHash: string; userData: any }>(
        "http://localhost:8080/login",
        credentials
      );

      const token = result.data.senhaHash;
      const userAuth = result.data.userData.Usuario;
      const codUserAuth = result.data.userData.Codigo;

      localStorage.setItem("userAuth", userAuth);
      localStorage.setItem("codUserAuth", codUserAuth);
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
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
    <div
      className="h-screen bg-[#edf2f7] overflow-hidden flex items-center justify-center" /*style="background: #edf2f7;"*/
    >
      <div className="h-screen w-full flex">
        <div className="flex w-1/2 bg-gradient-to-tr from-blue-950 to-sky-900 i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              GSupport
            </h1>
            <p className="text-white mt-1">
              Sistema de gestao de atendimento HelpDesk
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-blue-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="flex w-1/2 justify-center items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Olá HelpDesk!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Bem vindo</p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 28 28"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="Usuario"
                name="Usuario"
                autoComplete="Usuario"
                required
                onChange={handleInputEmailChange}
                placeholder="Usuario"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                id="Senha"
                name="Senha"
                type="password"
                autoComplete="current-Senha"
                required
                onChange={handleInputChange}
                placeholder="Senha"
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-sky-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Entrar
            </button>
            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
// <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//   <div className="sm:mx-auto sm:w-full sm:max-w-md">
//     <h2 className="text-center text-3xl font-extrabold text-gray-900">
//       Faça login na sua conta
//     </h2>
//   </div>

//   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//     <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <label
//             htmlFor="Usuario"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Nome
//           </label>
//           <div className="mt-1">
//             <input
//               id="Usuario"
//               name="Usuario"
//               type="text"
//               autoComplete="Usuario"
//               required
//               onChange={handleInputEmailChange}
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="Senha"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Senha
//           </label>
//           <div className="mt-1">
//             <input
//               id="Senha"
//               name="Senha"
//               type="password"
//               autoComplete="current-Senha"
//               required
//               onChange={handleInputChange}
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Entrar
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>
