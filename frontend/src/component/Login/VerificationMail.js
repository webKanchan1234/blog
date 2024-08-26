import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { verificationMail } from '../../action/userAction'
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const VerificationMail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verificationMail(params.token))
    }, [])

    return (
        <div className='verify-page'>
            <div>
                <TaskAltIcon id="tick" />
                <p>Email verified successfully</p>
                <Link to="/admin/login" id='veri-login'>Login</Link>
            </div>
        </div>
    )
}

export default VerificationMail