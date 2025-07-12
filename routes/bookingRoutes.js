const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createBookingController,
  getUserBookingsController,
  deleteBookingController,
} = require("../controllers/bookingController");

// router object
const router = express.Router();

// CREATE BOOKING || POST
router.post("/create-booking", requireSignIn, createBookingController);

// GET USER BOOKINGS || GET
router.get("/get-user-bookings", requireSignIn, getUserBookingsController);

// DELETE BOOKING || DELETE
router.delete("/delete-booking/:id", requireSignIn, deleteBookingController);

// export
module.exports = router;