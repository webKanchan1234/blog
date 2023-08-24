import React, { Fragment, useEffect } from "react";
import "./postcategory.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { allPost} from "../../action/postAction";
import Loader from "../Loader/Loader";

const PostCategory = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);
  const { category } = params;
  // console.log(params)

  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="post_category">
          <div className="post_category_left">
            {posts &&
              posts
                .filter((cat) => cat.category === category)
                .map((post) => {
                  return (
                    <Link
                      to={`/post/${post._id}`}
                      className="news_details_left_related_link"
                    >
                      <Card>
                        <Card.Img variant="top" src={post.image.url} />
                        <Card.Body
                          className="card_body"
                          style={{ padding: "5px" }}
                        >
                          <Card.Text
                            style={{
                              color: "white",
                              fontSize: "15px",
                              lineHeight: "18px",
                            }}
                          >
                            {post.title.substr(0, 60)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  );
                })}
          </div>
          <div className="post_category_right">
            <h3 id="related_news">Related News</h3>
            {posts &&
              posts.map((post) => {
                return (
                  <Link to={`/post/${post._id}`} className="latest_news_link">
                    <p>
                      {post.title.substr(0, 55)}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>

      )}
    </Fragment>
  );
};

export default PostCategory;
