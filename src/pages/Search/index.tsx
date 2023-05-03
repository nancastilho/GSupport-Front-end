import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LayoutPadrao from "../../components/LayoutPadrao";
import { Icon } from "@iconify/react";
import axios from "axios";
import { text } from "stream/consumers";
import Modal from "../../components/modal";
import EditAtendimento from "../../components/atendimento/EditAtendimento";
import { FormValues } from "../../components/atendimento/ViewAtendimento";
import Pagination from "../../components/pagination";

interface Lista {
  Codigo: number;
  CodUsuario: number;
  Usuario: string;
  NomeFantasia: string;
  NomeCliente: string;
  DataCriacao: string;
  Problema: string;
  Solucao: string;
  Imagens: [];
}
const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dados, setDados] = useState([]);
  const [texto, setTexto] = useState<string>();
  const [usuario, setUsuario] = useState<string>();
  const [list, setList] = useState<Lista>();
  const [atend, setAtend] = useState<Lista>();
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  function fetchData(newPage: number) {
    setCurrentPage(newPage);
    console.log(currentPage);
  }

  function handleModalOpen(item:Lista) {
    setIsModalOpen(true);
    setAtend(item);
    
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  function handleListView(lista: Lista) {
    setList(lista);
  }

  const handleSearchTexto = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    setTexto(value);
  };

  const handleSearchUsuario = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    setUsuario(value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/atendimentos", {
        params: {
          DataInicio: "20230101",
          DataFim: "20231231",
          Rows: "20",
          PageNumber: currentPage,
          Texto: texto,
          Usuario: usuario,
        }, headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        setDados(response.data.Result);
        setPages(Math.ceil(response.data.Total / 20));

        console.log(response.data.Total);
        console.log(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [texto, usuario, currentPage]);

  return (
    <LayoutPadrao>
      <div className="flex">
        <div className="w-4/6 h-screen p-3">
          <div className="max-w-3xl h-screen mx-auto">
            <div className="flex p-2 justify-around">
              <div className="max-w-fit mx-3 ">
                <div className="relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <input
                    className="peer h-full w-full outline-none bg-white text-sm text-gray-700 pr-2"
                    type="text"
                    id="texto"
                    name="texto"
                    onChange={handleSearchTexto}
                    placeholder="Texto"
                  />
                </div>
              </div>
              <div className="max-w-fit mx-3 ">
                <div className="relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <input
                    className="peer h-full w-full outline-none bg-white text-sm text-gray-700 pr-2"
                    type="text"
                    id="usuario"
                    name="usuario"
                    onChange={handleSearchUsuario}
                    placeholder="USUARIOS"
                  />
                </div>
              </div>
            </div>
            <div className="relative h-5/6 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      Codigo
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Data/hora
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Empresa
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Usuario
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Nome
                    </th>
                    <th scope="col" className="px-5 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((item: Lista, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      onClick={() => handleListView(item)}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.Codigo}
                      </th>
                      <td className="px-5 py-4">{item.DataCriacao}</td>
                      <td className="px-5 py-4">{item.NomeFantasia}</td>
                      <td className="px-5 py-4">{item.Usuario}</td>
                      <td className="px-5 py-4">{item.NomeCliente}</td>
                      <td className="px-5 py-4 text-right">
                        <label className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:underline ">
                          <Icon
                            onClick={() => handleModalOpen(item)}
                            icon={"mdi:pencil"}
                            width={18}
                          />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={pages}
                onPageChange={fetchData}
                limit={5}
              />
            </div>

            <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
          </div>
        </div>
        <div className=" flex flex-col w-5/12 h-screen shadow-md p-3 justify-around">
          <div className="mb-4">
            <label
              htmlFor="Problema"
              className="block mb-1 font-medium text-gray-700"
            >
              Problema
            </label>
            <textarea
              id="Problema"
              name="Problema"
              value={list?.Problema}
              className="block w-full h-60 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="Solucao"
              className="block mb-1 font-medium text-gray-700"
            >
              Solução
            </label>
            <textarea
              id="Solucao"
              name="Solucao"
              value={list?.Solucao}
              className="block w-full h-60 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="flex w-60">
            {list?.Imagens !== null
              ? list?.Imagens.map((img: string, index) => (
                  <a
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <img src={img} alt="" className="w-10 h-10 px-1" />
                  </a>
                ))
              : ""}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          
          <EditAtendimento />

          
        </Modal>
      )}
    </LayoutPadrao>
  );
};

export default Search;
