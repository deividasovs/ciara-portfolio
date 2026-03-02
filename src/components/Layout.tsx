import React from 'react';
import { Link } from 'react-router-dom';
import '../designs/Option1.css'; // Reusing the base styles

export const Navbar: React.FC = () => {
    return (
        <nav className="opt1-nav">
            <Link to="/" className="opt1-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                Ciara Burns Costume.
            </Link>
            <div className="opt1-links">
                <Link to="/projects">Projects</Link>
                <Link to="/#contact">Contact</Link>
            </div>
        </nav>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer id="contact" className="opt1-footer">
            <h2>Let's Collaborate</h2>
            <a href="mailto:ciara@ciaraburnscostume.com" className="opt1-email">ciara@ciaraburnscostume.com</a>
            <div className="opt1-locations">
                Glasgow &bull; Edinburgh &bull; Dublin
            </div>
            <div className="opt1-copyright">
                Ciara Burns &copy; {new Date().getFullYear()}
            </div>
        </footer>
    );
};
