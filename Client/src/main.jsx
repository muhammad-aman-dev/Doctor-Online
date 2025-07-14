import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { useState,createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

export const Context=createContext({isAuthenticated:false})


const Wrapper=()=>{
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({})
  const value={
    isAuthenticated,setisAuthenticated,user,setuser
  }
return (<BrowserRouter><Context.Provider value={value}><App /></Context.Provider></BrowserRouter>)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wrapper/>
  </StrictMode>,
)
