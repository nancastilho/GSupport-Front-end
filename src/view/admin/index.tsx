import React, { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarios";
import { Usuario } from "../../interface";

const AdminView = () => {
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      usuariosService
        .getAll()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className=" max-md:flex max-md:justify-around overflow-auto max-md:mt-14">
      <div className="h-screen grow overflow-auto max-md:pb-14 max-md:h-5/6 ">
        <section className=" py-10 leading-6 border-b border-blue-900 sm:py-16 lg:py-10">
          <div className="mx-auto text-blue-900 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold leading-9 sm:text-3xl sm:leading-3">
                Resumo de Resultados Mensais
              </h2>
            </div>

            <div className="mt-8 grid text-blue-900 grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-16 lg:grid-cols-4">
              <div className="relative bg-blue-50 shadow-md overflow-hidden rounded-lg border border-md  ">
                <div className="px-4 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                      328
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                      Atendimentos em Geral
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative bg-blue-50 shadow-md overflow-hidden rounded-lg border  border-md  ">
                <div className="px-4 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                      04
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                      Alertas Resolvidos
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative bg-blue-50 shadow-md overflow-hidden rounded-lg border  border-md  ">
                <div className="px-4 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                      14
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                      Treinamentos Pendentes
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative bg-blue-50 shadow-md overflow-hidden rounded-lg  border border-md  ">
                <div className="px-4 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                      40%
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                      Atendimentos de Revenda
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-xl text-center pt-10 text-blue-900">
          <h2 className="text-3xl font-bold leading-9 sm:text-3xl sm:leading-3">
            Painel
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 px-4  text-blue-900 p-2 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
          <div className="max-w-md border shadow-md bg-blue-50  rounded-lg border-md  p-6 pb-10 ">
            <p className="text-lg font-medium">Alertas</p>
            <div className="mt-4 flex border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">Aços do Vale</p>
            </div>
            <div className="mt-4 flex border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 shrink-0 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">Vale Safe</p>
            </div>
            <div className="mt-4 flex border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 shrink-0 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">Grupo AGS</p>
            </div>
            <div className="mt-4 flex border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 shrink-0 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">Papelaria Iracema</p>
            </div>
          </div>
          <div className="max-w-md border shadow-md bg-blue-50  rounded-lg border-md  p-6 pb-10 ">
            <p className="text-lg font-medium">Usuarios</p>
            <div className="flex items-center py-2">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://github.com/etoledo44.png"
                alt="Simon Lewis"
              />
              <p className="ml-4 w-56">
                <strong className="block font-medium">Erique</strong>
                <span className="text-xs text-gray-400">Gerente Suporte</span>
              </p>
            </div>
            <div className="flex items-center py-2">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://github.com/patrick9as.png"
                alt="Simon Lewis"
              />
              <p className="ml-4 w-56">
                <strong className="block font-medium">Patrick</strong>
                <span className="text-xs text-gray-400">Gerente Comercial</span>
              </p>
            </div>
            <div className="flex items-center py-2">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://github.com/nancastilho.png"
                alt="Simon Lewis"
              />
              <p className="ml-4 w-56">
                <strong className="block font-medium">Renan</strong>
                <span className="text-xs text-gray-400">Dev</span>
              </p>
            </div>
            <div className="flex items-center py-2">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://github.com/LuanFlavio.png"
                alt="Simon Lewis"
              />
              <p className="ml-4 w-56">
                <strong className="block font-medium">Luan</strong>
                <span className="text-xs text-gray-400">Dev</span>
              </p>
            </div>
          </div>
          <div className="max-w-md border shadow-md bg-blue-50  rounded-lg border-md  p-6 pb-10 ">
            <p className="text-lg font-medium ">Categorias</p>
            <div className="w-full h-3/4 mt-4 border border-blue-900 overflow-auto rounded-lg text-sm text-left rtl:text-right text-blue-900  ">
              <div>
                <div className=" border-b  border-blue-900">
                  <div className="px-6 py-4 font-medium whitespace-nowrap ">
                    Erro do Sistema
                  </div>
                </div>
                <div className=" border-b border-blue-900">
                  <div className="px-6 py-4 font-medium whitespace-nowrap ">
                    Dúvidas Gerais
                  </div>
                </div>
                <div className=" border-b border-blue-900">
                  <div className="px-6 py-4 font-medium   whitespace-nowrap ">
                    Treinamento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
