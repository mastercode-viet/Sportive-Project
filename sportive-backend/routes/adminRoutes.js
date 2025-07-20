const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/dashboard", authenticate, authorize("admin"), getDashboardStats);

module.exports = router; 