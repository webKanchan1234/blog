import React, { Fragment, useEffect } from 'react'
import "./search.css"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { searchPosts } from '../../action/postAction'
import Loader from '../Loader/Loader'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import MetaData from '../MetaData'

const Search = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { loading, posts } = useSelector((state) => state.posts);
    // console.log(params.keyword)

    useEffect(() => {
        dispatch(searchPosts(params.keyword))
        
    }, [dispatch,params.keyword])

    return (
        <Fragment>
          <MetaData title="Search posts" />
            {loading ? (
                <Loader/>
            ) : (
                <div className='search'>
                <div className="search_left">
                    {
                        posts && posts.map((post) => {
                            return (
                                    <Link to={`/post/${post._id}`} className='search_link'>
                                    <img src={post.image.url} alt="image" />
                                    <div className="search_description">
                                        <h2 id='search_title'>{post.title}</h2>
                                        <p id='search_subtitle'>{post.subtitle}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="search_right">
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
                    {post.title.substr(0, 45)}
                  </p>
                </Link>
              );
            })}
        </div>
                </div>
            </div>
            )}
        </Fragment>
    )
}

export default Search