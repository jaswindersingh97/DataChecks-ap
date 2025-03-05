import React from 'react';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50" onClick={onClose}>
      <div className="relative p-10 w-1/2 h-9/10 bg-white rounded-lg z-50 " onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;