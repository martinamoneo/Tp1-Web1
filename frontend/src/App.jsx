import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/Products/ProductDetail';
import Categories from './pages/Categories/Categories';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { CartProvider } from './context/CartContext';
import Title from './components/atoms/Title';

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
          <Route path="*" element={<div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><Title level={2} className="title-hero">404 - No encontrado</Title></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
