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

  const addTaskByEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
  }}

  const saveTaskByEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveTask();
    }
  }

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">To-Do List</h1>
      <div className="task-container">
        {/* Input field and button */}
        <div className="task-input flex mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            onKeyDown={addTaskByEnterKey}
            value={taskText} // Controlled input
            onChange={(e) => setTaskText(e.target.value)} // Update state on input
            className="border rounded p-2 flex-grow mr-2"
          />
          <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </div>
        {/* Task list */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item mb-2" key={task.id}>
              {editingTaskId === task.id ? (
                <div className="flex">
                  <input
                    type="text"
                    value={editingText}
                    onKeyDown={saveTaskByEnterKey}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border rounded p-2 flex-grow mr-2"
                  />
                  <button onClick={saveTask} className="bg-green-500 text-white p-2 rounded">Save</button>
                </div>
              ) : (
                <div onClick={() => toggleTaskCompletion(task.id)} className="flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={`flex-grow ${task.completed ? "line-through" : ""}`}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
                  <button onClick={() => startEditing(task.id, task.text)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
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
