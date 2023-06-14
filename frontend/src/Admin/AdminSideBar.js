import React from 'react'
import "../AdminStyle/AdminSideBar.css"
// import {Link} from "react-router-dom"
import { NavLink } from "react-router-dom";


function AdminSideBar() {
  return (
        <div className='side-bar-container'>
            <ul className="side-bar-text-container">
              <li><i class="fa-solid fa-image"></i>Dashboard</li>
              <li><i class="fa-solid fa-image"></i><NavLink to="/admin/uploadbanner">Banner</NavLink></li>
              <li> <i class="fa-solid fa-radio"></i><NavLink to="/admin/uploadnews">News</NavLink></li>
              <li><i class="fa-solid fa-radio"></i><NavLink to="/admin/team">Team</NavLink></li>
              <li><i class="fa-solid fa-users"></i><NavLink to="/admin/student">Student</NavLink></li>
              <li>Upload Banner</li>
            </ul>
        </div>
  )
}

export default AdminSideBar