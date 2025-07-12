const postModel = require("../models/postModel");

// ✅ CREATE POST
const createPostController = async (req, res) => {
  try {
    const {
      category,
      description,
      name,
      location,
      pricePerNight,
      image
    } = req.body;

    // validation
    if (!category || !description || !name || !location || !pricePerNight || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const post = await new postModel({
      category,
      description,
      name,
      location,
      pricePerNight,
      image,
      postedBy: req.auth._id, // make sure JWT auth middleware is applied
    }).save();

    res.status(201).send({
      success: true,
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create post API",
      error,
    });
  }
};

// ✅ GET ALL POSTS
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all posts API",
      error,
    });
  }
};

// ✅ GET USER'S POSTS
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel
      .find({ postedBy: req.auth._id })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "User's posts retrieved successfully.",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get user posts API",
      error,
    });
  }
};

// ✅ DELETE POST
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).send({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete post API",
      error,
    });
  }
};

// ✅ UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const {
      category,
      description,
      name,
      location,
      pricePerNight,
      image
    } = req.body;
    const { id } = req.params;

    if (!category || !description || !name || !location || !pricePerNight || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields to update the post.",
      });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { category, description, name, location, pricePerNight, image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Post updated successfully.",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update post API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
