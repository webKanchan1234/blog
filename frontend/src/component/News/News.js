import React from 'react'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "./news.css"

const News = ({post}) => {


  return (
    <>
        <Link to={`/post/${post._id}`} className="news_container_link" >
          <Card >
            <Card.Img variant="top" src={post.image.url} />
            <Card.Body className="card_body" style={{ padding:"10px"}}>
              <Card.Text style={{ color: "white",fontSize:"15px", lineHeight:"20px" }}>
                {post.title.substr(0,55)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
    </>
  )
}

export default News