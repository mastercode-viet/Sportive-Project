const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder
} = require('../controllers/orderController');

// Public routes
router.post('/', createOrder);

// Admin routes
router.get('/', getOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/payment', updatePaymentStatus);
router.post('/:id/cancel', cancelOrder);

module.exports = router;
