import { useEffect, useState } from "react";
import { AlertaGet, FormValues } from "../../interface";
import { Icon } from "@iconify/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { alertService } from "../../services/alerta/alertaService";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import Modal from "../../components/modal";
import EditAtendimento from "../atendimento/EditAtendimento";

interface AlertaData {
  Pendentes: AlertaGet[];
  Resolvidos: AlertaGet[];
}
const AlertView = (createSucess: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState<AlertaData>({
    Pendentes: [],
    Resolvidos: [],
  } as AlertaData);
  const [atendimento, setAtendimento] = useState<FormValues>({} as FormValues);
  const navigate: NavigateFunction = useNavigate();
  const [activeTab, setActiveTab] = useState("pendente");
  const [alertData, setAlertData] = useState<AlertaGet>();

 
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getByCod = async (Codigo: number) => {
    localStorage.getItem("token");
    atendimentosService
      .getPart({ Codigo: Codigo })
      .then((response: any) => {
        let data = response.data.Result[0] ?? atendimento;
        setAtendimento(data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      localStorage.getItem("token");
      alertService
        .getAll()
        .then((response: any) => {
          setDados(response.data);
        })
        .catch((error: any) => {
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
  }, [isModalOpen]);

  const handleModalOpen = async (codigo: number) => {
    await getByCod(codigo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAtendimento({} as FormValues);
    setAlertData(undefined);
  };

  return (
    <div className=" max-md:flex max-md:justify-around overflow-auto max-md:mt-14">
      <div className="h-screen mx-2 grow  max-md:pb-14 max-md:h-5/6 ">
        <div className="flex max-md:justify-around">
          <div
            onClick={() => handleTabClick("pendente")}
            className={`cursor-pointer mr-2 px-4 py-2 rounded-md  ${
              activeTab === "pendente" ? "bg-red-500 text-white" : "bg-gray-300"
            }`}
          >
            Pendentes
          </div>
          <div
            onClick={() => handleTabClick("resolvido")}
            className={`cursor-pointer px-4 py-2 rounded-md  ${
              activeTab === "resolvido"
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Resolvidos
          </div>
        </div>
        {activeTab === "pendente" ? (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {dados.Pendentes.map((item: AlertaGet, index) => (
              <div
                className="bg-red-50 w-full rounded-lg shadow-md my-1 p-2 card flex"
                key={index}
              >
                <div
                  className=" cursor-pointer w-11/12"
                  onClick={() => (
                    handleModalOpen(item.CodAtendimento), setAlertData(item)
                  )}
                >
                  <h2 className="text-2xl font-bold mb-4 text-red-900 line-clamp-2">
                    {item.NomeFantasia}
                  </h2>

                  <div>
                    <p className="text-gray-700 mb-2 max-sm:hidden">
                      {item.CodAlerta}
                    </p>
                    <p className="text-gray-700 mb-2 max-sm:hidden ">
                      Usuário: {item.Usuario}
                    </p>
                  </div>
                </div>
                <div className="w-1/12 ml-3">
                  <Icon
                    icon={"mdi:alert"}
                    cursor={"pointer"}
                    fontSize={25}
                    color="red"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {dados.Resolvidos.map((item: AlertaGet, index) => (
              <div
                className="bg-green-50 w-full rounded-lg shadow-md my-1 p-2 card flex"
                key={index}
              >
                <div
                  className=" cursor-pointer w-11/12"
                  onClick={() => (
                    handleModalOpen(item.CodAtendimento), setAlertData(item)
                  )}
                >
                  <h2 className="text-2xl font-bold mb-4 text-green-900 line-clamp-2">
                    {item.NomeFantasia}
                  </h2>

                  <div>
                    <p className="text-gray-700 mb-2 max-sm:hidden">
                      {item.CodAlerta}
                    </p>
                    <p className="text-gray-700 mb-2 max-sm:hidden ">
                      Usuário: {item.Usuario}
                    </p>
                  </div>
                </div>
                <div className="w-1/12 ml-3">
                  <Icon
                    icon={"mdi:check"}
                    cursor={"pointer"}
                    fontSize={25}
                    color="green"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && atendimento.Codigo
        ? (() => (
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
              <EditAtendimento
                receivedAlertData={alertData}
                alertMode={!!alertData}
                receivedData={atendimento}
                onClose={handleModalClose}
              />
            </Modal>
          ))()
        : null}
    </div>
  );
};
export default AlertView;
