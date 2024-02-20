import { Icon } from "@iconify/react";
import { FiLogOut } from "react-icons/fi";
import { LogoutProps } from "../../interface";

const Navbar = ({ handleLogout }:LogoutProps) => {
  const user = localStorage.getItem("userAuth");

  return (
    <div className=" flex flex-col bg-gray-800 h-full max-md:hidden">
      <a href="/home">
        <div className="bg-gray-900 text-white text-xl font-bold p-4 flex align-top">
          <img src="/favicon.png" alt="" className="w-8" />
          GSupport
        </div>
      </a>
      <div className="flex-grow p-4">
        <a href={"/home"} className="block text-gray-300 hover:text-white mb-4">
          <div className="flex items-center">
            <Icon icon={"mdi:home"} />
            <span className="pl-3">Atendimentos</span>
          </div>
        </a>
        <a
          href={"/search"}
          className="block text-gray-300 hover:text-white mb-4"
        >
          <div className="flex items-center">
            <Icon icon={"mdi:search"} />
            <span className="pl-3">Pesquisa</span>
          </div>
        </a>
        <a
          href={"/graph"}
          className="block text-gray-300 hover:text-white mb-4"
        >
          <div className="flex items-center">
            <Icon icon={"mdi:graph-line"} />
            <span className="pl-3">Relatorios</span>
          </div>
        </a>
        <a href={"/alerts"} className="block text-gray-300 hover:text-white mb-4">
          <div className="flex items-center">
            <Icon icon={"mdi:alert"} />
            <span className="pl-3">Alertas</span>
          </div>
        </a>
        <a href={"/admin"} className="block text-gray-300 hover:text-white mb-4">
          <div className="flex items-center">
            <Icon icon={"mdi:gear"} />
            <span className="pl-3">Administrativo</span>
          </div>
        </a>
        {/* <a href={"/test"} className="block text-gray-300 hover:text-white mb-4">
          <div className="flex items-center">
            <Icon icon={"mdi:test-tube"} />
            <span className="pl-3">Testes</span>
          </div>
        </a> */}
      </div>
      <div className="flex justify-around text-gray-300 hover:text-white mb-4">
        <p className="capitalize">Olá, {user}!</p>
        <button onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
