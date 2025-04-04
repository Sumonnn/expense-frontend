import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            <div className="bg-white bg-opacity-90 p-8 md:p-12 text-center rounded-lg shadow-lg max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Expense Tracker</h1>
                <p className="text-gray-600 mt-3 text-lg md:text-xl">
                    Welcome to your personal expense tracker. Manage your finances efficiently!
                </p>
                <Link
                    to="/signup"
                    className="mt-5 inline-block bg-zinc-900 hover:bg-zinc-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                    Get Started
                </Link>
            </div>
        </div>
    )
}

export default Home