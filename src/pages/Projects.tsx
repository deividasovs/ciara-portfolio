import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { LayoutPicker, LayoutOption } from '../components/LayoutPicker';
import { projectsData, Project } from '../data/projects';
import '../designs/Option1.css';
import '../designs/HomeLayouts.css';
import '../designs/ProjectsLayouts.css';

type LayoutKey = 'A' | 'B' | 'C' | 'D';

const LAYOUT_STORAGE_KEY = 'projects-layout-variant';

const LAYOUT_OPTIONS: LayoutOption<LayoutKey>[] = [
    { key: 'A', name: 'Salon' },
    { key: 'B', name: 'Index' },
    { key: 'C', name: 'Filmstrip' },
    { key: 'D', name: 'Catalog' },
];

const LayoutSalon: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <div className="projects-grid">
        {projects.map(p => (
            <Link key={p.id} to={`/projects/${p.id}`} className="projects-tile">
                <div className="projects-tile__img">
                    <img src={p.thumbnailUrl} alt={p.title} />
                </div>
                <div className="projects-tile__info">
                    <h3 className="projects-tile__title">{p.title}</h3>
                    <span className="projects-tile__date">{p.date}</span>
                </div>
            </Link>
        ))}
    </div>
);

const LayoutIndex: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <ul className="projects-list">
        {projects.map((p, i) => (
            <li key={p.id}>
                <Link to={`/projects/${p.id}`} className="projects-row">
                    <span className="projects-row__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="projects-row__title">{p.title}</h3>
                    <span className="projects-row__date">{p.date}</span>
                    <div className="projects-row__preview">
                        <img src={p.thumbnailUrl} alt="" />
                    </div>
                </Link>
            </li>
        ))}
    </ul>
);

const LayoutFilmstrip: React.FC<{ projects: Project[] }> = ({ projects }) => {
    if (projects.length === 0) return null;
    const [hero, ...rest] = projects;
    return (
        <>
            <Link to={`/projects/${hero.id}`} className="projects-hero" aria-label={`View ${hero.title}`}>
                <img src={hero.topHorizontalImage || hero.thumbnailUrl} alt={hero.title} />
                <div className="projects-hero__inner">
                    <span className="projects-hero__eyebrow">Latest Project</span>
                    <h2 className="projects-hero__title">{hero.title}</h2>
                    <span className="projects-hero__date">{hero.date}</span>
                    <div><span className="projects-hero__view">Open Project</span></div>
                </div>
            </Link>
            <div className="projects-rail-head">
                <h2 className="projects-rail-title">More projects</h2>
                <span className="projects-rail-hint">Scroll</span>
            </div>
            <div className="projects-rail">
                {rest.map(p => (
                    <Link key={p.id} to={`/projects/${p.id}`} className="projects-card">
                        <div className="projects-card__img">
                            <img src={p.thumbnailUrl} alt={p.title} />
                        </div>
                        <h3 className="projects-card__title">{p.title}</h3>
                        <span className="projects-card__date">{p.date}</span>
                    </Link>
                ))}
            </div>
        </>
    );
};

const LayoutCatalog: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <div className="projects-grid">
        {projects.map(p => (
            <Link key={p.id} to={`/projects/${p.id}`} className="projects-card">
                <div className="projects-card__img">
                    <img src={p.thumbnailUrl} alt={p.title} />
                </div>
                <div className="projects-card__info">
                    <h3 className="projects-card__title">{p.title}</h3>
                    <span className="projects-card__date">{p.date}</span>
                </div>
                <p className="projects-card__desc">{p.desc}</p>
            </Link>
        ))}
    </div>
);

const renderLayout = (layout: LayoutKey, projects: Project[]) => {
    switch (layout) {
        case 'A': return <LayoutSalon projects={projects} />;
        case 'B': return <LayoutIndex projects={projects} />;
        case 'C': return <LayoutFilmstrip projects={projects} />;
        case 'D': return <LayoutCatalog projects={projects} />;
    }
};

export const Projects: React.FC = () => {
    const [layout, setLayout] = useState<LayoutKey>(() => {
        const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
        return (stored === 'A' || stored === 'B' || stored === 'C' || stored === 'D') ? stored : 'A';
    });

    useEffect(() => {
        localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
    }, [layout]);

    return (
        <div
            className={`option1-container fade-in projects-black proj-layout-${layout.toLowerCase()}`}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <Navbar />

            <main className="projects-page">
                <h1 className="projects-page__heading">
                    Project <em>Showcase</em>
                </h1>

                {renderLayout(layout, projectsData)}
            </main>

            <Footer />

            <LayoutPicker options={LAYOUT_OPTIONS} active={layout} onChange={setLayout} />
        </div>
    );
};
