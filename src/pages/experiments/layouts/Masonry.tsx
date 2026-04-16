import React from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/Masonry.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

export const Masonry: React.FC<Props> = ({ project, images }) => {
    return (
        <div className="exp-masonry">
            <header className="exp-masonry-header">
                <span className="exp-masonry-meta">{project.date} · {images.length} images</span>
                <h1>{project.title}</h1>
                <p>{project.desc}</p>
            </header>

            <div className="exp-masonry-grid">
                {images.map((img, i) => (
                    <div key={i} className="exp-masonry-cell">
                        <img src={img.url} alt={`${project.title} ${i + 1}`} />
                        {img.credit && <div className="exp-masonry-credit">{img.credit}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
