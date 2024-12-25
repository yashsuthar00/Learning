import React, { useState } from "react";

function App() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState(""); // To store input value

  // Function to handle adding a task
  const addTask = () => {
    if (taskText.trim() === "") return; // Prevent adding empty tasks

    const newTask = {
      id: Date.now(), // Unique ID for each task
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Add the new task to the tasks array
    setTaskText(""); // Clear the input field
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="task-container">
        {/* Input field and button */}
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a task..."
            value={taskText} // Controlled input
            onChange={(e) => setTaskText(e.target.value)} // Update state on input
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        {/* Task list */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.id}>
              <span>{task.text}</span>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
