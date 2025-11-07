
require('dotenv').config();
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

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

