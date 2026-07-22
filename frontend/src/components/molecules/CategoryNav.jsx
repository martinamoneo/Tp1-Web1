// barra de categorias

import './CategoryNav.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../atoms/Icon';
import apiService from '../../utils/api';

const CategoryNav = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [isPeeking, setIsPeeking] = useState(false);

    useEffect(() => {
        apiService.getCategories()
            .then(data => {
                setCategorias(Array.isArray(data) ? data : []);
                
                // Dispara la animación CSS después de cargar
                setTimeout(() => {
                    setIsPeeking(true);
                    
                    // Removemos la clase después de 2 segundos (cuando termina la animación)
                    setTimeout(() => {
                        setIsPeeking(false);
                    }, 2000);
                }, 800);
            })
            .catch(err => console.error("Error cargando categorías", err));
    }, []);

    const goToCategory = (categoryName) => {
        navigate(`/categories/${categoryName.toLowerCase()}`);
    };

    return (
        <section className="categories-container">
            <nav className="categories-nav">
                <div className="categories-list">
                    <ul className={`categories-track ${isPeeking ? 'sneak-peek-anim' : ''}`}>
                        {categorias.map(cat => (
                            <li key={cat.id} onClick={() => goToCategory(cat.name)}>
                                <Icon name={cat.icon || 'tags'} type={cat.icon === 'lightbulb' ? 'regular' : 'solid'} />
                                <span>{cat.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </section>
    );
};

export default CategoryNav;
