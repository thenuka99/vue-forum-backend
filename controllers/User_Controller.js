const mongoose = require("mongoose");

//Imports
const users = require('../models/User')
const ResponseService = require("../utils/RresponseService"); // Response service



//get all
exports.getAll=(async(req, res) => {
  users.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Update
exports.update=(async (req, res) => {
  users.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "user updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  users.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Delete
exports.delete=(async(req, res) => {
  users.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "user removed successfully");
  });
});