import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom"
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearErrors, logout, updatePassword } from '../../action/userAction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { UPDATE_PASSWORD_RESET } from '../../constant/userConstant';

const ProCommon = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, isUpdated } = useSelector(state => state.profile)

    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const icons = [
        { icon: <FaInstagram />, link: 'https://reactjs.org' },
        { icon: <FaFacebookF />, link: 'https://nodejs.org' },
        { icon: <FaTwitter />, link: 'https://www.mongodb.com' },
        { icon: <FaLinkedinIn />, link: 'https://www.python.org' },
        { icon: <CiYoutube />, link: 'https://www.java.com' },
        { icon: <MdLanguage />, link: 'https://nodejs.org' },

    ];

    const logoutHandle = () => {
        dispatch(logout());
        toast.success("Logout Successfully");
        navigate("/");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        dispatch(updatePassword(formData))
    };


    const formData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            // dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Password Updated Successfully")
            handleClose()
            dispatch({type: UPDATE_PASSWORD_RESET}) 
        }

    }, [dispatch,error,isUpdated])


    return (
        <div className="profile_box">
            <h3>Profile</h3>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav " className='basic-navbar-nav1'>
                        <Nav className="">
                            <Link to="/" id="about_link">Home |</Link>
                            <Link to="/user/me" id="about_link">Profile |</Link>
                            <Link to="/user/about" id="about_link">About |</Link>
                            <Link to="/user/add-post" id="about_link">Add Posts |</Link>
                            <Link to="/user/blog" id="about_link">Posts |</Link>
                            <Link to="" id="about_link" onClick={handleShow}>Change Password |</Link>
                            <Link to="/user/edit" id="about_link">Edit Profile |</Link>
                            <Link to="" id="about_link" onClick={logoutHandle}>Logout</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="profile_avatar">
                <img src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg" alt="avatar" />
                <div className="circle-container">
                    {icons.map((item, index) => (
                        <a href={item.link} className="circle-icon" key={index} target="_blank" rel="noopener noreferrer">
                            {item.icon}
                        </a>
                    ))}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row classN ame="mb-3">
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control
                                    required
                                    name='oldPassword'
                                    type="password"
                                    placeholder="Current Password"
                                    onChange={(e) => setoldPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name='newPassword'
                                    placeholder="New Password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name='confirmPassword'
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                        </Row>
                        <br/>
                        <Button type="submit">Change Password</Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>

    )
}

export default ProCommon