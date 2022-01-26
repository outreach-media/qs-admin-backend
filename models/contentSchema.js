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
    // customField: {
    //   type: String,
    //   maxlength: 32,
    //   trim: true,
    // },
    // customValue: {
    //   type: String,
    //   maxlength: 50,
    //   trim: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contents", contentSchema);
