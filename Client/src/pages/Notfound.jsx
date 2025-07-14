import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const page = () => {

  let navigate=useNavigate();

async function promise() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve();
    }, 1000);
  })
}

async function goBack(sec){
  let i=10;
  while(i>0){
    await promise();
    setseconds(i-1);
    i--;
  }
}

const [seconds, setseconds] = useState(10)
useEffect(() => {
  goBack()
}, [])

useEffect(() => {
  if(seconds==0){
  navigate("/");
  }
}, [seconds]);


  return (
    <div className='flex flex-col items-center justify-center h-[100vh] gap-6 '>
      <span className='font-bold text-amber-50 text-4xl text-center'>Sorry Doctor Can't Find Your Page!</span> 
      <Link to="/" className='text-white border-2 hover:border-violet-700 rounded-3xl p-5 hover:bg-white hover:text-black duration-1000 transition-all'>Go Back To Home Page</Link>
      <span className='font-bold text-amber-50 text-2xl'>Redirecting in {seconds} seconds</span> 
    </div>
  )
} 

export default page
