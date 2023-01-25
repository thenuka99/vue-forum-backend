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
  }).populate('addedBy', 'name email imageurl').populate('categoryis', 'name')
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
  }).populate('addedBy', 'name email imageurl').populate('categoryis', 'name')
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
  const limit = req.body.limit ? parseInt(req.body.limit) : 10;
  const page = req.body.page ? parseInt(req.body.page) : 0;

  const totalPages = Math.ceil(await posts.countDocuments({ addedBy: userId }) / limit);

  posts.find({ addedBy: userId }, (err, doc) => {
      const newPayload = {
          docs: doc,
          totalPages: totalPages
      }
      ResponseService.generalPayloadResponse(err, newPayload, res);
  })
      .sort({ addedOn: -1 })
      .populate('addedBy', 'name email imageurl')
      .populate('categoryis','name')
      .skip(page * limit).limit(limit);

}

// Get all posts of category.
exports.getAllPostsOfCategory = async function (req, res) {
  const categoryId = req.body.categoryId;

  // Pagination parameters
  const limit = req.body.limit ? parseInt(req.body.limit) : 10;
  const page = req.body.page ? parseInt(req.body.page) : 0;


  const totalPages = Math.ceil(await posts.countDocuments({ categoryis: categoryId }) / limit);

  const result = posts.find({ categoryis: categoryId }, (err, doc) => {
      const newPayload = {
          docs: doc,
          totalPages: totalPages
      }
      ResponseService.generalPayloadResponse(err, newPayload, res);
  })
      .sort({ addedOn: -1 })
      .populate('addedBy', 'name email imageurl')
      .skip(page * limit).limit(limit);

}


// search post by title
exports.searchAllPosts = async function (req, res) {
  const limit = req.body.limit ? parseInt(req.query.limit) : 5;
  const page = req.body.page ? parseInt(req.query.page) : 0;

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


// add comment to post.
exports.addComment = async function (req, res) {
  const comment = {
      content: req.body.content,
      addedBy: req.body.addedBy,
      addedOn: req.body.addedOn,
  };

  Forum_Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true }, (err, doc) => {
      ResponseService.generalResponse(err, res, "comment added successfully");
  });
}


// remove comment from post.
exports.removecomment = async function (req, res) {
  Forum_Post.findByIdAndUpdate(req.body.postId, { $pull: { "comments": { _id: req.body.commentId } } }, { new: true }, (err, doc) => {
      ResponseService.generalResponse(err, res, "vote removed successfully");
  });
}

// update comment.//to do not working
exports.updatecomment = async function (req, res) {
  console.log(req.body)
  Forum_Post.update(
      { 'comments._id': req.body.commentId },
      { $set: { 'comments.$.content': req.body.content } },
      { new: true }, (err, doc) => {
          ResponseService.generalResponse(err, res, "vote updated successfully");
      });
}