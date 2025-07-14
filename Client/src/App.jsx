import './App.css'
import { Routes,Route,useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Me from './pages/Me'
import DoctorDashboard from './pages/DoctorDashboard'
import Admin from './pages/Admin'
import Doctors from './pages/Doctors'
import RegisterDoctor from './pages/RegisterDoctor'
import Notfound from './pages/Notfound'
import { Context } from './main'
import { useContext,useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

function App() {
  const Navigate=useNavigate();
  const {isAuthenticated,setisAuthenticated,user,setuser}=useContext(Context);

  useEffect(() => {
    if(isAuthenticated){
      Navigate('/me')
    }
  
    return () => {
      
    } 
  }, [])
  
  return (
    
    <>
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/me' element={<Me user={user}/>}/>
      <Route path='/doctordashboard' element={<DoctorDashboard/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/registerdoctor' element={<RegisterDoctor/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
    <ToastContainer position="top-center" closeOnClick hideProgressBar style={{fontSize:"12px"}}/>
    </>
  ) 
}

export default App
