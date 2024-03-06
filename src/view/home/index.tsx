import { useEffect, useState } from "react";
import ViewAtendimento from "../../view/atendimento/ViewAtendimento";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { Icon } from "@iconify/react";
import EditAtendimento from "../../view/atendimento/EditAtendimento";
import Modal from "../../components/modal";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { converterDataParaBrasil } from "../../components/functions";

interface IHomeView {
  createSucess: boolean;
}

const HomeView = ({ createSucess }: IHomeView) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState<number>();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      localStorage.getItem("token");
      atendimentosService
        .getAll()
        .then((response: any) => {
          setDados(response.data.Result);
        })
        .catch((error: any) => {
          console.error("*** Erro fetch data", error);
        });
    };
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    if (localStorage.getItem("token")) {
      fetchData();
    }
  }, [isModalOpen, createSucess]);

  console.log(createSucess)

  function handleModalOpen(codigo: number, edit: boolean) {
    setIsModalOpen(true);
    setIsModalEdit(edit);
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" max-md:flex max-md:justify-around overflow-auto max-md:mt-14">
      <div className="h-screen grow max-md:pb-14 max-md:h-5/6 ">
        <div className="p-3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {dados.map((item: FormValues, index) => (
            <div
              className="bg-blue-50 w-full border rounded-lg shadow-md my-1 p-2 card flex"
              key={index}
            >
              <div
                className=" cursor-pointer w-11/12"
                onClick={() => handleModalOpen(index, false)}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900 line-clamp-2">
                  {item.NomeFantasia}
                </h2>

                <div>
                  <p className="text-gray-700 mb-2 max-sm:hidden">
                    {item.Codigo}
                  </p>
                  <p className="text-gray-700 mb-2 max-sm:hidden ">
                    Usuário: {item.Usuario}
                  </p>
                  <p className="text-gray-700 mb-2  ">
                    Nome: {item.NomeCliente}
                  </p>
                </div>
              </div>
              <div className="w-1/12 ml-3">
                <Icon
                  icon={"mdi:lead-pencil"}
                  cursor={"pointer"}
                  fontSize={19}
                  onClick={() => handleModalOpen(index, true)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {dados.map((item: FormValues, index) => {
            if (isModalEdit === true) {
              return index === codAtend ? (
                <EditAtendimento
                  
                  receivedData={item}
                  onClose={handleModalClose}
                  key={index}
                />
              ) : (
                ""
              );
            } else {
              if (item.DataCriacao !== undefined) {
                const Data = item.DataCriacao.split("T");
                const Hora = Data[1].split(".");
                const HoraMin = Hora[0].split(":");
                return index === codAtend ? (
                  <ViewAtendimento
                    receivedData={item}
                    DataCriacao={Data[0] + "T" + HoraMin[0] + ":" + HoraMin[1]}
                    DataInicio={converterDataParaBrasil(item.DataInicio)}
                    DataFim={converterDataParaBrasil(item.DataFim)}
                    key={codAtend}
                  />
                ) : null;
              }
            }
          })}
        </Modal>
      )}
    </div>
  );
};
export default HomeView;
