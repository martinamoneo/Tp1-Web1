// contiene todas las rutas

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // cambiar URL sin recargar pagina
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
import CategoryCreate from './pages/Categories/CategoryCreate/CategoryCreate';
import SearchResults from './pages/Search/SearchResults';

function App() {
  return (
    /* se envuelve en un cartprovider para q cualquier componente pueda pedir/mandar datos al carrito */ 
    <CartProvider>
      <Router>  { /* router me permite cambiar la URL sin recargar pagina */} 
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
            <Route path="categories/new" element={<CategoryCreate />} />
            <Route path="categories" element={<AdminCategories />} />
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
