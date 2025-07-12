const bookingModel = require("../models/bookingModel");

// CREATE BOOKING
const createBookingController = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate, totalPrice } = req.body;

    // Validation
    if (!hotelId || !checkInDate || !checkOutDate || !totalPrice) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const booking = await new bookingModel({
      userId: req.auth._id, // JWT auth middleware should set req.auth
      hotelId,
      checkInDate,
      checkOutDate,
      totalPrice,
    }).save();

    res.status(201).send({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).send({
      success: false,
      message: "Error creating booking",
      error,
    });
  }
};

// GET USER BOOKINGS
const getUserBookingsController = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ userId: req.auth._id })
      .populate("hotelId") // optional: you can add `.select("name location")` to limit data
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "User bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching user bookings",
      error,
    });
  }
};

// DELETE BOOKING
const deleteBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    await bookingModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting booking",
      error,
    });
  }
};

module.exports = {
  createBookingController,
  getUserBookingsController,
  deleteBookingController,
};
