import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setSignupData, setToken } from '../slices/authSlice'
import Cookies from "js-cookie";


const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, userData)

      if (response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        dispatch(setSignupData(data.User));
        dispatch(setToken(data.token));
        localStorage.setItem('token', data.token)
        Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" });
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || error.response.data.errors[0].msg);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
    </div>
  )
}

export default UserLogin