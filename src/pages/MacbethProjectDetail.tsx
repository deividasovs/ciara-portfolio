import React, { useState } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import './MacbethProjectDetail.css';

type MacbethMedia =
    | { kind: 'video'; src: string }
    | { kind: 'image'; src: string; alt?: string };

const MACBETH_CAROUSEL: MacbethMedia[] = [
    { kind: 'image', src: '/assets/images/projects/Macbeth/Deivobsessed.png', alt: 'Macbeth costume on stairs' },
    { kind: 'image', src: '/assets/images/projects/Macbeth/macbeth-textile.jpeg', alt: 'Macbeth textile detail' },
    { kind: 'image', src: '/assets/images/projects/Macbeth/macbeth-back.png', alt: 'Macbeth costume back' },
];

const MACBETH_BOTTOM_IMAGE = '/assets/images/projects/Macbeth/ECA Costume_23May25_photo Brian Hartley_9939_lo.jpg';

export const MacbethProjectDetail: React.FC = () => {
    const project = projectsData.find(p => p.id === 'macbeth');
    const [index, setIndex] = useState(0);

    if (!project) return null;

    const total = MACBETH_CAROUSEL.length;
    const next = () => setIndex(i => (i + 1) % total);
    const prev = () => setIndex(i => (i - 1 + total) % total);

    return (
        <div className="macbeth-page fade-in">
            <Navbar />

            <main className="macbeth-main">
                <h1 className="macbeth-title">{project.title}</h1>

                <section className="macbeth-top-grid">
                    <div className="macbeth-text-box">
                        <p>{project.longDesc}</p>
                    </div>

                    <div className="macbeth-hero">
                        <div
                            className="macbeth-hero-track"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {MACBETH_CAROUSEL.map((m, i) => (
                                <div key={i} className="macbeth-hero-slide">
                                    {m.kind === 'video' ? (
                                        <video
                                            className="macbeth-hero-media"
                                            src={m.src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            className="macbeth-hero-media"
                                            src={m.src}
                                            alt={m.alt || `${project.title} photo ${i + 1}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="macbeth-hero-arrow macbeth-hero-arrow--prev"
                            aria-label="Previous photo"
                            onClick={prev}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="macbeth-hero-arrow macbeth-hero-arrow--next"
                            aria-label="Next photo"
                            onClick={next}
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </section>

                <section className="macbeth-bottom">
                    <img
                        className="macbeth-bottom-image"
                        src={MACBETH_BOTTOM_IMAGE}
                        alt="Macbeth performance"
                    />
                </section>

                <section className="macbeth-credits">
                    <p>
                        A special thank you to Harris Tweed for their generous donation for this project.
                        <br />
                        Photo credit: Brian Hartley, Megan McCaffery
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
};
