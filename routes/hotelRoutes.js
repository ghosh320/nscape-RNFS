const express = require("express");
const { requireSignIn } = require("../controllers/userController"); // ✅ fixed typo

const {
  createHotelController,
  getAllHotelsController,
  getUserHotelsController,
  deleteHotelController,
  updateHotelController,
} = require("../controllers/hotelController");

// router object
const router = express.Router();

// CREATE HOTEL || POST
router.post("/create-hotel", requireSignIn, createHotelController);

// GET ALL HOTELS || GET
router.get("/get-all-hotels", getAllHotelsController);

// GET USER HOTELS || GET
router.get("/get-user-hotels", requireSignIn, getUserHotelsController);

// DELETE HOTEL || DELETE
router.delete("/delete-hotel/:id", requireSignIn, deleteHotelController);

// UPDATE HOTEL || PUT
router.put("/update-hotel/:id", requireSignIn, updateHotelController);

// export
module.exports = router;
