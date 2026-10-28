import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Glasses, Palette, Sparkles, Terminal } from 'lucide-react';

interface HoodieTheme {
  name: string;
  shirt: number;
  accent: number;
  coral: number;
  badgeClass: string;
}

const THEMES: HoodieTheme[] = [
  {
    name: 'SAP Indigo',
    shirt: 0x4f46e5,
    accent: 0x5eead4,
    coral: 0xff7a90,
    badgeClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  },
  {
    name: 'Ghibli Emerald',
    shirt: 0x059669,
    accent: 0x34d399,
    coral: 0xfbbf24,
    badgeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    name: 'Cyber Cyan',
    shirt: 0x0284c7,
    accent: 0x38bdf8,
    coral: 0xf43f5e,
    badgeClass: 'text-cyan border-cyan/30 bg-cyan/10',
  },
];

export default function Interactive3DModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
  const [hasGlasses, setHasGlasses] = useState(true);
  const [isTypingActive, setIsTypingActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // References for live Three.js updates
  const glassesGroupRef = useRef<THREE.Group | null>(null);
  const shirtMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const warmLightRef = useRef<THREE.PointLight | null>(null);
  const ringMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Drag interaction state
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    spin: 0,
    targetSpin: 0,
    mx: 0,
    my: 0,
  });

  const activeTheme = THEMES[currentThemeIdx];

  useEffect(() => {
    const wrap = mountRef.current;
    if (!wrap) return;

    // Clear previous children
    while (wrap.firstChild) {
      wrap.removeChild(wrap.firstChild);
    }

    const C = {
      skin: 0xe8b98a,
      hair: 0x15151f,
      shirt: activeTheme.shirt,
      accent: activeTheme.accent,
      coral: activeTheme.coral,
    };

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = wrap.clientWidth || 420;
    const height = wrap.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 9.8);

    // 2. Optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    // 3. Lighting Setup
    scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x1a2238, 0.95));

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 6, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.radius = 4;
    scene.add(key);

    const rim = new THREE.PointLight(C.accent, 1.8, 25);
    rim.position.set(-4, 2, -2);
    scene.add(rim);
    rimLightRef.current = rim;

    const warm = new THREE.PointLight(C.coral, 1.0, 20);
    warm.position.set(4, 0, 3);
    scene.add(warm);
    warmLightRef.current = warm;

    // 4. Material Factories & Helpers
    const M = (c: number, o = {}) =>
      new THREE.MeshStandardMaterial(
        Object.assign({ color: c, roughness: 0.5, metalness: 0.05 }, o)
      );
    const addMesh = (p: THREE.Object3D, g: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
      const o = new THREE.Mesh(g, m);
      o.position.set(x, y, z);
      p.add(o);
      return o;
    };
    const S = (r: number) => new THREE.SphereGeometry(r, 32, 24);

    const skin = M(C.skin, { roughness: 0.65 });
    const shirt = M(C.shirt, { roughness: 0.8 });
    shirtMaterialRef.current = shirt;
    const hairM = M(C.hair, { roughness: 0.7 });
    const dark = M(0x111118);

    const avatar = new THREE.Group();
    scene.add(avatar);

    // 5. Body Construction
    const torso = addMesh(avatar, new THREE.CylinderGeometry(0.9, 1.1, 1.8, 40), shirt, 0, -0.9, 0);
    torso.scale.z = 0.7;
    const shoulders = addMesh(avatar, S(0.95), shirt, 0, -0.1, 0);
    shoulders.scale.set(1.2, 0.45, 0.7);
    addMesh(avatar, new THREE.CylinderGeometry(0.26, 0.3, 0.45, 24), skin, 0, 0.15, 0);

    const collar = addMesh(
      avatar,
      new THREE.TorusGeometry(0.3, 0.05, 10, 28),
      M(0x312e81),
      0,
      -0.04,
      0
    );
    collar.rotation.x = Math.PI / 2;

    // Hoodie: Hood + Drawstrings
    const hood = addMesh(avatar, S(0.8), shirt, 0, 0, -0.35);
    hood.scale.set(1.15, 0.7, 0.6);
    [-1, 1].forEach((s) =>
      addMesh(avatar, new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), M(0xffffff), s * 0.22, -0.35, 0.66)
    );

    // 6. Head Group
    const head = new THREE.Group();
    head.position.y = 0.95;
    avatar.add(head);

    const face = addMesh(head, S(0.85), skin);
    face.scale.set(1.03, 1.04, 1);

    const nose = addMesh(head, S(0.095), skin, 0, -0.02, 0.84);
    nose.scale.set(1, 1.1, 1.1);

    // Ears & Eyebrows
    [-1, 1].forEach((s) => {
      addMesh(head, S(0.14), skin, s * 0.84, 0, 0);
      const br = addMesh(head, new THREE.BoxGeometry(0.29, 0.07, 0.07), hairM, s * 0.3, 0.36, 0.75);
      br.rotation.z = s * 0.08;
    });

    // Hair Details
    const mainHair = addMesh(
      head,
      new THREE.SphereGeometry(0.9, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hairM,
      0,
      0.1,
      -0.04
    );
    mainHair.rotation.x = -0.3;

    const quiff = addMesh(head, S(0.3), hairM, 0, 0.9, 0.32);
    quiff.scale.set(1.5, 0.6, 1);

    // Sideburns & Fringe Tufts
    [-1, 1].forEach((s) =>
      addMesh(head, new THREE.BoxGeometry(0.1, 0.35, 0.14), hairM, s * 0.82, 0.2, 0.1)
    );
    [-0.5, -0.25, 0, 0.25, 0.5].forEach((x) =>
      addMesh(head, S(0.13), hairM, x, 0.78 - Math.abs(x) * 0.22, 0.6 - Math.abs(x) * 0.2).scale.set(1, 0.7, 0.7)
    );

    // Eyes (with pupil & highlight for realistic look)
    const eyes: THREE.Group[] = [];
    [-1, 1].forEach((s) => {
      const e = new THREE.Group();
      e.position.set(s * 0.3, 0.1, 0.74);
      head.add(e);
      addMesh(e, S(0.14), M(0xffffff, { roughness: 0.3 }), 0, 0, 0).scale.z = 0.6;
      addMesh(e, S(0.08), dark, 0, 0, 0.06);
      addMesh(e, S(0.025), M(0xffffff, { emissive: 0xffffff }), 0.03, 0.035, 0.14);
      eyes.push(e);
    });

    // Friendly Smile
    const smile = addMesh(
      head,
      new THREE.TorusGeometry(0.24, 0.035, 10, 28, Math.PI),
      M(0x8a3a3a),
      0,
      -0.24,
      0.79
    );
    smile.rotation.z = Math.PI;

    // Glasses Group
    const glassesGroup = new THREE.Group();
    head.add(glassesGroup);
    glassesGroupRef.current = glassesGroup;

    [-1, 1].forEach((s) =>
      addMesh(glassesGroup, new THREE.TorusGeometry(0.22, 0.025, 12, 36), dark, s * 0.3, 0.1, 0.9)
    );
    const bridge = addMesh(
      glassesGroup,
      new THREE.CylinderGeometry(0.02, 0.02, 0.18, 8),
      dark,
      0,
      0.12,
      0.91
    );
    bridge.rotation.z = Math.PI / 2;
    glassesGroup.visible = hasGlasses;

    // 7. Developer Laptop
    const lap = new THREE.Group();
    lap.position.set(0, -1.51, 1.3);
    avatar.add(lap);

    const metal = M(0x1e293b, { metalness: 0.8, roughness: 0.25 });
    addMesh(lap, new THREE.BoxGeometry(2, 0.08, 1.4), metal, 0, 0, 0.7);

    const lid = new THREE.Group();
    lid.rotation.x = -0.28;
    lap.add(lid);
    addMesh(lid, new THREE.BoxGeometry(2, 1.3, 0.06), metal, 0, 0.65, 0);

    const logoMat = M(C.accent, { emissive: C.accent, emissiveIntensity: 1.2 });
    addMesh(lid, new THREE.CircleGeometry(0.2, 40), logoMat, 0, 0.65, 0.035);

    // 8. Arms & Typing Hands
    const hands: THREE.Mesh[] = [];
    [-1, 1].forEach((s) => {
      const from = new THREE.Vector3(s * 1.05, -0.2, 0);
      const to = new THREE.Vector3(s * 0.7, -1.42, 2.0);
      const g = new THREE.CylinderGeometry(0.2, 0.18, from.distanceTo(to), 20);
      g.rotateX(Math.PI / 2);
      const arm = new THREE.Mesh(g, shirt);
      arm.position.copy(from).lerp(to, 0.5);
      arm.lookAt(to);
      avatar.add(arm);
      hands.push(addMesh(avatar, S(0.2), skin, to.x, to.y, to.z));
    });

    avatar.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true;
    });

    // 9. Ground Ring & Shadow Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.35 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.15;
    floor.receiveShadow = true;
    scene.add(floor);

    const ringMat = M(C.accent, { emissive: C.accent, emissiveIntensity: 0.85 });
    ringMaterialRef.current = ringMat;
    const ring = addMesh(scene, new THREE.TorusGeometry(2, 0.03, 8, 80), ringMat, 0, -2.14, 0);
    ring.rotation.x = Math.PI / 2;

    // 10. Orbiting Skill Badges (Geometric Polyhedra)
    const geos = [
      new THREE.IcosahedronGeometry(0.22),
      new THREE.OctahedronGeometry(0.26),
      new THREE.TetrahedronGeometry(0.28),
      new THREE.TorusKnotGeometry(0.16, 0.06, 64, 8),
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
    ];
    const badgeColors = [C.accent, C.coral, 0xfacc15, 0xa78bfa, 0x38bdf8];
    const orbs = geos.map((g, i) => {
      const m = new THREE.Mesh(
        g,
        M(badgeColors[i], {
          emissive: badgeColors[i],
          emissiveIntensity: 0.45,
          roughness: 0.3,
        })
      );
      m.userData = {
        a: (i * Math.PI * 2) / 5,
        r: 2.6 + (i % 2) * 0.3,
        y: -0.8 + i * 0.55,
      };
      scene.add(m);
      return m;
    });

    // 11. Ambient Floating Star Particles
    const pg = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let i = 0; i < 160; i++) {
      pts.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -2 - Math.random() * 4
      );
    }
    pg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const stars = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        color: 0x9fb4ff,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
      })
    );
    scene.add(stars);

    // 12. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      const drag = dragRef.current;

      // Subtle breathing floating motion
      avatar.position.y = Math.sin(t * 1.6) * 0.07;

      // Head turns and looks toward mouse coordinates
      head.rotation.y += (drag.mx * 0.6 - head.rotation.y) * 0.08;
      head.rotation.x += (drag.my * 0.35 - head.rotation.x) * 0.08;

      // Spin inertia damping when releasing mouse drag
      if (!drag.isDown) {
        drag.spin *= 0.96;
      }
      avatar.rotation.y = drag.spin + drag.mx * 0.15;

      // Natural eye blinking
      eyes.forEach((e) => {
        e.scale.y = t % 3.6 > 3.47 ? 0.1 : 1;
      });

      // Realistic typing animation on laptop keyboard
      hands.forEach((h, i) => {
        h.position.y =
          -1.42 + (isTypingActive ? Math.max(0, Math.sin(t * 9 + i * Math.PI)) * 0.04 : 0);
      });

      // Glowing laptop logo breathing effect
      logoMat.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.35;

      // Orbiting skill badges rotation and bobbing
      orbs.forEach((o) => {
        const d = o.userData;
        const a = d.a + t * 0.5;
        o.position.set(
          Math.cos(a) * d.r,
          d.y + Math.sin(t + d.a) * 0.12,
          Math.sin(a) * d.r * 0.6
        );
        o.rotation.x = t * 0.8;
        o.rotation.y = t * 0.6;
      });

      ring.rotation.z = t * 0.4;
      stars.rotation.y = t * 0.02;

      // Gentle camera floating parallax
      camera.position.x += (drag.mx * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (0.35 - drag.my * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.1, 0);

      renderer.render(scene, camera);
    };

    loop();

    // 13. Dynamic Resize Observer
    const resize = () => {
      if (!wrap || !renderer) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update theme colors when user toggles theme
  useEffect(() => {
    if (shirtMaterialRef.current) {
      shirtMaterialRef.current.color.setHex(activeTheme.shirt);
      shirtMaterialRef.current.needsUpdate = true;
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.setHex(activeTheme.accent);
    }
    if (warmLightRef.current) {
      warmLightRef.current.color.setHex(activeTheme.coral);
    }
    if (ringMaterialRef.current) {
      ringMaterialRef.current.color.setHex(activeTheme.accent);
      ringMaterialRef.current.emissive.setHex(activeTheme.accent);
      ringMaterialRef.current.needsUpdate = true;
    }
  }, [currentThemeIdx, activeTheme]);

  // Update glasses visibility
  useEffect(() => {
    if (glassesGroupRef.current) {
      glassesGroupRef.current.visible = hasGlasses;
    }
  }, [hasGlasses]);

  // Mouse & Touch Pointer Handlers for looking around and spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const wrap = mountRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const drag = dragRef.current;

    // Normalize coordinates so the avatar looks directly at pointer
    drag.mx = Math.max(-1.2, Math.min(1.2, (e.clientX - r.left - r.width / 2) / (r.width / 2)));
    drag.my = Math.max(-1.0, Math.min(1.0, (e.clientY - r.top - r.height / 2) / (r.height / 2)));

    if (drag.isDown) {
      const deltaX = e.clientX - drag.startX;
      drag.spin += deltaX * 0.012;
      drag.startX = e.clientX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current.isDown = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // pointer release
    }
  };

  const toggleTheme = () => {
    setCurrentThemeIdx((prev) => (prev + 1) % THEMES.length);
  };

  return (
    <div className="relative w-full rounded-3xl bg-void-2/95 backdrop-blur-2xl border border-emerald-500/25 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col group transition-all duration-500">
      {/* Top Cyber Telemetry Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-void/80 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-slate-200 tracking-wider text-[11px] uppercase">
            3D DEV AVATAR // ANAND
          </span>
          <span className="text-white/30">•</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${activeTheme.badgeClass}`}>
            {activeTheme.name}
          </span>
        </div>

        {/* Live typing status indicator */}
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-cyan" />
          <span className="hidden sm:inline">CODING LIVE</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-hidden touch-none select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-void/20 to-void/75" />

        {/* Interactive Floating Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-void/80 border border-white/10 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-lg">
          <RotateCw className="w-3 h-3 text-cyan animate-spin" style={{ animationDuration: '8s' }} />
          <span>Move mouse to look • Drag to spin</span>
        </div>
      </div>

      {/* Bottom Interactive Deck Controls */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-void/85 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* Hoodie Color Changer */}
          <button
            onClick={toggleTheme}
            title="Switch Hoodie Palette"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-cyan" />
            <span className="hidden sm:inline">Hoodie:</span>
            <span className="font-semibold text-white">{activeTheme.name.split(' ')[0]}</span>
          </button>

          {/* Glasses Toggle */}
          <button
            onClick={() => setHasGlasses(!hasGlasses)}
            title="Toggle Glasses"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              hasGlasses
                ? 'bg-cyan/20 border-cyan/40 text-cyan font-semibold'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Glasses</span>
          </button>
        </div>

        {/* Typing Toggle */}
        <button
          onClick={() => setIsTypingActive(!isTypingActive)}
          title="Toggle Typing Animation"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isTypingActive ? 'Typing: ON' : 'Typing: OFF'}</span>
        </button>
      </div>
    </div>
  );
}
