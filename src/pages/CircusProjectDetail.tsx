import React, { useState } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import './CircusProjectDetail.css';

type CircusMedia =
    | { kind: 'video'; src: string }
    | { kind: 'image'; src: string; alt?: string };

const CIRCUS_CAROUSEL: CircusMedia[] = [
    { kind: 'image', src: '/assets/images/projects/circus/circus-ecashow2.png', alt: 'Circus ECA show 2' },
    { kind: 'image', src: '/assets/images/projects/circus/smile.JPG', alt: 'Circus smile' },
    { kind: 'image', src: '/assets/images/projects/circus/circus-ecashow.png', alt: 'Circus ECA show' },
];

const CIRCUS_BOTTOM_LEFT = '/assets/images/projects/circus/circusillustration.png';
const CIRCUS_BOTTOM_RIGHT = '/assets/images/projects/circus/overhead shot.JPG';

export const CircusProjectDetail: React.FC = () => {
    const project = projectsData.find(p => p.id === "l'enfant et les sortilèges");
    const [index, setIndex] = useState(0);

    if (!project) return null;

    const total = CIRCUS_CAROUSEL.length;
    const next = () => setIndex(i => (i + 1) % total);
    const prev = () => setIndex(i => (i - 1 + total) % total);

    return (
        <div className="circus-page fade-in">
            <Navbar />

            <main className="circus-main">
                <h1 className="circus-title">{project.title}</h1>

                <section className="circus-top-grid">
                    <div className="circus-text-box">
                        <p>{project.longDesc}</p>
                    </div>

                    <div className="circus-hero">
                        <div
                            className="circus-hero-track"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {CIRCUS_CAROUSEL.map((m, i) => (
                                <div key={i} className="circus-hero-slide">
                                    {m.kind === 'video' ? (
                                        <video
                                            className="circus-hero-media"
                                            src={m.src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            className="circus-hero-media"
                                            src={m.src}
                                            alt={m.alt || `${project.title} photo ${i + 1}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="circus-hero-arrow circus-hero-arrow--prev"
                            aria-label="Previous photo"
                            onClick={prev}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="circus-hero-arrow circus-hero-arrow--next"
                            aria-label="Next photo"
                            onClick={next}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </section>

                <section className="circus-bottom-grid">
                    <img
                        className="circus-bottom-left"
                        src={CIRCUS_BOTTOM_LEFT}
                        alt="Circus illustration"
                    />
                    <img
                        className="circus-bottom-right"
                        src={CIRCUS_BOTTOM_RIGHT}
                        alt="Circus performance"
                    />
                </section>

                <section className="circus-credits">
                    <p>Photos: Ciara Burns</p>
                </section>
            </main>

            <Footer />
        </div>
    );
};
