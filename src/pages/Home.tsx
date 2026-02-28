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

            <div className="opt1-hero-background" style={{ backgroundImage: "url('/assets/images/projects/Lenfanet-les-sortileges/Photoshoot1.JPG')" }}>
                <header className="opt1-hero">
                    <h1 className="opt1-title">
                        <i><u>Ciara Burns Costume</u></i>
                    </h1>
                </header>
            </div>

            <section className="opt1-section opt1-projects" style={{ position: 'relative' }}>
                {/* Background overlay that makes black pixels transparent */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: "url('/assets/images/bgs/textured-paper-bg1.png')",
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <div className="opt1-projects-content" style={{ position: 'relative', zIndex: 1 }}>
                    <h2>Featured Projects</h2>
                    <div className="opt1-project-grid">
                        {featuredProjects.map((p, index) => (
                            <div key={p.id} className={`opt1-project-card ${index % 2 === 0 ? 'reverse' : ''}`}>
                                <div className="opt1-project-card-link">
                                    <Link to={`/projects/${p.id}`} className="opt1-project-image-container" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                        <div className="opt1-project-image" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                            <img
                                                src={p.thumbnailUrl}
                                                alt={p.title}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    maxHeight: '500px',
                                                    objectFit: 'contain',
                                                    display: 'block'
                                                }}
                                            />
                                        </div>
                                    </Link>
                                    <div className="opt1-project-info">
                                        <h3>{p.title}</h3>
                                        <span className="opt1-role">{p.date}</span>
                                        <p>{p.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                        <Link to="/projects" className="opt1-view-link" style={{ fontSize: '1.2rem' }}>
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about" className="opt1-section opt1-about" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="opt1-about-grid">
                    <div className="opt1-about-text">
                        <h2>About me</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            My name is Ciara, and I’m a Performance Costume graduate from the University of Edinburgh. with an interest in spectacle arts — I love building immersive concepts and using costume to create memorable and fun experiences.
                            I’m always looking to expand my skills, collaborate with other creatives, and keep pushing my ideas further.
                            <br /><br />

                            Throughout this portfolio you’ll see a range of concept-led projects that reflect my interest in immersive storytelling, alongside the technical skills and experimentation I developed during my degree.
                            Thank you for taking the time to look through my work — I hope you enjoy it.
                        </p>
                        <p>

                        </p>
                    </div>
                    <div className="opt1-about-image">
                        <img
                            src="/assets/images/projects/about-me/profile-picture.jpg"
                            alt="Ciara's Portrait"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
