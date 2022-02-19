const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      //get user from the token
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ Status: "Not authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ Status: "Not authorized, no token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== 0) {
    return res.status(403).json({
      error: "You're not admin, access denied",
    });
  }
  next();
};
module.exports = {
  protect,
  isAdmin,
};
