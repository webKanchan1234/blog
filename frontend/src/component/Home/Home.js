import React, { Fragment, useEffect } from "react";
import "./home.css";
import HomeMain from "../Home main/HomeMain";
import News from "../News/News";
import { useDispatch, useSelector } from "react-redux";
import { allPost } from "../../action/postAction";
import Loader from "../Loader/Loader"

const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  return (
    <Fragment>
      <HomeMain />
      {loading ? (
        <Loader/>
      ) : (
        <div className="news_container">
        {posts &&
          posts.map((post) => {
            return <News post={post} />;
          })}
      </div>
      )}
    </Fragment>
  );
};

export default Home;
