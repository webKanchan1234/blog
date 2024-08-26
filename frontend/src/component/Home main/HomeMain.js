import React, { Fragment, useEffect } from "react";
import "./homemain.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { allPost } from "../../action/postAction";
import MetaData from "../MetaData";
import logo from "../../assets/logo.png"
import ServerError from "../commonError/ServerError";
import Loader from "../Loader/Loader";

const HomeMain = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <ServerError/>  // Display error message to the user
  }

  // if (!posts || posts.length === 0) {
  //   return <p>No posts available</p>;
  // }

  // console.log(posts)
  // const post = posts[posts.length - 1]
  // Ensure posts is defined and has elements
  const post = posts && posts.length > 0 ? posts[posts.length - 1] : null;


  return (
    <Fragment>
      <MetaData title={post?.title} />
      <div className="home_main">
        <div className="home_main_left">
          {post ? (<Link to={`/post/${post?._id}`} className="card_link">
            <Card>
              <Card.Img
                variant="top"
                id="home_img"
                src={post?.image?.url}
              />
              <Card.Body className="card_body">
                <Card.Text style={{ color: "white" }}>
                  {post?.title}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>) : ""}
        </div>
        <div className="home_main_right">
          <div className="home_main_right_header">
            <img
              src={logo}
              alt="latest"
            />
            <p>Recent News</p>
          </div>
          <div className="latest_news">
            {posts &&
              posts.slice(0).reverse().map((post) => {
                return (
                  <Link to={`/post/${post._id}`} className="latest_news_link">
                    <p>
                      {post.title.substr(0, 75)}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeMain;
