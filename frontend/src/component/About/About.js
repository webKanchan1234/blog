import React, { Fragment } from 'react'
import "./about.css"
import { Link } from "react-router-dom"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MetaData from '../MetaData';

const About = () => {
    return (
        <Fragment>
            <MetaData title="About Blog" />
            <div className='about'>
                <div className="about_left">
                    <div className="image">
                        <img src="./logo.png" alt="image" />
                    </div>
                    <h3 id='title'>Kanchan Kumar</h3>
                    <p id='desc_about'>Welcome to our blog. We are passionate storytellers, explorers, and enthusiasts dedicated to sharing our insights, experiences, and tips on travel, technology, electronics, celebrity, etc. Our blog is the best resource whether you're looking to read something enjoyable, gain some inspiration, or learn something new.</p>
                    {/* <div className="icons">
                    <Link id='icons_link'><LinkedInIcon /></Link>
                    <Link id='icons_link'><TwitterIcon /></Link>
                    <Link id='icons_link'><InstagramIcon /></Link>
                </div> */}
                </div>
                <div className="about_right">
                    <h3>Kanchan Kumar</h3>
                    <p>Welcome to our blog. We are passionate storytellers, explorers, and enthusiasts dedicated to sharing our insights, experiences, and tips on travel, technology, electronics, celebrity, etc. Our blog is the best resource whether you're looking to read something enjoyable, gain some inspiration, or learn something new.</p>
                </div>
            </div>
        </Fragment>
    )
}

export default About