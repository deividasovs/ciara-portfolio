import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import HTMLFlipBook from 'react-pageflip';
import './DesignBookModal.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const RENDER_TARGET_PX_DEFAULT = 900;
const RENDER_TARGET_PX_LOW_MEM = 700;
const LOW_MEM_THRESHOLD_GB = 4;
const JPEG_QUALITY = 0.78;
const VIEWPORT_PAD_X = 220;
const VIEWPORT_PAD_Y = 100;
const FALLBACK_PAGE_ASPECT = 0.75;

const yieldToBrowser = () =>
    new Promise<void>(resolve => {
        if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(() => resolve());
        else setTimeout(resolve, 0);
    });

const detectRenderTarget = (): number => {
    if (typeof navigator !== 'undefined') {
        const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        if (typeof mem === 'number' && mem < LOW_MEM_THRESHOLD_GB) return RENDER_TARGET_PX_LOW_MEM;
    }
    return RENDER_TARGET_PX_DEFAULT;
};

interface Props {
    pdfUrl: string;
    onClose: () => void;
}

const BookPage = forwardRef<
    HTMLDivElement,
    { src: string | null; pageNumber: number; hard?: boolean }
>(({ src, pageNumber, hard }, ref) => (
    <div
        className={`design-book-leaf${hard ? ' design-book-leaf--hard' : ''}${
            src ? '' : ' design-book-leaf--pending'
        }`}
        ref={ref}
        data-density={hard ? 'hard' : 'soft'}
    >
        {src ? (
            <img
                src={src}
                alt={`Page ${pageNumber}`}
                draggable={false}
                loading="lazy"
                decoding="async"
            />
        ) : (
            <div className="design-book-leaf-placeholder">
                <div className="design-book-leaf-spinner" />
            </div>
        )}
    </div>
));
BookPage.displayName = 'BookPage';

const getInitialWindowSize = () => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
});

