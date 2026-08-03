import { useEffect, useRef } from 'react';
import CursorTrailCanvas from './CursorTrailCanvas';

export default function ParticleBackground() {
  // You can customize the color using CSS variable --accent or pass a prop.
  return (
    <div className="fixed inset-0 pointer-events-none">
      <CursorTrailCanvas
        color="var(--accent)"
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
