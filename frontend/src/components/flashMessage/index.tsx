import React, { useState } from 'react';

export type FlashMessageType = {
  message: string;
  type: 'success' | 'error';
};

const FlashMessage: React.FC<{ message: FlashMessageType | null, onClose: () => void }> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleCloseClick = () => {
    setIsVisible(false);
    onClose();
  };

  if (!message || !isVisible) {
    return null;
  }

  return (
    <div className={`flash-message ${message.type}`}>
      <span>{message.message}</span>
      <button onClick={handleCloseClick}>Fechar</button>
    </div>
  );
};

export default FlashMessage;
