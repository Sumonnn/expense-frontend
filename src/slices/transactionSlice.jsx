import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [],
    transaction: null,
    summary: null,
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        setTransactions(state, action) {
            state.transactions = action.payload;
        },
        setTransaction(state, action) {
            state.transaction = action.payload;
        },
        setSummary(state, action) {
            state.summary = action.payload;
        },
        updateExpense(state, action) {
            const { id, updatedExpense } = action.payload;
            const index = state.transactions.findIndex((t) => t.id === id);
            if (index !== -1) {
                state.transactions[index] = { ...state.transactions[index], ...updatedExpense };
            }
        },
        deleteExpense(state, action) {
            const id = action.payload;
            state.transactions = state.transactions.filter((t) => t.id !== id);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setTransactions,
    setTransaction,
    setSummary,
    setLoading,
    setError,
    updateExpense,
    deleteExpense,
} = transactionSlice.actions;

export default transactionSlice.reducer;