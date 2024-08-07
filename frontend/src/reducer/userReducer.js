import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERROR,
  CONTACT_FAIL,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constant/userConstant";

export const loginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case LOGOUT_FAIL:
        return {
          ...state,
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
};


//forget password reducer

export const forgetPasswordReducer = (state={},action)=>{
  switch(action.type){
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return{
        ...state,
        loading:false,
        success:action.payload
      }
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
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


export const allUsersReducer = (state={users:[]},action)=>{
  switch(action.type){
    case ALL_USERS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case ALL_USERS_SUCCESS:
      return{
        ...state,
        loading:false,
        users:action.payload
      }
    case ALL_USERS_FAIL:
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


//profile reducer

export const profileReducer = (state={},action)=>{
  switch(action.type){
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
      return{
        ...state,
        loading:true
      }
    case UPDATE_PASSWORD_SUCCESS:
      return{
        ...state,
        loading:false,
        isUpdated:action.payload.success
      }
    case DELETE_USER_SUCCESS:
      return{
        ...state,
        loading:false,
        isDeleted:action.payload.success,
      }
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
      return{
        ...state,
        loading:false,
        error:action.payload.message
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


//contact us
export const contactReducer=(state={user:{}},action)=>{
  switch(action.type){
    case CONTACT_REQUEST:
      return{
        ...state,
        loading:true
      }
    case CONTACT_SUCCESS:
      return{
        ...state,
        loading:false,
        success:action.payload
      }
    case CONTACT_FAIL:
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