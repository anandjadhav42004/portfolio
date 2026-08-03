import { RefObject } from 'react';

export type CursorTrail = {
  ref: RefObject<HTMLCanvasElement>;
  color?: string;
};

export function cursorTrail(props: CursorTrail) {
  const { ref } = props;
  const canvas = ref.current;
  if (!canvas) {
    return { cleanUp: () => {}, renderTrailCursor: () => {} };
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { cleanUp: () => {}, renderTrailCursor: () => {} };
  }

  const strokeColor = 'rgba(56, 189, 248, 0.35)'; // Cyan neon stroke
  const AnimationFeature = {
    friction: 0.55,
    trails: 12,
    size: 28,
    dampening: 0.18,
    tension: 0.98,
  };

  let cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let running = true;

  class NewNode {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
  }

  type LineProps = {
    spring: number;
    cursorPosition?: { x: number; y: number };
  };

  class Line {
    spring: number;
    friction: number;
    nodes: NewNode[] = [];
    constructor(e: LineProps) {
      this.spring = e.spring + 0.05 * Math.random() - 0.025;
      this.friction = AnimationFeature.friction + 0.01 * Math.random() - 0.005;
      const cp = e.cursorPosition ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      for (let i = 0; i < AnimationFeature.size; i++) {
        const n = new NewNode();
        n.x = cp.x;
        n.y = cp.y;
        this.nodes.push(n);
      }
    }
    update() {
      let e = this.spring;
      let t = this.nodes[0];
      t.vx += (cursorPosition.x - t.x) * e;
      t.vy += (cursorPosition.y - t.y) * e;
      for (let i = 0; i < this.nodes.length; i++) {
        t = this.nodes[i];
        if (i > 0) {
          const n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * AnimationFeature.dampening;
          t.vy += n.vy * AnimationFeature.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= AnimationFeature.tension;
      }
    }
    draw() {
      let n = this.nodes[0].x;
      let i = this.nodes[0].y;
      ctx!.beginPath();
      ctx!.moveTo(n, i);
      for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
        const e = this.nodes[a];
        const t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx!.quadraticCurveTo(e.x, e.y, n, i);
      }
      const e = this.nodes[this.nodes.length - 2];
      const t = this.nodes[this.nodes.length - 1];
      ctx!.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx!.stroke();
      ctx!.closePath();
    }
  }

  let newLines: Line[] = [];

  function renderAnimation() {
    if (running && ctx && canvas) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      for (let t = 0; t < AnimationFeature.trails; t++) {
        const x = newLines[t];
        if (x) {
          x.update();
          x.draw();
        }
      }
      window.requestAnimationFrame(renderAnimation);
    }
  }

  function move(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      cursorPosition.x = event.clientX;
      cursorPosition.y = event.clientY;
    } else if (event.touches && event.touches[0]) {
      cursorPosition.x = event.touches[0].clientX;
      cursorPosition.y = event.touches[0].clientY;
    }
  }

  function onMouseMove(e: MouseEvent | TouchEvent) {
    function populateLines() {
      newLines = [];
      for (let i = 0; i < AnimationFeature.trails; i++) {
        newLines.push(new Line({ spring: 0.45 + (i / AnimationFeature.trails) * 0.025 }));
      }
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchstart', onMouseMove);
    document.addEventListener('mousemove', move, { passive: true });
    move(e);
    populateLines();
    renderAnimation();
  }

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function stopAnimation() {
    running = false;
  }

  function startAnimation() {
    if (!running) {
      running = true;
      renderAnimation();
    }
  }

  function renderTrailCursor() {
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('touchstart', onMouseMove, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', startAnimation);
    window.addEventListener('blur', stopAnimation);
    resizeCanvas();
  }

  function cleanUp() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchstart', onMouseMove);
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('focus', startAnimation);
    window.removeEventListener('blur', stopAnimation);
  }

  return { cleanUp, renderTrailCursor };
}
