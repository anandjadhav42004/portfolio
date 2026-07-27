import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  activeDistrict?: string;
  onSelectBuilding?: (buildingId: string) => void;
}

export const Background3D: React.FC<Background3DProps> = ({
  activeDistrict = 'hero',
  onSelectBuilding,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<{ x: number; y: number; z: number }>({ x: 38, y: 32, z: 38 });
  const targetLookAt = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 4, z: 0 });
  const currentLookAt = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 4, z: 0 });

  // Camera targets per district
  useEffect(() => {
    switch (activeDistrict) {
      case 'hero':
        targetCamPos.current = { x: 38, y: 32, z: 38 };
        targetLookAt.current = { x: 0, y: 4, z: 0 };
        break;
      case 'projects':
        targetCamPos.current = { x: -24, y: 22, z: 24 };
        targetLookAt.current = { x: -8, y: 6, z: 0 };
        break;
      case 'skills':
        targetCamPos.current = { x: 26, y: 20, z: -22 };
        targetLookAt.current = { x: 8, y: 5, z: -6 };
        break;
      case 'certifications':
        targetCamPos.current = { x: -18, y: 18, z: -26 };
        targetLookAt.current = { x: -6, y: 4, z: -8 };
        break;
      case 'contact':
        targetCamPos.current = { x: 0, y: 45, z: 28 };
        targetLookAt.current = { x: 0, y: 0, z: 0 };
        break;
      default:
        targetCamPos.current = { x: 38, y: 32, z: 38 };
        targetLookAt.current = { x: 0, y: 4, z: 0 };
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.007);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(38, 32, 38);
    camera.lookAt(0, 4, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting - Sunset / Dusk Blend with Neon Accents
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xf97316, 1.2);
    sunLight.position.set(50, 40, -40);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const neonPointLight = new THREE.PointLight(0x6366f1, 2.5, 90);
    neonPointLight.position.set(0, 18, 0);
    scene.add(neonPointLight);

    // 5. Water Body Plane (Dusk River / Bay reflection)
    const waterGeo = new THREE.PlaneGeometry(120, 30);
    const waterMat = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      shininess: 90,
      transparent: true,
      opacity: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -0.2, 28);
    scene.add(waterMesh);

    // 6. Base Ground & Street Grid Layout
    const gridHelper = new THREE.GridHelper(50, 25, 0x6366f1, 0x1f293d);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 7. Interactive Buildings Cityscape Array
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const interactiveMeshList: THREE.Mesh[] = [];

    const cityLayout = [
      // Central HQ Skyscraper
      { id: 'anand-hq', x: 0, z: 0, w: 4.5, d: 4.5, h: 18, color: 0x39d353, label: 'Anand HQ Skyscraper' },
      
      // Projects District Towers
      { id: 'elvora-media', x: -10, z: -4, w: 3.5, d: 3.5, h: 13, color: 0x38bdf8, label: 'Elvora Media Tower' },
      { id: 'ks-beauty', x: -12, z: 6, w: 3.2, d: 3.2, h: 11, color: 0x10b981, label: 'KS Beauty Tower' },
      { id: 'event-management', x: -6, z: -12, w: 3.0, d: 3.0, h: 10, color: 0x818cf8, label: 'Event Management' },
      { id: 'funflix', x: -14, z: -10, w: 3.2, d: 3.2, h: 9.5, color: 0xf59e0b, label: 'FunFlix Tower' },
      { id: 'anashi-store', x: -8, z: 12, w: 3.0, d: 3.0, h: 8.5, color: 0xec4899, label: 'Anashi Store' },

      // Skills & Stack District
      { id: 'abap-cloud', x: 10, z: -4, w: 3.2, d: 3.2, h: 14, color: 0x6366f1, label: 'ABAP Cloud Stack' },
      { id: 'react-next', x: 12, z: 6, w: 3.2, d: 3.2, h: 13.5, color: 0x38bdf8, label: 'React / Next.js' },
      { id: 'swiftui', x: 8, z: 12, w: 3.0, d: 3.0, h: 11.5, color: 0x10b981, label: 'SwiftUI Native' },
      { id: 'nodejs', x: 14, z: -10, w: 3.0, d: 3.0, h: 12, color: 0x22c55e, label: 'Node.js Runtime' },

      // Credentials Plaza
      { id: 'sap-cert', x: -4, z: -20, w: 3.5, d: 3.5, h: 12, color: 0x6366f1, label: 'SAP Certified ABAP' },
      { id: 'oracle-ai', x: 4, z: -20, w: 3.5, d: 3.5, h: 11, color: 0xf43f5e, label: 'Oracle Cloud AI' },

      // AI Innovation Hub Node
      { id: 'ai-lab', x: 14, z: 14, w: 4.0, d: 4.0, h: 15, color: 0xa855f7, label: 'AI Innovation Hub' }
    ];

    cityLayout.forEach((item) => {
      const boxGeo = new THREE.BoxGeometry(item.w, item.h, item.d);
      boxGeo.translate(0, item.h / 2, 0);

      const boxMat = new THREE.MeshPhongMaterial({
        color: item.color,
        flatShading: true,
        transparent: true,
        opacity: 0.88,
        shininess: 40,
      });

      const mesh = new THREE.Mesh(boxGeo, boxMat);
      mesh.position.set(item.x, 0, item.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: item.id, label: item.label };

      // Glass Windows & Edge Wireframe Highlight
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      mesh.add(edges);

      cityGroup.add(mesh);
      interactiveMeshList.push(mesh);
    });

    // 8. Animated Traffic Streams (Glowing Neon Car Beams along streets)
    const trafficCount = 40;
    const trafficGeo = new THREE.BufferGeometry();
    const trafficPositions = new Float32Array(trafficCount * 3);

    for (let i = 0; i < trafficCount; i++) {
      trafficPositions[i * 3] = (Math.random() - 0.5) * 50;
      trafficPositions[i * 3 + 1] = 0.15;
      trafficPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }

    trafficGeo.setAttribute('position', new THREE.BufferAttribute(trafficPositions, 3));
    const trafficMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xf97316,
      transparent: true,
      opacity: 0.9,
    });
    const trafficMesh = new THREE.Points(trafficGeo, trafficMat);
    scene.add(trafficMesh);

    // 9. Raycasting for Clicking 3D Buildings
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshList);

      if (intersects.length > 0) {
        const hitBuilding = intersects[0].object as THREE.Mesh;
        const bId = hitBuilding.userData?.id;
        if (bId && onSelectBuilding) {
          onSelectBuilding(bId);
        }
      }
    };

    window.addEventListener('click', onClick);

    // 10. Resize Listener
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // 11. Animation Loop with Camera Interpolation (Lerp)
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Camera position to target district
      camera.position.x += (targetCamPos.current.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamPos.current.y - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.05;

      currentLookAt.current.x += (targetLookAt.current.x - currentLookAt.current.x) * 0.05;
      currentLookAt.current.y += (targetLookAt.current.y - currentLookAt.current.y) * 0.05;
      currentLookAt.current.z += (targetLookAt.current.z - currentLookAt.current.z) * 0.05;

      camera.lookAt(
        currentLookAt.current.x,
        currentLookAt.current.y,
        currentLookAt.current.z
      );

      // Animate Traffic Beams
      const tPos = trafficGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < trafficCount; i++) {
        const i3 = i * 3;
        tPos[i3] += 0.15;
        if (tPos[i3] > 25) tPos[i3] = -25;
      }
      trafficGeo.attributes.position.needsUpdate = true;

      // Animate City Ambient Pulse
      cityGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click', onClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [onSelectBuilding]);

  return (
    <div 
      ref={mountRef} 
      id="canvas-container" 
      className="fixed inset-0 z-0 opacity-60 pointer-events-auto transition-opacity duration-1000" 
    />
  );
};

export default Background3D;
