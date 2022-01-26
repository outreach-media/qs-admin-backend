const express = require("express");
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controller/contentController");

const router = express.Router();

router.route("/").get(getAllContent).post(createContent);

router
  .route("/:id")
  .get(getContentById)
  .put(updateContent)
  .delete(deleteContent);

module.exports = router;
