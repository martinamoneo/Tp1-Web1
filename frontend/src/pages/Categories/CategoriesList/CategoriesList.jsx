import './CategoriesList.css';
import { Link } from 'react-router-dom';
import Title from '../../../components/atoms/Title';
import Icon from '../../../components/atoms/Icon';

const CategoriesList = () => {
    // Lista de categorías
    const categories = [
        { id: 'mates', name: 'Mates', icon: 'whiskey-glass' },
        { id: 'vasos', name: 'Vasos', icon: 'beer' },
        { id: 'llaveros', name: 'Llaveros', icon: 'key' },
        { id: 'soportes', name: 'Soportes', icon: 'crop-simple' },
        { id: 'premios', name: 'Premios', icon: 'trophy' },
        { id: 'munecos', name: 'Muñecos', icon: 'snowman' },
        { id: 'lamparas', name: 'Lámparas', icon: 'lightbulb', type: 'regular' },
        { id: 'otros', name: 'Otros', icon: 'gift' }
    ];

    return (
        <main className="categories-list-page">
            <div className="title-container">
                <Title level={1} className="title-section">Explorar Categorías</Title>
            </div>
            
            <section className="categories-grid">
                {categories.map((cat) => (
                    <Link to={`/categories/${cat.id}`} key={cat.id} className="category-card">
                        <div className="category-icon">
                            <Icon name={cat.icon} type={cat.type || 'solid'} />
                        </div>
                        <Title level={3} className="category-card-title">{cat.name}</Title>
                    </Link>
                ))}
            </section>
        </main>
    );
};

export default CategoriesList;
