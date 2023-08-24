import React, { Fragment, useEffect, useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../action/userAction";
import { Link } from "react-router-dom"
import {toast} from "react-toastify"
import Loader from "../Loader/Loader"
import MetaData from "../MetaData";

const Login = () => {
  const navigate = useNavigate()
  const { loading,error, isAuthenticated, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const formData = {
    email: email,
    password: password
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    dispatch(loginUser(formData))
    // navigate("/admin/dashboard")
  }

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Loggin successfully")
      navigate("/user/me")
    }
    if(error){
      toast.error(error)
    }
  }, [isAuthenticated,error, navigate])

  return (
    <Fragment>
      <MetaData title="Signin" />
      {loading ? (
        <Loader/>
      ) : (
        <div className="login_container">
        <div className="login_box">
  
        <form action="" onSubmit={handleSubmit}>
              <div className="username">
                <PersonIcon className="avatar" />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="password">
                <LockIcon className="password" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <input type="submit" value="Log In Now" className="btn_submit" /> <br/>
              <Link to="/password/forget" id="login_link">Forget Password</Link>
              <Link to="/admin/signup" id="login_link">Register</Link>
            </form>
          
        </div>
  
      </div>
      )}
    </Fragment>
  );
};

export default Login;
