import React, { Fragment, useEffect, useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../action/userAction";
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../Loader/Loader"
import MetaData from "../MetaData";

const Login = () => {
  const navigate = useNavigate()
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.user)
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
    if (error) {
      toast.error(error)
    }
  }, [isAuthenticated, error, navigate])

  return (
    <Fragment>
      <MetaData title="Signin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="login_container">
          <div className="login_box">

            <form action="" id="login_form" onSubmit={handleSubmit}>
              <h3 id="log_title">Login</h3>
              <div className="username">
                <label htmlFor="">Username</label>
                <div className="input_avt"><PersonIcon className="avatar" />

                  <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                </div>
              </div>
              <div className="password">
                <label htmlFor="">Password</label>
                <div className="input_avt"><LockIcon className="password" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              </div>
              <div >
                <Link to="/password/forget" id="forget" >Forget Password?</Link>
              </div>
              <input type="submit" value="Login" className="btn_submit" /> <br />
              
              <Link to="/admin/signup" style={{ textDecoration: "none" }}><div id="login_link">
                Register
              </div></Link>
            </form>

          </div>

        </div>
      )}
    </Fragment>
  );
};

export default Login;
