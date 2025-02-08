import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios.post("http://localhost:5000/todos", { task }).then((res) => {
      setTodos([...todos, res.data]);
      setTask("");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
