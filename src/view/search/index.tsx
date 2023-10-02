import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../../components/modal";
import EditAtendimento from "../../view/atendimento/EditAtendimento";
import Pagination from "../../components/pagination";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
const SearchView = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dados, setDados] = useState([]);
  const [texto, setTexto] = useState<string>();
  const [dateI, setDateI] = useState<string>("20230101");
  const [dateF, setDateF] = useState<string>("20231231");
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
          console.log(error);
        });
    };

    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    if (localStorage.getItem("token")) {
      fetchData();
    }
  }, [texto, usuario, currentPage, dateF, dateI]);

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
        <div className="w-4/6 h-screen flex flex-col justify-around">
          <div className="flex px-1 justify-between">
            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden ">
              <span className="pl-2 text-sm">Inicio: </span>
              <input
                className="peer h-full w-full outline-none bg-white text-sm text-gray-700 px-2"
                type="date"
                id="texto"
                name="texto"
                onChange={handleSearchDateI}
                placeholder="Texto"
              />
            </div>

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
              <span className="pl-2 text-sm">Fim: </span>
              <input
                className="peer h-full w-full outline-none bg-white text-sm text-gray-700 px-2"
                type="date"
                id="texto"
                name="texto"
                onChange={handleSearchDateF}
                placeholder="Texto"
              />
            </div>

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
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

            <div className="mx-1 relative flex items-center w-full h-8 rounded-lg border border-solid bg-white overflow-hidden">
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
          <div className=" h-5/6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
                {dados.map((item: FormValues, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => handleListView(item)}
                    key={index}
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
                      <label className="font-medium text-blue-950 dark:text-blue-500 cursor-pointer hover:underline ">
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
        <div className="w-2/6  h-screen p-3 flex flex-col justify-around">
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
            if (item.DataCriacao !== undefined) {
              var Data = item.DataCriacao.split("T");
              var Hora = Data[1].split(".");
              var HoraMin = Hora[0].split(":");
              return item.Codigo === codAtend ? (
                <EditAtendimento
                  Assunto={item.Assunto}
                  CodEmpresa={item.CodEmpresa}
                  CodMeioComunicacao={item.CodMeioComunicacao}
                  CodSistema={item.CodSistema}
                  CodUsuario={item.CodUsuario}
                  Codigo={item.Codigo}
                  DataCriacao={Data[0] + "T" + HoraMin[0] + ":" + HoraMin[1]}
                  NomeCliente={item.NomeCliente}
                  NomeFantasia={item.NomeFantasia}
                  Plantao={item.Plantao}
                  Problema={item.Problema}
                  Solucao={item.Solucao}
                  Usuario={item.Usuario}
                  Imagens={item.Imagens}
                  key={index}
                />
              ) : (
                ""
              );
            }
          })}
        </Modal>
      )}
    </>
  );
};

export default SearchView;
