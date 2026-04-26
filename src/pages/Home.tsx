import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import { useTheme } from '../contexts/ThemeContext';
import '../designs/Option1.css';

const InteractiveTitle: React.FC = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!titleRef.current) return;
        const rect = titleRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMouse({ x, y });
    };

    const text = "Performance Costume";
    const words = text.split(" ");

    return (
        <h1
            className="opt1-title interactive-spectacle-title"
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <span className="sr-only">{text}</span>
            <span className="words-wrapper" aria-hidden="true">
                {words.map((word, i) => (
                    <span key={`base-${i}`} className="word-anim" style={{ animationDelay: `${i * 0.12}s` }}>
                        {word === '&' ? <span className="ampersand">&</span> : word}&nbsp;
                    </span>
                ))}
            </span>

            <span
                className="interactive-overlay"
                aria-hidden="true"
                style={{
                    opacity: isHovering ? 1 : 0,
                    WebkitMaskImage: `radial-gradient(circle 160px at ${mouse.x}px ${mouse.y}px, black 15%, transparent 80%)`,
                    maskImage: `radial-gradient(circle 160px at ${mouse.x}px ${mouse.y}px, black 15%, transparent 80%)`,
                }}
            >
                {words.map((word, i) => (
                    <span key={`overlay-${i}`} className="word-anim" style={{ animationDelay: `${i * 0.12}s` }}>
                        {word === '&' ? <span className="ampersand">&</span> : word}&nbsp;
                    </span>
                ))}
            </span>
        </h1>
    );
};

export const Home: React.FC = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'dark' ? 'opt1-dark-theme' : '';
    const featuredProjects = projectsData.filter(p => p.featured);
    const [cookieConsent, setCookieConsent] = React.useState<string | null>(localStorage.getItem('cookieConsent'));

    React.useEffect(() => {
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

    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@mirrorapp/iframe-bridge@latest/dist/index.umd.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={`option1-container fade-in ${themeClass}`}>
            <Navbar />

            <div className="opt1-hero-background" style={{ backgroundImage: "url('/assets/images/projects/dr-seuss/drseussy.png')" }}>
                <header className="opt1-hero">
                    <InteractiveTitle />
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
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/projects" className="opt1-view-link">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mirror App Instagram Feed */}
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
