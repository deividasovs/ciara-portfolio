import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { LayoutPicker, LayoutOption } from '../components/LayoutPicker';
import { projectsData, Project } from '../data/projects';
import '../designs/Option1.css';
import '../designs/HomeLayouts.css';

type LayoutKey = 'A' | 'B' | 'C' | 'D';

const LAYOUT_STORAGE_KEY = 'home-layout-variant';
const HERO_IMAGE = '/assets/images/projects/dr-seuss/drseussy.png';

const LAYOUT_OPTIONS: LayoutOption<LayoutKey>[] = [
    { key: 'A', name: 'Editorial' },
    { key: 'B', name: 'Cinematic' },
    { key: 'C', name: 'Theatrical' },
    { key: 'D', name: 'Minimal' },
];

const HeroEditorial: React.FC = () => (
    <header className="home-hero">
        <div>
            <span className="home-hero__eyebrow">Portfolio · 2026</span>
            <h1 className="home-hero__title">
                Performance<br /><em>Costume.</em>
            </h1>
        </div>
        <div className="home-hero__image">
            <img src={HERO_IMAGE} alt="Performance costume hero" />
        </div>
    </header>
);

const HeroCinematic: React.FC = () => (
    <header className="home-hero" style={{ backgroundImage: `url('${HERO_IMAGE}')` }}>
        <div className="home-hero__inner">
            <span className="home-hero__eyebrow">Portfolio / 2026</span>
            <h1 className="home-hero__title">
                Performance <em>Costume</em>
            </h1>
        </div>
    </header>
);

const HeroTheatrical: React.FC = () => (
    <header className="home-hero">
        <div className="home-hero__plate">
            <img src={HERO_IMAGE} alt="" aria-hidden="true" />
        </div>
        <h1 className="home-hero__title">
            <span className="sr-only">Performance Costume</span>
            <span className="home-hero__line home-hero__line--offset-l" aria-hidden="true">Performance</span>
            <span className="home-hero__line italic home-hero__line--offset-r" aria-hidden="true">Costume</span>
        </h1>
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

const FeaturedEditorial: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <section className="home-featured">
        <h2 className="home-featured__heading">Featured Projects</h2>
        <ul className="home-featured__list">
            {projects.map((p, i) => (
                <li key={p.id}>
                    <Link to={`/projects/${p.id}`} className="home-featured__row">
                        <span className="home-featured__num">0{i + 1}</span>
                        <h3 className="home-featured__title">{p.title}</h3>
                        <span className="home-featured__date">{p.date}</span>
                        <div className="home-featured__preview">
                            <img src={p.thumbnailUrl} alt="" />
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
        <Link to="/projects" className="home-featured__view-all">View All Projects</Link>
    </section>
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

const FeaturedTheatrical: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <section className="home-featured">
        <h2 className="home-featured__heading">Featured Projects</h2>
        <div className="home-featured__mosaic">
            {projects.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="home-featured__tile">
                    <img src={p.thumbnailUrl} alt={p.title} />
                    <div className="home-featured__tile-overlay">
                        <h3 className="home-featured__tile-title">{p.title}</h3>
                        <span className="home-featured__tile-date">{p.date}</span>
                    </div>
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
                        <div className="home-featured__row-num">— 0{i + 1}</div>
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
        case 'A': return <HeroEditorial />;
        case 'B': return <HeroCinematic />;
        case 'C': return <HeroTheatrical />;
        case 'D': return <HeroMinimal projects={projects} />;
    }
};

const renderFeatured = (layout: LayoutKey, projects: Project[]) => {
    switch (layout) {
        case 'A': return <FeaturedEditorial projects={projects} />;
        case 'B': return <FeaturedCinematic projects={projects} />;
        case 'C': return <FeaturedTheatrical projects={projects} />;
        case 'D': return <FeaturedMinimal projects={projects} />;
    }
};

export const Home: React.FC = () => {
    const featuredProjects = projectsData.filter(p => p.featured);
    const [layout, setLayout] = useState<LayoutKey>(() => {
        const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
        return (stored === 'A' || stored === 'B' || stored === 'C' || stored === 'D') ? stored : 'A';
    });

    useEffect(() => {
        localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
    }, [layout]);

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

            <LayoutPicker options={LAYOUT_OPTIONS} active={layout} onChange={setLayout} />
        </div>
    );
};
