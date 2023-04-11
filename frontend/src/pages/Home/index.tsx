import React, { useState } from "react";
import Card from "../../components/card";
import Navbar from "../../components/navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Modal from "../../components/modal";
import Atendimento from "../../components/atendimento";

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

  
  return (
    <div className="flex">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow p-4">
        <Card />
      </div>
      <div className="fixed bottom-10 right-10">
        <BsFillPlusSquareFill size={60} onClick={() => handleModalOpen()} />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <Atendimento/>
        </Modal>
      )}
    </div>
  );
};

export default Home;
