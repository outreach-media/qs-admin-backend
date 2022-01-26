const Contents = require("../models/contentSchema");

exports.getAllContent = async (req, res) => {
  try {
    const contents = await Contents.find();
    res.status(200).json({
      status: "Success",
      Total: contents.length,
      contents,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      content,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};

exports.createContent = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const notes = req.body.notes;
    const customField = req.body.customField;
    const customValue = req.body.customValue;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);

    const newContent = new Contents({
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
      customField,
      customValue,
      dateOfBirth,
    });

    const content = await newContent.save();
    res.status(201).json({
      status: "Success",
      message: "Content successfully added to DB",
      content,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);

    if (!content) return res.status(404).json({ Error: "Contact not found" });

    await content.update(req.body, {
      new: true,
    });

    res.status(200).json({
      msg: "Contact updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);

    if (!content) return res.status(404).json({ msg: "Post Not Found" });
    await content.remove();
    res.json({
      msg: "Contact successfully deleted ",
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};
