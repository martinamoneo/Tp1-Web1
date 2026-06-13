import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><h2>404 - No encontrado</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
