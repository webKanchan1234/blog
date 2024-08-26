import React, { Fragment, useEffect, useState } from "react";
import "./newsdetails.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { allPost, postDetails } from "../../action/postAction";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import logo from "../../assets/logo.png"
// import moment from "moment"

const NewsDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => state.postDetails);
  const { posts } = useSelector((state) => state.posts);
  const { id } = params;

  const [diff, setDiff] = useState("")
  const [mins, setMins] = useState("")

  const [date2, setDate2] = useState()
  const date1 = new Date(post.createdAt)
  // const date2 = new Date(Date.now())
  const diffInMs = Math.abs(date2 - date1);

  const diffInSec = Math.floor(diffInMs / 1000);
const diffInMin = Math.floor(diffInSec / 60);
const diffInHour = Math.floor(diffInMin / 60);
const diffInDay = Math.floor(diffInHour / 24);

// console.log(diffInSec%60)
// console.log(diffInMin%60)
// console.log(diffInHour%24)
// console.log(diffInDay)

  useEffect(() => {
    dispatch(postDetails(id));
    setDate2(new Date(Date.now()))
    
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(allPost());

  }, [dispatch]);

  const category = post.category;
  

  return (
    <Fragment>
      <MetaData title={post.title} />
      {loading ? (
        <Loader />
      ) : (
        <div className="news_details">
          <div className="news_details_left">
            <h3>{post.title}</h3> 
            <p>
              By <b>{post.user?.name}.</b> Last updated{" "}
              {diffInDay%24 >0 ? diffInDay%24 + " days" : ""} {diffInHour%24 > 0 ? diffInHour%24 + " hours" : "" } {diffInMin%60} mins ago
               
            </p>
            <p>{post.subtitle}</p>
            {/* <div className="news_details_left_icons"></div> */}
            <img src={post.image?.url}  alt={post.title} />
            
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>

            <h3 id="related_news">Related News</h3>
            <div className="news_details_left_related">
              {posts &&
                posts.filter((cat) => cat.category !== category).map((post) => {
                  return (
                    <Link to={`/post/${post._id}`} className="news_details_left_related_link">
                      <Card>
                        <Card.Img
                          // variant="top"
                          style={{ marginBottom: "0px", height:"220px" }}
                          src={post.image?.url}
                        />
                        <Card.Body className="card_body" style={{ padding: "5px" }}>
                          <Card.Text style={{ color: "white", fontSize: "15px", lineHeight: "18px" }}>
                            {post.title.substr(0, 60)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="news_details_right">
            <div className="home_main_right_header">
              <img
                src={logo}
                alt="latest"
              />
              <p>Related News</p>
            </div>
            <div className="latest_news">
              {posts &&
                posts
                  .filter((cat) => cat.category === category && cat._id !== id)
                  .map((post) => {
                    return (
                      <Link to={`/post/${post._id}`} className="latest_news_link">
                        <p>{post.title.substr(0, 45)}</p>
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default NewsDetails;
