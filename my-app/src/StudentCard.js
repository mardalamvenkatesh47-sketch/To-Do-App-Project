function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>

      <p>Course: {props.course}</p>

      <p>City: {props.city}</p>

      <button>View Profile</button>
    </div>
  );
}

export default StudentCard;