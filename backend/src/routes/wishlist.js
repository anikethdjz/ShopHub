const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/WishlistItem');
const Product = require('../models/Product');

const MOCK_USER = 'mock-user';

// GET /api/wishlist
router.get('/', async (req, res) => {
  try {
    console.log('Fetching wishlist for user:', MOCK_USER);
    const items = await WishlistItem.find({ userId: MOCK_USER }).populate('productId');
    console.log('Found wishlist items:', items);

    // Remove wishlist entries whose product no longer exists
    const cleaned = [];
    for (const it of items) {
      if (!it.productId) {
        console.warn('Removing wishlist item with missing product reference:', it._id);
        await WishlistItem.findByIdAndDelete(it._id);
        continue;
      }
      cleaned.push(it);
    }

    const formatted = cleaned.map(it => ({ id: it._id, product: it.productId }));
    console.log('Formatted wishlist response:', formatted);
    res.json(formatted);
  } catch (err) { 
    console.error('Wishlist fetch error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// POST /api/wishlist { productId }
router.post('/', async (req, res) => {
  try {
    console.log('Add to wishlist request:', req.body);
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found:', productId);
      return res.status(404).json({ error: 'Product not found' });
    }

    const exists = await WishlistItem.findOne({ userId: MOCK_USER, productId });
    if (exists) {
      console.log('Item already in wishlist:', exists);
      return res.json(exists);
    }

    console.log('Adding new wishlist item for product:', productId);
    const newItem = await WishlistItem.create({ userId: MOCK_USER, productId });
    res.status(201).json(newItem);
  } catch (err) { 
    console.error('Wishlist add error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// DELETE /api/wishlist/:id
router.delete('/:id', async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
