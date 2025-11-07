const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Schema for Order
const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  shippingInfo: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  pricing: { type: Object, required: true },
  createdAt: { type: String, default: new Date().toISOString() },
});

// Model
const Order = mongoose.model('Order', orderSchema);

// POST /api/orders — Save new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (err) {
    console.error('Error saving order:', err);
    res
      .status(500)
      .json({ message: 'Error saving order', error: err.message });
  }
});

// GET /api/orders — Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res
      .status(500)
      .json({ message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router;
