import React, { useState, useEffect } from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/Stage.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

export const Stage: React.FC<Props> = ({ project, images }) => {
    const [active, setActive] = useState(0);
    const current = images[active] || images[0];

    useEffect(() => {
        setActive(0);
    }, [project.id]);

    if (!current) {
        return (
            <div className="exp-stage">
                <header className="exp-stage-header">
                    <span className="exp-stage-meta">{project.date}</span>
                    <h1>{project.title}</h1>
                </header>
                <p className="exp-stage-desc">No images yet for this project.</p>
            </div>
        );
    }

    return (
        <div className="exp-stage">
            <header className="exp-stage-header">
                <span className="exp-stage-meta">{project.date}</span>
                <h1>{project.title}</h1>
            </header>

            <div className="exp-stage-spot">
                <img
                    key={current.url}
                    src={current.url}
                    alt={`${project.title} ${active + 1}`}
                />
                <div className="exp-stage-caption">
                    <span>{current.credit || project.title}</span>
                    <span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                </div>
            </div>

            {images.length > 1 && (
                <div className="exp-stage-thumbs">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            className="exp-stage-thumb"
                            aria-pressed={i === active}
                            aria-label={`Show image ${i + 1}`}
                            onClick={() => setActive(i)}
                        >
                            <img src={img.url} alt="" />
                        </button>
                    ))}
                </div>
            )}

            <p className="exp-stage-desc">{project.desc}</p>
        </div>
    );
};
