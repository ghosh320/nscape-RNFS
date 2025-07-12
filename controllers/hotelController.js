const hotelModel = require("../models/hotelModel");

// ✅ CREATE HOTEL
const createHotelController = async (req, res) => {
  try {
    const { name, location, pricePerNight, description, image } = req.body;

    if (!name || !location || !pricePerNight || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields: name, location, pricePerNight, description, image.",
      });
    }

    const hotel = await new hotelModel({
      name,
      location,
      pricePerNight,
      description,
      image,
      postedBy: req.auth._id, // Ensure JWT auth middleware is applied
    }).save();

    res.status(201).send({
      success: true,
      message: "Hotel created successfully.",
      hotel,
    });
  } catch (error) {
    console.log("Create Hotel Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in create hotel API.",
      error,
    });
  }
};

// ✅ GET ALL HOTELS
const getAllHotelsController = async (req, res) => {
  try {
    const hotels = await hotelModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All hotels retrieved successfully.",
      hotels,
    });
  } catch (error) {
    console.log("Get All Hotels Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in get all hotels API.",
      error,
    });
  }
};

// ✅ GET USER'S HOTELS
const getUserHotelsController = async (req, res) => {
  try {
    const userHotels = await hotelModel
      .find({ postedBy: req.auth._id })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "User's hotels retrieved successfully.",
      userHotels,
    });
  } catch (error) {
    console.log("Get User Hotels Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in get user hotels API.",
      error,
    });
  }
};

// ✅ DELETE HOTEL
const deleteHotelController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await hotelModel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).send({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Hotel deleted successfully.",
    });
  } catch (error) {
    console.log("Delete Hotel Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete hotel API.",
      error,
    });
  }
};

// ✅ UPDATE HOTEL
const updateHotelController = async (req, res) => {
  try {
    const { name, location, pricePerNight, description, image } = req.body;
    const { id } = req.params;

    if (!name || !location || !pricePerNight || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields to update the hotel.",
      });
    }

    const updatedHotel = await hotelModel.findByIdAndUpdate(
      id,
      { name, location, pricePerNight, description, image },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).send({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Hotel updated successfully.",
      updatedHotel,
    });
  } catch (error) {
    console.log("Update Hotel Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in update hotel API.",
      error,
    });
  }
};

module.exports = {
  createHotelController,
  getAllHotelsController,
  getUserHotelsController,
  deleteHotelController,
  updateHotelController,
};
