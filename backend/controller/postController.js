const catchAsyncError = require("../middlware/catchAsyncError");
const Post = require("../model/postSchema");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

//create post
exports.createPost = catchAsyncError(async (req, res, next) => {
  const { title, subtitle, category, description } = req.body;
  // console.log(req.body.image)
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "blog/posts"
  });

  const post = await Post.create({
    title,
    subtitle,
    category,
    description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    user: req.user,
  });
  res.status(201).json({
    success: true,
    post,
  });
});

//get post
exports.getSinglePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("user");
  if (!post) {
    return next(new ErrorHandler("Post not found with this id: ", 400));
  }
  res.status(200).json({
    success: true,
    post,
  });
});

//get all posts
exports.getAllPost = catchAsyncError(async (req, res, next) => {
  // const posts = await Post.find();
  // console.log(req.params.keyword)
  try {
    const apiFeature = new ApiFeatures(Post.find(), req.params.keyword).search();
    let posts = await apiFeature.query;

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//update post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post not found with this id: ", 400));
  }
  
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    post,
  });
});

//delete post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post not found with this id: ", 400));
  }
  await cloudinary.v2.uploader.destroy(post.image.public_id);
  await Post.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

//find post by category
exports.postByCategory = catchAsyncError(async (req, res, next) => {
  console.log(req.params.keyword);
  const post = await Post.find({ category: req.params.keyword });

  res.status(200).json({
    success: true,
    post,
  });
});

// create comment
exports.createComment = catchAsyncError(async (req, res, next) => {
  const { name, comment } = req.body;
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post not found with this id: ", 400));
  }
  let commentData = {
    name: name,
    comment: comment,
  };
  post.comments.push(commentData);
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
});
