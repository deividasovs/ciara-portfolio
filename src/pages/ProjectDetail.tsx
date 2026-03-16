import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { projectsData } from '../data/projects';
import '../designs/Option1.css';

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
    const topImageInfo = {
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
                    // Restructure project.images into rows
                    const rows: { layout: string, height?: string, images: { url: string, credit?: string, height?: string }[] }[] = [];
                    let currentRowGroup: { url: string, credit?: string, height?: string }[] = [];

                    const commitCurrentGroup = () => {
                        if (currentRowGroup.length > 0) {
                            rows.push({
                                layout: project.layout || 'auto-fit',
                                images: currentRowGroup
                            });
                            currentRowGroup = [];
                        }
                    };

                    project.images.forEach((item: any) => {
                        if (typeof item === 'string') {
                            if (item !== topImageInfo.url) {
                                currentRowGroup.push({ url: item });
                            }
                        } else if ('url' in item) {
                            if (item.url !== topImageInfo.url) {
                                currentRowGroup.push(item as { url: string, credit?: string, height?: string });
                            }
                        } else if ('layout' in item) {
                            // It's a row
                            commitCurrentGroup();
                            const rowImages = item.images
                                .map((img: any) => typeof img === 'string' ? { url: img } : img)
                                .filter((img: any) => img.url !== topImageInfo.url);
                            if (rowImages.length > 0) {
                                rows.push({ layout: item.layout, height: item.height, images: rowImages });
                            }
                        }
                    });
                    commitCurrentGroup();

                    return rows.map((row, rowIndex) => {
                        let gridStyle: React.CSSProperties = {
                            display: 'grid',
                            gap: '2rem',
                            marginBottom: '6rem',
                        };

                        if (row.layout === '1-col') gridStyle.gridTemplateColumns = '1fr';
                        else if (row.layout === '2-col' || row.layout === '2x1') gridStyle.gridTemplateColumns = 'repeat(2, 1fr)';
                        else if (row.layout === '3-col') gridStyle.gridTemplateColumns = 'repeat(3, 1fr)';
                        else if (row.layout === '4-col' || row.layout === '4x4') gridStyle.gridTemplateColumns = 'repeat(4, 1fr)';
                        else if (row.layout === '2-left-1-right') {
                            gridStyle.gridTemplateColumns = '1fr 1fr';

                            // Get heights for the two left images (at index 0 and 1 in the row.images array)
                            let h0: string | number = row.images[0]?.height || '1fr';
                            let h1: string | number = row.images[1]?.height || '1fr';

                            // Convert percentages to fr units for more robust dynamic sizing
                            const parseToFr = (val: string | undefined): number | null => {
                                if (!val) return null;
                                if (val.endsWith('%')) return parseFloat(val) / 10;
                                if (val.endsWith('fr')) return parseFloat(val);
                                return null;
                            };

                            const fr0 = parseToFr(row.images[0]?.height);
                            const fr1 = parseToFr(row.images[1]?.height);

                            if (fr0 !== null && fr1 === null) {
                                // If only h0 is set as % or fr, make h1 the remainder of a "10" (100%) scale
                                h0 = `${fr0}fr`;
                                h1 = `${Math.max(0.1, 10 - fr0)}fr`;
                            } else if (fr1 !== null && fr0 === null) {
                                // If only h1 is set as % or fr, make h0 the remainder
                                h1 = `${fr1}fr`;
                                h0 = `${Math.max(0.1, 10 - fr1)}fr`;
                            } else if (fr0 !== null && fr1 !== null) {
                                h0 = `${fr0}fr`;
                                h1 = `${fr1}fr`;
                            }

                            gridStyle.gridTemplateRows = `${h0} ${h1}`;

                            // If neither row height nor individual image heights are set, default min-height
                            if (!row.height && !row.images[0]?.height && !row.images[1]?.height) {
                                gridStyle.minHeight = '600px';
                            }
                        }
                        else if (row.layout === 'auto-fit') gridStyle.gridTemplateColumns = 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))';
                        else gridStyle.gridTemplateColumns = row.layout;

                        if (row.height) {
                            gridStyle.height = row.height;
                        }

                        return (
                            <div key={rowIndex} style={gridStyle}>
                                {row.images.map((img, index) => {
                                    let itemStyle: React.CSSProperties = {
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: 0,
                                        minWidth: 0,
                                    };

                                    if (row.layout === '2x1' && index % 3 === 2) {
                                        itemStyle.gridColumn = '1 / -1';
                                    } else if (row.layout === '2-left-1-right') {
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

                                    const isHeightConstrained = row.layout === '2-left-1-right' || !!row.height || !!img.height;
                                    const effectiveHeight = img.height || (row.height ? '100%' : 'auto');

                                    return (
                                        <div key={index} style={{ ...itemStyle, height: effectiveHeight }}>
                                            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
                                                <img src={img.url} alt={`${project.title} detail ${index + 1}`} style={{
                                                    width: '100%',
                                                    height: isHeightConstrained ? '100%' : 'auto',
                                                    display: 'block',
                                                    objectFit: isHeightConstrained ? 'cover' : 'contain'
                                                }} />
                                            </div>
                                            {img.credit && (
                                                <span style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: isDark ? '#A0A0A0' : '#888', fontStyle: 'italic', textAlign: 'left' }}>
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
