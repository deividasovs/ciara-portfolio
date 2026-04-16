import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { flattenImages } from './flattenImages';
import { Editorial } from './layouts/Editorial';
import { Cinematic } from './layouts/Cinematic';
import { Runway } from './layouts/Runway';
import { Masonry } from './layouts/Masonry';
import { SplitSticky } from './layouts/SplitSticky';
import { Stage } from './layouts/Stage';
import '../../designs/experiments.css';

type LayoutKey = 'editorial' | 'cinematic' | 'runway' | 'masonry' | 'split-sticky' | 'stage';

const TABS: Array<{ key: LayoutKey; label: string }> = [
    { key: 'editorial', label: 'A · Editorial' },
    { key: 'cinematic', label: 'B · Cinematic' },
    { key: 'runway', label: 'C · Runway' },
    { key: 'masonry', label: 'D · Masonry' },
    { key: 'split-sticky', label: 'E · Split' },
    { key: 'stage', label: 'F · Stage' },
];

const DARK_LAYOUTS = new Set<LayoutKey>(['cinematic', 'stage']);

const isLayoutKey = (value: string | null): value is LayoutKey =>
    value !== null && TABS.some(t => t.key === value);

export const ExperimentalProjectPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const rawLayout = searchParams.get('layout');
    const layout: LayoutKey = isLayoutKey(rawLayout) ? rawLayout : 'editorial';

    const project = projectId
        ? projectsData.find(p => p.id === projectId)
        : projectsData.find(p => p.featured) || projectsData[0];

    const isDark = DARK_LAYOUTS.has(layout);

    useEffect(() => {
        if (!projectId && project) {
            navigate(`/experiments/${project.id}?layout=${layout}`, { replace: true });
        }
    }, [projectId, project, layout, navigate]);

    if (!project) {
        return (
            <div className={`exp-shell ${isDark ? 'dark' : ''}`}>
                <div className="exp-notfound">
                    <h2>Project not found</h2>
                    <p><Link to="/experiments">Back to experiments</Link></p>
                </div>
            </div>
        );
    }

    if (!projectId) return null;

    const images = flattenImages(project);

    const pickLayout = (key: LayoutKey) => {
        setSearchParams({ layout: key }, { replace: true });
    };

    const pickProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/experiments/${e.target.value}?layout=${layout}`, { replace: true });
    };

    const render = () => {
        switch (layout) {
            case 'cinematic': return <Cinematic project={project} images={images} />;
            case 'runway': return <Runway project={project} images={images} />;
            case 'masonry': return <Masonry project={project} images={images} />;
            case 'split-sticky': return <SplitSticky project={project} images={images} />;
            case 'stage': return <Stage project={project} images={images} />;
            case 'editorial':
            default: return <Editorial project={project} images={images} />;
        }
    };

    return (
        <div className={`exp-shell ${isDark ? 'dark' : ''}`}>
            <nav className="exp-bar" aria-label="Layout experiments">
                <Link to="/" className="exp-bar-logo">Ciara Burns.</Link>
                <div className="exp-bar-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            className={`exp-bar-tab ${layout === tab.key ? 'on' : ''}`}
                            onClick={() => pickLayout(tab.key)}
                            aria-current={layout === tab.key ? 'page' : undefined}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="exp-bar-spacer" />
                <select
                    className="exp-bar-select"
                    value={project.id}
                    onChange={pickProject}
                    aria-label="Pick project"
                >
                    {projectsData.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>
            </nav>

            {render()}
        </div>
    );
};
