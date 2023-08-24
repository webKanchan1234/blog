import React, { Fragment, useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
import "./forget.css"
import {useDispatch,useSelector} from "react-redux"
import { forgetPassword } from '../../action/userAction';
import {toast} from "react-toastify"
import MetaData from '../MetaData';

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const {message} = useSelector((state)=>state.forgetPassword)
    const [email, setEmail] = useState("")

    const handleSubmit =(e) =>{
        e.preventDefault()
        const formData={
          email:email
        }
        dispatch(forgetPassword(formData))
    }

    useEffect(() => {
      if(message){
        toast.success(message)
      }
    }, [message])
    

  return (
    <Fragment>
      <MetaData title="Forget Password" />
      <div className='forget'>
        <div className="forget_input_box">
        <form action="" onSubmit={handleSubmit}>
            <div className="username">
              <PersonIcon className="avatar" />
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
           
            <input type="submit" value="Send" className="btn_submit" /> <br/>
          </form>
        </div>
    </div>
    </Fragment>
  )
}

export default ForgetPassword