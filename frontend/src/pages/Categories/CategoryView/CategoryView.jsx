import './CategoryView.css';
import { useState, useEffect } from 'react'; // useState -> manejar estados, useEffect -> manejar efectos secundarios 
import { useParams, Link } from 'react-router-dom'; // useParams -> obtener parámetros de la URL, Link -> crear enlaces 
import CategoryNav from '../../../components/molecules/CategoryNav'; 
import apiService from '../../../utils/api'; 
import Title from '../../../components/atoms/Title';
import Icon from '../../../components/atoms/Icon';
import { SkeletonGrid } from '../../../components/molecules/ProductSkeleton';
import useDelayedLoading from '../../../hooks/useDelayedLoading';
import Breadcrumb from '../../../components/molecules/Breadcrumb';
import ProductCard from '../../../components/molecules/ProductCard';

const Categories = () => {
    const { categoryName } = useParams(); // obtengo el nombre de la categoría de la URL
    const [productos, setProductos] = useState([]); // estado q guarda los productos de esa categoria
    const [categoriaNombre, setCategoriaNombre] = useState(''); // estado q guarda el nombre de la categoria
    const [loading, setLoading] = useState(true); // estado q indica si se esta cargando
    const showLoading = useDelayedLoading(loading, 200);

    useEffect(() => { // hook q se ejecuta cuando cambia la categoriaName
        const fetchCategory = async () => { // funcion asincrona q obtiene los productos de la categoria
            try {
                setLoading(true); // empieza a cargar
                // espera q el back le mande el producto de la categoria
                const data = await apiService.getCategoryProducts(categoryName);
                
                if (data.productos) { // si hay productos
                    setProductos(data.productos); // guarda los productos en el estado
                    setCategoriaNombre(data.categoriaNombre || categoryName); // guarda el nombre de la categoria y si no hay lo toma del useParams
                } else { // si no hay productos
                    setProductos([]); // guarda vacio en el estado
                    setCategoriaNombre(categoryName); // guarda el nombre de la categoria de la URL
                }
            } catch (error) {
                console.error('Error fetching category:', error);
                setProductos([]); // guarda vacio en el estado
            } finally {
                setLoading(false); // deja de cargar
            }
        };

        fetchCategory();
    }, [categoryName]); // se ejecuta cuando cambia la categoriaName

    return (
        <main className="category-page">
            <div className="category-breadcrumb-wrapper">
                <Breadcrumb 
                    items={[
                        { label: 'Home', link: '/' },
                        { label: categoriaNombre }
                    ]} 
                />
            </div>

            <CategoryNav />

            {/* section donde se muestran los productos */}
            <section className="products-section category-products-section">
                {/* titulo de la categoria */}
                <Title level={2} className="title-section category-title-section">Categoría: {categoriaNombre}</Title>
                
                {/* si esta cargando muestra un mensaje */}
                {showLoading ? (
                    <SkeletonGrid count={8} />
                ) : productos.length > 0 ? (
                    <div className="products-grid">
                        {/* recorre los productos y muestra cada uno */}
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="sugeridos-vacio category-vacio">
                        <Icon type="regular" name="face-frown" />
                        <p>Lo sentimos, no hay productos en esta categoría en este momento.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Categories;