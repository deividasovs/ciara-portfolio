import React from 'react';
import { Project, ProjectImage } from '../../../data/projects';
import '../../../designs/experiments/Editorial.css';

interface Props {
    project: Project;
    images: ProjectImage[];
}

type Row =
    | { kind: 'split'; images: ProjectImage[] }
    | { kind: 'triptych'; images: ProjectImage[] }
    | { kind: 'bleed'; image: ProjectImage }
    | { kind: 'quote'; text: string };

const buildRows = (images: ProjectImage[], longDesc: string): Row[] => {
    const quotes = extractQuotes(longDesc);
    const rows: Row[] = [];
    const pattern: Array<'split' | 'bleed' | 'triptych'> = ['split', 'bleed', 'triptych', 'split'];
    let i = 0;
    let p = 0;
    let q = 0;

    while (i < images.length) {
        const shape = pattern[p % pattern.length];
        p++;

        if (shape === 'split' && images.length - i >= 2) {
            rows.push({ kind: 'split', images: images.slice(i, i + 2) });
            i += 2;
        } else if (shape === 'triptych' && images.length - i >= 3) {
            rows.push({ kind: 'triptych', images: images.slice(i, i + 3) });
            i += 3;
        } else {
            rows.push({ kind: 'bleed', image: images[i] });
            i += 1;
        }

        if (q < quotes.length && i < images.length && p % 2 === 0) {
            rows.push({ kind: 'quote', text: quotes[q] });
            q++;
        }
    }

    return rows;
};

const extractQuotes = (longDesc: string): string[] => {
    if (!longDesc) return [];
    const sentences = longDesc
        .split(/(?<=\.)\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 30 && s.length < 160);
    // pick 2 evenly spaced sentences
    if (sentences.length <= 2) return sentences;
    const mid = Math.floor(sentences.length / 2);
    return [sentences[1], sentences[mid]].filter(Boolean);
};

export const Editorial: React.FC<Props> = ({ project, images }) => {
    const hero = images[0];
    const gallery = images.slice(1);
    const rows = buildRows(gallery, project.longDesc);

    return (
        <div className="exp-editorial">
            <div className="exp-editorial-hero">
                <span className="exp-editorial-meta">{project.date}</span>
                <h1>{project.title}</h1>
                <p className="exp-editorial-desc">{project.desc}</p>
            </div>

            {hero && (
                <div className="exp-editorial-hero-image">
                    <img src={hero.url} alt={`${project.title} hero`} />
                </div>
            )}

            <div className="exp-editorial-desc" style={{ maxWidth: 720, margin: '0 auto 48px', fontSize: '1.05rem', lineHeight: 1.75, color: '#444' }}>
                <p>{project.longDesc}</p>
            </div>

            {rows.length === 0 && gallery.length === 0 && (
                <p className="exp-editorial-empty">No additional gallery for this project yet.</p>
            )}

            {rows.map((row, idx) => {
                if (row.kind === 'quote') {
                    return <blockquote key={idx} className="exp-editorial-pullquote">{row.text}</blockquote>;
                }
                if (row.kind === 'bleed') {
                    return (
                        <div key={idx} className="exp-editorial-row bleed">
                            <div className="exp-editorial-cell bleed">
                                <img src={row.image.url} alt={`${project.title} detail`} />
                            </div>
                        </div>
                    );
                }
                return (
                    <div key={idx} className={`exp-editorial-row ${row.kind}`}>
                        {row.images.map((img, j) => (
                            <div key={j} className="exp-editorial-cell tall">
                                <img src={img.url} alt={`${project.title} detail`} />
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
