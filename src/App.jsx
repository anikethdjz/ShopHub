import React from 'react'
import './App.css'
import OrdersPage from './orders';

import ShoppingApp from './homepage.jsx'
import CheckoutPage from './checkout.jsx'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext';

function CheckoutWrapper() {
  const navigate = useNavigate();
  return <CheckoutPage onBack={() => navigate(-1)} />
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<ShoppingApp/>} />
        <Route path="/checkout" element={<CheckoutWrapper/>} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/" element={<ShoppingApp />} />
      </Routes>
    </CartProvider>
  )
}

export default App
