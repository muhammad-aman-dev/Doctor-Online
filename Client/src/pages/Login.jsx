import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import back from '../assets/back.svg'

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  const [type, settype] = useState('password');
  const [loading, setloading] = useState("Log In");
  const [verified, setverified] = useState(false)
  const [otpbtn, setotpbtn] = useState('Send Code')
  const [otpbtnshow, setotpbtnshow] = useState(true)
  const [emailforcode, setemailforcode] = useState('')
  const [otp, setotp] = useState('')
  const [enteredotp, setenteredotp] = useState('')
  const [loginshow, setloginshow] = useState(true)

  const Navigate = useNavigate();

  function showpass() {
    settype(prev => prev === 'password' ? 'text' : 'password');
  }
  
   function handleforgotpass() {
    setloginshow(false)
    console.log(emailforcode)
  }

  async function handleotpbtn() {
    if(emailforcode==''){
      toast('Please Enter Mail First!')
     return;
    }
    if(!emailforcode.endsWith('@gmail.com')){
      toast('Please Enter Mail First!')
      return;
    }
    try{
      setotpbtn('Wait Sending...')
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/sendotp`,
        { email: emailforcode , type: 'password forget'}
      );
      setotp(res.data)
      toast(`OTP sent to your mail. If you did'nt see check spam box also.`);
      setotpbtn('Send Code')
      setotpbtnshow(false)
    }
    catch(err){
      toast(err.response.data + 'Please Retry') 
    }
  }
   
  function verify(){
    console.log(enteredotp)
    if(otp!=''){
    if(enteredotp==otp){
     setverified(true)
     toast('Verified!')
     setloginshow(true)
     setotpbtnshow(true)
    }
  }
  }

  function handleback(){
    setloginshow(true)
    setotpbtnshow(true)
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
        toast(err.response.data);
      }
      setloading("Submit");
    }
  }

  return (
    <>
    <div className={`${loginshow?'block':'hidden'} flex flex-col gap-4 items-center mt-[25%] sm:mt-[10%] p-3 border-2 border-gray-700 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/10 shadow-2xl shadow-gray-700`}>
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
        <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
        <label className='text-gray-600 font-bold cursor-pointer'>
          <input type="checkbox" onChange={showpass} /> Show Password
        </label>
        <div className='text-gray-600 underline cursor-pointer' onClick={handleforgotpass}>Forgot Password?</div>
        </div>
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
    <div className={`${!loginshow?'block':'hidden'} flex flex-col gap-4 items-center mt-[25%] sm:mt-[10%] p-3 border-2 border-gray-700 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/10 shadow-2xl shadow-gray-700`}>
    <div onClick={handleback} className='w-full text-start cursor-pointer text-gray-700 flex'><img src={back} alt="" /><div className='text-lg'>back</div></div>
    <input type="email" name="emaill" id="emaill" placeholder='Enter Email to send code' className='border-gray-700 border-2 rounded-2xl p-2 text-gray-600 w-full' value={emailforcode} onChange={(e)=>{setemailforcode(e.target.value)}}/>
    <button onClick={handleotpbtn} className={`${otpbtnshow?'block':'hidden'}  border-gray-700 border-2 rounded-b-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-full`}>{otpbtn}</button>
    <div className={`${!otpbtnshow?'block':'hidden'} flex flex-col  md:flex-row md:justify-between w-full gap-3`}>
      <input type="text" placeholder='6-digit OTP' value={enteredotp} onChange={(e)=>{setenteredotp(e.target.value)}} className='border-gray-700 border-2 rounded-2xl p-2 text-gray-600'/>
      <button className='border-gray-700 border-2 rounded-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-1/2 md:w-1/8' onClick={verify}>Verify</button>
    </div>
    </div>
    </>
  );
};

export default Login;
