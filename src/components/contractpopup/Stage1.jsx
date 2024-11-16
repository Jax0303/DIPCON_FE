import React from 'react';

const Stage1 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Stage 1 Popup</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Stage1;
