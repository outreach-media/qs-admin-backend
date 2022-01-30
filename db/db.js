const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// URI
let mongoAtlasUri = process.env.DATABASE_URI;

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://knowhow:46JcIuZXukmeyu9Z@cluster0.5r5fy.mongodb.net/knowhow-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB Atlas connected.....!!!");
    // console.log(mongoAtlasUri);
  } catch (error) {
    console.log(error);
    // exit process with fail
    process.exit(1);
  }
};

module.exports = connectDB;
