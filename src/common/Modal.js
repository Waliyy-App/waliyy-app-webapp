import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div>
      {isOpen && (
        <div className="modal bg-[rgba(0,0,0,0.5)]">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              
            </button>
            {children}
          </div>
        </div>
      )}
      <style jsx>
      {`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          padding: 60px 70px;
          border-radius: 4px;
          width: auto
        }

        .close-button {
          background-color: transparent;
          border: none;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Modal;