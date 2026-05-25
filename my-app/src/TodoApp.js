import { useState, useEffect } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  /* Load LocalStorage */
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  /* Save LocalStorage */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* Add Task */
  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please enter task");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks];

      updatedTasks[editIndex].text = task;

      setTasks(updatedTasks);

      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        {
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  /* Delete Task */
  const handleDelete = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);

    setTasks(filteredTasks);
  };

  /* Edit Task */
  const handleEdit = (index) => {
    setTask(tasks[index].text);

    setEditIndex(index);
  };

  /* Complete Task */
  const handleComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f2",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🚀 React Day 35 - Advanced Todo App
      </h1>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />

        <button
          onClick={handleAddTask}
          style={{
            padding: "12px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {tasks.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
                color: item.completed ? "gray" : "black",
              }}
            >
              {item.text}
            </h3>

            <div>
              <button
                onClick={() => handleComplete(index)}
                style={{
                  marginRight: "10px",
                  padding: "8px 12px",
                  background: item.completed
                    ? "orange"
                    : "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {item.completed
                  ? "Undo"
                  : "Complete"}
              </button>

              <button
                onClick={() => handleEdit(index)}
                style={{
                  marginRight: "10px",
                  padding: "8px 12px",
                  background: "purple",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                style={{
                  padding: "8px 12px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;