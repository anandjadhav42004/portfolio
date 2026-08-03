import { RefObject } from 'react';

export type CursorTrail = {
  ref: RefObject<HTMLCanvasElement>;
  color?: string;
};

export function cursorTrail(props: CursorTrail) {
  const { ref, color } = props;
  const canvas = ref.current;
  if (!canvas) {
    return { cleanUp: () => {}, renderTrailCursor: () => {} };
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { cleanUp: () => {}, renderTrailCursor: () => {} };
  }

  const colorRaw = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  const accentColor = `hsla(${colorRaw ? colorRaw.trim().split(' ').join(',') : '210, 100%, 50%'}, 0.35)`;
  const AnimationFeature = {
    friction: 0.5,
    trails: 20,
    size: 40,
    dampening: 0.2,
    tension: 0.98,
  };

  let cursorPosition = { x: 0, y: 0 };
  let running = true;

  class NewNode {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
  }

  type LineProps = {
    spring: number;
    friction?: number;
    size?: number;
    cursorPosition?: { x: number; y: number };
  };

  class Line {
    spring: number;
    friction: number;
    nodes: NewNode[] = [];
    constructor(e: LineProps) {
      this.spring = e.spring + 0.1 * Math.random() - 0.05;
      this.friction = AnimationFeature.friction + 0.01 * Math.random() - 0.005;
      const cp = e.cursorPosition ?? { x: 0, y: 0 };
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
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
        const e = this.nodes[a];
        const t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      const e = this.nodes[this.nodes.length - 2];
      const t = this.nodes[this.nodes.length - 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  let newLines: Line[] = [];

  function renderAnimation() {
    if (running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = color || accentColor;
      ctx.lineWidth = 1;
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
    } else {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
    }
    event.preventDefault();
  }

  function createLine(event: TouchEvent) {
    if (event.touches.length === 1) {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
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
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', createLine);
    document.addEventListener('touchstart', createLine);
    move(e);
    populateLines();
    renderAnimation();
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
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
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchstart', onMouseMove);
    window.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', startAnimation);
    window.addEventListener('blur', stopAnimation);
    resizeCanvas();
  }

  function cleanUp() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', createLine);
    document.removeEventListener('touchstart', createLine);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchstart', onMouseMove);
  }

  return { cleanUp, renderTrailCursor };
}
