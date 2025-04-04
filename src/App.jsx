import React from 'react'
import UserLogin from './pages/UserLogin'
import { Route, Routes } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import OpenRoute from './components/OpenRoute'
import Addtransaction from './pages/Addtransaction'
import EditTransaction from './pages/EditTransaction '

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OpenRoute><Home /></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><UserLogin /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><UserSignup /></OpenRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-transaction" element={<PrivateRoute><Addtransaction /></PrivateRoute>} />
        <Route path="/edit-transaction/:id" element={<PrivateRoute><EditTransaction /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App