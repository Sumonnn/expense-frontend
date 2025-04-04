import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditTransaction = () => {

    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        type: "",
        amount: "",
        description: "",
        date: "",
        token: token,
    });

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaction/getTransaction/${id}`, {
                token: token,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFormData(response.data.transaction);
        } catch (error) {
            console.error("Error fetching transaction:", error);
            toast.error("Failed to load transaction data");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/transaction/updateTransaction/${id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            toast.success("Transaction updated successfully");
            navigate("/dashboard"); // Redirect to dashboard after updating
        } catch (error) {
            console.error("Error updating transaction:", error);
            toast.error("Failed to update transaction");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Amount:</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Update Transaction</button>
                <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-gray-500 text-white py-2 rounded-md font-medium hover:bg-gray-600 transition mt-2"
                >
                    Back
                </button>
            </form>
        </div>
    )
}

export default EditTransaction 