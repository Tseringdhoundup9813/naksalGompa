import React from 'react'
import "../AdminStyle/AdminSideBar.css"
import {Link} from "react-router-dom"
function AdminSideBar() {
  return (
        <div className='side-bar-container'>
            <ul className="side-bar-text-container">
              <li><i class="fa-solid fa-image"></i>Dashboard</li>
              <li><i class="fa-solid fa-image"></i><Link to="admin/uploadbanner">Banner</Link></li>
              <li> <i class="fa-solid fa-radio"></i><Link to="admin/uploadnews">News</Link></li>
              <li>Upload Banner</li>
              <li>Upload Banner</li>
            </ul>
        </div>
  )
}

export default AdminSideBar