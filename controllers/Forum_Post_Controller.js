const mongoose = require("mongoose");

//Imports
const posts = require('../models/Forum_Post')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create=( async (req, res) => {
  new posts(req.body).save((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res,"Post created successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  posts.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Update
exports.update=(async (req, res) => {
  posts.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "Post updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  posts.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  }).populate('addedBy', 'name email').populate('categoryis', 'name')
});

// Delete
exports.delete=(async(req, res) => {
  posts.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "Post removed successfully");
  });
});


// Get all posts of user.
exports.getAllPostsOfUser = async function (req, res) {
  const userId = req.params.userId;

  // Pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const totalPages = Math.ceil(await posts.countDocuments({ addedBy: userId }) / limit);

  posts.find({ addedBy: userId }, (err, doc) => {
      const newPayload = {
          docs: doc,
          totalPages: totalPages
      }
      ResponseService.generalPayloadResponse(err, newPayload, res);
  })
      .sort({ addedOn: -1 })
      .populate('addedBy', 'name email')
      .skip(page * limit).limit(limit);

}

// Get all posts of category.
exports.getAllPostsOfCategory = async function (req, res) {
  const categoryId = req.params.categoryId;

  // Pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;


  const totalPages = Math.ceil(await posts.countDocuments({ categoryis: categoryId }) / limit);

  const result = posts.find({ categoryis: categoryId }, (err, doc) => {
      const newPayload = {
          docs: doc,
          totalPages: totalPages
      }
      ResponseService.generalPayloadResponse(err, newPayload, res);
  })
      .sort({ addedOn: -1 })
      .populate('addedBy', 'name email')
      .skip(page * limit).limit(limit);

}

exports.getPostById = function (req, res) {
  posts.findById(req.params.id, (err, doc) => {
      ResponseService.generalPayloadResponse(err, doc, res);
  })
      .populate('addedBy', 'name email')
}
exports.getOneById = function (req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  posts.findById(req.params.id, (err, doc) => {
      ResponseService.generalPayloadResponse(err, doc, res);
  })
      .populate('addedBy', 'name email')
      .populate({
          path: 'comments',
          select: 'content addedOn addedBy',
          perDocumentLimit: limit,
          populate: [{ path: 'addedBy', select: 'name email' }]
      });
}

// search post by title
exports.searchAllPosts = async function (req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const searchTerm = req.params.searchTerm;
  const result = posts.find({ title: { $regex: searchTerm, $options: 'i' } }, (err, doc) => {
      ResponseService.generalPayloadResponse(err, doc, res);
  });
}

// add vote to post.
exports.addVote = async function (req, res) {
  posts.findByIdAndUpdate(req.body.postId, { $push: { votes: req.body.addedBy } }, { new: true }, (err, doc) => {
      ResponseService.generalResponse(err, res, "vote added successfully");
  });
}

// remove vote from post.
exports.removeVote = async function (req, res) {
  posts.findByIdAndUpdate(req.body.postId, { $pull: { votes: req.body.addedBy } }, { new: true }, (err, doc) => {
      ResponseService.generalResponse(err, res, "vote removed successfully");
  });
}