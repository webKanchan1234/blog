import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allPostReducer, createPost, postDetailsReducer, postReducer } from "./reducer/postReducer";
import { allUsersReducer, contactReducer, forgetPasswordReducer, loginReducer, profileReducer } from "./reducer/userReducer";


const reducer = combineReducers({
    posts: allPostReducer,
    postDetails:postDetailsReducer,
    user:loginReducer,
    allUsers:allUsersReducer,
    profile:profileReducer,
    post:postReducer,
    newPost:createPost,
    forgetPassword:forgetPasswordReducer,
    contactus:contactReducer
  });
  
  let initialState = {};
  
  const middleware = [thunk];
  
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;