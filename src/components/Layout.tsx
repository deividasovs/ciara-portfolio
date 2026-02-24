import React from 'react';
import { Link } from 'react-router-dom';
import '../designs/Option1.css'; // Reusing the base styles

export const Navbar: React.FC = () => {
    return (
        <nav className="opt1-nav">
            <Link to="/" className="opt1-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                Ciara Burns.
            </Link>
            <div className="opt1-links">
                <Link to="/">Overview</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/#about">About</Link>
                <Link to="/#contact">Contact</Link>
            </div>
        </nav>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="opt1-footer">
            <h2>Let's Collaborate</h2>
            <a href="mailto:hello@example.com" className="opt1-email">hello@example.com</a>
            <div className="opt1-socials">
                <a href="#instagram">Instagram</a>
                <a href="#linkedin">LinkedIn</a>
            </div>
        </footer>
    );
};
