import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData, ProjectMedia, ProjectRow, ProjectImage } from '../data/projects';
import './ProjectDetail.css';

const isProjectRow = (item: any): item is ProjectRow =>
    typeof item === 'object' && item !== null && 'layout' in item && 'images' in item;

const normalizeImage = (item: string | ProjectImage): ProjectImage =>
    typeof item === 'string' ? { url: item } : item;

const carouselFromProject = (project: typeof projectsData[number]): ProjectMedia[] => {
    if (project.carousel && project.carousel.length > 0) return project.carousel;
    if (project.topHorizontalImage) {
        return [{ kind: 'image', src: project.topHorizontalImage, alt: project.title }];
    }
    return [{ kind: 'image', src: project.thumbnailUrl, alt: project.title }];
};

const rowsFromProject = (project: typeof projectsData[number]): ProjectRow[] => {
    const rows: ProjectRow[] = [];
    let loose: (string | ProjectImage)[] = [];

    const flushLoose = () => {
        if (loose.length === 0) return;
        rows.push({ layout: project.layout || '1-col', images: loose });
        loose = [];
    };

    project.images.forEach(item => {
        if (isProjectRow(item)) {
            flushLoose();
            rows.push(item);
        } else {
            loose.push(item as string | ProjectImage);
        }
    });

    flushLoose();
    return rows;
};

const Carousel: React.FC<{ media: ProjectMedia[]; title: string }> = ({ media, title }) => {
    const [index, setIndex] = useState(0);
    const total = media.length;
    const next = () => setIndex(i => (i + 1) % total);
    const prev = () => setIndex(i => (i - 1 + total) % total);

    return (
        <div className="project-detail-hero">
            <div
                className="project-detail-hero-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {media.map((m, i) => (
                    <div key={i} className="project-detail-hero-slide">
                        {m.kind === 'video' ? (
                            <video
                                className="project-detail-hero-media"
                                src={m.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                className="project-detail-hero-media"
                                src={m.src}
                                alt={m.alt || `${title} photo ${i + 1}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {total > 1 && (
                <>
                    <button
                        type="button"
                        className="project-detail-hero-arrow project-detail-hero-arrow--prev"
                        aria-label="Previous photo"
                        onClick={prev}
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="project-detail-hero-arrow project-detail-hero-arrow--next"
                        aria-label="Next photo"
                        onClick={next}
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

const KNOWN_LAYOUTS = new Set(['1-col', '2-col', '3-col', '4-col']);

const Row: React.FC<{ row: ProjectRow; title: string }> = ({ row, title }) => {
    const layoutClass = KNOWN_LAYOUTS.has(row.layout) ? `layout-${row.layout}` : '';
    const inlineStyle: React.CSSProperties | undefined = KNOWN_LAYOUTS.has(row.layout)
        ? undefined
        : { gridTemplateColumns: row.layout };

    return (
        <div className={`project-detail-row ${layoutClass}`} style={inlineStyle}>
            {row.images.map((item, i) => {
                const img = normalizeImage(item);
                return (
                    <img
                        key={i}
                        src={img.url}
                        alt={img.credit || `${title} detail ${i + 1}`}
                    />
                );
            })}
        </div>
    );
};

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="project-detail-page fade-in">
                <Navbar />
                <main style={{ padding: '10rem 4rem', textAlign: 'center' }}>
                    <h2>Project Not Found</h2>
                    <Link to="/projects" className="project-detail-cta">Return to Works</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const isLight = (project.theme || 'dark') === 'light';
    const carousel = carouselFromProject(project);
    const rows = rowsFromProject(project);

    return (
        <div className={`project-detail-page fade-in project-${project.id} ${isLight ? 'is-light' : ''}`}>
            <Navbar />

            <main className="project-detail-main">
                <h1 className="project-detail-title">{project.title}</h1>

                <section className="project-detail-top-grid">
                    <div className="project-detail-text-box">
                        <p>{project.longDesc}</p>
                        <div className="project-detail-cta-group">
                            {project.link && (
                                <Link to={project.link} className="project-detail-cta">
                                    {project.linkLabel || 'Visit Project'}
                                </Link>
                            )}
                            {project.designBookUrl ? (
                                <a
                                    href={project.designBookUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="project-detail-cta"
                                >
                                    Open Design Book
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    className="project-detail-cta"
                                    disabled
                                    aria-disabled="true"
                                >
                                    Open Design Book
                                </button>
                            )}
                        </div>
                    </div>

                    <Carousel media={carousel} title={project.title} />
                </section>

                {rows.map((row, i) => (
                    <section key={i} className="project-detail-section">
                        {row.heading && (
                            <h2 className="project-detail-section-heading">{row.heading}</h2>
                        )}
                        <Row row={row} title={project.title} />
                    </section>
                ))}

                {project.credits && (
                    <section className="project-detail-credits">
                        <p>{project.credits}</p>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};
