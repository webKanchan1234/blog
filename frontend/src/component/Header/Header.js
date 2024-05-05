import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./header.css"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate=useNavigate()
  const [keyword, setKeyword] = useState("")
  const searchPost=(e)=>{
    // console.log(keyword)
    e.preventDefault()
    navigate(`/search/posts/${keyword}`)
    setKeyword("")
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" className='nav_link'>Home</Nav.Link>
            <Nav.Link href="/posts/sports" className='nav_link'>Sports</Nav.Link>
            <Nav.Link href="/posts/celebrity" className='nav_link'>Celebrity</Nav.Link>
            <Nav.Link href="/posts/entertainment" className='nav_link'>Entertainment</Nav.Link>
            <Nav.Link href="/posts/technology" className='nav_link'>Technology</Nav.Link>
            <Nav.Link href="/posts/cricket" className='nav_link'>Cricket</Nav.Link>
            
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
            />
            <Button type='submit' variant="outline-success" onClick={searchPost}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;