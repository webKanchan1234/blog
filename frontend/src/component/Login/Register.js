import React, { Fragment, useEffect, useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../Loader/Loader"
import { signupUser } from "../../action/userAction";
import MetaData from "../MetaData";

const Register = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { loading, isAuthenticated, error,user } = useSelector((state) => state.user)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const formData = {
    name: name,
    email: email,
    password: password
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    dispatch(signupUser(formData))
    setMessage("An email sent to your account. Please verify it.")
    setEmail("")
    setPassword("")
    setName("")
  }

  return (
    <Fragment>
      <MetaData title="Signup" />
        <div className="login_container">
          <div className="login_box">

            <form action="" className="form" onSubmit={handleSubmit}>
              <h3 id="log_title">Register</h3>
              {/* <div className="username">
              <PersonIcon className="avatar" />
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div> */}
              <div className="username">
                <label htmlFor="">Name</label>
                <div className="input_avt"><PersonIcon className="avatar" />

                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} ></input>
                </div>
              </div>

              {/* <div className="username">
              <PersonIcon className="avatar" />
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div> */}
              <div className="username">
                <label htmlFor="">Username</label>
                <div className="input_avt"><PersonIcon className="avatar" />

                  <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                </div>
              </div>
              {/* <div className="password">
              <LockIcon className="password" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
             */}
              <div className="password">
                <label htmlFor="">Password</label>
                <div className="input_avt"><LockIcon className="password" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              </div>
              <input type="submit" value="Register" className="btn_submit" /> <br />
              <Link to="/admin/login" style={{ textDecoration: "none" }}><div id="login_link">
                Sign IN
              </div></Link>
              {/* <Link to="/admin/login" id="login_link">Sign In</Link> */}
              {message ? <p id="verify">{message}</p> :""}
            </form>

          </div>

        </div>
      
    </Fragment>
  );
};

export default Register;
