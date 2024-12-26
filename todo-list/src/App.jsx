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

  // Function to handle deleting a task
  const deleteTask = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  }

  // function to toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => task.id === id ? {...task, completed: !task.completed } : task );

    setTasks(updatedTasks); //Update the tasks array
  };

  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Function to start editing
  const startEditing = (id, currentText) => {
    setEditingTaskId(id);
    setEditingText(currentText);
  };

  // Function to save the edited task
  const saveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null); // Exit edit mode
    setEditingText("");
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
              {editingTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={saveTask}>Save</button>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
