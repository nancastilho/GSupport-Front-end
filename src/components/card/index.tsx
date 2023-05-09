import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal";
import ViewAtendimento from "../../view/atendimento/ViewAtendimento";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import { FormValues } from "../../interface";
import { Icon } from "@iconify/react";
const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  function handleModalOpen(codigo: number) {
    setIsModalOpen(true);
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap pl-3">
      {dados.map((item: FormValues, index) => (
        <label
          className="cursor-pointer bg-blue-50 rounded-lg shadow-md p-6 m-3 w-72 card flex flex-col justify-between"
          onClick={() => handleModalOpen(index)}
          key={item.Codigo}
        >
          <div className="flex ">
            <h2 className="text-2xl font-bold mb-4 text-blue-900 ">
              {item.NomeFantasia}
            </h2>
            <Icon icon={"mdi:lead-pencil"} className="text-2xl"/>
          </div>
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
      ))}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {dados.map((item: FormValues, index) => {
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
          })}
        </Modal>
      )}
    </div>
  );
};
export default Card;
