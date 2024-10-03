import React from 'react';
import '../CSS/Style.css';

const ModalDialogComponent = ({ isModal, isOpen, onClose, header, body, footer }) => {
  if (!isOpen) return null;

  return (
    <>
      {isModal && (
        <div className="dialog-overlay">
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="dialog-header">{header}</div>
            <div className="dialog-body">{body}</div>
            <div className="dialog-footer">{footer}</div>
          </div>
        </div>
      )}
      
      {!isModal && (
        <div className="dialog-content dialog-non-modal">
          <div className="dialog-header">
            {header}
            <span className="close-icon" onClick={onClose}>&times;</span>
          </div>
          <div className="dialog-body">{body}</div>
          <div className="dialog-footer">{footer}</div>
        </div>
      )}
    </>
  );
};

export default ModalDialogComponent;
