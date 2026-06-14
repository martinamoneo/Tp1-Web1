// bara de categorias q se muestra en el home

import './CategoryNav.css';
import { useNavigate } from 'react-router-dom'; // hook para q la pag no se recarge cuando cambias
import Icon from '../atoms/Icon';

const CategoryNav = () => {
    const navigate = useNavigate(); // constante para navegar entre rutas 

    const goToCategory = (category) => { // funcion para q cambie la url
        navigate(`/categories/${category}`);
    };

    return (
        <section className="categories-container">
            <nav className="categories-nav">
                <ul className="categories-list">
                    <li onClick={() => goToCategory('mates')}><Icon name="whiskey-glass" /><span>Mates</span></li>
                    <li onClick={() => goToCategory('vasos')}><Icon name="beer" /><span>Vasos</span></li>
                    <li onClick={() => goToCategory('llaveros')}><Icon name="key" /><span>Llaveros</span></li>
                    <li onClick={() => goToCategory('soportes')}><Icon name="crop-simple" /><span>Soportes</span></li>
                    <li onClick={() => goToCategory('premios')}><Icon name="trophy" /><span>Premios</span></li>
                    <li onClick={() => goToCategory('munecos')}><Icon name="snowman" /><span>Muñecos</span></li>
                    <li onClick={() => goToCategory('lamparas')}><Icon type="regular" name="lightbulb" /><span>Lámparas</span></li>
                    <li onClick={() => goToCategory('otros')}><Icon name="gift" /><span>Otros</span></li>
                </ul>
            </nav>
        </section>
    );
};

export default CategoryNav;
