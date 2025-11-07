# ShopHub 🛒

A modern, full-stack e-commerce application built with React and Node.js, featuring a beautiful UI and seamless shopping experience.

![Home](https://github.com/anikethdjz/ShopHub/blob/main/home.png?raw=true)
![Wish](c:\Users\anike\AppData\Local\Temp\wish.png)
![Cart](https://github.com/anikethdjz/ShopHub/blob/main/cart.png?raw=true)
![Orders](https://github.com/anikethdjz/ShopHub/blob/main/order.png?raw=true)
![Checkout](c:\Users\anike\AppData\Local\Temp\checkout.png)

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse through a curated collection of products across multiple categories
- **Smart Search**: Real-time search functionality to find products quickly
- **Product Ratings**: Star ratings and reviews for each product
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### 🛒 Cart Management
- **Dynamic Cart**: Add, update, and remove items with real-time updates
- **Quantity Controls**: Easily adjust product quantities
- **Price Calculation**: Automatic subtotal, tax (18% GST), and total calculation
- **Persistent Cart**: Cart data saved to database for seamless experience

### ❤️ Wishlist
- **Save Favorites**: Add products to wishlist for later purchase
- **Quick Actions**: Move items from wishlist to cart with one click
- **Visual Feedback**: Heart icon animations and filled states

### 💳 Checkout Process
- **Multi-Step Form**: Comprehensive shipping information collection
- **Payment Options**: Credit/Debit card and Cash on Delivery support
- **Order Summary**: Clear breakdown of items, pricing, and taxes
- **Form Validation**: Ensures all required information is provided

### 📦 Order Management
- **Order History**: View all past orders with detailed information
- **Order Tracking**: See order creation date and payment method
- **Item Details**: Complete list of purchased items per order

## 🚀 Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **SweetAlert2** - Elegant alert notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/anikethdjz/ShopHub.git
cd ShopHub
```

### 2. Backend Setup
```bash
cd backend
npm install

```

Create a `.env` file in the project root with:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
hopHub/
├─ backend/ # Express API & MongoDB models
│ ├─ src/
│ ├─ index.js # App entry point
│ ├─ routes/
│ │ ├─ product.js
│ │ ├─ cart.js
│ │ ├─ wishlist.js
│ │ └─ orderRoutes.js
│ └─ models/ # Mongoose schemas
├─ frontend/ # React client
│ ├─ src/
│ ├─ homepage.jsx
│ ├─ checkout.jsx
│ ├─ orders.jsx
│ └─ …
├─ .gitignore
├─ README.md
└─ package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Fetch all products

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Wishlist
- `GET /api/wishlist` - Get wishlist items
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove item from wishlist

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

## 🎨 UI Features

- **Modern Design**: Clean, intuitive interface with emerald accent colors
- **Smooth Animations**: Hover effects and transitions throughout
- **Sticky Navigation**: Always-accessible header and cart
- **Loading States**: Visual feedback during data operations
- **Error Handling**: User-friendly error messages
- **Mobile Responsive**: Optimized for all screen sizes

## 🔐 Security Considerations

- Input validation on both client and server
- MongoDB injection prevention through Mongoose
- CORS enabled for secure cross-origin requests
- Environment variables for sensitive data

## 🌟 Future Enhancements

- [ ] User authentication and authorization
- [ ] Product reviews and ratings system
- [ ] Advanced filtering and sorting
- [ ] Order status tracking
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Product inventory management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Aniketh**
- GitHub: [@anikethdjz](https://github.com/anikethdjz)

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- UI inspiration from modern e-commerce platforms

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ and React