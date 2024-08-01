const express = require("express")
const { signUpUser, loginUser, allUsers, userDetails, updateUserDetails, deleteUser, logoutUser, getSingleUser, forgotPassword, resetPassword, contactUs, updatePassword } = require("../controller/userController")
const { isAuthenticated, isAuthorizedRoles } = require("../middlware/auth")
const router = express.Router()


router.post("/users/signup",signUpUser)
router.post("/users/login",loginUser)
router.get("/users/logout",logoutUser)
router.post("/password/forget",forgotPassword)
router.put("/password/reset/:token",resetPassword);
router.post("/contact-us",contactUs);
router.get("/users",isAuthenticated,isAuthorizedRoles("admin","administrator"),allUsers)
router.get("/user/me",isAuthenticated,userDetails)
router.get("/users/:id",isAuthenticated,getSingleUser)
router.put("/users/:id",isAuthenticated,updateUserDetails)
router.put("/password/update",isAuthenticated,updatePassword)
router.delete("/users/:id",isAuthenticated,isAuthorizedRoles("administrator"),deleteUser)


module.exports = router