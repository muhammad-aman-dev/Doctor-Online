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
  const [newpass, setnewpass] = useState('')
  const [roleforreset, setroleforreset] = useState('')
  const [confirmpass, setconfirmpass] = useState('')

  const Navigate = useNavigate();

  function showpass() {
    settype(prev => prev === 'password' ? 'text' : 'password');
  }
  
   function handleforgotpass() {
    setloginshow(false)
    console.log(emailforcode)
  }

  async function handleotpbtn() {
    if(emailforcode==''||roleforreset==''){
      toast('Please Enter Mail and Role First!')
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
   
  const handlechangepass=async()=>{
    if(newpass!=confirmpass){
      toast('Passwords not match!');
      setnewpass('')
      setconfirmpass('')
      return;
    }
    if(newpass.length<8){
      toast('Password Length should be 8 characters.')
      return;
    }
    let res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/modify/modifypassword`,{mail:emailforcode,role:roleforreset,password:newpass});
    if(res.status==400){
      toast(res.data);
      return;
    }
    if(res.status==200){
      toast(res.data);
      setloginshow(true)
      setotpbtnshow(true)
      setverified(false)
      setnewpass('')
      setconfirmpass('')
      setemailforcode('')
      setroleforreset('')
      return;
    }
  }

  const handlelogout=async ()=>{
    console.log("CLICKED")
   let res= await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`,{},{
      withCredentials:true
    })
    console.log(res.status)
    console.log(res.data)
    toast('Now Try Login Again!!!')

  }

  function verify(){
    console.log(enteredotp)
    if(otp!=''){
    if(enteredotp==otp){
     setverified(true)
     toast('Verified!')
    
    }
  }
  }

  function handleback(){
    setloginshow(true)
      setotpbtnshow(true)
      setverified(false)
      setnewpass('')
      setconfirmpass('')
      setemailforcode('')
      setroleforreset('')
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
      <div className='text-sm font-light text-gray-600'>Facing problems in Login? <p className='inline underline text-blue-700 cursor-pointer' onClick={handlelogout}>Click Here</p> to reset previous logins</div>
    </div>
    <div className={`${!loginshow?'block':'hidden'} flex flex-col gap-4 items-center mt-[25%] sm:mt-[10%] p-3 border-2 border-gray-700 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/10 shadow-2xl shadow-gray-700`}>
    <div onClick={handleback} className='w-full text-start cursor-pointer text-gray-700 flex'><img src={back} alt="" /><div className='text-lg'>back</div></div>
    <input type="email" name="emaill" id="emaill" placeholder='Enter Email to send code' className='border-gray-700 border-2 rounded-2xl p-2 text-gray-600 w-full' value={emailforcode} onChange={(e)=>{setemailforcode(e.target.value)}}/>
    <select
        className="border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full"
        defaultValue=''
        onChange={(e) => setroleforreset(e.target.value)}
      >
        <option value=''>Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Patient">Patient</option>
        <option value="Doctor">Doctor</option>
      </select>
    <button onClick={handleotpbtn} className={`${otpbtnshow?'block':'hidden'}  border-gray-700 border-2 rounded-b-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-full`}>{otpbtn}</button>
    <div className={`${!otpbtnshow&&!verified?'block':'hidden'} flex flex-col  md:flex-row md:justify-between w-full gap-3`}>
      <input type="text" placeholder='6-digit OTP' value={enteredotp} onChange={(e)=>{setenteredotp(e.target.value)}} className='border-gray-700 border-2 rounded-2xl p-2 text-gray-600'/>
      <button className='border-gray-700 border-2 rounded-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-1/2 md:w-1/8' onClick={verify}>{verified?'Verified':'Verify'}</button>
    </div>
    <div className={`${verified?'block':'hidden'} w-full flex flex-col gap-2 items-center`}>
      <input type="text" placeholder='Enter New Password' value={newpass} onChange={(e)=>{setnewpass(e.target.value)}} className='border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full'/>
      <input type="text" placeholder='Confirm New Password' value={confirmpass} onChange={(e)=>{setconfirmpass(e.target.value)}} className='border-gray-700 border-2 rounded-2xl p-1 text-gray-600 w-full'/>
      <button onClick={handlechangepass} className='border-gray-700 border-2 rounded-full hover:text-white hover:bg-gray-600 transition-colors duration-500 w-1/2 cursor-pointer'>Change Password</button>
    </div>
    </div>
    </>
  );
};

export default Login;
