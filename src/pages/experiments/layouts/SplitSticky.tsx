import React from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/SplitSticky.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

export const SplitSticky: React.FC<Props> = ({ project, images }) => {
    const gallery = images.slice(1);
    const hero = images[0];
    const rendered = gallery.length > 0 ? gallery : (hero ? [hero] : []);

    return (
        <div className="exp-sticky">
            <aside className="exp-sticky-aside">
                <span className="exp-sticky-meta">{project.date}</span>
                <h1>{project.title}</h1>
                <p>{project.longDesc}</p>
            </aside>
            <div className="exp-sticky-stream">
                {rendered.map((img, i) => (
                    <div key={i}>
                        <div className="exp-sticky-cell">
                            <img src={img.url} alt={`${project.title} ${i + 1}`} />
                        </div>
                        {img.credit && <div className="exp-sticky-credit">{img.credit}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
