import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>User Details Page</h1>

      <h2>User ID: {id}</h2>
    </div>
  );
}

export default UserDetails;