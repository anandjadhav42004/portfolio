import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };
    let ringPos = { x: width / 2, y: height / 2 };
    let dotPos = { x: width / 2, y: height / 2 };

    // Fluid Trail Spring Ribbon Nodes (Awwwards Izanami / Ghibli motion)
    const NODE_COUNT = 18;
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const linkEl = target.closest('a') || target.closest('button') || target.closest('.interactive');
      if (linkEl) {
        setIsHovering(true);
        const text = linkEl.getAttribute('data-cursor') || '';
        setHoverText(text);
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for outer ring and inner dot
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      dotPos.x += (mouse.x - dotPos.x) * 0.6;
      dotPos.y += (mouse.y - dotPos.y) * 0.6;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 24}px, ${ringPos.y - 24}px, 0px)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x - 5}px, ${dotPos.y - 5}px, 0px)`;
      }

      // Spring physics ribbon calculation
      let spring = 0.4;
      let friction = 0.55;

      nodes[0].x = mouse.x;
      nodes[0].y = mouse.y;

      for (let i = 1; i < NODE_COUNT; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];

        curr.vx += (prev.x - curr.x) * spring;
        curr.vy += (prev.y - curr.y) * spring;
        curr.vx *= friction;
        curr.vy *= friction;
        curr.x += curr.vx;
        curr.y += curr.vy;
      }

      // Draw fluid Ghibli ribbon trail
      if (nodes.length > 2) {
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);

        for (let i = 1; i < nodes.length - 1; i++) {
          const xc = (nodes[i].x + nodes[i + 1].x) / 2;
          const yc = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
        }

        ctx.strokeStyle = isHovering
          ? 'rgba(251, 191, 36, 0.45)' // Warm Gold
          : 'rgba(52, 211, 153, 0.35)'; // Emerald Cyan

        ctx.lineWidth = isHovering ? 3 : 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = isHovering ? 'rgba(251, 191, 36, 0.6)' : 'rgba(52, 211, 153, 0.5)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isHovering]);

  return (
    <div className={`pointer-events-none z-[999999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fullscreen Fluid Ribbon Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[999998]"
      />

      {/* Outer Studio Ghibli Glass Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full border pointer-events-none z-[999999] flex items-center justify-center transition-all duration-200 ease-out ${isHovering
          ? 'scale-150 border-amber-300 bg-amber-400/20 backdrop-blur-[2px] shadow-[0_0_25px_rgba(251,191,36,0.6)]'
          : 'scale-100 border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
          }`}
      >
        {hoverText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-amber-200 uppercase px-1 animate-pulse">
            {hoverText}
          </span>
        )}
      </div>

      {/* Core Glowing Spirit Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[999999] transition-transform duration-100 ${isHovering
          ? 'scale-150 bg-amber-300 shadow-[0_0_12px_#FBBF24]'
          : 'scale-100 bg-emerald-300 shadow-[0_0_10px_#34D399]'
          }`}
      />
    </div>
  );
}
