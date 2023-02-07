const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Forum controller
const postController = require('../controllers/Forum_Post_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>postController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => postController.update(req, res));

// Delete
router.delete("/:id",CheckAuth, async (req, res) =>postController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => postController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => postController.getAll(req, res));

// Get all posts of user
router.get('/user/:userId',CheckAuth, postController.getAllPostsOfUser);

// Get all posts of category
router.get('/category/:categoryId',CheckAuth, postController.getAllPostsOfCategory);

// search post by title
router.get('/searchTerm/:searchTerm',CheckAuth, postController.searchAllPosts);

// Add vote
router.put('/like',CheckAuth, (req, res) => postController.addVote(req, res));

// remove vote
router.put('/unlike',CheckAuth, (req, res) => postController.removeVote(req, res));

// Add comment
router.put('/comment', (req, res) => postController.addComment(req, res));

// Remove comment
router.put('/comment/remove', (req, res) => postController.removecomment(req, res));

// Update comment
router.patch('/comment', (req, res) => postController.updatecomment(req, res));

module.exports = router;