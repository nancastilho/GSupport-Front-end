import React, { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarios";
import { AlertaGet, FormValues, Usuario } from "../../interface";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Modal from "../../components/modal";
import FormUser from "./FormUser";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import EditAtendimento from "../atendimento/EditAtendimento";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { alertService } from "../../services/alerta/alertaService";
interface AlertaData {
  Pendentes: AlertaGet[];
  Resolvidos: AlertaGet[];
}

const AdminView = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [userSelect, setUserSelect] = useState<Usuario>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenAlert, setIsModalOpenAlert] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertaGet>();
  const [atendimento, setAtendimento] = useState<FormValues>({} as FormValues);
  const [count, setCount] = useState<boolean>(false);
  const [getAllAlert, setGetAllAlert] = useState<AlertaData>({
    Pendentes: [],
    Resolvidos: [],
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalOpenAlert(false);
    setAtendimento({} as FormValues);
    setAlertData(undefined);
    setUserSelect(undefined);
    setCount(!count);
  };

  const handleModalAlertOpen = async (codigo: number) => {
    await getByCod(codigo);
    setIsModalOpenAlert(true);
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

  const HandleDeleteUser = async (cod: number) => {
    try {
      await usuariosService.deleteUser(cod);
      toast.success("Usuário deletado com sucesso!");
      setCount(!count);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar usuário!");
    }
  };

  const HandleEditUser = async (user: Usuario) => {
    setUserSelect(user);
    handleModalOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      localStorage.getItem("token");
      alertService
        .getAll()
        .then((response: any) => {
          let dados = response.data;
          setGetAllAlert(dados);
        })
        .catch((error: any) => {
          console.error(error);
        });
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      usuariosService
        .getAll()
        .then((response) => {
          setUsers(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, [isModalOpen, count]);
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
            <div className="h-56 overflow-x-auto mt-2 ">
              {getAllAlert.Pendentes.map((pen: AlertaGet, index) => (
                <div
                  onClick={() => (
                    handleModalAlertOpen(pen.CodAtendimento), setAlertData(pen)
                  )}
                  key={index}
                  className="mt-4 mr-2 flex cursor-pointer border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2"
                >
                  <div className="text-red-600">
                    <Icon icon={"gg:remove"} fontSize={18} />
                  </div>

                  <p className="text-sm ml-2">{pen.NomeFantasia}</p>
                </div>
              ))}
              {getAllAlert.Resolvidos.map((res: AlertaGet, index) => (
                <div
                  key={index}
                  className="mt-4 mr-2 flex border border-blue-900 bg-blue-200 items-center rounded-lg  py-1 px-2"
                >
                  <div className="text-green-600">
                    <Icon icon={"gg:check-o"} fontSize={18} />
                  </div>

                  <p className="text-sm ml-2">{res.NomeFantasia}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-md  border shadow-md bg-blue-50  rounded-lg border-md  p-6 pb-10 ">
            <div className="flex justify-between">
              <p className="text-lg font-medium">Usuários</p>
              <BsFillPlusSquareFill
                className=" cursor-pointer"
                size={22}
                onClick={() => handleModalOpen()}
              />
            </div>
            <div className="h-56 overflow-x-auto mt-2">
              {users.map((user: Usuario, index) =>
                user.Ativo ? (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="data:image/jpeg;base64,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"
                        alt="Simon Lewis"
                      />
                      <div className="flex flex-col ml-2">
                        <span className="font-medium">{user.Usuario}</span>
                        <span className="text-xs text-gray-400">Cargo</span>
                      </div>
                    </div>
                    <div className="flex mr-2">
                      <Icon
                        icon={"mdi:delete-forever"}
                        cursor="pointer"
                        className="mr-2"
                        onClick={() => HandleDeleteUser(user.Codigo ?? 0)}
                      />
                      <Icon
                        icon={"mdi:pencil"}
                        cursor="pointer"
                        onClick={() => HandleEditUser(user)}
                      />
                    </div>
                  </div>
                ) : null
              )}
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
      {isModalOpen ? (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {!userSelect ? (
            <FormUser onClose={handleModalClose} receivedData={userSelect} />
          ) : (
            <FormUser onClose={handleModalClose} receivedData={userSelect} />
          )}
        </Modal>
      ) : null}
      {isModalOpenAlert && atendimento.Codigo ? (
        <Modal isOpen={isModalOpenAlert} onClose={handleModalClose}>
          <EditAtendimento
            receivedAlertData={alertData}
            alertMode={!!alertData}
            receivedData={atendimento}
            onClose={handleModalClose}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default AdminView;
