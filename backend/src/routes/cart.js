const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const MOCK_USER = 'mock-user';

router.get('/', async (req, res) => {
  try {
    console.log('Fetching cart for user:', MOCK_USER);
    const items = await CartItem.find({ userId: MOCK_USER }).populate('productId');
    console.log('Found cart items:', items);

    // Remove any cart items whose product no longer exists and filter them out
    const cleaned = [];
    for (const it of items) {
      if (!it.productId) {
        console.warn('Removing cart item with missing product reference:', it._id);
        await CartItem.findByIdAndDelete(it._id);
        continue;
      }
      cleaned.push(it);
    }

    const formatted = cleaned.map(it => ({
      id: it._id,
      product: it.productId,
      qty: it.qty
    }));

    const total = formatted.reduce((s, it) => s + (it.product.price * it.qty), 0);
    console.log('Formatted cart response:', { items: formatted, total });
    res.json({ items: formatted, total });
  } catch (err) { 
    console.error('Cart fetch error:', err);
    res.status(500).json({ error: err.message }); 
  }
});


router.post('/', async (req, res) => {
  try {
    console.log('Add to cart request:', req.body);
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found:', productId);
      return res.status(404).json({ error: 'Product not found' });
    }

    const existing = await CartItem.findOne({ userId: MOCK_USER, productId });
    if (existing) {
      console.log('Updating existing cart item:', existing);
      existing.qty = existing.qty + qty;
      await existing.save();
      return res.json(existing);
    }

    console.log('Creating new cart item for product:', productId);
    const newItem = await CartItem.create({ userId: MOCK_USER, productId, qty });
    res.status(201).json(newItem);
  } catch (err) { 
    console.error('Cart add error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'not found' });
    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
