const app = require('express');
const router = app.Router();

// Forum controller
const postController = require('../controllers/Forum_Post_Controller');

// Create
router.post("/", async (req, res) =>postController.create(req, res));

// Update
router.put("/:id", async (req, res) => postController.update(req, res));

// Delete
router.delete("/", async (req, res) =>postController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => postController.getById(req, res));

// Get all
router.get("/", async (req, res) => postController.getAll(req, res));

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