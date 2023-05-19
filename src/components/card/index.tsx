import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal";
import ViewAtendimento from "../../view/atendimento/ViewAtendimento";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { Icon } from "@iconify/react";
import EditAtendimento from "../../view/atendimento/EditAtendimento";
const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState<number>();

    console.log(isModalEdit)
    console.log(codAtend)
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
    setIsModalEdit(edit)
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap pl-3">
      {dados.map((item: FormValues, index) => (
        <>
          <Icon
            icon={"mdi:lead-pencil"}
            className="text-2xl relative left-72 top-7"
            cursor={'pointer'}
            onClick={() => handleModalOpen(index, true)}
          />
          <label
            className="cursor-pointer bg-blue-50 rounded-lg shadow-md p-6 m-3 w-72 card flex flex-col justify-between"
            onClick={() => handleModalOpen(index, false)}
            key={item.Codigo}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-900 ">
              {item.NomeFantasia}
            </h2>

            <div>
              <p className="text-gray-700 mb-2 max-sm:hidden">{item.Codigo}</p>
              <p className="text-gray-700 mb-2 max-sm:hidden ">
                Usuário: {item.CodUsuario}
              </p>
              <p className="text-gray-700 mb-2 max-sm:hidden ">
                Nome: {item.NomeCliente}
              </p>
              {/* <p className="text-gray-700 mb-2 max-sm:hidden ">Ticket: {item.Ticket}</p> */}
            </div>
          </label>
        </>
      ))}
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
            }
            else{
              if (item.DataCriacao !== undefined) {
                var Data = item.DataCriacao.split("T");
                var Hora = Data[1].split(".");
                var HoraMin = Hora[0].split(":");
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
    </div>
  );
};
export default Card;
