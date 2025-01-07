import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import api from "../utils/api";

function Home() {
    // State to store Tasks
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState(""); // To store input value
    const [editingTaskId, setEditingTaskId] = useState(null); // State to track which task is being edited
    const [editingText, setEditingText] = useState("");

    // Fetch data from the server
    useEffect(() => {
        const fetchTasks = async () => {
        const response = await api.get("/notes");
        setTasks(response.data);
        };
        fetchTasks();
    }, []);
    // // Load tasks from localStorage
    // useEffect(() => {
    //   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    //   setTasks(savedTasks);
    // }, []);

    // // Save tasks to localStorage
    // useEffect(() => {
    //   if (tasks.length > 0) {
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    //   }
    // }, [tasks]);

    // Function to handle adding a task
    const addTask = async () => {
        if (taskText.trim() === "") return; // Prevent adding empty tasks

        const newTask = {
        text: taskText,
        completed: false,
        };

        try {
        const response = await api.post("/notes", newTask);
        setTasks([...tasks, response.data]); // Add the new task to the tasks array
        setTaskText(""); // Clear the input field
        } catch (error) {
        console.error("Error adding task:", error);
        // Optionally, you can show an error message to the user
        }
    };

    // Function to handle deleting a task
    const deleteTask = async (id) => {
        try {
        await api.delete(`/notes/${id}`);
        const updateTasks = tasks.filter((task) => task._id !== id);
        setTasks(updateTasks);
        } catch (error) {
        console.error("Error deleting task:", error);
        }
    }

    // function to toggle task completion
    const toggleTaskCompletion = async (id) => {
        const task = tasks.find((task) => task._id === id);
        const updatedTasks = { ...task, completed: !task.completed };
        const response = await api.put(`/notes/${id}`, updatedTasks);
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    };

    // Function to start editing
    const startEditing = (id, currentText) => {
        setEditingTaskId(id);
        setEditingText(currentText);
    };

    // Function to save the edited task
    const saveTask = async () => {
        try {
        const response = await api.put(`/notes/${editingTaskId}`, { text: editingText });
        const updatedTasks = tasks.map((task) =>
            task._id === editingTaskId ? response.data : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null); // Exit edit mode
        setEditingText("");
        } catch (error) {
        console.error("Error saving task:", error);
        }
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
        <nav className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">To-Do List</h1>
            <Logout />
        </nav>
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
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded cursor-pointer">Add Task</button>
            </div>
            {/* Task list */}
            <div className="task-summary">
            <p>Total Tasks: {tasks.length}</p>
            <p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
            <p>Pending Tasks: {tasks.filter((task) => !task.completed).length}</p>
            </div>
            <ul className="task-list">
            {tasks.map((task) => (
                <li className="task-item mb-2" key={task._id}>
                {editingTaskId === task._id ? (
                    <div className="flex">
                    <input
                        type="text"
                        value={editingText}
                        onKeyDown={saveTaskByEnterKey}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="border rounded p-2 flex-grow mr-2"
                    />
                    <button onClick={saveTask} className="bg-green-500 text-white p-2 rounded cursor-pointer">Save</button>
                    </div>
                ) : (
                    <div className="flex items-center">
                    <input
                        className="mr-2 cursor-pointer"
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task._id)}
                    />
                    <span className={`flex-grow ${task.completed ? "line-through" : ""} cursor-pointer`} onClick={() => toggleTaskCompletion(task._id)} >
                        {task.text}
                    </span>
                    <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-2 rounded mr-2 cursor-pointer">Delete</button>
                    <button onClick={() => startEditing(task._id, task.text)} className="bg-yellow-500 text-white p-2 rounded cursor-pointer">Edit</button>
                    </div>
                )}
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default Home
