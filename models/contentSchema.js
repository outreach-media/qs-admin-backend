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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      maxlength: 10,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    customField: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    customValue: {
      type: String,
      maxlength: 50,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contents", contentSchema);
