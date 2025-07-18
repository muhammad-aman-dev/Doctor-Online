import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';

const Me = () => {
  useEffect(() => {
    document.title = 'Patient';
  }, []);

  const [loading, setloading] = useState(true);
  const [details, setdetails] = useState();
  const [doctors, setdoctors] = useState();
  const [selectedDoc, setselectedDoc] = useState('');
  const [messagereq, setmessagereq] = useState('');
  const [Notselected, setNotselected] = useState(true);
  const [message, setmessage] = useState(false);
  const [doctorselected, setdoctorselected] = useState('');
  const [usermessages, setusermessages] = useState([]);
  const [messagearea, setmessagearea] = useState(false)
  const [filter, setfilter] = useState('');
  const messageref = useRef();
  const Navigate = useNavigate();

  async function getmessages(){
    try{
      let user={patientemail:details.email};
    let response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/message/getmessages`,user);
    if(response.status==200){
      console.log("ok")
      let allmessages=response.data;
      setusermessages(allmessages)
    }
    else{
      console.log('not ok')
      setmessagearea(false)
    }
    }
    catch(err){

    }
  }

  useEffect(() => {
     setmessagearea(usermessages.length > 0);
  }, [usermessages])
  

  async function getdetails() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getdetails?cookieName=patientToken`, {
        withCredentials: true
      });
      let doctorsreq = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getDoctors`);
      setdetails(res.data);
      setdoctors(doctorsreq.data);
      setloading(false);
    } catch (err) {
      Navigate('/login');
    }
  }

  useEffect(() => {
    getdetails();
  }, []);

  useEffect(() => {
    getmessages();
  }, [details])
  

  const handleSelect = (email) => {
    setNotselected(false);
    setmessage(true);
    setdoctorselected(email);
    setmessagearea(false)
  }

  const handlemessagereq = () => {
    let message = messageref.current.value;
    setmessagereq(message);
  }

  const handleClick = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`, {}, {
      withCredentials: true
    });
    Navigate('/login');
  }

  const handleSend = async () => {
    if (messagereq !== '') {
      let data = {
        firstname: details.firstname,
        lastname: details.lastname,
        phone: details.phone,
        nic: details.nic,
        patientemail: details.email,
        doctoremail: doctorselected,
        message: messagereq
      };
      console.log(data);
     try{
   let response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/message/newmessage`,data);
   if(response.status==200){
    toast("Your Request sent. Refresh the page!");
    setNotselected(true);
    setmessage(false);
    setmessagereq('');
   }
     }
     catch(err){
     console.log(err);
     toast("Something went wrong.Try again!!!");
     }
    }
  }
 
  const handlemessagedel=async(id)=>{
    console.log(id)
    const messagedata={
      _id:id
    }
    try{
   let response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/message/delmessage`,messagedata);
   if(response.status==200){
    toast(response.data);
    getmessages();
   } 
   if(response.status==400){
    toast(response.data);
   }
  }
    catch(err){
      toast(err);
    }
  }
   
  const handleCancel = () => {
    setNotselected(true);
    setmessage(false);
    setmessagearea(usermessages.length > 0);
  }

  const handlefilter = (e) => {
    setfilter(e.target.value);
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
          <p className="text-white text-xl font-semibold font-sans">Loading Patient Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-[#1E3A8A] text-gray-100">
      <div className="header flex px-4 py-4 justify-between bg-[#102a66] shadow-md">
        <h1 className='text-md sm:text-2xl font-semibold'>Patient {details.firstname} {details.lastname}</h1>
        <button onClick={handleClick} className='bg-black text-white px-4 py-1 rounded-2xl hover:scale-110 duration-200'>Log Out</button>
      </div>
      {messagearea && (
        <>
        <h1 className='text-2xl font-bold text-center text-white underline mt-6'>Your Messages</h1>
        <div className='mt-4 flex flex-col gap-3 items-center'>
         {usermessages.map(reqmessage=>{
          return <div key={reqmessage._id} className='bg-gray-800 p-4 w-[90%] rounded-xl shadow-md flex flex-col'>
                    <div className='font-bold'>Doctor Email: {reqmessage.doctoremail}</div>
                  <div className="mt-2">
                    <h5 className="font-bold">Message</h5>
                    <p className="bg-gray-700 rounded p-2 max-h-[100px] overflow-y-auto">{reqmessage.message}</p>
                  </div>
                  <div className="mt-2 flex justify-between px-2">
                    <h5 className="font-bold">Status : {reqmessage.status}</h5>
                    <button onClick={()=>{handlemessagedel(reqmessage._id)}} className='px-6 py-2 bg-red-600 rounded-md hover:bg-red-700'>Delete</button>
                  </div>
                </div>
         })}
        </div>
        </>
      )}
      {Notselected && (
        <>
          <h1 className='text-2xl font-bold text-center text-white underline mt-6'>Select Doctor</h1>
          <div className="mt-4 flex justify-center">
          <select
  onChange={handlefilter}
  defaultValue={''}
  className="p-2 rounded-md bg-[#1E40AF] text-white font-semibold border border-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
>

              <option value=''>Filter by City</option>
              {[
                "Multan", "Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "Faisalabad", "Rawalpindi",
                "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad",
                "Mardan", "Rahim Yar Khan", "Larkana", "Sheikhupura", "Mirpur", "Okara", "Dera Ghazi Khan"
              ].map(city => <option key={city} value={city} className="bg-[#1E3A8A] text-white">{city}</option>
              )}
            </select>
          </div>

          <div className='overflow-y-auto mt-6 px-4 pb-10 space-y-4'>
            {doctors.filter(doc => filter === '' || doc.city === filter).map(doctor => (
              <div key={doctor._id} className='bg-gray-800 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4'>
                <div className='flex flex-col items-center md:w-[150px]'>
                  <img src={doctor.dpURL} alt="Doctor DP" className='w-[100px] h-[100px] object-cover rounded-full border-2 border-white' />
                  <button onClick={() => handleSelect(doctor.email)} className='mt-3 bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black duration-300'>Select</button>
                </div>
                <div className='flex-1'>
                  <div className="flex justify-between font-semibold">
                    <p>Name: {doctor.fullname}</p>
                    <p>Degree: {doctor.degree}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Experience: {doctor.Experience} Years</p>
                    <p>City: {doctor.city}</p>
                  </div>
                  <div className="mt-2">
                    <h5 className="font-bold">Clinic Address</h5>
                    <p className="bg-gray-700 rounded p-2">{doctor.clinicaddress}</p>
                  </div>
                  <div className="mt-2">
                    <h5 className="font-bold">Bio</h5>
                    <p className="bg-gray-700 rounded p-2 max-h-[100px] overflow-y-auto">{doctor.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {message && (
        <div className='flex flex-col items-center mt-10 gap-6 px-4'>
          <h1 className='text-lg font-bold text-white underline'>Type Your Request Message for Selected Doctor</h1>
          <textarea
            ref={messageref}
            onChange={handlemessagereq}
            value={messagereq}
            rows="8"
            className='w-full md:w-2/3 bg-gray-700 text-white p-4 rounded-xl resize-none'
            placeholder='Enter Your Message...'
          />
          <div className='flex gap-6'>
            <button onClick={handleCancel} className='px-6 py-2 bg-red-600 rounded-md hover:bg-red-700'>Cancel</button>
            <button onClick={handleSend} className='px-6 py-2 bg-green-600 rounded-md hover:bg-green-700'>Send</button>
          </div>
          {messagereq === '' && <p className='text-sm text-red-300'>! Please write a message</p>}
        </div>
      )}
    </div>
  );
};

export default Me;
