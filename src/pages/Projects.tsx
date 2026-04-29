import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData, Project } from '../data/projects';
import '../designs/Option1.css';
import '../designs/HomeLayouts.css';
import '../designs/ProjectsLayouts.css';

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

export const Projects: React.FC = () => (
    <div
        className="option1-container fade-in projects-black proj-layout-d"
        style={{ display: 'flex', flexDirection: 'column' }}
    >
        <Navbar />

        <main className="projects-page">
            <h1 className="projects-page__heading">
                Project <em>Showcase</em>
            </h1>

            <LayoutCatalog projects={projectsData} />
        </main>

        <Footer />
    </div>
);

/* ---------------------------------------------------------------------------
 * DEAD CODE - layout switcher kept for potential revert.
 * Salon (A) and Catalog (D) only; Index (B) and Filmstrip (C) were removed.
 * To restore: replace the `Projects` export above with `ProjectsWithSwitcher`
 * and uncomment the imports below.
 * --------------------------------------------------------------------------- */
/*
import { useState, useEffect } from 'react';
import { LayoutPicker, LayoutOption } from '../components/LayoutPicker';

type LayoutKey = 'A' | 'D';

const LAYOUT_STORAGE_KEY = 'projects-layout-variant';

const LAYOUT_OPTIONS: LayoutOption<LayoutKey>[] = [
    { key: 'A', name: 'Salon' },
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

const renderLayout = (layout: LayoutKey, projects: Project[]) => {
    switch (layout) {
        case 'A': return <LayoutSalon projects={projects} />;
        case 'D': return <LayoutCatalog projects={projects} />;
    }
};

const ProjectsWithSwitcher: React.FC = () => {
    const [layout, setLayout] = useState<LayoutKey>(() => {
        const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
        return (stored === 'A' || stored === 'D') ? stored : 'D';
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
*/
