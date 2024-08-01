import "./App.css";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetails from "./component/News Details/NewsDetails";
import PostCategory from "./component/Post Category/PostCategory";
import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Post from "./component/Posts/Post";
import AddPost from "./component/Add Post/AddPost";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { loadUser, loginUser } from "./action/userAction";
import ProtectedRoute from "./Protected Route/ProtectedRoute";
import HomeMain from "./component/Home main/HomeMain";
import DashboardHeader from "./component/Dashboard/DashboardHeader";
import Order from "./component/Order/Order";
import UserOptions from "./component/User Options/UserOptions";
import Profile from "./component/Profile/Profile";
import {ToastContainer} from "react-toastify"
import Search from "./component/Search/Search";
import NotFound from "./component/Not found/NotFound";
import ForgetPassword from "./component/Forget/ForgetPassword";
import ResetPassword from "./component/Reset Password/ResetPassword";
import Footer from "./component/Footer/Footer";
import Contact from "./component/Contact/Contact";
import About from "./component/About/About";
import Register from "./component/Login/Register";
import UsersList from "./component/Admin/UsersList";
import GoTop from "./component/GoTop/GoTop";


function App() {
  const dispatch = useDispatch()
  const {loading,isAuthenticated,user} = useSelector((state)=>state.user)
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  
  // console.log(user)
  return (
    <>
      <Router>
        <Header />
        <ToastContainer position="top-right"/>
        {isAuthenticated && <UserOptions user={user} />}
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post/:id" element={<NewsDetails />} />
          <Route exact path="/posts/:category" element={<PostCategory />} />
          <Route exact path="/search/posts/:keyword" element={<Search />} />
          <Route exact path="/search/posts/" element={<Home />} />
          <Route exact path="/admin/login" element={<Login />} />
          <Route exact path="/admin/signup" element={<Register />} />
          <Route exact path="/password/forget" element={<ForgetPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/contact-us" element={<Contact />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="*" element={<NotFound />} />

          <Route exact path="/check" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Order/>
            </ProtectedRoute>
          } />
          <Route exact path="/user/me" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          } />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user?.role ? true : false}/>}>
            <Route exact path="/admin/dashboard" element={<Dashboard />}/>
            <Route exact path="/admin/add-post" element={<AddPost />} />
            <Route exact path="/admin/posts" element={<Post />} />
            <Route exact path="/admin/users" element={<UsersList />} />
          </Route>

          {/* <Route exact path="/admin/dashboard" element={<Dashboard />} /> */}
          {/* <Route exact path="/admin/posts" element={<Post />} /> */}
          {/* <Route exact path="/admin/add-post" element={<AddPost />} /> */}
          {/* <Route exact path="/user/me" element={<Profile />} /> */}
        </Routes>
        <GoTop/>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
