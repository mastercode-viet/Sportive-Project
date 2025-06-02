const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Routes for products
router.route("/")
  .get(getAllProducts)
  .post(createProduct);

router.route("/:id")
  .get(getProduct)
  .put(authenticate, authorize("admin"), updateProduct)
  .delete(authenticate, authorize("admin"), deleteProduct);

module.exports = router;
