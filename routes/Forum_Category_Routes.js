const app = require('express');
const router = app.Router();

// Forum controller
const categoryController = require('../controller/Forum_Category_Controller');

// Create
router.post("/", async (req, res) =>categoryController.create(req, res));

// Update
router.put("/:id", async (req, res) => categoryController.update(req, res));

// Delete
router.delete("/", async (req, res) =>categoryController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => categoryController.getById(req, res));

// Get all
router.get("/", async (req, res) => categoryController.getAll(req, res));

module.exports = router;