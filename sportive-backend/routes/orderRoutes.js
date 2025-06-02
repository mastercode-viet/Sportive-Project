const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrdersByUser } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:userId", getOrdersByUser);

module.exports = router;
