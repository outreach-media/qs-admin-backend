const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: 5000,
      trim: true,
    },
    title: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    tags: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contents", contentSchema);
