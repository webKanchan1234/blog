import React, { Fragment, useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
import {useParams,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { loadUser, resetPassword } from '../../action/userAction';
import {toast} from "react-toastify"
import MetaData from '../MetaData';

const ResetPassword = () => {
    const params = useParams()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {success,error,loading}=useSelector((state)=>state.forgetPassword)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // console.log(params)
    // const {isAuthenticated,user} = useSelector((state)=>state.user)
  


    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData={
            password:password,
            confirmPassword:confirmPassword
        }
        dispatch(resetPassword(params.token,formData))
    }

    useEffect(() => {
        dispatch(loadUser())
      if(success){
        toast.success("Password reset successfully")
        navigate("/user/me")
      }
      if(error){
        toast.error(error)
      }
    }, [success,error, dispatch])
    

    return (
        <Fragment>
            <MetaData title="Reset Password" />
        <div className='forget'>
            <div className="forget_input_box">
                <form action="" onSubmit={handleSubmit}>
                    <div className="username">
                        <PersonIcon className="avatar" />
                        <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="username">
                        <PersonIcon className="avatar" />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Submit" className="btn_submit" /> <br />
                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default ResetPassword