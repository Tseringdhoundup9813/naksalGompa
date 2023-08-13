import React from 'react'
import "../AdminStyle/AdminSideBar.css"
// import {Link} from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useLogout } from '../Hooks/useLogout';

import { useAuthContext } from '../Hooks/useAuthContext';

function AdminSideBar() {

  const{user}=useAuthContext()
  const {logout } =useLogout();
  const handleClick =()=>{

    logout()

}
  return (
        <div className='side-bar-container'>
          <div className="user-dashboard">
            {
              user&&(
                <h3>{user.username}</h3>
              )
            }
          
          </div>
            <ul className="side-bar-text-container">
              <li><i class="fa-solid fa-image"></i>Dashboard</li>
              <li><i class="fa-solid fa-image"></i><NavLink to="/admin/uploadbanner">Banner</NavLink></li>
              <li> <i class="fa-solid fa-radio"></i><NavLink to="/admin/uploadnews">News</NavLink></li>
              <li><i class="fa-solid fa-radio"></i><NavLink to="/admin/team">Team</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/student">Student</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/founder">Founder</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/director">Director</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/gallery">Gallery</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/contact">Contact</NavLink></li>
              <li onClick={handleClick}><i class="fa-solid fa-right-from-bracket"></i><NavLink>logout</NavLink></li>


              
            </ul>
        </div>
  )
}

export default AdminSideBar