import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    baseOpacity: number;
    opacity: number;
    angle: number;
}

export const SpectacleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };
        // We use a debounce timer for resize
        let resizeTimer: any;

        const resize = () => {
            // Add a small delay for resize to allow layout to settle
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (!canvas || !canvas.parentElement) return;
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
                initParticles();
            }, 100);
        };

        const initParticles = () => {
            particles = [];
            const isMobile = window.innerWidth < 768;
            const particleCount = isMobile ? 40 : 120; // Dense enough to look good
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4 - 0.1, // slight upward drift
                    baseOpacity: Math.random() * 0.4 + 0.1,
                    opacity: 0,
                    angle: Math.random() * 360
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Mouse interaction - gentle repulsion and glow
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    p.x -= (dx / distance) * force * 1.2;
                    p.y -= (dy / distance) * force * 1.2;
                    p.opacity = Math.min(p.baseOpacity * 3, 0.9); // glow up close
                } else {
                    p.opacity = p.baseOpacity + Math.sin(p.angle * Math.PI / 180) * 0.15;
                    p.angle += 2;
                }

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw ember / gold dust
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                glowGradient.addColorStop(0, `rgba(255, 230, 150, ${Math.max(0, p.opacity)})`); // bright center
                glowGradient.addColorStop(1, `rgba(212, 175, 55, ${Math.max(0, p.opacity * 0.5)})`); // golden edge
                
                ctx.fillStyle = glowGradient;
                ctx.fill();
            }
            
            // Subtle connecting lines for nearby particles
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 90) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / 90)})`;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        // Initialize setup
        // Set initial width/height without timer to avoid visual flash
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        initParticles();
        drawParticles();

        window.addEventListener('resize', resize);
        // Bind mouse events to a parent or document so it detects movement over the title too
        const interactElement = canvas.parentElement || canvas;
        interactElement.addEventListener('mousemove', handleMouseMove as EventListener);
        interactElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resize);
            interactElement.removeEventListener('mousemove', handleMouseMove as EventListener);
            interactElement.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // So it doesn't block title interations
                zIndex: 1, // Above the ::after overlay, but below the title (z-index: 2)
            }}
        />
    );
};
