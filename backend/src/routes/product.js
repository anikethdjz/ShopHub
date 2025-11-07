const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    console.log('Fetching products...');
    const list = await Product.find();
    console.log(`Found ${list.length} products`);
    res.json(list);
  } catch (err) { 
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;
