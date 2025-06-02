const Order = require("../models/Order");

// POST /orders - Create new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /orders - Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("orderItems.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /orders/:userId - Get orders by userId
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("orderItems.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser,
};
