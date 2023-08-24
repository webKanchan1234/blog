import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { logout } from '../../action/userAction'
import {useNavigate} from "react-router-dom"

const DashboardHeader = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  
  
  return (
    <div className="dashboard_header_box">
        <div className="dashboard_header">
          <Link to="/" className="dashboard_link">
            Logo
          </Link>
          {/* <p onClick={logoutHandle}>Logout</p> */}
        </div>
      </div>
  )
}

export default DashboardHeader