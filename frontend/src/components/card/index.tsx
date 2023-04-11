import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal";

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
    <div className="flex flex-wrap">
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
          {dados.map((item: Card, index) => {
            return index === codAtend ? (
              <div>
                <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={item.NomeFantasia}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block mb-1 font-medium text-gray-700"
              >
                Data
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={item.DataHoraLancamento}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block mb-1 font-medium text-gray-700"
              >
                Hora
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={item.NomeUsuario}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="symptoms"
                className="block mb-1 font-medium text-gray-700"
              >
                Problema
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={item.Problema}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="symptoms"
                className="block mb-1 font-medium text-gray-700"
              >
                Solução
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={item.Solucao}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                rows={4}
                required
              ></textarea>
            </div>
              </div>
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
