import axios from "axios";
import {
  ADD_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ALL_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  CLEAR_ERROR,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
} from "../constant/postConstant";
// import { BASE_URL } from "../api/apiHelper";

export const allPost = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POST_REQUEST });

    // const { data } = await axios.get("http://localhost:5000/api/v1/posts");
    const { data } = await axios.get(`/api/v1/posts`);

    dispatch({
      type: ALL_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get post details

export const postDetails = (id)=>async (dispatch)=>{
  try {
    dispatch({type:POST_DETAILS_REQUEST})
    // const {data} = await axios.get(`http://localhost:5000/api/v1/post/${id}`)
    const {data} = await axios.get(`/api/v1/post/${id}`)
    dispatch({
      type:POST_DETAILS_SUCCESS,
      payload:data.post
    })
  } catch (error) {
    dispatch({
      type:POST_DETAILS_FAIL,
      error:error.response.data.message
    })
  }
}

//create post
export const createPost = (formData)=>async (dispatch)=>{
  try {
    dispatch({type:ADD_POST_REQUEST})
    console.log(formData)
    // const config = { headers: { "Content-Type": "multipart/form-data" },withCredentials:true}
    const {data} =await axios.post(`/api/v1/post`,formData)
    dispatch({
      type:ADD_POST_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:ADD_POST_FAIL,
      payload:error.response.data.message
    })
  }
}

//delete post
export const deletePost = (id)=>async (dispatch)=>{
  try {
    dispatch({type:DELETE_POST_REQUEST})
    const {data} =await axios.delete(`/api/v1/post/${id}`)
    dispatch({
      type:DELETE_POST_SUCCESS,
      payload:data.success
    })
  } catch (error) {
    dispatch({
      type:DELETE_POST_FAIL,
      payload:error.response.data.message
    })
  }
}
//search post
export const searchPosts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_POST_REQUEST });

    // const { data } = await axios.get("http://localhost:5000/api/v1/posts");
    const { data } = await axios.get(`/api/v1/search/posts/${keyword}`);
    

    dispatch({
      type: ALL_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};