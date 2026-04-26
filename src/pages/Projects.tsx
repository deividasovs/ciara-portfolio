import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import { useTheme } from '../contexts/ThemeContext';
import '../designs/Option1.css';

export const Projects: React.FC = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'dark' ? 'opt1-dark-theme' : '';
    return (
        <div className={`option1-container fade-in ${themeClass}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main className="opt1-section" style={{ flex: 1, width: '100%' }}>
                <h1 className="opt1-title opt1-page-heading">
                    Project Showcase
                </h1>

                <div className="opt1-project-showcase-grid">
                    {projectsData.map((p) => (
                        <div key={p.id} className="opt1-project-card">
                            <Link to={`/projects/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="opt1-project-image" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <img src={p.thumbnailUrl} alt={p.title} style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', display: 'block' }} />
                                        {p.thumbnailCredit && (
                                            <span className="opt1-image-credit">
                                                {p.thumbnailCredit}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="opt1-project-info" style={{ marginTop: '1.25rem' }}>
                                    <h3>{p.title}</h3>
                                    <span className="opt1-role">{p.date}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};
