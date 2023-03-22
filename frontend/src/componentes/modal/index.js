import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children, codigoAtend }) => {
  const [open, setOpen] = useState(isOpen);
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50">
          <div className="relative w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-lg mx-auto mt-4 mb-8 p-6">
            <button
              className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-600 cursor-pointer"
              onClick={handleClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
