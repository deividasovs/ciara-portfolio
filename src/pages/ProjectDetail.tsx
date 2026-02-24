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

    return (
        <div className="option1-container fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <Link to="/projects" className="opt1-role" style={{ display: 'inline-block', marginBottom: '2rem', textDecoration: 'none' }}>
                    ← Back to Works
                </Link>

                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4.5rem', fontWeight: 400, marginTop: 0, marginBottom: '1rem', lineHeight: 1.1 }}>
                    {project.title}
                </h1>

                <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #EBEBEB', paddingBottom: '2rem', marginBottom: '4rem' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8C8881' }}>Role</span>
                        <span style={{ fontSize: '1.1rem' }}>{project.role}</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8C8881' }}>Year</span>
                        <span style={{ fontSize: '1.1rem' }}>{project.date}</span>
                    </div>
                </div>

                <div className="img-placeholder" style={{ width: '100%', aspectRatio: '16/9', marginBottom: '4rem' }}>
                    [Hero Image]
                </div>

                <div style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#444', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
                    <p>{project.longDesc}</p>
                </div>

                {/* Mock detailed image gallery */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '6rem' }}>
                    <div className="img-placeholder" style={{ aspectRatio: '3/4' }}>[Detail 1]</div>
                    <div className="img-placeholder" style={{ aspectRatio: '3/4', marginTop: '4rem' }}>[Detail 2]</div>
                </div>

            </main>

            <Footer />
        </div>
    );
};
