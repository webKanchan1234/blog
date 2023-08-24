import React from 'react'
import "./sidebar.css"
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="/admin/dashboard" className='sidebar_link'>
        <p>Dashboard</p>
      </Link>
      <Link to="/admin/posts" className='sidebar_link'>
        <p>All Posts</p>
      </Link>
      <Link to="/admin/add-post" className='sidebar_link'>
        <p>Add Post</p>
      </Link>
      <Link to="/admin/users" className='sidebar_link'>
        <p>All Users</p>
      </Link>
    </div>
  )
}

export default Sidebar