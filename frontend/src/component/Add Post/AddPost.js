import React, { useState, useRef, useEffect, Fragment } from "react";
import DashboardHeader from "../Dashboard/DashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import JoditEditor from "jodit-react";
import "./addpost.css";
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../action/postAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";

const AddPost = () => {
  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.newPost)
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

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
    dispatch(createPost(formData))
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

  let categories=["celebrity","sports","cricket","technology","entertainment","recent","popular","electronics","mobile","watch","tv","laptop"]

  useEffect(() => {
    if (success) {
      toast.success("Post created successfully")
      setCategory("")
      setDescription("")
      setTitle("")
      setCategory("")
      setImage("")
    }
  }, [success])


  return (
    <Fragment>
      <MetaData title="Add Post"/>
      <div className="dasboard_home">
        <div className="dasboard_home_sidebar">
          <Sidebar />
        </div>
        <div className="dashboard_post">
          <Form onSubmit={handleSubmit}>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
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
                    {
                      categories.map((cat)=>{
                        return(
                          <option value={cat}>{cat}</option>
                        )
                      })
                    }
                    
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Fragment>
            )}


          </Form>
          {/* <form>

          
          </form> */}
        </div>
      </div>
    </Fragment>
  );
};

export default AddPost;
