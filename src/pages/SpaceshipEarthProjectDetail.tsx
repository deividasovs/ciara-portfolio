import React, { useState } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import './SpaceshipEarthProjectDetail.css';

type SpaceshipMedia =
    | { kind: 'video'; src: string }
    | { kind: 'image'; src: string; alt?: string };

const SPACESHIP_CAROUSEL: SpaceshipMedia[] = [
    { kind: 'image', src: '/assets/images/projects/spaceship-earth/coralunposterized1.JPG', alt: 'Coral costume 1' },
    { kind: 'image', src: '/assets/images/projects/spaceship-earth/coralediscifest2.jpg', alt: 'Coral costume 2' },
    { kind: 'image', src: '/assets/images/projects/spaceship-earth/coral-ediscifest.png', alt: 'Coral costume 3' },
];

const LINEUP_IMAGE = '/assets/images/projects/spaceship-earth/lineup.png';
const DEV_DRAWING_LEFT = '/assets/images/projects/spaceship-earth/coral-illustration.PNG';
const DEV_DRAWING_RIGHT = '/assets/images/projects/spaceship-earth/coral-collage.png';

export const SpaceshipEarthProjectDetail: React.FC = () => {
    const project = projectsData.find(p => p.id === 'spaceship-earth');
    const [index, setIndex] = useState(0);

    if (!project) return null;

    const total = SPACESHIP_CAROUSEL.length;
    const next = () => setIndex(i => (i + 1) % total);
    const prev = () => setIndex(i => (i - 1 + total) % total);

    return (
        <div className="spaceship-page fade-in">
            <Navbar />

            <main className="spaceship-main">
                <h1 className="spaceship-title">{project.title}</h1>

                <section className="spaceship-top-grid">
                    <div className="spaceship-text-box">
                        <p>{project.longDesc}</p>
                    </div>

                    <div className="spaceship-hero">
                        <div
                            className="spaceship-hero-track"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {SPACESHIP_CAROUSEL.map((m, i) => (
                                <div key={i} className="spaceship-hero-slide">
                                    {m.kind === 'video' ? (
                                        <video
                                            className="spaceship-hero-media"
                                            src={m.src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            className="spaceship-hero-media"
                                            src={m.src}
                                            alt={m.alt || `${project.title} photo ${i + 1}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="spaceship-hero-arrow spaceship-hero-arrow--prev"
                            aria-label="Previous photo"
                            onClick={prev}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="spaceship-hero-arrow spaceship-hero-arrow--next"
                            aria-label="Next photo"
                            onClick={next}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </section>

                <section className="spaceship-section">
                    <h2 className="spaceship-section-heading">
                        Bioluminescent walkabout performance line-up
                    </h2>
                    <img className="spaceship-lineup" src={LINEUP_IMAGE} alt="Performance line-up" />
                </section>

                <section className="spaceship-section">
                    <h2 className="spaceship-section-heading">Development drawings</h2>
                    <div className="spaceship-dev-grid">
                        <img
                            className="spaceship-dev-left"
                            src={DEV_DRAWING_LEFT}
                            alt="Coral character development"
                        />
                        <img
                            className="spaceship-dev-right"
                            src={DEV_DRAWING_RIGHT}
                            alt="Coral collage development"
                        />
                    </div>
                </section>

                <section className="spaceship-credits">
                    <p>Photo credit: TBC</p>
                </section>
            </main>

            <Footer />
        </div>
    );
};
