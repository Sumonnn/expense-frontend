import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        window.location.href = "/login"; 
    };

    return (
        <div className="flex justify-between p-2 bg-gray-100 border-b border-gray-300">
            <Link
                to="/add-transaction"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Add Transaction
            </Link>
            <Link
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                Logout
            </Link>
        </div>
    )
}

export default Navbar