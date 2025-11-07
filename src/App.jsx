import React from 'react'
import './App.css'
import ShoppingApp from './homepage.jsx'
import CheckoutPage from './checkout.jsx'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

function CheckoutWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  return <CheckoutPage cartItems={location.state?.cart || []} onBack={() => navigate(-1)} />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingApp/>} />
      <Route path="/checkout" element={<CheckoutWrapper/>} />
    </Routes>
  )
}

export default App
