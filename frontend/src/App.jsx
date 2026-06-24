// contiene todas las rutas y las cosas basicas de la pagina (logo, menu, footer)


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // cambiar URL sin recargar pagina
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/Products/ProductView/ProductView';
import Categories from './pages/Categories/CategoryView/CategoryView';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Error400 from './pages/Error/400';
import Error500 from './pages/Error/500';
import NotFound404 from './pages/Error/404';
import { CartProvider } from './context/CartContext';

// Nuevas Rutas (Sprint 5)
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductCreate from './pages/Products/ProductCreate/ProductCreate';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import EmptyState from './components/molecules/EmptyState';

function App() {
  return (
    /* se envuelve en un cartprovider para q cualquier componente pueda pedir/mandar datos al carrito */ 
    <CartProvider>
      <Router>  { /* router me permite cambiar la URL sin recargar pagina */} 
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/new" element={<ProductCreate />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<EmptyState icon="hammer" title="Categorías" description="Página en construcción" />} />
            <Route path="stores" element={<EmptyState icon="hammer" title="Tiendas" description="Página en construcción" />} />
          </Route>
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/400" element={<Error400 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
