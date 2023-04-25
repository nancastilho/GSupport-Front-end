import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal";
import ViewAtendimento, { FormValues } from "../atendimento/ViewAtendimento";

const Card = () => {
  interface Card {
    Codigo: string;
    CodUsuario: string;
    NomeFantasia: string;
    NomeCliente: string;
    DataHoraLancamento: string;
    Problema: string;
    Solucao: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState<number>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/atendimentos")
      .then((response) => {
        setDados(response.data.Result);
        console.log(response.data.Result);
        console.log(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleModalOpen(codigo: number) {
    setIsModalOpen(true);
    setCodAtend(codigo);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap pl-64">
      {dados.map((item: Card, index) => (
        <label
          className="cursor-pointer bg-blue-50 rounded-lg shadow-md p-6 m-3 w-72 card flex flex-col justify-between"
          onClick={() => handleModalOpen(index)}
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
      ))}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {dados.map((item: FormValues, index) => {
            var Data = item.DataCriacao.split("T");
            var Hora = Data[1].split(".");
            console.log("esta é a data", Data[0]);
            console.log("esta é a HORA", Hora[0]);
            console.log(dados);
            console.log(item.Imagens);
            return index === codAtend ? (
              <ViewAtendimento
                Assunto=""
                CodEmpresa={item.CodEmpresa}
                CodMeioComunicacao={item.CodMeioComunicacao}
                CodSistema={item.CodSistema}
                CodUsuario={item.CodUsuario}
                DataCriacao={Data[0]}
                DataFim={Data[0]}
                DataInicio={Data[0]}
                HoraFim={Hora[0]}
                HoraInicio={Hora[0]}
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
          })}
        </Modal>
      )}
    </div>
  );
};
export default Card;
