import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  const [type, settype] = useState('password');
  const [loading, setloading] = useState("Log In");
  const Navigate = useNavigate();

  function showpass() {
    settype(prev => prev === 'password' ? 'text' : 'password');
  }

  async function HandleSubmit() {
    setloading("Logging In...");
    if (email !== '' && password !== '' && role !== '') {
      const data = { email, password, role };
      setemail('');
      setpassword('');
      setrole('');
      try {
        const result = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/login`, data, {
          withCredentials: true
        });
        if (result.status === 200) {
          if (data.role === "patient") Navigate('/me');
          else if (data.role === "doctor") Navigate('/doctordashboard');
          else if (data.role === 'admin') Navigate('/admin');
        }
      } catch (err) {
        console.log(err);
      }
      setloading("Submit");
    }
  }

  return (
    <div className='flex flex-col gap-4 items-center mt-[25%] sm:mt-[10%] p-3 border-2 border-gray-700 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/10 shadow-2xl shadow-gray-700'>
      <h1 className='text-2xl text-gray-600 font-bold'>Log In</h1>
      <input
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        className='border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full'
      />
      <div className='w-full'>
        <input
          type={type}
          placeholder='Password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className='border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full'
        />
        <label className='text-gray-600 font-bold'>
          <input type="checkbox" onChange={showpass} /> Show Password
        </label>
      </div>
      <label className='text-gray-600 font-bold text-2xl'>Role</label>
      <select
        className="border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full"
        defaultValue=''
        onChange={(e) => setrole(e.target.value)}
      >
        <option value=''>Select Role</option>
        <option value="admin">Admin</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button
        type="submit"
        className='border-gray-700 border-2 rounded-b-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-full'
        onClick={HandleSubmit}
      >
        {loading}
      </button>
      <div className='text-sm font-light text-gray-600'>
        Note! If failed to login select role again
      </div>
    </div>
  );
};

export default Login;
