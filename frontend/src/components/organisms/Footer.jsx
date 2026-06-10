import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-social">
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>

                <div className="footer-copy">
                    <p>© MiEcommerce. Todos los derechos reservados.</p>
                </div>

                <div className="footer-apps">
                    <div className="app-link">
                        <i className="fab fa-apple"></i>
                        <span>App Store</span>
                    </div>
                    <div className="app-link">
                        <i className="fab fa-google-play"></i>
                        <span>Google Play</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
