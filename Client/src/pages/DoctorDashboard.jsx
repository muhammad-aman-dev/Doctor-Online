import React from 'react'
import axios from 'axios'
import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import edit from '../assets/edit.svg'
import menuimg from '../assets/menu.svg'
import close from '../assets/close.svg'
import { toast } from 'react-toastify'

const DoctorDashboard = () => {
 useEffect(() => {
    document.title = 'Doctor Dashboard';
  }, []);
 const inputfile = useRef()
 const menu = useRef()
 const closeref = useRef()
  const [loading, setloading] = useState(true)
  const [details, setdetails] = useState()
  const [messagearea, setmessagearea] = useState(false)
  const [messages, setmessages] = useState([])
  const [image, setimage] = useState()
  const Navigate=useNavigate();
  async function getdetails(){
    console.log("getting details")
    try{
      let res=await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getdetails?cookieName=doctorToken`,{
        withCredentials:true
      })
    let data=res.data;
     setdetails(data);
      setloading(false)
    }
    catch(err){
      console.log(err)
      Navigate('/login')
    }
    }
  useEffect(() => {
    getdetails();
  }, [])
  useEffect(() => {
    if(details){
    getmessages();
    }
  }, [details])
  
  
  const handleClick=async ()=>{
    console.log("CLICKED")
   let res= await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`,{},{
      withCredentials:true
    })
    console.log(res.status)
    console.log(res.data)
    Navigate('/login')
  }
 
   async function getmessages(){
    try{
      let user={doctoremail:details.email};
    let response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/message/doctormessages`,user);
    if(response.status==200){
      console.log("ok")
      let allmessages=response.data;
      setmessages(allmessages);
      setmessagearea(allmessages.length>0)
    }
    else{
      console.log('not ok')
      setmessagearea(false)
    }
    }
    catch(err){
     console.log(err);
     setmessages([]);
    setmessagearea(false);
    }
  }

  function dateConvert(){
    const dob = details.dob;
const date = new Date(dob);
const formatted = date.toLocaleDateString("en-CA"); 
return formatted;
  }
 function handleEdit(){
  inputfile.current.click();
 }
 const handleDp=async(file)=>{
  let formData=new FormData();
      formData.append("photo",file)
      formData.append("email",details.email); 
  try{
  let res= await axios.post(`${import.meta.env.VITE_BACKEND_URI}/modify/modifyDp`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, 
      })
      toast(res.data+" Reload the page to see changes")
    }
    catch(err){
      console.log(err)
    }
 }

 async function handlemessageopt(id,stat){
  let data={
    _id:id,
    status:stat
  }
  console.log(data)
  let response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/message/modifymessage`,data);
  if(response.status==200){
    toast(response.data);
    getmessages();
  }
  if(response.status==400){
    toast(response.data)
  }
 }

 function handleClose(){
  closeref.current.style.transform='translateX(-330px)'
 }
 function handleMenu(){
  closeref.current.style.transform='translateX(0px)'
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
        <p className="text-white text-xl font-semibold font-sans">Loading Doctor Dashboard...</p>
      </div>
    </div>
  );
}

  return (
    <div className='font-sans relative'>
      <div className="header flex px-3 sm:px-15 py-4 justify-between bg-[#1E3A8A]">
      <h1 className='text-xl font-bold sm:text-2xl text-blue-100 font-serif'>Doctor {details.fullname}</h1>
      <button onClick={handleClick} className='LogIn bg-black text-white px-4 py-1 rounded-2xl hover:scale-110 duration-200'>Log Out</button>
    </div>
    <section className='main flex gap-1'>
    <section ref={closeref} className='left absolute z-10 md:static w-[330px] duration-700 translate-x-[0px] sm:w-[270px] border-2 mt-2 rounded-2xl bg-[#1E3A8A]'>
    <img src={close} alt="close" onClick={handleClose} className='cursor-pointer absolute right-2 top-2 hover:scale-140 duration-150 inline md:hidden' />
    <div className='m-3 flex flex-col items-center gap-3 px-8 justify-between'>
    <div className='border-1 rounded-[100%] border-amber-50 w-[150px] sm:w-[200px] md:w-[300] relative'><img src={details.dpURL} alt="Doctor Dp" className='object-cover object-top rounded-[100%]'/><img src={edit} alt="edit" className='absolute bottom-0 left-[40%] sm:left-[44%] bg-black border-2 rounded-full' onClick={handleEdit}/></div>
    <div className="details">
      <div className="mt-4 w-full px-4 text-sm text-gray-100 font-medium space-y-2">
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">Email:</span>
    <span>{details.email}</span>
  </div>
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">Degree:</span>
    <span>{details.degree}</span>
  </div>
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">NIC:</span>
    <span>{details.nic}</span>
  </div>
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">Gender:</span>
    <span>{details.gender}</span>
  </div>
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">DOB:</span>
    <span>{dateConvert()}</span>
  </div>
  <div className="flex justify-between border-b border-gray-700 pb-1">
    <span className="text-gray-400">Phone:</span>
    <span>{details.phone}</span>
  </div>
</div>
    </div>
    </div>
    <input ref={inputfile} onChange={(e)=>{let file=e.target.files[0]; if(file){setimage(file)} handleDp(file)}} className='hidden' type="file" name="picture" id="file" accept='image/*' />
 <div className="mt-6 px-4">
  <h5 className="text-sm text-gray-400 mb-1 font-semibold">Clinic Address</h5>
  <p className="text-sm text-gray-100 bg-gray-800 p-3 rounded-lg leading-relaxed">
    {details.clinicaddress}
  </p>
</div>
  <div className="mt-6 px-4">
  <h5 className="text-sm text-gray-400 mb-1 font-semibold">Bio</h5>
  <p className="text-sm text-gray-100 bg-gray-800 p-3 rounded-lg leading-relaxed">
    {details.bio}
  </p>
</div> 
  </section>
  <section className='right bg-[#1E3A8A] border-2 mt-2 md:ml-0 ml-2 rounded-2xl w-[95%] md:w-full'>
    <img src={menuimg} alt="menu" onClick={handleMenu} className='md:hidden inline mt-2 ml-3 invert cursor-pointer hover:scale-140 duration-150'/>
    <div className='p-2 flex flex-col gap-2'>
      {messagearea?(
        <>
        {messages.map(reqmessage=>{
          return <div key={reqmessage._id} className='bg-gray-800 p-4 text-amber-50 w-[100%] rounded-xl shadow-md flex flex-col'>
                   <div className='font-bold'>Patient Name : {reqmessage.firstname} {reqmessage.lastname}</div>
                   <div className='flex flex-col md:flex-row md:justify-between gap-2'>
                    <div className='font-bold'>Patient Email : {reqmessage.patientemail}</div>
                    <div className='font-bold'>Patient Phone : {reqmessage.phone}</div>
                  </div>
                  <div className="mt-2">
                    <h5 className="font-bold">Message</h5>
                    <p className="bg-gray-700 rounded p-2 max-h-[100px] overflow-y-auto">{reqmessage.message}</p>
                  </div>
                  <div className="mt-2 flex flex-col gap-2 md:flex-row md:justify-between px-2">
                    <h5 className="font-bold">Status : {reqmessage.status}</h5>
                    <div className='flex justify-between md:gap-3'>
                    <button onClick={()=>{handlemessageopt(reqmessage._id,'accepted')}} className='px-6 py-2 bg-green-600 rounded-md hover:bg-green-700'>Accept</button>
                    <button onClick={()=>{handlemessageopt(reqmessage._id,'rejected')}} className='px-6 py-2 bg-red-600 rounded-md hover:bg-red-700'>Reject</button>
                  </div>
                  </div>
                </div>
         })}
        </>
      ):<div className='text-amber-50 text-center mb-56 mt-72 text-3xl font-bold font-sans'>No Message Requests!!!</div>}
    </div>
  </section>
  </section>
    </div>
  )
}

export default DoctorDashboard 