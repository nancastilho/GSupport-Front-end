import { useEffect, useState } from "react";
import ViewAtendimento from "../../view/atendimento/ViewAtendimento";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { Icon } from "@iconify/react";
import EditAtendimento from "../../view/atendimento/EditAtendimento";
import Modal from "../../components/modal";
const HomeView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      atendimentosService
        .getAll()
        .then((response: any) => {
          setDados(response.data.Result);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  function handleModalOpen(codigo: number, edit: boolean) {
    setIsModalOpen(true);
    setIsModalEdit(edit);
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="ml-4 grid gap-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {dados.map((item: FormValues, index) => (
          <div
            className="bg-blue-50 rounded-lg shadow-md p-2 m-2 w-64 card flex"
            key={index}
          >
            <div
              className="cursor-pointer w-11/12"
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
                <p className="text-gray-700 mb-2 max-sm:hidden ">
                  Nome: {item.NomeCliente}
                </p>
              </div>
            </div>
            <div className="w-1/12">
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {dados.map((item: FormValues, index) => {
            if (isModalEdit === true) {
              if (item.DataCriacao !== undefined) {
                var Data = item.DataCriacao.split("T");
                var Hora = Data[1].split(".");
                var HoraMin = Hora[0].split(":");
                return index === codAtend ? (
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
            } else {
              if (item.DataCriacao !== undefined) {
                const Data = item.DataCriacao.split("T");
                const Hora = Data[1].split(".");
                const HoraMin = Hora[0].split(":");
                return index === codAtend ? (
                  <ViewAtendimento
                    Assunto=""
                    CodEmpresa={item.CodEmpresa}
                    CodMeioComunicacao={item.CodMeioComunicacao}
                    CodSistema={item.CodSistema}
                    CodUsuario={item.CodUsuario}
                    DataCriacao={Data[0] + "T" + HoraMin[0] + ":" + HoraMin[1]}
                    NomeCliente={item.NomeCliente}
                    Plantao={1}
                    Problema={item.Problema}
                    Solucao={item.Solucao}
                    Imagens={item.Imagens}
                    NomeFantasia={item.NomeFantasia}
                    key={codAtend}
                  />
                ) : (
                  ""
                );
              }
            }
          })}
        </Modal>
      )}
    </>
  );
};
export default HomeView;
