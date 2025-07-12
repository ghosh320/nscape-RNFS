const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

//router object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsController);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELEET POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

//export
module.exports = router;