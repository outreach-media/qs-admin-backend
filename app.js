const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const app = express();

//middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// conncet database
connectDB();

const contentList = require("./routes/contentRoute");

//routes
app.use("/content", contentList);
//server
// const port = process.env.PORT || 5000;
// const server_host = "0.0.0.0";
// app.listen(port, server_host, () => {
//   console.log(`App is running at port ${port}`);
// });

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log("Listening on port %d", server_port);
});
