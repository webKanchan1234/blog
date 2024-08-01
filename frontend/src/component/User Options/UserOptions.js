import React, { Fragment, useState } from 'react'
// import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
// import Backdrop from "@material-ui/core/Backdrop";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import PersonIcon from "@material-ui/icons/Person";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../action/userAction';
import {toast} from "react-toastify"

const UserOptions = ({user}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [open, setOpen] = useState(false);

  const options = [
    {  name: "Profile", func: account },
    {  name: "check", func: check },
    {name: "Logout", func: logoutUser },
  ];

// console.log(user)
  if (user.role === "admin" || user.role === "administrator") {
    options.unshift({
      // icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function check() {
    navigate("/check");
  }
  function account() {
    navigate("/user/me");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
    
  }


  return (
    <Fragment>
      <div className="dashboard_header_box">
        <div className="dashboard_header">
          <Link to="/" className="dashboard_link">
            Logo
          </Link>
          {options.map((item) => (
          <>
            <p onClick={item.func}>{item.name}</p>
           </> 
        ))}
        </div>
      </div>
      
        
      
    </Fragment>
  )
}

export default UserOptions