import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useLoading } from "../context/LoadingContext";

const Login = () => {
    const { loading } = useLoading();
    const { setLoading } = useLoading();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            const token = response.data.accessToken;
            localStorage.setItem("token", token);
            setMessage("Login successful!");
            navigate("/home");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "Login failed!");
            alert("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: loading ? 'none' : 'flex' }} className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <div className="mt-4 text-center">
                    <p>Don't have an account? <a href="/signup" className="text-blue-500">SignUp</a></p>
                </div>
            </div>
            <div className="fixed bottom-4 right-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="font-bold">Want a trial?</p>
                <p>Use these credentials:</p>
                <p>Email: guest@trial.com</p>
                <p>Password: Guest@login</p>
            </div>
        </div>
    );
};

export default Login;
