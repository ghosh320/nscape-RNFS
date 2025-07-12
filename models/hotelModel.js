const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add hotel name"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please add location"],
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Please add price per night"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
     },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);

