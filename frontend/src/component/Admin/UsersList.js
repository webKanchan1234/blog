import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import "../Posts/post.css"
import axios from "axios";
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { allUsers, deleteUser } from "../../action/userAction";
import UpdateUser from "./UpdateUser";




const UsersList = () => {
  const dispatch = useDispatch();
  const { isDeleted } = useSelector((state) => state.profile)
  const { loading, users } = useSelector((state) => state.allUsers);
//   const { post } = useSelector((state) => state.postDetails);
  // console.log(post)
  
  const [userId, setUserId] = useState()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    // console.log(id)
    setUserId(id)
    setShow(true)
  };

  const delUser = (id) => {
    // console.log("delete")
    dispatch(deleteUser(id))
  }





  useEffect(() => {
    if (isDeleted) {
      toast.success("User deleted successfully")
    }
    dispatch(allUsers());
    
  }, [dispatch,isDeleted]);

  
  

  let id = 1
  return (
    <>
      <div className="dasboard_home">
        <div className="dasboard_home_sidebar">
          <Sidebar />
        </div>
        <div className="dashboard_post">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{id++}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td colSpan={2}>
                        <span id="edit" onClick={()=>handleShow(user._id)}>
                          <EditIcon />
                        </span>
                        <span id="delete" onClick={() => delUser(user._id)}>
                          <DeleteIcon />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* updating post */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUser userId={userId}/>
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
    </>
  );
};

export default UsersList;
