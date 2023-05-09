import React, { useState } from "react";
import Navbar from "../navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Modal from "../modal";
import CreateAtendimento from "../../view/atendimento/CreateAtendimento";
import { LayoutProps } from "../../interface";



const LayoutPadrao: React.FC<LayoutProps> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userAuth");
    navigate("/");
  }

  
  return (
    <div className="flex">
        <div className="w-1/6">
      <Navbar handleLogout={handleLogout} />
        </div>
      <div className="flex-grow w-5/6">
        {children}
      </div>
      <div className="fixed bottom-10 right-10 cursor-pointer" >
        <BsFillPlusSquareFill size={60} onClick={() => handleModalOpen()} />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <CreateAtendimento onCadastro={true}/>
        </Modal>
      )}
    </div>
  );
};

export default LayoutPadrao;
