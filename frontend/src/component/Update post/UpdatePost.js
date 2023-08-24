import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from "jodit-react";
import Button from 'react-bootstrap/Button';
import { postDetails } from '../../action/postAction';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePost = ({postId}) => {
    // const params = useParams();
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => state.postDetails);
    console.log(post)
    // const { id } = params;
    const editor = useRef(null);

  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  

  useEffect(() => {
    dispatch(postDetails(postId));
  }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          title: title,
          subtitle: subtitle,
          image: image,
          category: category,
          description: description,
        };
        // console.log(formData);
        // dispatch(createPost(formData))
      };
    
    const handleChange = (e) => {
        if (e.target.name === "image") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImage(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        }
      }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Post Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                value={subtitle}
                placeholder="Post Subtitle"
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <JoditEditor
                ref={editor}
                value={description}
                // tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => {
                  setDescription(newContent);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Category</option>
                <option value="celebrity">celebrity</option>
                <option value="sports">sports</option>
                <option value="cricket">cricket</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
    </div>
  )
}

export default UpdatePost