import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "../modal";


const Card = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState([]);

  useEffect(() => {
    axios.get('http://patrick-note:8080/atendimentos')
      .then(response => {
        setDados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleModalOpen(codigo) {
    setIsModalOpen(true);
    setCodAtend(codigo)
  }


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (

    <div className="flex flex-wrap">
      
      {dados.map(item => (
        <label className="cursor-pointer bg-blue-50 rounded-lg shadow-md p-6 m-3 w-72 card flex flex-col justify-between" onClick={() => handleModalOpen(item.Codigo)} key={item.Codigo} >
          <h2 className="text-2xl font-bold mb-4 text-blue-900 ">{item.Empresa}</h2>
          <div>
            <p className="text-gray-700 mb-2 max-sm:hidden">{item.Codigo}</p>
            <p className="text-gray-700 mb-2 max-sm:hidden ">Usuário: {item.NomeUsuario}</p>
            <p className="text-gray-700 mb-2 max-sm:hidden ">Nome: {item.Nome}</p>
            {/* <p className="text-gray-700 mb-2 max-sm:hidden ">Ticket: {item.Ticket}</p> */}
          </div>
        </label>
      ))}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <h1>{codAtend}</h1>
          {dados.map(item => (
            <label className="cursor-pointer bg-blue-50 rounded-lg shadow-md p-6 m-3 w-72 card flex flex-col justify-between" onClick={() => handleModalOpen(item.Codigo)} key={item.Codigo} >
              <h2 className="text-2xl font-bold mb-4 text-blue-900 ">{item.Empresa}</h2>
              <div>
                <p className="text-gray-700 mb-2 max-sm:hidden">{item.Codigo}</p>
                <p className="text-gray-700 mb-2 max-sm:hidden ">Usuário: {item.NomeUsuario}</p>
                <p className="text-gray-700 mb-2 max-sm:hidden ">Nome: {item.Nome}</p>
                {/* <p className="text-gray-700 mb-2 max-sm:hidden ">Ticket: {item.Ticket}</p> */}
              </div>
            </label>
          ))}
        </Modal>
      )}
    </div>

  );
};
export default Card;