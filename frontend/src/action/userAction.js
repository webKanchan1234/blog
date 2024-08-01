import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERROR, CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "../constant/userConstant"
import axios from "axios"
import { BASE_URL } from "../api/apiHelper"


//signup
export const signupUser = (formData)=>async (dispatch)=>{
  try {
      dispatch({type:REGISTER_REQUEST})
      // const {data}=await axios.post(`/api/v1/users/login`,formData)
      const {data}=await axios.post(`/api/v1/users/signup`,formData)
      dispatch({
          type:REGISTER_SUCCESS,
          payload:data.user
      })
  } catch (error) {
      dispatch({
          type:REGISTER_FAIL,
          payload:error.response.data.message
      })
  }
}
//login
export const loginUser = (formData)=>async (dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})
        // const {data}=await axios.post("http://localhost:5000/api/v1/users/login",formData,)
        const {data}=await axios.post(`/api/v1/users/login`,formData)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      // const { data } = await axios.get(`http://localhost:5000/api/v1/user/me`,);
      const { data } = await axios.get(`/api/v1/user/me`);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };

// Logout User
export const logout = () => async (dispatch) => {
    try {
      // await axios.get(`http://localhost:5000/api/v1/users/logout`,);
      await axios.get(`/api/v1/users/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//forget password
export const forgetPassword = (email)=>async (dispatch)=>{
  console.log(email)
  try {
    dispatch({type:FORGOT_PASSWORD_REQUEST})
    const {data} = await axios.post(`/api/v1/password/forget`,email)
    dispatch({
      type:FORGOT_PASSWORD_SUCCESS,
      payload:data.message
    })
  } catch (error) {
    dispatch({
      type:FORGOT_PASSWORD_FAIL,
      payload:error.response.data.message
    })
  }
}


//reset password
export const resetPassword = (token,password)=>async (dispatch)=>{
  try {
    dispatch({type:RESET_PASSWORD_REQUEST})
    const {data} = await axios.put(`/api/v1/password/reset/${token}`,password)
    dispatch({
      type:RESET_PASSWORD_SUCCESS,
      payload:data.success
    })
  } catch (error) {
    dispatch({
      type:RESET_PASSWORD_FAIL,
      payload:error.response.data.message
    })
  }
}


// all users
export const allUsers = ()=>async (dispatch)=>{
  try {
    dispatch({type:ALL_USERS_REQUEST})
    const {data} = await axios.get(`/api/v1/users`)
    dispatch({
      type:ALL_USERS_SUCCESS,
      payload:data.users
    })
  } catch (error) {
    dispatch({
      type:ALL_USERS_FAIL,
      payload:error.response.data.message
    })
  }
}


//delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/users/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update assword
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.put(`/api/v1/password/update`,password);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
};


export const contactUs= (formData)=>async (dispatch)=>{
  try {
    dispatch({type:CONTACT_REQUEST})
    const {data} = await axios.post(`/api/v1/contact-us`,formData)
    dispatch({
      type:CONTACT_SUCCESS,
      payload:data.success
    })
  } catch (error) {
    dispatch({
      type:CONTACT_FAIL,
      payload:error.response.data.message
    })
  }
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};