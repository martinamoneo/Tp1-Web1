import './Footer.css';
import Icon from '../atoms/Icon';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-social">
                    <a href="#"><Icon type="brands" name="twitter" /></a>
                    <a href="#"><Icon type="brands" name="facebook" /></a>
                    <a href="#"><Icon type="brands" name="instagram" /></a>
                    <a href="#"><Icon type="brands" name="youtube" /></a>
                </div>

                <div className="footer-copy">
                    <p>© MiEcommerce. Todos los derechos reservados.</p>
                </div>

                <div className="footer-apps">
                    <div className="app-link">
                        <Icon type="brands" name="apple" />
                        <span>App Store</span>
                    </div>
                    <div className="app-link">
                        <Icon type="brands" name="google-play" />
                        <span>Google Play</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
