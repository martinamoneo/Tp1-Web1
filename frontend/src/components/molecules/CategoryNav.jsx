import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryNav = () => {
    const navigate = useNavigate();

    const goToCategory = (category) => {
        navigate(`/categories/${category}`);
    };

    return (
        <section className="categories-container">
            <nav className="categories-nav">
                <ul className="categories-list">
                    <li onClick={() => goToCategory('mates')}><i className="fas fa-whiskey-glass"></i><span>Mates</span></li>
                    <li onClick={() => goToCategory('vasos')}><i className="fas fa-beer"></i><span>Vasos</span></li>
                    <li onClick={() => goToCategory('llaveros')}><i className="fas fa-key"></i><span>Llaveros</span></li>
                    <li onClick={() => goToCategory('soportes')}><i className="fas fa-crop-simple"></i><span>Soportes</span></li>
                    <li onClick={() => goToCategory('premios')}><i className="fas fa-trophy"></i><span>Premios</span></li>
                    <li onClick={() => goToCategory('munecos')}><i className="fas fa-snowman"></i><span>Muñecos</span></li>
                    <li onClick={() => goToCategory('lamparas')}><i className="fa-regular fa-lightbulb"></i><span>Lámparas</span></li>
                    <li className="last-item" onClick={() => goToCategory('otros')}><i className="fas fa-gift"></i><span>Otros</span></li>
                </ul>
            </nav>
        </section>
    );
};

export default CategoryNav;
