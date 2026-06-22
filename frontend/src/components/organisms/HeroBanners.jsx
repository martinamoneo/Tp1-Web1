import './HeroBanners.css';
import Title from '../atoms/Title';

const HeroBanners = () => {
    return (
        <section className="banner-section">
            <div className="banner-container">
                <article className="banner-card banner-card1">
                    <div className="banner-content">
                        <div className="banner-text">
                            <Title level={3}>Novedades</Title>
                            <p>Descubre lo último que llegó</p>
                        </div>
                    </div>
                </article>

                <article className="banner-card banner-card2">
                    <div className="banner-content">
                        <div className="banner-text">
                            <Title level={3}>Próximos Ingresos</Title>
                            <p>Lo que pronto estará disponible</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default HeroBanners;
