const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Forum controller
const categoryController = require('../controllers/Forum_Category_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>categoryController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => categoryController.update(req, res));

// Delete
router.delete("/",CheckAuth, async (req, res) =>categoryController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => categoryController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => categoryController.getAll(req, res));

module.exports = router;