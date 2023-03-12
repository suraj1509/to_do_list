import React from 'react'
import '../Nav Comp/Navbar.css'
import {Link, useNavigate} from 'react-router-dom'


export default function Navbar() {
  let navigate = useNavigate();
  const toggleNav=()=>{
    const mainMenu = document.querySelector('.mainMenu');
   if(mainMenu.style.top === '-100%')
  return (
    mainMenu.style.display = 'flex',
    mainMenu.style.top = '13%'
  )
  else{
    mainMenu.style.top = '-100%'
  }
 
  }
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('token')
  }
  return (
    <nav>
    <div className="logo"><h1><Link to="/">TO_DO_LIST</Link></h1></div>
    <div className="openMenu"><i className="fa fa-bars" onClick={toggleNav}></i></div>
    <ul className="mainMenu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {!(localStorage.getItem('token'))?
        <><li><Link className='auth_option' to="/login">Login</Link></li>
        <li><Link className='auth_option' to="/signup">Signup</Link></li></>:
        <li><Link className='auth_option' onClick={handleLogout}>Logout</Link></li>
         }
    </ul>
  
</nav>
  )
}
