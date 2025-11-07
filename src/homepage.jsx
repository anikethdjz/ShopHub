import React, { useState, useEffect } from 'react';
import api from './services/api';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, Heart, Star, Search } from 'lucide-react';

const STATIC_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 129.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.5 },
  { id: 2, name: 'Smart Watch Pro', price: 249.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.8 },
  { id: 3, name: 'Leather Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: 'Accessories', rating: 4.3 },
  { id: 4, name: 'Designer Sunglasses', price: 159.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'Accessories', rating: 4.6 },
  { id: 5, name: 'Running Shoes Elite', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Footwear', rating: 4.7 },
  { id: 6, name: 'Smart Coffee Maker', price: 79.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', category: 'Home', rating: 4.4 },
  { id: 7, name: 'Yoga Mat Premium', price: 49.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', category: 'Fitness', rating: 4.5 },
  { id: 8, name: 'Bluetooth Speaker', price: 89.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: 'Electronics', rating: 4.6 },
];






export default function ShoppingApp() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [pRes, cRes, wRes] = await Promise.all([
          api.get('/products'),
          api.get('/cart'),
          api.get('/wishlist')
        ]);

        console.log('Products from API:', pRes.data);
        // Handle both direct array response and {value: [...]} response
        const backendProducts = Array.isArray(pRes.data) ? pRes.data : (pRes.data?.value || []);
        if (backendProducts.length > 0) {
          console.log(`Setting ${backendProducts.length} products from backend`);
          setProducts(backendProducts);
        }

        const backendCartItems = cRes.data.items.map(it => ({
          id: it.id,
          ...it.product,
          quantity: it.qty
        }));
        setCart(backendCartItems);

        // keep wishlist items as { id: wishlistId, product: productObj }
        const wishlistItems = wRes.data.map(it => ({ id: it.id, product: it.product }));
        setWishlist(wishlistItems);
      } catch (err) {
        console.error('load error', err);
      }
    }
    load();
  }, []);


const addToCart = async (product) => {
  try {
    console.log('Adding to cart:', product);
    let productId = product._id;
    // If product has no _id (static fallback), try to find matching backend product by name
    if (!productId) {
      const match = products.find(p => (p._id || p.id) && p.name === product.name);
      productId = match? (match._id || match.id) : null;
      if (!productId) {
        console.error('No product ID found and no backend match:', product);
        return;
      }
    }
    const response = await api.post('/cart', { productId, qty: 1 });
    console.log('Cart add response:', response.data);
    
    const { data } = await api.get('/cart');
    console.log('Updated cart:', data);
    const backendCart = data.items.map(it => ({ 
      id: it.id, 
      ...it.product,
      quantity: it.qty 
    }));
    setCart(backendCart);
  } catch (err) { 
    console.error('Add to cart error:', err); 
  }
};

const toggleWishlist = async (product) => {
  try {
    console.log('Toggle wishlist for product:', product);
    // Ensure we have a backend product id to work with (map static product if needed)
    let targetProductId = product._id;
    if (!targetProductId) {
      const match = products.find(p => (p._id || p.id) && p.name === product.name);
      targetProductId = match? (match._id || match.id) : null;
    }

    // Use MongoDB _id for comparison
    const exists = wishlist.find(w => {
      const wishlistProductId = w.product?._id;
      console.log('Comparing:', { wishlistProductId, targetProductId });
      return wishlistProductId === targetProductId;
    });

    if (exists) {
      console.log('Removing from wishlist:', exists.id);
      await api.delete(`/wishlist/${exists.id}`);
    } else {
      console.log('Adding to wishlist:', product._id);
      await api.post('/wishlist', { productId: product._id });
    }

    const { data } = await api.get('/wishlist');
    console.log('Updated wishlist:', data);
    setWishlist(data.map(it => ({ id: it.id, product: it.product })));
  } catch (err) {
    console.error('Wishlist error:', err);
  }
};


const updateQuantity = async (cartItemId, delta) => {
  try {
    console.log('Updating quantity for item:', cartItemId, 'delta:', delta);
    const current = cart.find(i => i.id === cartItemId);
    const newQty = (current?.quantity || 0) + delta;
    if (newQty <= 0) {
      await api.delete(`/cart/${cartItemId}`);
    } else {
      await api.put(`/cart/${cartItemId}`, { qty: newQty });
    }
    const { data } = await api.get('/cart');
    setCart(data.items.map(it => ({ id: it.id, ...it.product, quantity: it.qty })));
  } catch (err) { console.error('updateQuantity error', err); }
};

const removeFromCart = async (cartItemId) => {
  await api.delete(`/cart/${cartItemId}`);
  const { data } = await api.get('/cart');
  setCart(data.items.map(it => ({ id: it.id, ...it.product, quantity: it.qty })));
};


  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    // navigate to checkout route and pass cart via location state
    navigate('/checkout', { state: { cart } });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <ShoppingCart className="text-white" size={28} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ShopHub</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowWishlist(!showWishlist)}
                className="relative text-gray-600 hover:text-emerald-500 transition"
              >
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline font-medium">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                  onClick={() => alert('Login feature coming soon!')}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg"
                >
                  Login
              </button>
            </div>
          </div>

          <div className="pb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <span className="text-gray-600">{filteredProducts.length} items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id || product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition ${
                        wishlist.some(w => (w.product && (w.product._id || w.product.id)) === (product._id || product.id)) ? 'bg-red-100' : 'hover:bg-red-50'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={`${
                          wishlist.some(w => (w.product && (w.product._id || w.product.id)) === (product._id || product.id))
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-2xl font-bold text-emerald-600 mb-4">${product.price}</p>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showWishlist && (
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-lg sticky top-24">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Your Wishlist</h2>
                  <button
                    onClick={() => setShowWishlist(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-6">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No favorites yet</p>
                      <p className="text-sm text-gray-400 mt-1">Tap the heart on any product to add!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.product.name}</h3>
                            <p className="text-emerald-600 font-bold mt-1">${item.product.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => addToCart(item.product)}
                                className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md transition"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => toggleWishlist(item.product)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showCart && (
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-lg sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    <button
                      onClick={() => setShowCart(false)}
                      className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <p className="text-sm text-gray-400 mt-1">Add some products to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                            <p className="text-emerald-600 font-bold mt-1">${item.price}</p>
                            
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-2 py-1 hover:bg-gray-200 rounded-l-lg transition"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="font-semibold text-black text-100 px-1.5">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-2 py-1 hover:bg-gray-200 rounded-r-lg transition"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">${getTotal()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-emerald-600">Free</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-emerald-600">${getTotal()}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showCart && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-emerald-600 font-bold mt-1">${item.price}</p>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 py-1 hover:bg-gray-200 rounded-l-lg"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-semibold text-sm px-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 py-1 hover:bg-gray-200 rounded-r-lg"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">${getTotal()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-emerald-600">${getTotal()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}