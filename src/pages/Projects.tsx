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
