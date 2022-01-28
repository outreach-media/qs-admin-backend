const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// URI
let mongoAtlasUri = process.env.DATABASE_URI;

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoAtlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Atlas connected.....!!!");
  } catch (error) {
    console.log(error);
    // exit process with fail
    process.exit(1);
  }
};

module.exports = connectDB;
