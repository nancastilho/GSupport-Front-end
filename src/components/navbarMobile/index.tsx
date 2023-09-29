import { Icon } from "@iconify/react";
import { FiLogOut } from "react-icons/fi";
import { LogoutProps } from "../../interface";

const NavbarMobile = ({ handleLogout, children }: LogoutProps) => {
  const user = localStorage.getItem("userAuth");

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 hidden p-3 bg-gray-800 max-md:block">
        <div className="flex justify-end text-gray-300 hover:text-white">
          <p className="capitalize mr-4">Olá, {user}!</p>
          <button onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      </div>
      {children}
      <div className="fixed bottom-0 left-0 right-0 hidden bg-gray-800 max-md:block">
        <div className=" flex justify-around m-3">
          <a href={"/home"} className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon icon={"mdi:home"} fontSize={25} />
            </div>
          </a>
          <a href={"/search"} className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon fontSize={25} icon={"mdi:search"} />
            </div>
          </a>
          <a href={"/graph"} className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon fontSize={25} icon={"mdi:graph-line"} />
            </div>
          </a>
          <a href={"/test"} className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon fontSize={25} icon={"mdi:test-tube"} />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
