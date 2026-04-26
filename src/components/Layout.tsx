import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../designs/Option1.css';

const SunIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const MoonIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const ThemeToggle: React.FC = () => {
    const { theme, toggle } = useTheme();
    return (
        <button
            type="button"
            onClick={toggle}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export const Navbar: React.FC = () => {
    return (
        <nav className="opt1-nav">
            <Link to="/" className="opt1-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                Ciara Burns Costume.
            </Link>
            <div className="opt1-links">
                <Link to="/projects">Projects</Link>
                <Link to="/#contact">Contact</Link>
                <ThemeToggle />
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
