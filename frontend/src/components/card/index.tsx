import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal";
import Atendimento from "../atendimento";

const Card = () => {
  interface Card {
    Codigo: string;
    NomeUsuario: string;
    NomeFantasia: string;
    Nome: string;
    DataHoraLancamento: string;
    Problema: string;
    Solucao: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState<number>();

  console.log(isModalOpen);
  useEffect(() => {
    axios
      .get("http://localhost:8080/atendimentos")
      .then((response) => {
        setDados(response.data.Result);
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

  console.log(dados);
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
              Usuário: {item.NomeUsuario}
            </p>
            <p className="text-gray-700 mb-2 max-sm:hidden ">
              Nome: {item.Nome}
            </p>
            {/* <p className="text-gray-700 mb-2 max-sm:hidden ">Ticket: {item.Ticket}</p> */}
          </div>
        </label>
      ))}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <Atendimento/>
        </Modal>
      )}
    </div>
  );
};
export default Card;
