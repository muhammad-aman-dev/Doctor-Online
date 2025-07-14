import React from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div> 
      <nav className='flex items-center p-3 justify-between'>
       <NavLink to={'/'}> <div className='flex'>
        <h1 className='text-2xl text-red-500'>Doctor</h1>
        <h1>Online</h1>
        <img src={Logo} alt="" className='w-5' />
    </div>
    </NavLink>
    <div className="btns">
      <NavLink to={'/login'}><button className='LogIn cursor-pointer bg-black text-white px-4 py-1 rounded-2xl hover:scale-110 duration-200'>Log In</button></NavLink>
      <NavLink to={'/signup'}><button className='SignUp cursor-pointer bg-white text-black px-3 py-1 rounded-2xl hover:scale-110 duration-200 border-1'>Sign Up</button></NavLink>
    </div>
    </nav>
    <div className="links ">
      <ul className='flex list-none justify-center gap-6'>
       <li><NavLink to={'/'} className={({isActive})=>`${isActive?'text-gray-600':'text-gray-400'} text-xl font-bold`}>Home</NavLink></li>
       <li><NavLink to={'/doctors'} className={({isActive})=>`${isActive?'text-gray-600':'text-gray-400'} text-xl font-bold`}>Doctors</NavLink></li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar
