const mongoose = require("mongoose");

//Imports
const categories = require('../models/Forum_Category')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create=( async (req, res) => {
  new categories(req.body).save((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res,"Category created successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  categories.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Update
exports.update=(async (req, res) => {
  categories.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "Category updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  categories.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Delete
exports.delete=(async(req, res) => {
  categories.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "Category removed successfully");
  });
});