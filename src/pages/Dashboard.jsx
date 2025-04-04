import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSummary } from '../slices/transactionSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

    const token = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.transaction.loading);

    useEffect(() => {
        if (token) {
            fetchTransactions();
            fetchSummary();
        }
    }, [token]);


    const handleDelete = async (expenseId) => {
        if (!expenseId) return;

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/transaction/deleteTransaction/${expenseId}`,
                { token: token },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // dispatch(deleteExpense(expenseId));
            toast.success("Expense deleted successfully!");

            fetchTransactions();
            fetchSummary();
        } catch (error) {
            // console.error("Error deleting transaction:", error);
            toast.error("Failed to delete expense.");
        }
    };

    const fetchTransactions = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/transaction/getTransactions`,
                { token: token?.token },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token?.token}`,
                    },
                }
            );
            dispatch(setLoading(false));
            dispatch(setTransactions(response.data.transactions));
            setTransactions(response.data.transactions);
        } catch (error) {
            dispatch(setLoading(false));
            // console.error("Error fetching transactions:", error.response?.data || error.message);
        }
    };

    const fetchSummary = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/transaction/getsummary`,
                { token: token?.token },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(setLoading(false));
            dispatch(setSummary(response.data));
            setSummary(response.data);
        } catch (error) {
            dispatch(setLoading(false));
            // toast.loading('Loading...')
            // console.error("Error fetching summary:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Navbar />
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Transaction Dashboard</h1>

            {/* Summary Section */}
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : <div className="grid grid-cols-3 gap-1 mb-6">
                <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Income</h2>
                    <p className="text-2xl font-bold">₹{summary?.totalIncome}</p>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Expense</h2>
                    <p className="text-2xl font-bold">₹{summary.totalExpenses}</p>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Balance</h2>
                    <p className="text-2xl font-bold">₹{summary.balance}</p>
                </div>
            </div>
            }


            {/* Transactions Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transactions</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, idx) => (
                            <tr key={idx} className="text-center">
                                <td className="p-2 border">{idx + 1}</td>
                                {/* <td className="p-2 border">{txn._id}</td> */}
                                <td className={`p-2 border ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>{txn.type}</td>
                                <td className="p-2 border">₹ {txn.amount}</td>
                                <td className="p-2 border">{new Date(txn.date).toLocaleDateString()}</td>
                                <td className="p-2 border">
                                    <Link to={`/edit-transaction/${txn._id}`} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(txn._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard