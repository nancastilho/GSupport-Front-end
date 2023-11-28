import Navbar from "../navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LayoutProps } from "../../interface";
import { useState } from "react";
import Modal from "../modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import CreateAtendimento from "../../view/atendimento/CreateAtendimento";
import NavbarMobile from "../navbarMobile";

const LayoutPadrao = ({ children, onDataFromChild  }: LayoutProps) => {
  const navigate: NavigateFunction = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onDataFromChild(isModalOpen);
  };
  
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userAuth");
    navigate("/");
  }

  return (
    <div className="flex h-screen w-auto max-md:flex-col">
      <Navbar handleLogout={handleLogout} />
      <NavbarMobile handleLogout={handleLogout}>
        <div className="grow">{children}</div>
      </NavbarMobile>
      <BsFillPlusSquareFill
        className="fixed bottom-10 right-10 cursor-pointer max-md:hidden"
        size={60}
        onClick={() => handleModalOpen()}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <CreateAtendimento onClose={handleModalClose}/>
        </Modal>
      )}{" "}
    </div>
  );
};

export default LayoutPadrao;
