import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      const backendCart = (res.data?.items || []).map(it => ({ id: it.id, ...it.product, quantity: it.qty }));
      setCart(backendCart);
      return backendCart;
    } catch (err) {
      console.error('Cart load error', err);
      setCart([]);
      return [];
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
    } catch (err) {
      console.error('Error clearing cart on server', err);
    }
    setCart([]);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, loadCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
