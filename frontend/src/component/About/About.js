import React,{Fragment} from 'react'
import "./about.css"
import { Link } from "react-router-dom"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MetaData from '../MetaData';

const About = () => {
    return (
        <Fragment>
            <MetaData title="About Blog"/>
            <div className='about'>
            <div className="about_left">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="image" />
                </div>
                <h3 id='title'>Kanchan Kumar</h3>
                <p id='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sint vero beatae nesciunt quae illum facere.</p>
                {/* <div className="icons">
                    <Link id='icons_link'><LinkedInIcon /></Link>
                    <Link id='icons_link'><TwitterIcon /></Link>
                    <Link id='icons_link'><InstagramIcon /></Link>
                </div> */}
            </div>
            <div className="about_right">
                <h3>Kanchan Kumar</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, neque in sint facere quas magnam perferendis quis facilis autem libero expedita deserunt commodi, molestiae labore eveniet illo veniam deleniti nemo.</p>
            </div>
        </div>
        </Fragment>
    )
}

export default About