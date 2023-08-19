import React from "react";
import { CgCloseR } from "react-icons/cg";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
  background: "#fff",
  padding: "20px",
  width: "80%",
  maxWidth: "50rem",
  maxHeight: "90%",
  overflowY: "auto",
};

const overlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: "999",
};

const closeIconStyle = {
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  cursor: "pointer",
  color: "#ff0000",
  fontSize: "1.5rem",
};

function InstructionModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        {children}
        <div style={closeIconStyle}>
          <CgCloseR onClick={onClose}>Close</CgCloseR>
        </div>
      </div>
    </>
  );
}

export default InstructionModal;
