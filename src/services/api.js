import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;

// Convenience helpers
export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (id, data) => api.put(`/cart/${id}`, data);
export const removeFromCart = (id) => api.delete(`/cart/${id}`);

export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (data) => api.post('/wishlist', data);
export const removeFromWishlist = (id) => api.delete(`/wishlist/${id}`);

