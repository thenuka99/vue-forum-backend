const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// CRUD Service
const userController = require('../controllers/User_Controller')

// Update
router.put("/:id",CheckAuth, async (req, res) => userController.update(req, res));

// Delete
router.delete("/",CheckAuth, async (req, res) =>userController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => userController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => userController.getAll(req, res));

module.exports = router;