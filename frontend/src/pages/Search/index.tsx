import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LayoutPadrao from "../../components/LayoutPadrao";
import { Icon } from "@iconify/react";
import axios from "axios";
import { text } from "stream/consumers";
import Modal from "../../components/modal";
import EditAtendimento from "../../components/atendimento/EditAtendimento";
import { FormValues } from "../../components/atendimento/ViewAtendimento";

interface Lista {
  Codigo: number;
  CodUsuario: number;
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
  const [codAtend, setCodAtend] = useState<number>();

  function handleModalOpen(codigo: number) {
    setIsModalOpen(true);
    setCodAtend(codigo);
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
    setTexto(value) 
  };
  const handleSearchUsuario = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    setUsuario(value) 
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/atendimentos", {
        params: {
          DataInicio: "20230101",
          DataFim: "20231231",
          Rows: "20",
          FiltroPaginacao: "1",
          PageNumber: "1",
          Texto:{texto},
          Usuario:{usuario}
        },
      })
      .then((response) => {
        setDados(response.data.Result);
        console.log(response.data.Result);
        console.log(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <LayoutPadrao>
      <div className="flex">
        <div className="w-1/2 h-screen p-3">
          <div className="max-w-2xl h-screen mx-auto">
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                <tbody className="h-64">
                  {dados.map((item: Lista, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => handleListView(item)}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.Codigo}
                      </th>
                      <td className="px-5 py-4">{item.DataCriacao}</td>
                      <td className="px-5 py-4">{item.NomeFantasia}</td>
                      <td className="px-5 py-4">{item.CodUsuario}</td>
                      <td className="px-5 py-4">{item.NomeCliente}</td>
                      <td className="px-5 py-4 text-right">
                        <label
                          
                          className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:underline "
                        >
                          <Icon onClick={() => handleModalOpen(index)} icon={"mdi:pencil"} width={18} />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              <div className="flex justify-center">
                <div className=" inline-flex border border-[#e4e4e4] bg-white p-2 rounded-xl ">
                  <ul className="flex items-center -mx-[6px]">
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        <span>
                          <svg
                            width="8"
                            height="15"
                            viewBox="0 0 8 15"
                            className="fill-current stroke-current"
                          >
                            <path
                              d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                              stroke-width="0.3"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        1
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        2
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        3
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        4
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="a"
                        className="
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          rounded-md
                          border border-[#EDEFF1]
                          text-[#838995] text-base
                          hover:bg-primary hover:border-primary hover:text-white
                          "
                      >
                        <span>
                          <svg
                            width="8"
                            height="15"
                            viewBox="0 0 8 15"
                            className="fill-current stroke-current"
                          >
                            <path
                              d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                              stroke-width="0.3"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
          </div>
        </div>
        <div className=" flex flex-col w-1/2 h-screen shadow-md p-3 justify-around">
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
            ? list?.Imagens.map((img: string) => (
                <a href={img} target="_blank" rel="noopener noreferrer">
                  <img src={img} alt="" className="w-10 h-10 px-1" />
                </a>
              ))
            : ""}
          </div>
        </div>
      </div>
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {/* {dados.map((item: FormValues, index) => {
            var Data = item.DataCriacao.split("T");
            var Hora = Data[1].split(".");
            console.log("esta é a data", Data[0]);
            console.log("esta é a HORA", Hora[0]);
            console.log(dados);
            console.log(item.Imagens);
            return( */}
             <EditAtendimento/>
            
            {/* )
          })} */}
        </Modal>
      )}
    </LayoutPadrao>
  );
};

export default Search;
