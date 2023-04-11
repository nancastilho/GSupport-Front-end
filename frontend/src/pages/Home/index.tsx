import React, { useState } from "react";
import Card from "../../components/card";
import Navbar from "../../components/navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Modal from "../../components/modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  console.log(isModalOpen);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você pode fazer a lógica para enviar os dados do formulário para o servidor ou para outro componente
    console.log({ name, date, time, symptoms });

    // Resetar os campos do formulário após a submissão
    setName("");
    setDate("");
    setTime("");
    setSymptoms("");
  };
  return (
    <div className="flex">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow p-4">
        <Card />
      </div>
      <div className="absolute bottom-10 right-10">
        <BsFillPlusSquareFill size={60} onClick={() => handleModalOpen()} />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="symptoms"
                className="block mb-1 font-medium text-gray-700"
              >
                Sintomas
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              >
                Cadastrar atendimento
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Home;
