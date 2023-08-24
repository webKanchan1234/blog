import React, { Fragment, useEffect } from "react";
import "./homemain.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { allPost } from "../../action/postAction";
import MetaData from "../MetaData";

const HomeMain = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  const post=posts[posts.length-1]
  // console.log(post?._id)

  return (
    <Fragment>
      <MetaData title={post?.title} />
      <div className="home_main">
      <div className="home_main_left">
        {post ? (<Link to={`/post/${post?._id}`} className="card_link">
          <Card>
            <Card.Img
              variant="top"
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
            src="https://cdn.mos.cms.futurecdn.net/KSyBSzdtzZZ9g575V8kYv6-970-80.jpg.webp"
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
