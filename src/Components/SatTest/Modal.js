// Modal.js
import React from 'react';
import './Modal.css';
import Tabs from './Tabs.js';
const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay2">
      <div className="modal2">
        <Tabs/>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;

