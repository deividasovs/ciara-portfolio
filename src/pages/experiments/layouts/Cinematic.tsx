import React, { useEffect, useRef, useState } from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/Cinematic.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

export const Cinematic: React.FC<Props> = ({ project, images }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const total = images.length + 1; // intro + images

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const slideHeight = container.clientHeight;
            const idx = Math.round(container.scrollTop / slideHeight);
            setActive(Math.max(0, Math.min(total - 1, idx)));
        };
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [total]);

    const jumpTo = (index: number) => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
    };

    return (
        <div className="exp-cinematic" ref={containerRef}>
            <div className="exp-cinematic-dots">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`exp-cinematic-dot ${i === active ? 'on' : ''}`}
                        onClick={() => jumpTo(i)}
                    />
                ))}
            </div>

            <div className="exp-cinematic-slide exp-cinematic-intro" style={{ flexDirection: 'column' }}>
                <span className="exp-cinematic-intro-meta">{project.date}</span>
                <h1>{project.title}</h1>
                <p>{project.desc}</p>
                {images.length > 0 && <div className="exp-cinematic-hint">scroll ↓</div>}
            </div>

            {images.map((img, i) => (
                <div key={i} className="exp-cinematic-slide">
                    <img src={img.url} alt={`${project.title} ${i + 1}`} />
                    <div className="exp-cinematic-caption">
                        <span>{img.credit || project.title}</span>
                        <span>{String(i + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
