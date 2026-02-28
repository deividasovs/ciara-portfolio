import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import '../designs/Option1.css';

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="option1-container fade-in">
                <Navbar />
                <main style={{ padding: '10rem 4rem', textAlign: 'center' }}>
                    <h2>Project Not Found</h2>
                    <Link to="/projects" className="opt1-view-link">Return to Works</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const isDark = project.theme === 'dark';
    const isCoral = project.id === 'spaceship-earth';
    const topImage = project.topHorizontalImage || project.thumbnailUrl;
    const detailImages = project.images ? project.images.filter(img => img !== topImage) : [];

    return (
        <div className={`option1-container fade-in ${isDark ? 'opt1-dark-theme' : ''} ${isCoral ? 'opt1-coral-theme' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Link to="/projects" className="opt1-role" style={{ display: 'inline-block', marginBottom: '2rem', textDecoration: 'none', color: isDark ? '#FDFDFC' : 'inherit' }}>
                    ← Back to Works
                </Link>

                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4.5rem', fontWeight: 400, marginTop: 0, marginBottom: '1rem', lineHeight: 1.1 }}>
                    {project.title}
                </h1>

                <div style={{ display: 'flex', gap: '2rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#EBEBEB'}`, paddingBottom: '2rem', marginBottom: '4rem' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: isDark ? '#8C8881' : '#8C8881' }}>Year</span>
                        <span style={{ fontSize: '1.1rem' }}>{project.date}</span>
                    </div>
                </div>

                <div style={{ width: '100%', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={topImage}
                        alt={`${project.title} hero`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '70vh',
                            width: 'auto',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                <div style={{ fontSize: '1.25rem', lineHeight: 1.8, color: isDark ? '#EBEBEB' : '#444', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
                    <p>{project.longDesc}</p>
                </div>

                {detailImages.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                        {detailImages.map((img, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <img src={img} alt={`${project.title} detail ${index + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
};
