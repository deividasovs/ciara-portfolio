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

interface FlipState {
    dir: 'next' | 'prev';
    fromView: number;
    toView: number;
    halfSrc: string;
    halfSide: HalfSide;
}

const FLIP_MS = 1100;

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

    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(0);
    const [flip, setFlip] = useState<FlipState | null>(null);

    useEffect(() => {
        if (!open) {
            setLeftIndex(0);
            setRightIndex(0);
            setFlip(null);
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

    const visualIndex = flip ? flip.toView : leftIndex;

    const flipRef = useRef(flip);
    flipRef.current = flip;
    const indicesRef = useRef({ left: leftIndex, right: rightIndex });
    indicesRef.current = { left: leftIndex, right: rightIndex };

    const goNext = useCallback(() => {
        const { left, right } = indicesRef.current;
        const cur = Math.max(left, right);
        if (cur >= totalViews - 1) return;
        const oldView = views[cur];
        if (!oldView.right) return;
        setFlip({
            dir: 'next',
            fromView: cur,
            toView: cur + 1,
            halfSrc: oldView.right.src,
            halfSide: oldView.right.side,
        });
        setLeftIndex(cur + 1);
        setRightIndex(cur + 1);
    }, [totalViews, views]);

    const goPrev = useCallback(() => {
        const { left, right } = indicesRef.current;
        const cur = Math.min(left, right);
        if (cur <= 0) return;
        const oldView = views[cur];
        if (!oldView.left) return;
        setFlip({
            dir: 'prev',
            fromView: cur,
            toView: cur - 1,
            halfSrc: oldView.left.src,
            halfSide: oldView.left.side,
        });
        setLeftIndex(cur - 1);
        setRightIndex(cur - 1);
    }, [views]);

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
        const targets = [visualIndex - 1, visualIndex, visualIndex + 1, visualIndex + 2];
        targets.forEach(i => {
            if (i < 0 || i >= pages.length) return;
            const img = new Image();
            img.src = pages[i];
        });
    }, [open, visualIndex, pages]);

    if (!open) return null;

    const onFlipEnd = (e: React.AnimationEvent) => {
        if (e.target !== e.currentTarget) return;
        setFlip(null);
    };

    const leftView = views[leftIndex];
    const rightView = views[rightIndex];

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

            <div className="design-book-stage" onClick={e => e.stopPropagation()}>
                <div
                    className="design-book-half design-book-half--left"
                    style={halfBackgroundStyle(leftView?.left ?? null)}
                />
                <div
                    className="design-book-half design-book-half--right"
                    style={halfBackgroundStyle(rightView?.right ?? null)}
                />

                {flip && (
                    <div
                        key={`${flip.fromView}-${flip.toView}-${flip.dir}`}
                        className={`design-book-flip design-book-flip--${flip.dir}`}
                        style={{
                            animationDuration: `${FLIP_MS}ms`,
                            ['--flip-ms' as any]: `${FLIP_MS}ms`,
                        }}
                        onAnimationEnd={onFlipEnd}
                    >
                        <div className="design-book-flip-lift">
                            <div
                                className="design-book-flip-face design-book-flip-front"
                                style={halfBackgroundStyle({ src: flip.halfSrc, side: flip.halfSide })}
                            >
                                <span className="design-book-flip-shade design-book-flip-shade--front" />
                            </div>
                            <div className="design-book-flip-face design-book-flip-back">
                                <span className="design-book-flip-shade design-book-flip-shade--back" />
                            </div>
                        </div>
                    </div>
                )}

                {visualIndex > 0 && (
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
                {visualIndex < totalViews - 1 && (
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
                {visualIndex + 1} / {totalViews}
            </div>
        </div>
    );
};

export default DesignBookModal;
