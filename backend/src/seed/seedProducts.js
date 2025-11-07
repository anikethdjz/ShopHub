require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { name: 'Premium Wireless Headphones', price: 129.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.5 },
  { name: 'Smart Watch Pro', price: 249.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.8 },
  { name: 'Leather Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: 'Accessories', rating: 4.3 },
  { name: 'Designer Sunglasses', price: 159.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'Accessories', rating: 4.6 },
  { name: 'Running Shoes Elite', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Footwear', rating: 4.7 },
  { name: 'Smart Coffee Maker', price: 79.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', category: 'Home', rating: 4.4 },
  { name: 'Yoga Mat Premium', price: 49.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', category: 'Fitness', rating: 4.5 },
  { name: 'Bluetooth Speaker', price: 89.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.6 },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });
