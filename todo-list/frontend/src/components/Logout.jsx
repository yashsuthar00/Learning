import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/login");
    };

    return (
        // <nav className="flex justify-end p-4 bg-gray-800">
            <button 
                onClick={handleLogout} 
                className="flex text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
                <FiLogOut className="mr-2" /> Logout
            </button>
        // </nav>
    );
};

export default Navbar;