export const DesignBookModal: React.FC<Props> = ({ pdfUrl, onClose }) => {
    const [pages, setPages] = useState<(string | null)[]>([]);
    const [aspect, setAspect] = useState<number | null>(null);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [winSize, setWinSize] = useState(getInitialWindowSize);

    const bookRef = useRef<any>(null);
    const blobUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        let cancelled = false;
        const blobUrls: string[] = [];
        blobUrlsRef.current = blobUrls;
        setPages([]);
        setAspect(null);
        setProgress({ current: 0, total: 0 });

        const renderTargetPx = detectRenderTarget();

        (async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let doc: Awaited<ReturnType<typeof pdfjsLib.getDocument>['promise']> | null = null;
            try {
                if (!ctx) throw new Error('No 2D canvas context available');
                doc = await pdfjsLib.getDocument(pdfUrl).promise;
                if (cancelled) return;
                const total = doc.numPages;
                setProgress({ current: 0, total });

                const firstPage = await doc.getPage(1);
                if (cancelled) return;
                const baseVp = firstPage.getViewport({ scale: 1 });
                setAspect(baseVp.width / baseVp.height);

                const slots: (string | null)[] = new Array(total).fill(null);
                setPages(slots.slice());

                const renderToBlobUrl = async (page: any): Promise<string | null> => {
                    const vp = page.getViewport({ scale: 1 });
                    const scale = renderTargetPx / vp.width;
                    const viewport = page.getViewport({ scale });
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({ canvasContext: ctx, viewport }).promise;
                    const blob = await new Promise<Blob | null>(resolve =>
                        canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
                    );
                    page.cleanup();
                    if (!blob) return null;
                    const url = URL.createObjectURL(blob);
                    blobUrls.push(url);
                    return url;
                };

                const coverUrl = await renderToBlobUrl(firstPage);
                if (cancelled) return;
                if (coverUrl) {
                    slots[0] = coverUrl;
                    setPages(slots.slice());
                    setProgress({ current: 1, total });
                }
                await yieldToBrowser();

                for (let i = 2; i <= total; i++) {
                    if (cancelled) return;
                    const page = await doc.getPage(i);
                    if (cancelled) return;
                    const url = await renderToBlobUrl(page);
                    if (cancelled) return;
                    if (url) {
                        slots[i - 1] = url;
                        setPages(slots.slice());
                        setProgress({ current: i, total });
                    }
                    await yieldToBrowser();
                }
            } catch (err) {
                console.error('Design book PDF load error', err);
            } finally {
                canvas.width = 0;
                canvas.height = 0;
                if (doc) {
                    try {
                        await doc.cleanup();
                    } catch {
                        /* ignore */
                    }
                    try {
                        await doc.destroy();
                    } catch {
                        /* ignore */
                    }
                }
            }
        })();

        return () => {
            cancelled = true;
            blobUrls.forEach(URL.revokeObjectURL);
        };
    }, [pdfUrl]);

    useEffect(() => {
        const handler = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const handlePrev = useCallback(() => {
        bookRef.current?.pageFlip()?.flipPrev();
    }, []);
    const handleNext = useCallback(() => {
        bookRef.current?.pageFlip()?.flipNext();
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, handleNext, handlePrev]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    const pageAspect = aspect || FALLBACK_PAGE_ASPECT;
    const spreadAspect = pageAspect * 2;
    const availW = Math.max(200, winSize.w - VIEWPORT_PAD_X);
    const availH = Math.max(200, winSize.h - VIEWPORT_PAD_Y);
    const bookW = Math.floor(Math.min(availW, availH * spreadAspect));
    const bookH = Math.floor(bookW / spreadAspect);
    const pageW = Math.floor(bookW / 2);
    const pageH = bookH;

    const isLoading = pages.length === 0 || !pages[0];
    const showCounter = pages.length > 1 && !isLoading;
    const totalPages = progress.total;
    const loadedPages = pages.filter(Boolean).length;
    const stillLoading = totalPages > 0 && loadedPages < totalPages;

    return (
        <div
            className="design-book-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Design book"
            onClick={onClose}
        >
            <button
                type="button"
                className="design-book-close"
                onClick={onClose}
                aria-label="Close design book"
            >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {isLoading ? (
                <div className="design-book-loading" onClick={e => e.stopPropagation()}>
                    <div className="design-book-spinner" />
                    <div className="design-book-loading-text">
                        {progress.total > 0
                            ? `Loading cover…`
                            : 'Loading'}
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="design-book-frame"
                        onClick={e => e.stopPropagation()}
                        style={{ width: bookW, height: bookH }}
                    >
                        <HTMLFlipBook
                            key={`book-${pageW}x${pageH}-${pages.length}`}
                            ref={bookRef}
                            width={pageW}
                            height={pageH}
                            size="fixed"
                            minWidth={pageW}
                            maxWidth={pageW}
                            minHeight={pageH}
                            maxHeight={pageH}
                            showCover={true}
                            flippingTime={700}
                            usePortrait={false}
                            startZIndex={0}
                            autoSize={false}
                            maxShadowOpacity={0.5}
                            mobileScrollSupport={true}
                            swipeDistance={30}
                            clickEventForward={false}
                            useMouseEvents={true}
                            drawShadow={true}
                            showPageCorners={true}
                            disableFlipByClick={false}
                            startPage={0}
                            className="design-book-flipbook"
                            style={{}}
                        >
                            {pages.map((src, i) => (
                                <BookPage
                                    key={i}
                                    src={src}
                                    pageNumber={i + 1}
                                    hard={i === 0 || i === pages.length - 1}
                                />
                            ))}
                        </HTMLFlipBook>
                    </div>

                    <button
                        type="button"
                        className="design-book-arrow design-book-arrow--prev"
                        onClick={handlePrev}
                        aria-label="Previous page"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="design-book-arrow design-book-arrow--next"
                        onClick={handleNext}
                        aria-label="Next page"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}

            {showCounter && (
                <div className="design-book-counter" onClick={e => e.stopPropagation()}>
                    {stillLoading
                        ? `Loading pages ${loadedPages} / ${totalPages}`
                        : 'swipe, click corners, or use arrows'}
                </div>
            )}
        </div>
    );
};

export default DesignBookModal;
