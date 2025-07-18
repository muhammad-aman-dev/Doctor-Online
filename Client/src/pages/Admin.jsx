import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import refresh from '../assets/refresh.svg'

const Admin = () => {
  useEffect(() => {
      document.title = 'Admin Dashboard';
    }, []);
  const [loading, setloading] = useState(true)
  const [details, setdetails] = useState()
  const [listarea, setlistarea] = useState(false)
  const [doctors, setdoctors] = useState([]);
  const [filter, setfilter] = useState('');
  const [doctorslist, setdoctorslist] = useState()
  const Navigate=useNavigate();
  async function getdetails(){
    console.log("getting details...")
    try{
      let res=await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getdetails?cookieName=adminToken`,{
        withCredentials:true
      }) 
      let data=res.data;
      setdetails(data);
      setloading(false)
    }
    catch(err){
      Navigate('/login')
    }
    }
    async function getlist(){
      let doc=await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/doctorsreqlist`);
      let list=doc.data;
      if(list.length>0){
        setlistarea(true)
      }
      else{
        setlistarea(false)
      }
      setdoctorslist(list);
    }

    const getDoctors = async () => {
      try {
        let res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getDoctors`);
        setdoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    getdetails();
    getlist();
    getDoctors();
  }, [])
  const handleClick=async ()=>{
    console.log("CLICKED")
   let res= await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`,{},{
      withCredentials:true
    })
    console.log(res.status)
    console.log(res.data)
    Navigate('/login')
  }
  
 const handledeldoc=async(doc)=>{
  let res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/modify/deldoctor`,{email:doc})
  if(res.status==400){
    toast(res.data)
    return;
  }
  if(res.status==200){
    getDoctors();
    toast(res.data)
    return;
  }
 }

  const handleaccept=async(data)=>{
    let doctor=data;
    try{
    let res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/doctor-register`,doctor);
    console.log(res.data);
    if(res.status==200){
      let del=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/deldoc`,doctor);
      console.log(del.data);
      toast(res.data);
      console.log('200')
      getlist();
    }
  }
    catch(err){
      toast(err.response.data)
    }
  }

  const handlereject=async(data)=>{
    let doctor=data;
    try{
      let res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/deldoc`,doctor);
      console.log(res.data);
      toast(res.data);
      getlist();
    }
    catch(err){
      console.log(err)
      toast(err)
    }
  }

  const handlefilter = (e) => {
    setfilter(e.target.value);
  };
 
  const handlerefresh=()=>{
    getlist();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-white text-xl font-semibold font-sans">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
      <div className='font-sans relative'>
      <div className="header flex px-3 sm:px-15 py-4 justify-between bg-[#1E3A8A]">
      <h1 className='text-xl font-bold sm:text-2xl text-blue-100 font-serif'> {details.firstname} {details.lastname}</h1>
      <button onClick={handleClick} className='LogIn bg-black text-white px-4 py-1 rounded-2xl hover:scale-110 duration-200'>Log Out</button>
    </div>
      <h1 className='bg-[#1E3A8A] text-center font-bold text-blue-100 font-serif pb-3'>Admin Account</h1>
      <div className='bg-[#1E3A8A] mt-10 relative flex w-[95%] items-center flex-col ml-[2.5%] rounded-3xl'>
        <h1 className='font-bold text-blue-100 text-center font-serif pt-2'>Doctors Requests </h1>
        <img src={refresh} alt="refresh" className='absolute cursor-pointer hover:scale-110 duration-100 right-5 top-1.5' onClick={handlerefresh} />
        {listarea?<div className='w-full p-5 flex flex-col gap-3'>
          {doctorslist.map(doctor=>{
            return <div key={doctor._id} className='bg-gray-800 p-4 text-amber-50 w-full  rounded-xl shadow-md flex flex-col'>
                   <div className='flex justify-between'>
                   <div className='font-bold'>Name: {doctor.fullname}</div>
                   <div>Degree: {doctor.degree}</div>
                   </div>
                   <div className='flex justify-between'>
                   <div>Phone: {doctor.phone}</div>
                   <div>Email: {doctor.email}</div>
                   </div>
                   <div className='flex justify-between'>
                   <div>Gender: {doctor.gender}</div>
                   <div>City: {doctor.city}</div>
                   <div>Experience: {doctor.Experience} Years</div>
                   </div>
                   <div className='mt-2'>
                    <h5 className="font-bold">Clinic Address</h5>
                    <p className="bg-gray-700 rounded p-2 max-h-[100px] overflow-y-auto">{doctor.clinicaddress}</p>
                  </div>
                   <div className='mt-2'>
                    <h5 className="font-bold">Bio</h5>
                    <p className="bg-gray-700 rounded p-2 max-h-[100px] overflow-y-auto">{doctor.bio}</p>
                  </div>
                  <div className='mt-3 flex justify-between md:gap-3'>
                    <button onClick={()=>{handleaccept(doctor)}} className='px-6 py-2 bg-green-600 rounded-md hover:bg-green-700'>Accept</button>
                    <button onClick={()=>{handlereject(doctor)}} className='px-6 py-2 bg-red-600 rounded-md hover:bg-red-700'>Reject</button>
                  </div>
                  </div>
          })}
        </div>:<div className='text-center text-amber-50 mt-12 mb-12 font-mono text-xl'>No Requests</div>}
      </div>
      <div className="mt-4 flex justify-center">
      <select
  name="filter"
  defaultValue=""
  onChange={handlefilter}
  className="p-2 rounded-md bg-[#1E40AF] text-white font-semibold border border-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
>
          <option value="" >Filter by City</option>
          {[
            "Multan", "Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "Faisalabad", "Rawalpindi",
            "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad",
            "Mardan", "Rahim Yar Khan", "Larkana", "Sheikhupura", "Mirpur", "Okara", "Dera Ghazi Khan"
          ].map(city => (
            <option key={city} value={city} className="bg-[#1E3A8A] text-white">{city}</option>
          ))}
        </select>
        </div>
        <div className="doctors flex flex-col items-center gap-4 mt-9 px-4 bg-[#1E3A8A] w-[95%] ml-[2.5%] pt-4 rounded-4xl pb-10">
        {doctors
          .filter(doc => filter === '' || doc.city === filter)
          .map(doctor => (
            <div
              key={doctor._id}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] text-white w-full md:w-[80%] p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row gap-6"
            >
              <div className="flex flex-col items-center md:w-[150px]">
                <img
                  src={doctor.dpURL}
                  alt="Doctor DP"
                  className="w-[100px] h-[100px] object-cover rounded-full border-2 border-white"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-semibold">
                  <p>Name: {doctor.fullname}</p>
                  <p>Degree: {doctor.degree}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>Experience: {doctor.Experience} Years</p>
                  <p>City: {doctor.city}</p>
                </div>
<div className="mt-2">
<h5 className="font-bold">Email: {doctor.email}</h5>
</div>
                <div className="mt-2">
                  <h5 className="font-bold">Clinic Address</h5>
                  <p className="bg-slate-800 rounded-lg p-3 mt-1 text-sm text-gray-200">{doctor.clinicaddress}</p>
                </div>
                <div className="mt-2">
                  <h5 className="font-bold">Bio</h5>
                  <p className="bg-slate-800 rounded-lg p-3 max-h-[100px] overflow-y-auto">{doctor.bio}</p>
                </div>
                <button onClick={()=>{handledeldoc(doctor.email)}} className='px-6 py-2 bg-red-600 rounded-md mt-2 hover:bg-red-700'>Delete Doctor</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Admin