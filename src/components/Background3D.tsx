import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

interface BuildingData {
  x: number;
  z: number;
  height: number;
  color: number;
  label: string;
}

const Background3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.008);

    // 2. Isometric Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(38, 32, 38);
    camera.lookAt(0, 4, 0);

    // 3. Optimized Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Performance boost
      powerPreference: 'high-performance' 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap pixel ratio to 1.5 for crisp performance
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(40, 60, 20);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x6366f1, 1.5, 80);
    accentLight.position.set(0, 15, 0);
    scene.add(accentLight);

    // 5. Base Grid
    const gridHelper = new THREE.GridHelper(36, 18, 0x6366f1, 0x1f293d);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 6. Code City Building Data
    const colors = {
      lightGreen: 0x39d353,
      midGreen: 0x26a641,
      darkGreen: 0x006d32,
      deepGreen: 0x0e4429,
      sapIndigo: 0x6366f1,
      webCyan: 0x38bdf8,
      iosEmerald: 0x10b981,
    };

    const buildings: BuildingData[] = [];
    const gridSize = 7;
    const spacing = 4;
    const offset = ((gridSize - 1) * spacing) / 2;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = col * spacing - offset;
        const z = row * spacing - offset;
        const distFromCenter = Math.sqrt(x * x + z * z);
        
        let height = 2 + Math.random() * 4;
        let color = colors.deepGreen;

        if (row === 3 && col === 3) {
          height = 14;
          color = colors.lightGreen;
        } else if (row === 2 && col === 3) {
          height = 10;
          color = colors.webCyan;
        } else if (row === 4 && col === 3) {
          height = 9;
          color = colors.midGreen;
        } else if (row === 3 && col === 2) {
          height = 11;
          color = colors.sapIndigo;
        } else if (row === 3 && col === 4) {
          height = 8.5;
          color = colors.iosEmerald;
        } else if (distFromCenter < 10) {
          height = 4 + Math.random() * 5;
          color = Math.random() > 0.4 ? colors.midGreen : colors.darkGreen;
        } else {
          height = 1.5 + Math.random() * 3;
          color = Math.random() > 0.5 ? colors.darkGreen : colors.deepGreen;
        }

        buildings.push({ x, z, height, color, label: `Repo (${row},${col})` });
      }
    }

    // 7. Building Group Container
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const buildingMeshes: { mesh: THREE.Mesh; baseHeight: number }[] = [];

    buildings.forEach((b) => {
      const boxGeo = new THREE.BoxGeometry(2.4, b.height, 2.4);
      boxGeo.translate(0, b.height / 2, 0);

      const boxMat = new THREE.MeshPhongMaterial({
        color: b.color,
        flatShading: true,
        transparent: true,
        opacity: 0.85,
        shininess: 20,
      });

      const mesh = new THREE.Mesh(boxGeo, boxMat);
      mesh.position.set(b.x, 0, b.z);

      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: b.color === colors.lightGreen || b.color === colors.sapIndigo ? 0xffffff : 0x38bdf8,
        transparent: true,
        opacity: 0.3,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      mesh.add(edges);

      cityGroup.add(mesh);
      buildingMeshes.push({ mesh, baseHeight: b.height });
    });

    // 8. Ambient Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 200;
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 120;
      starPos[i + 1] = 10 + Math.random() * 50;
      starPos[i + 2] = (Math.random() - 0.5) * 120;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
    });
    const starMesh = new THREE.Points(starsGeo, starMat);
    scene.add(starMesh);

    // 9. Passive Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - windowHalfX) * 0.004;
      mouseY = (e.clientY - windowHalfY) * 0.004;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let resizeTimeout: number | undefined;
    const onResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', onResize, { passive: true });

    // 10. Animation Loop with Cancellation Handle
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      cityGroup.rotation.y = elapsedTime * 0.04 + mouseX * 0.5;
      cityGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.02 + mouseY * 0.2;

      buildingMeshes.forEach((item, index) => {
        const pulse = Math.sin(elapsedTime * 1.5 + index * 0.3) * 0.2;
        item.mesh.scale.y = 1 + pulse / item.baseHeight;
      });

      starMesh.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      id="canvas-container" 
      className="fixed inset-0 z-0 opacity-40 pointer-events-none transition-opacity duration-1000" 
    />
  );
};

export default memo(Background3D);

