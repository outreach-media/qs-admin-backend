const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signup,
  login,
  signout,
  getMe,
} = require("../controller/authController");
const { protect, isAdmin } = require("../middleware/authHandler");

router.post(
  "/signup",
  protect,
  isAdmin,
  [
    check("firstName")
      .isLength({ min: 2 })
      .withMessage("Firstname must have at least 3 chars long"),

    check("lastName")
      .isLength({ min: 2 })
      .withMessage("Lastname must have at least 2 chars long"),

    check("email").isEmail().withMessage("Must be a valid email id"),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 character long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email is required"),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Enter valid password")
      .matches(/\d/)
      .withMessage("Enter valid password"),
  ],
  login
);
router.get("/me", protect, getMe);
router.get("/signout", signout);

module.exports = router;
