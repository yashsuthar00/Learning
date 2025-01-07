import React, { useState } from "react";
import { useLoading } from '../context/LoadingContext';
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
    const { loading } = useLoading();
    const { setLoading } = useLoading();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

    try {
    const response = await api.post("/users/register", {
        username,
        email,
        password,
        });

        setMessage(response.data.message || "SignUp successful!");
        console.log("Response:", response.data);
        alert("SignUp successful!");
        navigate("/login");
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "SignUp failed!");
        alert("SignUp failed!");
    } finally {
        setLoading(false);
    }
};

return (
    <div style={{ display : loading ? 'none' : 'flex' }} className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
            <form onSubmit={handleLogin}>
            <div className="mb-4">
                    <input
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
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
                    Signup
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            <div className="mt-4 text-center">
                <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
            </div>
        </div>
    </div>
);
};

export default Signup;
