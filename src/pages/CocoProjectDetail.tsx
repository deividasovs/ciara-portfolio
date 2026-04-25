import React, { useState } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import './CocoProjectDetail.css';

const COCO_JAGUAR = '/assets/images/projects/Coco/pepita-black.png';
const COCO_COLLAGE = '/assets/images/projects/Coco/pepita-illustration.png';

type CocoMedia =
    | { kind: 'video'; src: string }
    | { kind: 'image'; src: string; alt?: string };

const COCO_FINAL_MEDIA: CocoMedia[] = [
    { kind: 'video', src: '/assets/images/projects/Coco/Pepita.mov' },
    { kind: 'image', src: '/assets/images/projects/Coco/pepita-illustration.png', alt: 'Pepita illustration' },
    { kind: 'image', src: '/assets/images/projects/Coco/pepita-black.png', alt: 'Pepita on black' },
    { kind: 'image', src: '/assets/images/projects/spaceship-earth/coral-collage.png', alt: 'Sample 1' },
    { kind: 'image', src: '/assets/images/projects/Macbeth/Deivobsessed.png', alt: 'Sample 2' },
];

export const CocoProjectDetail: React.FC = () => {
    const project = projectsData.find(p => p.id === 'Coco');
    const [index, setIndex] = useState(0);

    if (!project) return null;

    const total = COCO_FINAL_MEDIA.length;
    const current = COCO_FINAL_MEDIA[index];
    const next = () => setIndex(i => (i + 1) % total);
    const prev = () => setIndex(i => (i - 1 + total) % total);

    return (
        <div className="coco-page fade-in">
            <Navbar />

            <main className="coco-main">
                <h1 className="coco-title">{project.title}</h1>

                <section className="coco-top-grid">
                    <div className="coco-text-box">
                        <p>{project.longDesc}</p>
                    </div>

                    <div className="coco-hero">
                        {current.kind === 'video' ? (
                            <video
                                key={current.src}
                                className="coco-hero-media"
                                src={current.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                key={current.src}
                                className="coco-hero-media"
                                src={current.src}
                                alt={current.alt || `${project.title} final photo`}
                            />
                        )}

                        <button
                            type="button"
                            className="coco-hero-arrow coco-hero-arrow--prev"
                            aria-label="Previous photo"
                            onClick={prev}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="coco-hero-arrow coco-hero-arrow--next"
                            aria-label="Next photo"
                            onClick={next}
                        >
                            ›
                        </button>
                    </div>
                </section>

                <section className="coco-bottom-grid">
                    <img className="coco-jaguar" src={COCO_JAGUAR} alt="Pepita illustration" />

                    <div className="coco-right">
                        <button type="button" className="coco-book-btn">
                            CLICK TO VIEW DESIGN BOOK!
                        </button>
                        <img className="coco-collage" src={COCO_COLLAGE} alt="Coco design collage" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};
