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
  useEffect(() => {
    getdetails();
    getlist();
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
 
  const handlerefresh=()=>{
    getlist();
  }

 if(loading){
    return <div className='font-bold text-4xl flex justify-center text-black'><div>Loading....</div></div>
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
    </div>
  )
}

export default Admin