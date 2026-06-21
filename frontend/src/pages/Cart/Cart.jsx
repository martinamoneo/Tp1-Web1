import './cart.css';
import { useState } from 'react'; // hook para guardar el estado (mensaje de error)
import { Link } from 'react-router-dom'; // hook para navegar entre rutas sin recargar página
import QuantitySelector from '../../components/molecules/QuantitySelector'; // componente para seleccionar la cantidad
import { useCart } from '../../context/CartContext'; // hook para obtener el carrito
import Title from '../../components/atoms/Title'; // componente para títulos
import Image from '../../components/atoms/Image'; // componente para imágenes

const Cart = () => { // componente del carrito con funcion flecha
    // uso el hook useCart para obtener el carrito, la funcion para actualizar la cantidad y para vaciar el carrito
    const { cart: carrito, updateQuantity, clearCart } = useCart(); 
    // hook para guardar el mensaje de error
    const [mensaje, setMensaje] = useState(null); 

    // funcion para manejar el cambio de cantidad
    const handleQuantityChange = (productId, action) => {
        // actualiza la cantidad del producto
        const resultMsg = updateQuantity(productId, action);
        // guarda el mensaje de error
        setMensaje(resultMsg); 
    };

    // calcula el total de puntos del carrito
    // reduce reduce el array a un solo valor, en este caso la suma de los puntos de cada item multiplicados por su cantidad
    const total = carrito.reduce((acc, item) => acc + (item.puntos * item.quantity), 0);

    return (
        <main className="cart-container">
            <div className="cart-wrapper">
                <Title level={1} className="title-cart">Tu Carrito</Title>
                
                {mensaje && ( // si hay un error al cambiar la cantidad (es true), muestra el mensaje de error
                    <div className="cart-mensaje-error"> 
                        <i className="fa-solid fa-triangle-exclamation"></i> 
                        {mensaje}
                    </div>
                )}
                
                {carrito.length === 0 ? ( // si el carrito esta vacio muestra el mensaje
                    <div className="cart-vacio">
                        <p>No hay productos por aquí...</p>
                        <Link to="/" className="btn-gris">Volver al inicio</Link>
                    </div>
                ) : (
                    <> {/* si el carrito no esta vacio muestra esto*/}
                        <div className="cart-header-actions">
                            <Link to="/" className="btn-volverInicio">← Volver al inicio</Link>
                            <button onClick={clearCart} className="btn-vaciar">Vaciar carrito</button>
                        </div>

                        <div className="cart-items">
                            {carrito.map(item => ( // recorre el carrito y muestra cada item en un div 
                                <div className="cart-item" key={item.id}> {/* cada prod debe tener un ID para q react lo pueda mostrar */}
                                    <div className="item-img-box">
                                        <Image 
                                            // se fija si hay imagenes y muestra la primera, sino no muestra fallback
                                            src={item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : null} 
                                            alt={item.nombre} 
                                        />
                                    </div>
                                    <div className="item-main-info">
                                        <h4>{item.nombre}</h4>
                                        <p>{item.puntos} puntos</p>
                                    </div>
                                    <div className="item-controls">
                                        <QuantitySelector 
                                            quantity={item.quantity}
                                            onDecrease={() => handleQuantityChange(item.id, 'decrease')}
                                            onIncrease={() => handleQuantityChange(item.id, 'increase')}
                                            className="cart-qty-selector"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="cart-total-bar">
                            <p className="total-text">Total: {total} puntos</p>
                            <Link to="/checkout" className="btn-pagar">Pagar</Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Cart;
