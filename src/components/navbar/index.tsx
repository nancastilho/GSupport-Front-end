import { Icon } from "@iconify/react";
import { FiLogOut } from "react-icons/fi";

interface Props {
  handleLogout: () => void;
}

const Navbar: React.FC<Props> = ({ handleLogout }) => {
  const user = localStorage.getItem("userAuth");

  return (
    <div className="fixed left-0 top-0 w-1/6">
      <div className=" flex flex-col bg-gray-800 h-screen ">
        <div className="bg-gray-900 text-white text-xl font-bold p-4">
          <a href="/home">GSupport</a>
          
        </div>
        <div className="flex-grow p-4">
          <a href={"/home"} className="block text-gray-300 hover:text-white mb-4">
            <div className="flex items-center">
              <Icon icon={"mdi:home"} />
              <span className="pl-3">Atendimentos</span>
            </div>
          </a>
          <a href={"/search"} className="block text-gray-300 hover:text-white mb-4">
            <div className="flex items-center">
              <Icon icon={"mdi:search"} />
              <span className="pl-3">Pesquisa</span>
            </div>
          </a>
          <a href={"/graph"} className="block text-gray-300 hover:text-white mb-4">
            <div className="flex items-center">
              <Icon icon={"mdi:graph-line"} />
              <span className="pl-3">Relatorios</span>
            </div>
          </a>
          <a href={"/test"} className="block text-gray-300 hover:text-white mb-4">
            <div className="flex items-center">
              <Icon icon={"mdi:test-tube"} />
              <span className="pl-3">Testes</span>
            </div>
          </a>
        </div>
        <div className="flex justify-around text-gray-300 hover:text-white mb-4">
          <p className="capitalize">Olá, {user}!</p>
          <button onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
