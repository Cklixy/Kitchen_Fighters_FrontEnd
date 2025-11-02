// src/components/ConfirmationModal.jsx
import React from 'react';
import '../css/ConfirmationModal.css';

const ConfirmationModal = ({ message, onConfirm, onCancel, isOpen, title = "Confirmación" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container liquid-glass">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button 
            onClick={onConfirm} 
            className="modal-button confirm-button"
          >
            Aceptar
          </button>
          <button 
            onClick={onCancel} 
            className="modal-button cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;