import { ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, ALL_POST_FAIL, ALL_POST_REQUEST, ALL_POST_SUCCESS, CLEAR_ERROR, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS } from "../constant/postConstant";



export const allPostReducer = (state = { posts: [] }, action) => {
  
  switch (action.type) {
    case ALL_POST_REQUEST:
      return {
        loading: true,
        posts: [],
      }
    case ALL_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
      }
    case ALL_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const postDetailsReducer = (state={post:{}},action)=>{
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case POST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export const postReducer = (state={},action)=>{
  switch(action.type){
    case DELETE_POST_REQUEST:
      return{
        ...state,
        loading:true
      }
    case DELETE_POST_SUCCESS:
      return{
        ...state,
        loading:false,
        isDeleted:action.payload
      }
    case DELETE_POST_FAIL:
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    case CLEAR_ERROR:
      return{
        ...state,
        error:null
      }
    default:
      return state
  }
}

//add post
export const createPost = (state={post:{}},action)=>{
  switch(action.type){
    case ADD_POST_REQUEST:
      return{
        ...state,
        loading:true
      }
    case ADD_POST_SUCCESS:
      return{
        loading:false,
        success:action.payload.success,
        post:action.payload
      }
    case ADD_POST_FAIL:
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    case CLEAR_ERROR:
      return{
        ...state,
        error:null
      }
    default:
      return state
  }
}