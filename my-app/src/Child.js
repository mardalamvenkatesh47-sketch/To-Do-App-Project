import React from "react";

function Child({ onClick }) {
  console.log("Child Rendered");

  return (
    <div>
      <button
        onClick={onClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "purple",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Click Child Button
      </button>
    </div>
  );
}

export default React.memo(Child);