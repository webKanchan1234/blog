import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from "jodit-react";
import Button from 'react-bootstrap/Button';
import { postDetails } from '../../action/postAction';
import { useDispatch, useSelector } from 'react-redux';

const UpdateUser = ({userId}) => {
    // const params = useParams();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user);
    // console.log(post)
    // const { id } = params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  

//   useEffect(() => {
//     dispatch(userD(postId));
//   }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          name: name,
          email: email,
          role: role,
        };
        // console.log(formData);
        // dispatch(createPost(formData))
      };
    
        
  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Role</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
    </div>
  )
}

export default UpdateUser