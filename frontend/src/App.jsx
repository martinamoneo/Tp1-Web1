// contiene todas las rutas

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // cambiar URL sin recargar pagina
import { useEffect } from 'react';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/Products/ProductView/ProductView';
import Categories from './pages/Categories/CategoryView/CategoryView';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import Error400 from './pages/Error/400';
import Error500 from './pages/Error/500';
import NotFound404 from './pages/Error/404';
import { CartProvider } from './context/CartContext';

// Nuevas Rutas (Sprint 5)
import ProductsList from './pages/Products/ProductsList/ProductsList';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminInicio from './pages/Admin/AdminInicio';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductForm from './pages/Admin/AdminProductForm';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCategoryForm from './pages/Admin/AdminCategoryForm';
import SearchResults from './pages/Search/SearchResults';

// Componente para escuchar el evento de error 500 de la api
const GlobalErrorHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => navigate('/500');
    window.addEventListener('server-error', handler);
    return () => window.removeEventListener('server-error', handler);
  }, [navigate]);
  return null;
};

function App() {
  return (
    /* se envuelve en un cartprovider para q cualquier componente pueda pedir/mandar datos al carrito */ 
    <CartProvider>
      <Router>  { /* router me permite cambiar la URL sin recargar pagina */} 
      <GlobalErrorHandler />
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminInicio />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id" element={<AdminProductForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/new" element={<AdminCategoryForm />} />
            <Route path="categories/:id" element={<AdminCategoryForm />} />
          </Route>
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/400" element={<Error400 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
