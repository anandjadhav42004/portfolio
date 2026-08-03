import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Studio Ghibli Floating Kodama / Starlight Spirits
    interface Spirit {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
    }

    const colors = [
      'rgba(56, 189, 248, ',  // Cyan
      'rgba(52, 211, 153, ',  // Emerald Ghibli Green
      'rgba(251, 191, 36, ',  // Warm Gold Starlight
      'rgba(167, 139, 250, ', // Soft Twilight Violet
    ];

    const spirits: Spirit[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2, // Slow upward drift
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Ghibli ambient sky radial gradient
      const bgGlow = ctx.createRadialGradient(
        mouse.x, mouse.y, 50,
        mouse.x, mouse.y, width * 0.6
      );
      bgGlow.addColorStop(0, 'rgba(16, 185, 129, 0.06)'); // Soft Ghibli Forest Emerald Glow
      bgGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)'); // Soft Cyan Sky Glow
      bgGlow.addColorStop(1, 'rgba(7, 17, 30, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw & update spirits
      spirits.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += Math.sin(Date.now() * s.pulseSpeed) * 0.005;

        // Wrap around screen edges
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.max(0.1, Math.min(0.8, s.alpha)) + ')';
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
