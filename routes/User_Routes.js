const app = require('express');
const router = app.Router();

// CRUD Service
const userController = require('../controllers/User_Controller')

// Update
router.put("/:id", async (req, res) => userController.update(req, res));

// Delete
router.delete("/", async (req, res) =>userController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => userController.getById(req, res));

// Get all
router.get("/", async (req, res) => userController.getAll(req, res));

module.exports = router;