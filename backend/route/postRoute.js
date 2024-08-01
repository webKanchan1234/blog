const express = require("express")
const { createPost, getSinglePost, getAllPost, updatePost, deletePost, postByCategory, createComment } = require("../controller/postController")
const { isAuthenticated, isAuthorizedRoles } = require("../middlware/auth")
const router = express.Router()


router.post("/post",isAuthenticated,isAuthorizedRoles("admin","administrator"),createPost)
router.get("/post/:id",getSinglePost)
router.get("/posts",getAllPost)
router.put("/post/:id",isAuthenticated,isAuthorizedRoles("admin","administrator"),updatePost)
router.delete("/post/:id",isAuthenticated,isAuthorizedRoles("administrator"),deletePost)
router.get("/search/posts/:keyword",getAllPost)
router.post("/post/comment/:id",isAuthenticated,createComment)


module.exports = router