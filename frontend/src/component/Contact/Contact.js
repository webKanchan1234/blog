import React, { Fragment, useEffect, useState } from 'react'
import "./contact.css"
import { Link } from "react-router-dom"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, contactUs } from '../../action/userAction';
import { toast } from "react-toastify"
import Loader from "../Loader/Loader"
import MetaData from '../MetaData';
import logo from "../../assets/logo.png"

const Contact = () => {
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector((state) => state.contactus)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [message, setMessage] = useState("")
    const [link, setLink] = useState("")

    const submitHandle = (e) => {
        e.preventDefault()
        const formData = {
            name: name,
            email: email,
            mobile: mobile,
            message: message,
            link: link
        }
        dispatch(contactUs(formData))
    }

    useEffect(() => {
        if (success) {
            toast.success("Message Send Successfully")
            setName("")
            setEmail("")
            setMessage("")
            setLink("")
            setMobile("")
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [success, error, dispatch])


    return (
        <Fragment>
            <MetaData title="Contact us" />
            <h2 style={{textAlign:"center"}}>Contact US</h2>
            {loading ? (
                <Loader />
            ) : (<div className='contact'>

                <div className="contact_left">
                    <h4>Get in touch</h4>
                    <p>We will reply your message within 24 hours!</p>
                    <form onSubmit={submitHandle}>
                        <div className="name">
                            <div className="name_label">
                                <p>Your Name *</p>
                                <input type="text"
                                    value={name}
                                    placeholder='Enter Your Name Here'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="name_label">
                                <p>Email Address *</p>
                                <input type="email"
                                    value={email}
                                    placeholder='Enter Your Email Here'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="name">
                            <div className="name_label">
                                <p>Phone Number *</p>
                                <input type="text"
                                    value={mobile}
                                    placeholder='Enter Your Mobile Here'
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            <div className="name_label">
                                <p>Website (Optional)</p>
                                <input type="text"
                                    value={link}
                                    placeholder='http://'
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="name_label_txt">
                            <p id='msg'>Message *</p>
                            <textarea placeholder='write your message here'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button type='submit' className='message_btn'>Leave a comment</button>
                    </form>
                </div>
                <div className="contact_right">
                    <div className="image">
                        <img src={logo} alt="pic" />
                    </div>
                    <h3 id='title'>Kanchan Kumar</h3>
                    <p id='desc'> Welcome to our blog. We are passionate storytellers, explorers, and enthusiasts dedicated to sharing our insights, experiences, and tips on travel, technology, electronics, celebrity, etc. Our blog is the best resource whether you're looking to read something enjoyable, gain some inspiration, or learn something new.</p>
                    {/* <div className="icons">
                    <Link id='icons_link'><LinkedInIcon /></Link>
                    <Link id='icons_link'><TwitterIcon /></Link>
                    <Link id='icons_link'><InstagramIcon /></Link>
                </div> */}
                </div>
            </div>)}
        </Fragment>
    )
}

export default Contact