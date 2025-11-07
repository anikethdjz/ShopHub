import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage({ cartItems = [], onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const taxRate = 0.18; // 18% GST
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const handleProceed = () => {
    console.log('Order Data:', {
      items: cartItems,
      shippingInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod,
      pricing: {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      }
    });
    alert('Order data prepared! Check console for details.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-emerald-500 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Truck className="text-emerald-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="10001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <CreditCard className="text-emerald-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => handleInputChange(e.target)}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 transition ${
                      formData.paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} className={formData.paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-600'} />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => handleInputChange(e.target)}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 transition ${
                      formData.paymentMethod === 'cod'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className={formData.paymentMethod === 'cod' ? 'text-emerald-600' : 'text-gray-600'} />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange(e.target)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange(e.target)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange(e.target)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange(e.target)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-emerald-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST/Tax (18%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-emerald-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceed}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Place Order
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}