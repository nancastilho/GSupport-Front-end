import React, { useEffect, useState } from 'react';

export type FlashMessageType = {
  message: string;
  type: 'success' | 'error';
};

const FlashMessage: React.FC<{ message: FlashMessageType | null, onClose: () => void }> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onClose();
    }, 5000); // Exibe a mensagem por 5 segundos

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message || !isVisible) {
    return null;
  }

  const className = message.type === 'success' ? 'bg-green-500' : 'bg-red-500';

  const handleCloseClick = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 p-4 text-white z-50">
      <div className={`p-4 rounded shadow-md ${className}`}>
        <span>{message.message}</span>
        <button className="ml-4 text-sm font-bold" onClick={handleCloseClick}>Fechar</button>
      </div>
    </div>
  );
};

export default FlashMessage;
