const express = require("express")
const { createPost, getSinglePost, getAllPost, updatePost, deletePost, postByCategory, createComment } = require("../controller/postController")
const { isAuthenticated, isAuthorizedRoles } = require("../middlware/auth")
const router = express.Router()


router.post("/post",isAuthenticated,isAuthorizedRoles("admin"),createPost)
router.get("/post/:id",getSinglePost)
router.get("/posts",getAllPost)
router.put("/post/:id",isAuthenticated,isAuthorizedRoles("admin"),updatePost)
router.delete("/post/:id",isAuthenticated,isAuthorizedRoles("admin"),deletePost)
router.get("/search/posts/:keyword",getAllPost)
router.post("/post/comment/:id",isAuthenticated,createComment)


module.exports = router