import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTransactions } from '../slices/transactionSlice';


const Addtransaction = () => {
    const [formData, setFormData] = useState({
        userId: '',
        type: 'income',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[1],
    });

    const token = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!token) {
        toast.error("No token found! Please log in.");
        return;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/transaction/addTransaction`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            if(response.status === 200) {
                dispatch(setTransactions(response.data));
                toast.success(response.data.message || "Transaction added successfully!");
                navigate('/dashboard');
            }
            // console.log("Transaction added successfully:", response.data);

            // Reset form fields after successful submission
            setFormData({
                type: "income",
                amount: "",
                description: "",
                date: "",
            });

        } catch (error) {
            console.error("Error adding transaction:", error.response?.data?.message || error.message);
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Add Transaction</h2>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 h-20 focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
            >
                Add Transaction
            </button>

            <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-500 text-white py-2 rounded-md font-medium hover:bg-gray-600 transition mt-2"
            >
                Back
            </button>
        </form>
    );
};
export default Addtransaction