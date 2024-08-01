import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import "./post.css";
import { allPost, deletePost } from "../../action/postAction";
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import UpdatePost from "../Update post/UpdatePost";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";




const Post = () => {
  const dispatch = useDispatch();
  const { isDeleted } = useSelector((state) => state.post)
  const { loading, posts } = useSelector((state) => state.posts);
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const [postId, setPostId] = useState()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    // console.log(id)
    setPostId(id)
    setShow(true)
  };

  const delePost = (id) => {
    // console.log("delete")
    dispatch(deletePost(id))
  }





  useEffect(() => {
    if (isDeleted) {
      toast.success("Post deleted successfully")
    } 
    dispatch(allPost());

  }, [dispatch, isDeleted]);




  let id = 1
  return (
    <Fragment>
      <MetaData title="All Posts" />
      <div className="dasboard_home">
        <div className="dasboard_home_sidebar">
          <Sidebar />
        </div>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="dashboard_post">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {
                  user.role === "administrator" ? (<tbody>
                    {posts &&
                      posts.map((post) => {
                        return (
                          <tr>
                            <td>{id++}</td>
                            <td>{post.title.substr(0, 25)}</td>
                            <td>{post.subtitle?.length > 50 ? post.subtitle.substr(0, 25) : post.subtitle}</td>
                            <td colSpan={2}>
                              <span id="edit" onClick={() => handleShow(post._id)}>
                                <EditIcon />
                              </span>
                              <span id="delete" onClick={() => delePost(post._id)}>
                                <DeleteIcon />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>) : (<tbody>
                  {posts &&
                    posts.map((post) => {
                      return (
                        <tr>
                          <td>{id++}</td>
                          <td>{post.title.substr(0, 25)}</td>
                          <td>{post.subtitle?.length > 50 ? post.subtitle.substr(0, 25) : post.subtitle}</td>
                          <td colSpan={2}>
                            <span id="edit" onClick={() => handleShow(post._id)}>
                              <EditIcon />
                            </span>
                            {/* <span id="delete" onClick={() => delePost(post._id)}>
                              <DeleteIcon />
                            </span> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>)
                }
                
              </Table>
            </div>
          )}
        </Fragment>
      </div>

      {/* updating post */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePost postId={postId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Post;
