import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../../components/modal";
import EditAtendimento from "../../view/atendimento/EditAtendimento";
import Pagination from "../../components/pagination";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { formatarDataBrasil } from "../../components/functions";
const SearchView = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dados, setDados] = useState([]);
  const [texto, setTexto] = useState<string>();
  const [dateI, setDateI] = useState<string>("20230101");
  const [dateF, setDateF] = useState<string>("20251231");
  const [usuario, setUsuario] = useState<string>();
  const [list, setList] = useState<FormValues>();
  const [codAtend, setCodAtend] = useState<number>();
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const toggleAccordion = (index: number, lista: FormValues) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Fechar o item se já estiver aberto
    } else {
      setActiveIndex(index); // Abrir o item clicado
    }
    handleListView(lista);
  };

  function fetchData(newPage: number) {
    setCurrentPage(newPage);
  }

  function handleModalOpen(codigo: number | undefined) {
    setIsModalOpen(true);
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  function handleListView(lista: FormValues) {
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

  const handleSearchDateI = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    let date = value.split("-");
    setDateI(date[0] + date[1] + date[2]);
  };
  const handleSearchDateF = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    let date = value.split("-");
    setDateF(date[0] + date[1] + date[2]);
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
    const fetchData = async () => {
      atendimentosService
        .getPart({
          DataInicio: dateI,
          DataFim: dateF,
          Rows: "20",
          PageNumber: currentPage,
          Texto: texto,
          Usuario: usuario,
        })
        .then((response) => {
          setDados(response.data.Result);
          setPages(Math.ceil(response.data.Total / 20));
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    if (localStorage.getItem("token")) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto, usuario, currentPage, dateF, dateI, isModalOpen]);

  return (
    <>
      <div className=" flex justify-around overflow-auto mt-14 md:hidden">
        <div className="h-screen mx-2  max-md:pb-14 max-md:h-5/6">
          <div className="p3">
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex flex-col w-1/2 m-1">
                  <div className="mb-2 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden ">
                    <span className="pl-2  text-sm">Inicio:</span>
                    <input
                      className="peer h-full w-full outline-none bg-white text-sm text-gray-700 px-2"
                      type="date"
                      id="texto"
                      name="texto"
                      onChange={handleSearchDateI}
                      placeholder="Texto"
                    />
                  </div>

                  <div className="relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
                    <span className="pl-2 text-sm">Fim:</span>
                    <input
                      className="peer h-full w-full outline-none bg-white text-sm text-gray-700 px-2"
                      type="date"
                      id="texto"
                      name="texto"
                      onChange={handleSearchDateF}
                      placeholder="Texto"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/2 m-1">
                  <div className=" mb-2 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
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

                  <div className=" relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
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
              <div>
                {dados.map((item: FormValues, index) => (
                  <div key={index} className="border m-1 rounded-md">
                    <button
                      onClick={() => toggleAccordion(index, item)}
                      className={`w-full flex rounded-md text-left p-3 bg-gray-200 hover:bg-gray-300 ${
                        activeIndex === index ? "bg-gray-300" : ""
                      } `}
                    >
                      <div className="grow">
                        <div className="flex flex-col">
                          <p className="text-base font-bold mb-2 text-blue-900 line-clamp-2 ">
                            {item.NomeFantasia}
                          </p>
                          <p className="text-gray-700 ">
                            Cliente: {item.NomeCliente}
                          </p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex ">
                          <p className="text-gray-700 ">
                            Codigo: {item.Codigo}
                          </p>
                          <p className="text-gray-700 ml-3">
                            Usuario: {item.Usuario}
                          </p>
                        </div>
                      </div>
                      <Icon
                        icon={"mdi:chevron-down"}
                        fontSize={20}
                        className={`ml-auto transition-transform ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={` max-h-0 overflow-hidden transition-max-h duration-300 ease-in-out ${
                        activeIndex === index ? "max-h-screen" : ""
                      }`}
                    >
                      <div className="grow flex flex-col ">
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
                          className="block w-full h-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                          rows={4}
                          required
                        ></textarea>
                      </div>

                      <div className="grow flex flex-col ">
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
                          className="block w-full h-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                          rows={4}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}

                <Pagination
                  currentPage={currentPage}
                  totalPages={pages}
                  onPageChange={fetchData}
                  limit={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-md:hidden">
        <div className="w-4/6 mx-3 h-screen flex flex-col justify-around">
          <div className="flex justify-between">
            <div className="mr-1 relative flex items-center w-full h-8 rounded-lg border shadow-md border-blue-900 overflow-hidden ">
              <span className="pl-2 text-sm">Inicio: </span>
              <input
                className="peer h-full w-full outline-none  bg-transparent text-sm text-blue-900 px-2"
                type="date"
                id="texto"
                name="texto"
                onChange={handleSearchDateI}
                placeholder="Texto"
              />
            </div>

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border shadow-md border-blue-900 bg-transparent overflow-hidden">
              <span className="pl-2 text-sm">Fim: </span>
              <input
                className="peer h-full w-full outline-none bg-transparent text-sm text-blue-900 px-2"
                type="date"
                id="texto"
                name="texto"
                onChange={handleSearchDateF}
                placeholder="Texto"
              />
            </div>

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border shadow-md border-blue-900 bg-transparent overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-blue-900">
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
                className="peer h-full w-full outline-none bg-transparent text-sm placeholder-blue-900 pr-2"
                type="text"
                id="texto"
                name="texto"
                onChange={handleSearchTexto}
                placeholder="Texto"
              />
            </div>

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border shadow-md border-blue-900  bg-transparent overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-blue-900 ">
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
                className="peer h-full w-full outline-none bg-transparent text-sm placeholder-blue-900 pr-2"
                type="text"
                id="usuario"
                name="usuario"
                onChange={handleSearchUsuario}
                placeholder="Usuários"
              />
            </div>
          </div>
          <div className=" h-5/6 border-l border-y overflow-x-auto border-blue-900  shadow-md sm:rounded-lg">
            <table className="w-full h-1 text-sm text-left text-blue-950 ">
              <thead className="sticky top-0 text-xs border-b border-blue-900 text-blue-950 uppercase bg-blue-200  ">
                <tr className="">
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
                {dados.map((item: FormValues, index) => (
                  <tr
                    className="bg-blue-50 border-b   hover:bg-blue-100 "
                    onClick={() => handleListView(item)}
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.Codigo}
                    </th>
                    <td className="px-5 py-4">
                      {formatarDataBrasil(item.DataCriacao)}
                    </td>
                    <td className="px-5 py-4">{item.NomeFantasia}</td>
                    <td className="px-5 py-4">{item.Usuario}</td>
                    <td className="px-5 py-4">{item.NomeCliente}</td>
                    <td className="px-5 py-4 text-right">
                      <label className="font-medium text-blue-950 cursor-pointer hover:underline ">
                        <Icon
                          onClick={() => handleModalOpen(item.Codigo)}
                          icon={"mdi:lead-pencil"}
                          width={18}
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onPageChange={fetchData}
              limit={5}
            />
          </div>
          <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
        </div>
        <div className="w-2/6  h-screen p-3 flex flex-col justify-around text-blue-900">
          <div className="grow flex flex-col ">
            <label
              htmlFor="Problema"
              className="block mb-1 font-medium "
            >
              Problema
            </label>
            <textarea
              id="Problema"
              name="Problema"
              value={list?.Problema}
              className="block w-full h-full px-4 py-2 leading-tight border border-blue-900 shadow-md bg-blue-50 rounded-lg appearance-none focus:outline-none focus:shadow-outline-gray"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="grow flex flex-col mt-2">
            <label
              htmlFor="Solucao"
              className="block mb-1 font-medium "
            >
              Solução
            </label>
            <textarea
              id="Solucao"
              name="Solucao"
              value={list?.Solucao}
              className="block w-full shadow-md h-full px-4 py-2 leading-tight border border-blue-900 bg-blue-50 rounded-lg appearance-none focus:outline-none focus:shadow-outline-gray"
              rows={4}
              required
            ></textarea>
          </div>

          <div className=" grow flex">
            {list?.Imagens !== undefined
              ? list?.Imagens.map((img: string, index) => (
                  <div key={index}>
                    <a href={img} target="_blank" rel="noopener noreferrer">
                      <img src={img} alt="" className="w-10 h-10 px-1" />
                    </a>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {dados.map((item: FormValues, index) => {
            return item.Codigo === codAtend ? (
              <EditAtendimento receivedData={item} onClose={handleModalClose} />
            ) : null;
          })}
        </Modal>
      )}
    </>
  );
};

export default SearchView;
