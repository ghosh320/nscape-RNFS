const mongoose = require("mongoose");

// schema
const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please add category"],
    },
    description: {
      type: String,
      required: [true, "Please add post description"],
    },
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

module.exports = mongoose.model("Post", postSchema);
