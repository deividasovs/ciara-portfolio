import React from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/Runway.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

export const Runway: React.FC<Props> = ({ project, images }) => {
    return (
        <div className="exp-runway">
            <header className="exp-runway-header">
                <span className="exp-runway-meta">{project.date} · Scroll sideways →</span>
                <h1>{project.title}</h1>
                <p>{project.desc}</p>
            </header>

            <div className="exp-runway-track-wrap">
                <div className="exp-runway-track">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`exp-runway-panel ${i % 3 === 1 ? 'wide' : 'tall'}`}
                        >
                            <img src={img.url} alt={`${project.title} ${i + 1}`} />
                        </div>
                    ))}
                </div>
                {images.length > 1 && <div className="exp-runway-hint">drag / scroll →</div>}
            </div>
        </div>
    );
};
