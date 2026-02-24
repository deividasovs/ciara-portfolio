import React from 'react';
import './Option1.css';

const projects = [
    { id: 1, title: "A Midsummer Night's Dream", role: 'Lead Costume Designer', desc: 'Ethereal organic textures and structured fairy courts.', date: '2025' },
    { id: 2, title: 'The Crucible', role: 'Wardrobe Assistant', desc: 'Historically accurate Salem attire with muted, oppressive palettes.', date: '2024' },
    { id: 3, title: 'Cabaret', role: 'Costume Designer', desc: 'Berlin underground glamour meeting decaying elegance.', date: '2023' },
    { id: 4, title: 'Macbeth', role: 'Concept Artist', desc: 'Avant-garde, brutalist armor and stark silhouettes.', date: '2023' },
];

export const Option1: React.FC = () => {
    return (
        <div className="option1-container fade-in">
            <nav className="opt1-nav">
                <div className="opt1-logo">Ciara Burns.</div>
                <div className="opt1-links">
                    <a href="#about">About</a>
                    <a href="#projects">Work</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            <header className="opt1-hero">
                <h1 className="opt1-title">
                    <i>Designing</i> narrative<br />through texture & form.
                </h1>
                <p className="opt1-subtitle">
                    Costume Design Graduate from the University of Edinburgh.
                </p>
            </header>

            <section id="about" className="opt1-section opt1-about">
                <div className="opt1-about-grid">
                    <div className="opt1-about-text">
                        <h2>About</h2>
                        <p>
                            I am a performance costume designer with a passion for historical accuracy intertwined with surreal, avant-garde elements.
                            My process starts with the page—understanding the character's psychology before translating it into raw materials, silhouettes, and color palettes.
                        </p>
                    </div>
                    <div className="opt1-about-image img-placeholder">
                        [Portrait Image]
                    </div>
                </div>
            </section>

            <section id="projects" className="opt1-section opt1-projects">
                <h2>Selected Works</h2>
                <div className="opt1-project-grid">
                    {projects.map((p) => (
                        <div key={p.id} className="opt1-project-card">
                            <div className="opt1-project-image img-placeholder">
                                [Project Image]
                            </div>
                            <div className="opt1-project-info">
                                <h3>{p.title}</h3>
                                <span className="opt1-role">{p.role} — {p.date}</span>
                                <p>{p.desc}</p>
                                <a href={`#project-${p.id}`} className="opt1-view-link">View Design Book</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer id="contact" className="opt1-footer">
                <h2>Let's Collaborate</h2>
                <p>Available for freelance opportunities and full-time roles.</p>
                <a href="mailto:hello@example.com" className="opt1-email">hello@example.com</a>
                <div className="opt1-socials">
                    <a href="#instagram">Instagram</a>
                    <a href="#linkedin">LinkedIn</a>
                </div>
            </footer>
        </div>
    );
};
