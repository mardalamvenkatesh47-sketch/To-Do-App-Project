import { useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <div
      style={{
        background: "purple",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;