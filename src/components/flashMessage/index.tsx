import React, { useState, useEffect } from 'react';

interface FlashMessageProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleCloseClick = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={`flash-message ${isVisible ? 'visible' : ''}`}>
      <div className="message-text">{message}</div>
      <button className="close-button" onClick={handleCloseClick}>
        X
      </button>
    </div>
  );
};

export default FlashMessage;