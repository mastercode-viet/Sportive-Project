const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getCommentsByProduct,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Get all comments (admin only)
router.get("/", authenticate, authorize("admin"), getAllComments);

// Get comments for a product (public)
router.get("/product/:productId", getCommentsByProduct);

// Add comment (authenticated)
router.post("/product/:productId", authenticate, addComment);

// Update comment (authenticated)
router.put("/:commentId", authenticate, updateComment);

// Delete comment (authenticated)
router.delete("/:commentId", authenticate, deleteComment);

module.exports = router; 