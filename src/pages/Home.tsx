import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import '../designs/Option1.css';

export const Home: React.FC = () => {
    const featuredProjects = projectsData.filter(p => p.featured);

    return (
        <div className="option1-container fade-in">
            <Navbar />

            <header className="opt1-hero">
                <h1 className="opt1-title">
                    <i>Designing</i> narrative<br />through texture & form.
                </h1>
            </header>

            <section className="opt1-section opt1-projects" style={{ position: 'relative' }}>
                {/* Background overlay that makes black pixels transparent */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: "url('/assets/images/bgs/textured-paper-bg1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <div className="opt1-projects-content" style={{ position: 'relative', zIndex: 1 }}>
                    <h2>Featured Works</h2>
                    <div className="opt1-project-grid">
                        {featuredProjects.map((p, index) => (
                            <div key={p.id} className={`opt1-project-card ${index % 2 === 0 ? 'reverse' : ''}`}>
                                <Link to={`/projects/${p.id}`} className="opt1-project-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="opt1-project-image-container">
                                        <div className="opt1-project-image img-placeholder">
                                            [Project Image]
                                        </div>
                                    </div>
                                    <div className="opt1-project-info">
                                        <h3>{p.title}</h3>
                                        <span className="opt1-role">{p.role} — {p.date}</span>
                                        <p>{p.desc}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                        <Link to="/projects" className="opt1-view-link" style={{ fontSize: '1.2rem' }}>
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about" className="opt1-section opt1-about" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="opt1-about-grid">
                    <div className="opt1-about-text">
                        <h2>About me.</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            I am a performance costume designer with a passion for historical accuracy intertwined with surreal, avant-garde elements.
                        </p>
                        <p>
                            My process starts with the page—understanding the character's psychology before translating it into raw materials, silhouettes, and color palettes. A graduate of the University of Edinburgh performance Costume Design course, I bring stories to life one stitch at a time.
                        </p>
                    </div>
                    <div className="opt1-about-image img-placeholder">
                        [Portrait Thumbnail]
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
