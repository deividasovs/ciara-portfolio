import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import '../designs/Option1.css';

type NormalizedImage = {
    url: string;
    credit?: string;
    height?: string;
};

type NormalizedRow = {
    layout: string;
    height?: string;
    images: NormalizedImage[];
};

const buildImageRows = (project: typeof projectsData[number], topImageUrl: string | undefined): NormalizedRow[] => {
    const rows: NormalizedRow[] = [];
    let currentRowGroup: NormalizedImage[] = [];

    const commitCurrentGroup = () => {
        if (currentRowGroup.length === 0) return;

        rows.push({
            layout: project.layout || 'auto-fit',
            images: currentRowGroup,
        });

        currentRowGroup = [];
    };

    project.images.forEach((item: any) => {
        // Simple image references become part of the current "auto" row
        if (typeof item === 'string') {
            if (item !== topImageUrl) {
                currentRowGroup.push({ url: item });
            }
            return;
        }

        // Explicit image object
        if ('url' in item) {
            if (item.url !== topImageUrl) {
                currentRowGroup.push(item as NormalizedImage);
            }
            return;
        }

        // Explicit row definition in the data (ProjectRow)
        if ('layout' in item) {
            commitCurrentGroup();

            const rowImages: NormalizedImage[] = item.images
                .map((img: any) =>
                    typeof img === 'string'
                        ? { url: img }
                        : (img as NormalizedImage)
                )
                .filter((img: NormalizedImage) => img.url !== topImageUrl);

            if (rowImages.length > 0) {
                rows.push({
                    layout: item.layout,
                    height: item.height,
                    images: rowImages,
                });
            }
        }
    });

    // Flush any remaining "auto" images into a row
    commitCurrentGroup();

    return rows;
};

const getRowGridStyle = (row: NormalizedRow): React.CSSProperties => {
    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gap: '2rem',
        marginBottom: '6rem',
    };

    switch (row.layout) {
        case '1-col':
            gridStyle.gridTemplateColumns = '1fr';
            break;
        case '2-col':
        case '2x1':
            gridStyle.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            break;
        case '3-col':
            gridStyle.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
            break;
        case '4-col':
        case '4x4':
            gridStyle.gridTemplateColumns = 'repeat(4, minmax(0, 1fr))';
            break;
        case '2-left-1-right': {
            // Two columns of equal width; right image spans two rows.
            // The heights of the top and bottom left images (if provided)
            // are used as relative fractions for the two grid rows.
            gridStyle.gridTemplateColumns = 'minmax(0, 1fr) minmax(0, 1fr)';

            const top = row.images[0];
            const bottom = row.images[1];

            const topHint = top?.height ? parseFloat(top.height) : NaN;
            const bottomHint = bottom?.height ? parseFloat(bottom.height) : NaN;

            if (!Number.isNaN(topHint) || !Number.isNaN(bottomHint)) {
                const topVal = Number.isNaN(topHint) ? 50 : topHint;
                const bottomVal = Number.isNaN(bottomHint) ? 50 : bottomHint;
                const total = topVal + bottomVal || 100;

                const topFr = topVal / total;
                const bottomFr = bottomVal / total;

                gridStyle.gridTemplateRows = `${topFr}fr ${bottomFr}fr`;
            } else {
                gridStyle.gridTemplateRows = '1fr 1fr';
            }

            break;
        }
        case 'auto-fit':
            gridStyle.gridTemplateColumns =
                'repeat(auto-fit, minmax(min(100%, 300px), 1fr))';
            break;
        default:
            // Allow completely custom CSS values to be defined in the data
            // e.g. "2fr 1fr", "minmax(0, 2fr) minmax(0, 3fr)", etc.
            gridStyle.gridTemplateColumns = row.layout;
            break;
    }

    if (row.height) {
        gridStyle.height = row.height;
    }

    return gridStyle;
};

