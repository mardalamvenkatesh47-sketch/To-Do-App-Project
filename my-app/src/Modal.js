import React from "react";
import ReactDOM from "react-dom";

function Modal({ closeModal }) {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        <h2>React Portal Modal 🚀</h2>

        <button
          onClick={closeModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>,

    document.getElementById("portal-root")
  );
}

export default Modal;