const express = require("express");
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controller/contentController");

const { protect, isAdmin } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(protect, getAllContent).post(protect, createContent);

router
  .route("/:id")
  .get(protect, getContentById)
  .put(protect, updateContent)
  .delete(isAdmin, deleteContent);

module.exports = router;
