import React, { useEffect } from 'react'
import "./footer.css"
import { Link } from "react-router-dom"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from "react-redux";
import { allPost } from '../../action/postAction';

const Footer = () => {
    const dispatch = useDispatch();
    const { loading, posts } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(allPost());

    }, [dispatch]);


    return (
        <div className='footer_container'>
            <div className='footer'>
                <div className="footer_box">
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="logo" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur, facere placeat sunt iure corporis aliquam molestias.</p>
                    {/* <div className="footer_icons">
                    <Link id='link'><LinkedInIcon/></Link>
                    <Link id='link'><TwitterIcon/></Link>
                    <Link id='link'><InstagramIcon/></Link>
                </div> */}
                </div>
                <div className="footer_box">
                    <p id='imp_link'>Important Links</p>
                    <div className="footer_link">
                        <Link to="/about-us" id='link'>About Us</Link> <br />
                        <Link to="/tems-and-condition" id='link'>Terms & Conditions</Link> <br />
                        <Link to="/privacy" id='link'>Privacy Policy</Link> <br />
                        <Link to="/contact-us" id='link'>Contact Us</Link>
                    </div>
                </div>
                <div className="footer_box">
                    <p id='imp_link'>Popular Posts</p>
                    <div className="footer_post">
                        {
                            posts &&
                            posts.slice(0,6).reverse()
                            .filter((cat) => cat.category === "celebrity")
                                .map((post) => {
                                    return (
                                        <>
                                        <Link id='link' to={`/post/${post._id}`}>{post.title.substr(0, 20)}</Link> <br/>
                                        </>
                                    )
                                })
                        }

                    </div>
                </div>
            </div>
            <p id='reserved'>© 2023 Copyright 2023, Blog. All Rights Reserved</p>
        </div>
    )
}

export default Footer