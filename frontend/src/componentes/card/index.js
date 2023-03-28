import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "../modal";


const Card = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [codAtend, setCodAtend] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/atendimentos')
      .then(response => {
        setDados(response.data.Result);
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
          {dados.map(item => {
            return item.Codigo === codAtend ?
              (
                <div>
                  <div>
                    <p className="text-gray-700 mb-2 max-sm:hidden">{item.Codigo}</p>
                    <h2 className="text-2xl font-bold mb-4 text-blue-900 ">Cliente</h2>
                    <input type={"text"} className="text-2xl font-bold mb-4 text-blue-900 " name={'Empresa'} value={item.Empresa} />
                    <input type={"text"} className="text-2xl font-bold mb-4 text-blue-900 " name={'Nome'} value={item.Nome} />
                    <label>Usuario</label>
                    <br />
                    <input type={"text"} name={'NomeUsuario'} value={item.NomeUsuario} />
                    <br />
                    <label>{item.DataHoraLancamento}</label>
                    <br />
                    <input type={"checkbox"} /><label>Plantão</label>
                  </div>

                  <div>
                    <br /><br />
                    <label>Problema:</label>
                    <br />
                    <textarea>{item.Problema}</textarea>
                    <br /><br /><br /><br />
                    <label>Solução:</label>
                    <br />
                    <textarea>{item.Solucao}</textarea>
                  </div>
                </div>

              ) : ('')
          })
          }
        </Modal>
      )}
    </div>

  );
};
export default Card;