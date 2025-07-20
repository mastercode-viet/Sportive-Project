const Comment = require("../models/Comment");
const Product = require("../models/Product");

// Get all comments (admin only)
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username")
      .populate("product", "name")
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments for a product
const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ product: productId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const { productId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = new Comment({
      product: productId,
      user: userId,
      content,
      rating: rating || 5,
    });

    await comment.save();
    
    // Populate user info for response
    await comment.populate("user", "username");
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to update this comment" });
    }

    comment.content = content;
    comment.rating = rating;
    await comment.save();
    
    await comment.populate("user", "username");
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user owns the comment or is admin
    if (comment.user.toString() !== userId.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComments,
  getCommentsByProduct,
  addComment,
  updateComment,
  deleteComment,
}; 