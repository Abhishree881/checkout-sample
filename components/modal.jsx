// modal for viewing image preview of cart items
import React from "react";
import "@/styles/modal.css";

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={imageSrc} alt="Preview" />
      </div>
    </div>
  );
};

export default Modal;
