import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData, Project } from '../data/projects';
import '../designs/Option1.css';
import '../designs/HomeLayouts.css';

type LayoutKey = 'A' | 'B' | 'C';

const HERO_IMAGE = '/assets/images/projects/dr-seuss/drseussy.png';

const HeroCinematic: React.FC = () => (
    <header className="home-hero" style={{ backgroundImage: `url('${HERO_IMAGE}')` }}>
        <div className="home-hero__inner">
            <h1 className="home-hero__title">
                Performance <em>Costume</em>
            </h1>
        </div>
    </header>
);

const HeroMinimal: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <header className="home-hero">
        <span className="home-hero__caption">a portfolio of</span>
        <h1 className="home-hero__title">
            Performance <em>Costume</em>
        </h1>
        <span className="home-hero__subline">Ciara Burns · Edinburgh</span>
        <div className="home-hero__strip" aria-hidden="true">
            {projects.map(p => (
                <div key={p.id} className="home-hero__strip-item">
                    <img src={p.thumbnailUrl} alt="" />
                </div>
            ))}
        </div>
    </header>
);

const FeaturedCinematic: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <section className="home-featured">
        <div className="home-featured__head">
            <h2 className="home-featured__heading">Featured Projects</h2>
            <span className="home-featured__hint">Scroll</span>
        </div>
        <div className="home-featured__rail">
            {projects.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="home-featured__tile">
                    <div className="home-featured__tile-img">
                        <img src={p.thumbnailUrl} alt={p.title} />
                    </div>
                    <div className="home-featured__tile-meta">
                        <h3 className="home-featured__tile-title">{p.title}</h3>
                        <span className="home-featured__tile-date">{p.date}</span>
                    </div>
                    <p className="home-featured__tile-desc">{p.desc}</p>
                </Link>
            ))}
        </div>
        <Link to="/projects" className="home-featured__view-all"><span>View All Projects</span></Link>
    </section>
);

const FeaturedMinimal: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <section className="home-featured">
        <h2 className="home-featured__heading">Featured Projects</h2>
        <div className="home-featured__strip">
            {projects.map((p, i) => (
                <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className={`home-featured__row ${i % 2 === 1 ? 'reverse' : ''}`}
                >
                    <div className="home-featured__row-img">
                        <img src={p.thumbnailUrl} alt={p.title} />
                    </div>
                    <div className="home-featured__row-info">
                        <h3 className="home-featured__row-title">{p.title}</h3>
                        <span className="home-featured__row-date">{p.date}</span>
                        <p className="home-featured__row-desc">{p.desc}</p>
                    </div>
                </Link>
            ))}
        </div>
        <Link to="/projects" className="home-featured__view-all"><span>View All Projects</span></Link>
    </section>
);

const renderHero = (layout: LayoutKey, projects: Project[]) => {
    switch (layout) {
        case 'A': return <HeroCinematic />;
        case 'B': return <HeroMinimal projects={projects} />;
        case 'C': return <HeroCinematic />;
    }
};

const renderFeatured = (layout: LayoutKey, projects: Project[]) => {
    switch (layout) {
        case 'A': return <FeaturedCinematic projects={projects} />;
        case 'B': return <FeaturedMinimal projects={projects} />;
        case 'C': return <FeaturedMinimal projects={projects} />;
    }
};

export const Home: React.FC = () => {
    const featuredProjects = projectsData.filter(p => p.featured);
    const layout: LayoutKey = 'C';

    const [cookieConsent, setCookieConsent] = useState<string | null>(localStorage.getItem('cookieConsent'));

    useEffect(() => {
        const handleConsentChange = () => {
            setCookieConsent(localStorage.getItem('cookieConsent'));
        };
        window.addEventListener('cookieConsentChange', handleConsentChange);
        window.addEventListener('storage', handleConsentChange);
        return () => {
            window.removeEventListener('cookieConsentChange', handleConsentChange);
            window.removeEventListener('storage', handleConsentChange);
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@mirrorapp/iframe-bridge@latest/dist/index.umd.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={`option1-container fade-in home-black layout-${layout.toLowerCase()}`}>
            <Navbar />

            {renderHero(layout, featuredProjects)}
            {renderFeatured(layout, featuredProjects)}

            <div className="opt1-section opt1-instagram-section">
                <div style={{ width: '100%' }}>
                    {cookieConsent === 'accepted' ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `
                                <iframe
                                    onload="if(window.iFrameSetup) window.iFrameSetup(this)"
                                    src="https://app.mirror-app.com/feed-instagram/ff1d82bb-913e-4b47-a2b4-8217c2b59c97/preview"
                                    style="width:100%;border:none;overflow:hidden;"
                                    scrolling="no"
                                    title="Instagram Feed"
                                ></iframe>
                            ` }}
                        />
                    ) : (
                        <div className="opt1-instagram-fallback">
                            <p>Please accept cookies to view the Instagram feed.</p>
                            <button
                                className="opt1-primary-button"
                                onClick={() => {
                                    localStorage.setItem('cookieConsent', 'accepted');
                                    window.dispatchEvent(new Event('cookieConsentChange'));
                                }}
                            >
                                Accept Cookies
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <section id="about" className="opt1-section opt1-about">
                <div className="opt1-about-grid">
                    <div className="opt1-about-text">
                        <h2>About Me</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            My name is Ciara, and I’m a Performance Costume graduate from the University of Edinburgh, with an interest in spectacle arts — I love building immersive concepts and using costume to create memorable and fun experiences.
                            I’m always looking to expand my skills, collaborate with other creatives, and keep pushing my ideas further.
                            <br /><br />

                            Throughout this portfolio you’ll see a range of concept-led projects that reflect my interest in immersive storytelling, alongside the technical skills and experimentation I developed during my degree.
                            Thank you for taking the time to look through my work — I hope you enjoy it.
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
