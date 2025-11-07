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

// Order related API calls
export const getOrders = () => api.get('/orders');
export const createOrder = (data) => api.post('/orders', data);
export const getOrderById = (id) => api.get(`/orders/${id}`);

// Add interceptors for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized access');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error occurred');
    }
    return Promise.reject(error);
  }
);
