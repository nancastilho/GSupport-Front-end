import Navbar from "../navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LayoutProps } from "../../interface";
import { useEffect, useState } from "react";
import Modal from "../modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import CreateAtendimento from "../../view/atendimento/CreateAtendimento";
import NavbarMobile from "../navbarMobile";
import { alertService } from "../../services/alerta/alertaService";

const LayoutPadrao = ({ children, onDataFromChild }: LayoutProps) => {
  const navigate: NavigateFunction = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalAlert, setTotalAlert] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      localStorage.getItem("token");
      alertService
        .getAll()
        .then((response: any) => {
          let dados = response.data;
          setTotalAlert(dados.Pendentes.length);
        })
        .catch((error: any) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    onDataFromChild(isModalOpen);
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
      <Navbar handleLogout={handleLogout} alertLength={totalAlert} />
      <NavbarMobile
        handleLogout={handleLogout}
        alertLength={totalAlert}
        OnModalOpen={handleModalOpen}
      >
        <div className="bg-gradient-to-tr from-blue-50 to-blue-200  grow">
          {children}
        </div>
      </NavbarMobile>
      <BsFillPlusSquareFill
        className="fixed bottom-10 right-10 cursor-pointer max-md:hidden"
        size={60}
        onClick={() => handleModalOpen()}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <CreateAtendimento onClose={handleModalClose} />
        </Modal>
      )}{" "}
    </div>
  );
};

export default LayoutPadrao;
