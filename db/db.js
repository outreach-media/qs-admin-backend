const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// URI
let mongoAtlasUri = process.env.DATABASE_URI;
// DB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoAtlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Atlas connected to ${conn.connection.host}`.red);
    // console.log(mongoAtlasUri);
  } catch (error) {
    console.log(`Error is ${error}`.red);
    // exit process with fail
    process.exit(1);
  }
};

module.exports = connectDB;
