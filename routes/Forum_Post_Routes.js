const app = require('express');
const router = app.Router();

// Forum controller
const postController = require('../controllers/Forum_Post_Controller');

// Create

// Update

// Delete

// Get by id

// Get all
router.get('/', postController.getAll);

// Get all posts of user
router.get('/user/:userId', postController.getAllPostsOfUser);

// Get all posts of category
router.get('/category/:categoryId', postController.getAllPostsOfCategory);

// search post by title
router.get('/searchTerm/:searchTerm', postController.searchAllPosts);

// Add vote
router.put('/like', (req, res) => postController.addVote(req, res));

// remove vote
router.put('/unlike', (req, res) => postController.removeVote(req, res));
module.exports = router;