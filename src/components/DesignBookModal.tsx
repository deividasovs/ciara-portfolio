import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './DesignBookModal.css';

interface DesignBookModalProps {
    pages: string[];
    open: boolean;
    onClose: () => void;
    title?: string;
}

type HalfSide = 'left' | 'right' | 'full';

interface Half {
    src: string;
    side: HalfSide;
}

interface View {
    left: Half | null;
    right: Half | null;
}

function buildViews(pages: string[]): View[] {
    if (pages.length === 0) return [];
    if (pages.length === 1) {
        return [{ left: null, right: { src: pages[0], side: 'full' } }];
    }
    const views: View[] = [];
    views.push({ left: null, right: { src: pages[0], side: 'full' } });
    for (let i = 1; i < pages.length - 1; i++) {
        views.push({
            left: { src: pages[i], side: 'left' },
            right: { src: pages[i], side: 'right' },
        });
    }
    views.push({ left: { src: pages[pages.length - 1], side: 'full' }, right: null });
    return views;
}

const halfBackgroundStyle = (half: Half | null): React.CSSProperties => {
    if (!half) return { backgroundImage: 'none' };
    return {
        backgroundImage: `url(${half.src})`,
        backgroundSize: half.side === 'full' ? 'contain' : '200% 100%',
        backgroundPosition:
            half.side === 'full'
                ? 'center'
                : half.side === 'left'
                    ? 'left center'
                    : 'right center',
        backgroundRepeat: 'no-repeat',
    };
};

export const DesignBookModal: React.FC<DesignBookModalProps> = ({ pages, open, onClose, title }) => {
    const views = useMemo(() => buildViews(pages), [pages]);
    const totalViews = views.length;

    const [viewIndex, setViewIndex] = useState(0);

    useEffect(() => {
        if (!open) {
            setViewIndex(0);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const indexRef = useRef(viewIndex);
    indexRef.current = viewIndex;

    const goNext = useCallback(() => {
        const cur = indexRef.current;
        if (cur >= totalViews - 1) return;
        setViewIndex(cur + 1);
    }, [totalViews]);

    const goPrev = useCallback(() => {
        const cur = indexRef.current;
        if (cur <= 0) return;
        setViewIndex(cur - 1);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                goNext();
            } else if (e.key === 'ArrowLeft') {
                goPrev();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, goNext, goPrev, onClose]);

    useEffect(() => {
        if (!open) return;
        const targets = [viewIndex - 1, viewIndex, viewIndex + 1, viewIndex + 2];
        targets.forEach(i => {
            if (i < 0 || i >= pages.length) return;
            const img = new Image();
            img.src = pages[i];
        });
    }, [open, viewIndex, pages]);

    if (!open) return null;

    const view = views[viewIndex];
    const isSinglePage = !view?.left || !view?.right;
    const stageClassName = `design-book-stage${isSinglePage ? ' design-book-stage--single' : ''}`;

    return (
        <div
            className="design-book-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title ? `${title} design book` : 'Design book'}
            onClick={onClose}
        >
            <button
                type="button"
                className="design-book-close"
                onClick={onClose}
                aria-label="Close design book"
            >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <div className={stageClassName} onClick={e => e.stopPropagation()}>
                <div className="design-book-spread">
                    {view?.left && (
                        <div
                            className="design-book-half design-book-half--left"
                            style={halfBackgroundStyle(view.left)}
                        />
                    )}
                    {view?.right && (
                        <div
                            className="design-book-half design-book-half--right"
                            style={halfBackgroundStyle(view.right)}
                        />
                    )}
                    {!isSinglePage && <div className="design-book-gutter" aria-hidden="true" />}
                </div>

                {viewIndex > 0 && (
                    <button
                        type="button"
                        className="design-book-arrow design-book-arrow--prev"
                        onClick={goPrev}
                        aria-label="Previous page"
                    >
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}
                {viewIndex < totalViews - 1 && (
                    <button
                        type="button"
                        className="design-book-arrow design-book-arrow--next"
                        onClick={goNext}
                        aria-label="Next page"
                    >
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="design-book-counter" onClick={e => e.stopPropagation()}>
                {viewIndex + 1} / {totalViews}
            </div>
        </div>
    );
};

export default DesignBookModal;
