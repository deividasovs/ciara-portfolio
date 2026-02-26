import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import '../designs/Option1.css';

export const Projects: React.FC = () => {
    return (
        <div className="option1-container fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 400, marginBottom: '2rem' }}>
                    Project showcase
                </h1>

                <div className="opt1-project-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))' }}>
                    {projectsData.map((p) => (
                        <div key={p.id} className="opt1-project-card" style={{ marginBottom: '4rem' }}>
                            <Link to={`/projects/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="opt1-project-image" style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                                    <img src={p.thumbnailUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div className="opt1-project-info" style={{ marginTop: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{p.title}</h3>
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
