import { Icon } from "@iconify/react";
import { FiLogOut } from "react-icons/fi";
import { LogoutProps } from "../../interface";
interface NavMobile extends LogoutProps {
  OnModalOpen: () => void;
}
const NavbarMobile = ({
  handleLogout,
  children,
  alertLength,
  OnModalOpen,
}: NavMobile) => {
  const user = localStorage.getItem("userAuth");

  return (
    <>
      <div className="fixed top-0 left-0 right-0 hidden p-3 bg-gray-800 z-50 max-md:block">
        <div className="flex justify-between text-gray-300 hover:text-white">
          <div className=" text-white text-lg font-bold flex content-center">
            <img src="/favicon.png" alt="" className="w-6" />
            GSupport
          </div>
          <div className="flex items-center">
            <p className="capitalize mr-2 ">Olá, {user}!</p>
            <button onClick={handleLogout}>
              <FiLogOut />
            </button>
          </div>
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
          <div className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon fontSize={25} icon={"ph:plus-fill"} onClick={OnModalOpen} />
            </div>
          </div>
          <a href={"/graph"} className="block text-gray-300 hover:text-white">
            <div className="flex items-center">
              <Icon fontSize={25} icon={"mdi:graph-line"} />
            </div>
          </a>

          <a href={"/alerts"} className="block text-gray-300 hover:text-white">
            <div className="relative inline-flex items-center">
              <Icon fontSize={25} icon={"mdi:alert"} />
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-3 ">
                {alertLength}
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
