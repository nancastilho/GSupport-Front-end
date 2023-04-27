import React, { useState } from "react";
import Card from "../../components/card";
import Navbar from "../../components/navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Modal from "../../components/modal";
import CreateAtendimento from "../../components/atendimento/CreateAtendimento";
import LayoutPadrao from "../../components/LayoutPadrao";

const Search = () => {
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
    <LayoutPadrao>
      <h1>tela de pesquisa</h1>
    </LayoutPadrao>
  );
};

export default Search;
