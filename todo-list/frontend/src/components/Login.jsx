import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

    try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
        });

        setMessage(response.data.message || "Login successful!");
        console.log("Response:", response.data);
        alert("Login successful!");
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "Login failed!");
        alert("Login failed!");
    }
};

return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "10px" }}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
            />
            </div>
            <div style={{ marginBottom: "10px" }}>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "10px" }}
            />
            </div>
            <button type="submit" style={{ padding: "10px 20px" }}>
            Login
            </button>
        </form>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default Login;