const getItemGridStyle = (row: NormalizedRow, index: number): React.CSSProperties => {
    const itemStyle: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        minWidth: 0,
    };

    // For the 2x1 layout, make every third image span the full width
    if (row.layout === '2x1' && index % 3 === 2) {
        itemStyle.gridColumn = '1 / -1';
    }

    // For 2-left-1-right:
    //  - first image: top-left
    //  - second image: bottom-left
    //  - third image: full-height right column
    if (row.layout === '2-left-1-right') {
        const group = Math.floor(index / 3);
        const startRow = group * 2 + 1;

        if (index % 3 === 0) {
            itemStyle.gridColumn = '1';
            itemStyle.gridRow = `${startRow}`;
        } else if (index % 3 === 1) {
            itemStyle.gridColumn = '1';
            itemStyle.gridRow = `${startRow + 1}`;
        } else if (index % 3 === 2) {
            itemStyle.gridColumn = '2';
            itemStyle.gridRow = `${startRow} / span 2`;
        }
    }

    return itemStyle;
};

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="option1-container fade-in">
                <Navbar />
                <main style={{ padding: '10rem 4rem', textAlign: 'center' }}>
                    <h2>Project Not Found</h2>
                    <Link to="/projects" className="opt1-view-link">Return to Works</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const isDark = project.theme === 'dark';
    const isCoral = project.id === 'spaceship-earth';
    const topImageInfo: { url?: string; credit?: string } = {
        url: project.topHorizontalImage || project.thumbnailUrl,
        credit: project.topHorizontalCredit || project.thumbnailCredit
    };

    return (
        <div className={`option1-container fade-in ${isDark ? 'opt1-dark-theme' : ''} ${isCoral ? 'opt1-coral-theme' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main className="opt1-section" style={{ flex: 1, width: '100%' }}>
                <Link to="/projects" className="opt1-role" style={{ display: 'inline-block', marginBottom: '2rem', textDecoration: 'none', color: isDark ? '#FDFDFC' : 'inherit' }}>
                    ← Back to Projects
                </Link>

                <h1 className="opt1-title" style={{ marginTop: 0, marginBottom: '1rem', lineHeight: 1.1 }}>
                    {project.title}
                </h1>

                <div style={{ display: 'flex', gap: '2rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#EBEBEB'}`, paddingBottom: '2rem', marginBottom: '4rem' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: isDark ? '#8C8881' : '#8C8881' }}>Year</span>
                        <span style={{ fontSize: '1.1rem' }}>{project.date}</span>
                    </div>
                </div>

                <div style={{ width: '100%', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                            src={topImageInfo.url}
                            alt={`${project.title} hero`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                width: 'auto',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'contain'
                            }}
                        />
                        {topImageInfo.credit && (
                            <span style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: isDark ? '#A0A0A0' : '#888', fontStyle: 'italic', display: 'block', textAlign: 'left' }}>
                                {topImageInfo.credit}
                            </span>
                        )}
                    </div>
                </div>

                <div style={{ fontSize: '1.25rem', lineHeight: 1.8, color: isDark ? '#EBEBEB' : '#444', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
                    <p>{project.longDesc}</p>
                </div>

                {project.images && project.images.length > 0 && (() => {
                    const rows = buildImageRows(project, topImageInfo.url);

                    return rows.map((row, rowIndex) => {
                        const gridStyle = getRowGridStyle(row);

                        return (
                            <div key={rowIndex} style={gridStyle}>
                                {row.images.map((img, index) => {
                                    const itemStyle = getItemGridStyle(row, index);
                                    const isHeightConstrained =
                                        row.layout === '2-left-1-right' ||
                                        !!row.height ||
                                        !!img.height;
                                    const effectiveHeight =
                                        row.layout === '2-left-1-right'
                                            ? 'auto'
                                            : img.height || (row.height ? '100%' : 'auto');

                                    return (
                                        <div
                                            key={index}
                                            style={{ ...itemStyle, height: effectiveHeight }}
                                        >
                                            <div
                                                style={{
                                                    flex: 1,
                                                    minHeight: 0,
                                                    display: 'flex',
                                                }}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`${project.title} detail ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: isHeightConstrained
                                                            ? '100%'
                                                            : 'auto',
                                                        display: 'block',
                                                        objectFit: isHeightConstrained
                                                            ? 'cover'
                                                            : 'contain',
                                                    }}
                                                />
                                            </div>
                                            {img.credit && (
                                                <span
                                                    style={{
                                                        marginTop: '0.5rem',
                                                        fontSize: '0.8rem',
                                                        color: isDark ? '#A0A0A0' : '#888',
                                                        fontStyle: 'italic',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {img.credit}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    });
                })()}

            </main>

            <Footer />
        </div>
    );
};
