
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const orderRouter = require('./routes/orderRoutes'); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 5000;
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB connection with enhanced options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 50,
  ssl: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

