import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BuildingDetails } from './BuildingDrawer';

interface Background3DProps {
  activeDistrict?: string;
  selectedFilter?: string;
  onSelectBuilding?: (building: BuildingDetails) => void;
  onHoverBuilding?: (building: BuildingDetails | null) => void;
}

export const buildingDatabase: Record<string, BuildingDetails> = {
  'anand-hq': {
    id: 'anand-hq',
    title: 'Anand Jadhav Central HQ',
    category: 'Manhattan Central Skyscraper',
    description: 'Supertall 35-story central skyscraper (One Vanderbilt / Freedom Tower style) representing Anand Jadhav — B.Tech Computer Science student at Parul University. Specializing in SAP ABAP Cloud & BTP architectures, Full-Stack Web (MEAN/MERN), and native iOS development (SwiftUI).',
    tags: ['SAP ABAP Cloud', 'SAP BTP', 'React / Next.js', 'SwiftUI', 'Node.js', 'TypeScript'],
    commits: 620,
    height: 28,
    highlight: true,
  },
  'proflow-sap': {
    id: 'proflow-sap',
    title: 'ProFlow SAP Hudson Yards AI Tower',
    category: 'Hudson Yards Angular Glass Skyscraper',
    description: 'Hudson Yards style 28-story angular glass skyscraper. Enterprise workflow automation system combining MEAN stack with Google Gemini AI to process, summarize, and route SAP system requests.',
    tags: ['SAP BTP', 'ABAP Cloud', 'Angular', 'Node.js', 'Gemini AI'],
    liveUrl: 'https://portfolio-three-swart-hx117dkm4.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/portfolio',
    commits: 180,
    height: 24,
  },
  'elvora-media': {
    id: 'elvora-media',
    title: 'Elvora Media Production Building',
    category: 'Times Square LED Skyscraper',
    description: 'Times Square / 30 Rock style media tower with glowing LED screen billboards. High-performance digital production agency web platform engineered for dynamic content delivery & responsive layouts.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    liveUrl: 'https://elvora-media.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/Elvora-Media-Premium-Digital-Media-Production-Agency',
    commits: 142,
    height: 20,
  },
  'ks-beauty': {
    id: 'ks-beauty',
    title: 'KS Beauty Luxury High-Rise',
    category: 'Fifth Avenue Glass High-Rise',
    description: 'Luxury Fifth Avenue glass high-rise with penthouse balconies & glass curtain walls. Modern beauty and service platform crafted with modular React components & custom quote calculators.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://ks-beauty-website.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/ks-beauty-website',
    commits: 118,
    height: 18,
  },
  'funflix': {
    id: 'funflix',
    title: 'FunFlix Chrysler Cinema Tower',
    category: 'Art-Deco Chrysler Spire Tower',
    description: 'Chrysler Building style Art-Deco skyscraper with an illuminated metallic spire. Streaming & entertainment discovery application with real-time media search & category filtering.',
    tags: ['React', 'REST API', 'CSS Glassmorphism', 'Netlify'],
    liveUrl: 'https://funflix03.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/FunFlix',
    commits: 85,
    height: 17,
  },
  'anashi-store': {
    id: 'anashi-store',
    title: 'Anashi Thrift Shopping Mall',
    category: 'SoHo Commercial Retail Building',
    description: 'SoHo style commercial storefront & high-rise featuring vintage fashion catalogs, smooth cart management, product filtering, and mobile-first design.',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Netlify'],
    liveUrl: 'https://anashistore.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/anashi-cinematic-thrift',
    commits: 78,
    height: 15,
  },
  'event-management': {
    id: 'event-management',
    title: 'Event Management (Utsav26) Center',
    category: 'Madison Square Event Center',
    description: 'Madison Square style event center & office tower featuring live schedule tracking, participant registrations, ticket verifications, and real-time status updates.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    liveUrl: 'https://utsav26.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/event_management',
    commits: 96,
    height: 16,
  },
  'abap-cloud': {
    id: 'abap-cloud',
    title: 'ABAP Cloud Financial Tower',
    category: 'Financial District Glass Skyscraper',
    description: 'Wall Street / Financial District glass skyscraper. Certified expertise in SAP ABAP Cloud, RESTful Application Programming Model (RAP), OData V2/V4 services, and SAP BTP.',
    tags: ['ABAP Cloud', 'SAP BTP', 'RAP', 'CDS Views', 'OData V4'],
    commits: 130,
    height: 22,
  },
  'react-stack': {
    id: 'react-stack',
    title: 'React & TypeScript Tech Tower',
    category: 'Silicon Alley Tech High-Rise',
    description: 'Silicon Alley high-rise with 94% proficiency in frontend web architecture using React 18, Next.js, TypeScript, Tailwind CSS, and state management.',
    tags: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    commits: 210,
    height: 23,
  },
  'swiftui-stack': {
    id: 'swiftui-stack',
    title: 'SwiftUI Native Mobile Center',
    category: 'Midtown Modern High-Rise',
    description: '86% proficiency in native iOS application development with Swift, SwiftUI, Combine framework, and offline CoreData storage.',
    tags: ['Swift', 'SwiftUI', 'Combine', 'CoreData', 'iOS SDK'],
    commits: 90,
    height: 17,
  },
  'sap-cert-tower': {
    id: 'sap-cert-tower',
    title: 'SAP Credential Museum',
    category: 'Historic Granite & Glass Building',
    description: 'Historic Wall Street style granite & glass Exchange building. SAP Certified Associate - Back-End Developer - ABAP Cloud (Jul 2025 - Jul 2026). Credential ID: 99fc1274-a818-4ca7-8f0c-a1160e29a2d9.',
    tags: ['SAP Certified', 'ABAP Cloud', 'BTP', 'HANA Cloud'],
    liveUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    commits: 100,
    height: 18,
  },
  'oracle-ai-tower': {
    id: 'oracle-ai-tower',
    title: 'Oracle Cloud AI Museum',
    category: 'Corporate Glass & Steel Building',
    description: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Sep 2025). Certified in OCI Cloud AI & Machine Learning.',
    tags: ['Oracle Cloud', 'AI Foundations', 'Machine Learning', 'OCI'],
    liveUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    commits: 95,
    height: 17,
  },
  'ai-hub-node': {
    id: 'ai-hub-node',
    title: 'AI Innovation Hub & Analyzer',
    category: 'Futuristic Glass & Steel Node',
    description: 'Interactive AI Recruiter Chatbot trained on Anand Jadhav background and Job Description Match Analyzer powered by Claude AI API.',
    tags: ['Claude 3.5 Sonnet', 'Gemini AI', 'Job Match Analyzer', 'AI Chatbot'],
    commits: 160,
    height: 21,
  }
};

export const Background3D: React.FC<Background3DProps> = ({
  activeDistrict = 'hero',
  onSelectBuilding,
  onHoverBuilding,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  const targetCamPos = useRef<{ x: number; y: number; z: number }>({ x: 48, y: 40, z: 48 });
  const targetLookAt = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 6, z: 0 });

  useEffect(() => {
    switch (activeDistrict) {
      case 'hero':
        targetCamPos.current = { x: 48, y: 40, z: 48 };
        targetLookAt.current = { x: 0, y: 6, z: 0 };
        break;
      case 'projects':
        targetCamPos.current = { x: -36, y: 30, z: 36 };
        targetLookAt.current = { x: -14, y: 8, z: 0 };
        break;
      case 'skills':
        targetCamPos.current = { x: 36, y: 28, z: -30 };
        targetLookAt.current = { x: 14, y: 7, z: -6 };
        break;
      case 'certifications':
        targetCamPos.current = { x: -26, y: 26, z: -36 };
        targetLookAt.current = { x: -6, y: 6, z: -18 };
        break;
      case 'ai-lab':
        targetCamPos.current = { x: 36, y: 30, z: 36 };
        targetLookAt.current = { x: 16, y: 8, z: 16 };
        break;
      default:
        targetCamPos.current = { x: 48, y: 40, z: 48 };
        targetLookAt.current = { x: 0, y: 6, z: 0 };
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Bright Sunny Sky Background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x38bdf8); // Sky blue
    scene.fog = new THREE.FogExp2(0x38bdf8, 0.0025);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(65, 65, 65);
    camera.lookAt(0, 6, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Flawless OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 12;
    controls.maxDistance = 140;
    controlsRef.current = controls;

    // 5. Bright Daylight Global Illumination (HemisphereLight + Sunlight)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0xfef08a, 0.9);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfbbf24, 1.6);
    sunLight.position.set(70, 80, -50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // 6. Hudson River Water Surface
    const riverGeo = new THREE.PlaneGeometry(180, 40);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.rotation.x = -Math.PI / 2;
    riverMesh.position.set(0, -0.2, 45);
    scene.add(riverMesh);

    // 7. Bright Sidewalk & Street Layout
    const cityBaseGroup = new THREE.Group();
    scene.add(cityBaseGroup);

    const roadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 });

    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMesh = new THREE.Mesh(groundGeo, sidewalkMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.1;
    groundMesh.receiveShadow = true;
    cityBaseGroup.add(groundMesh);

    const avenueWidth = 4.5;
    for (let pos = -50; pos <= 50; pos += 16) {
      const roadXGeo = new THREE.PlaneGeometry(avenueWidth, 160);
      const roadX = new THREE.Mesh(roadXGeo, roadMat);
      roadX.rotation.x = -Math.PI / 2;
      roadX.position.set(pos, 0.02, 0);
      roadX.receiveShadow = true;
      cityBaseGroup.add(roadX);

      const roadZGeo = new THREE.PlaneGeometry(160, avenueWidth);
      const roadZ = new THREE.Mesh(roadZGeo, roadMat);
      roadZ.rotation.x = -Math.PI / 2;
      roadZ.position.set(0, 0.02, pos);
      roadZ.receiveShadow = true;
      cityBaseGroup.add(roadZ);
    }

    // 8. Bright PBR Skyscrapers (100+ Detailed Buildings)
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const interactiveMeshList: THREE.Mesh[] = [];

    const landmarkConfig: Record<string, { w: number; d: number; h: number; color: number; spire?: boolean; billboard?: boolean }> = {
      'anand-hq': { w: 5.5, d: 5.5, h: 28, color: 0x10b981, spire: true },
      'proflow-sap': { w: 4.8, d: 4.8, h: 24, color: 0x3b82f6, spire: true },
      'elvora-media': { w: 4.5, d: 4.5, h: 20, color: 0x38bdf8, billboard: true },
      'ks-beauty': { w: 4.2, d: 4.2, h: 18, color: 0xf472b6 },
      'funflix': { w: 4.0, d: 4.0, h: 17, color: 0xfbbf24, spire: true },
      'anashi-store': { w: 3.8, d: 3.8, h: 15, color: 0xec4899 },
      'event-management': { w: 4.0, d: 4.0, h: 16, color: 0x818cf8 },
      'abap-cloud': { w: 4.5, d: 4.5, h: 22, color: 0x6366f1 },
      'react-stack': { w: 4.5, d: 4.5, h: 23, color: 0x38bdf8 },
      'swiftui-stack': { w: 4.0, d: 4.0, h: 17, color: 0x10b981 },
      'sap-cert-tower': { w: 4.4, d: 4.4, h: 18, color: 0xa855f7 },
      'oracle-ai-tower': { w: 4.4, d: 4.4, h: 17, color: 0xf43f5e },
      'ai-hub-node': { w: 5.0, d: 5.0, h: 21, color: 0x22c55e },
    };

    const landmarkPositions: Record<string, { x: number; z: number }> = {
      'anand-hq': { x: 0, z: 0 },
      'proflow-sap': { x: -8, z: -6 },
      'elvora-media': { x: -16, z: -5 },
      'ks-beauty': { x: -18, z: 10 },
      'event-management': { x: -10, z: -20 },
      'funflix': { x: -24, z: -18 },
      'anashi-store': { x: -14, z: 22 },
      'react-stack': { x: 16, z: 8 },
      'abap-cloud': { x: 14, z: -6 },
      'swiftui-stack': { x: 12, z: 22 },
      'sap-cert-tower': { x: -6, z: -32 },
      'oracle-ai-tower': { x: 6, z: -32 },
      'ai-hub-node': { x: 22, z: 22 },
    };

    const gridCols = 10;
    const gridRows = 10;
    const blockSpacing = 11;
    const gridOffset = ((gridCols - 1) * blockSpacing) / 2;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const bx = c * blockSpacing - gridOffset;
        const bz = r * blockSpacing - gridOffset;

        let landmarkId: string | null = null;
        Object.entries(landmarkPositions).forEach(([id, pos]) => {
          if (Math.abs(pos.x - bx) < 5 && Math.abs(pos.z - bz) < 5) {
            landmarkId = id;
          }
        });

        const id = landmarkId || `building_${r}_${c}`;
        const bData = buildingDatabase[id];
        const conf = landmarkId ? landmarkConfig[landmarkId] : null;

        const width = conf?.w || 3.2 + Math.random() * 2.2;
        const depth = conf?.d || 3.2 + Math.random() * 2.2;
        const height = conf?.h || (landmarkId ? 18 : 6 + Math.random() * 16);
        const mainColor = conf?.color || (Math.random() > 0.5 ? 0x38bdf8 : 0x818cf8);

        // Skyscraper Base
        const baseGeo = new THREE.BoxGeometry(width * 1.1, 2.5, depth * 1.1);
        baseGeo.translate(0, 1.25, 0);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.3 });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.set(bx, 0, bz);
        cityGroup.add(baseMesh);

        // Tower Body
        const bodyGeo = new THREE.BoxGeometry(width, height, depth);
        bodyGeo.translate(0, height / 2, 0);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: mainColor,
          metalness: 0.7,
          roughness: 0.2,
          transparent: true,
          opacity: 0.95,
        });

        const mesh = new THREE.Mesh(bodyGeo, bodyMat);
        mesh.position.set(bx, 2.5, bz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (bData) {
          mesh.userData = { id, data: bData };
          interactiveMeshList.push(mesh);
        }

        // Window Frame Grid Lines
        const edgesGeo = new THREE.EdgesGeometry(bodyGeo);
        const edgesMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: landmarkId ? 0.7 : 0.3,
        });
        const edges = new THREE.LineSegments(edgesGeo, edgesMat);
        mesh.add(edges);

        // Roof Equipment & Spires
        if (conf?.spire || height > 22) {
          const spireGeo = new THREE.CylinderGeometry(0.08, 0.4, 6, 8);
          const spireMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
          const spire = new THREE.Mesh(spireGeo, spireMat);
          spire.position.set(0, height + 4.2, 0);
          mesh.add(spire);
        }

        cityGroup.add(mesh);
      }
    }

    // 9. NYC Yellow Taxis
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    const taxiMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3 });
    const carMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
    const cars: THREE.Mesh[] = [];

    for (let i = 0; i < 24; i++) {
      const carGeo = new THREE.BoxGeometry(1.2, 0.7, 2.4);
      const car = new THREE.Mesh(carGeo, i % 3 === 0 ? taxiMat : carMat);
      car.position.set((Math.random() - 0.5) * 80, 0.4, (Math.random() - 0.5) * 80);
      carGroup.add(car);
      cars.push(car);
    }

    // 10. Raycasting & Events
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    const onPointerMove = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshList);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== hit) {
          if (hoveredMesh) {
            (hoveredMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
          }
          hoveredMesh = hit;
          (hoveredMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x38bdf8);

          if (onHoverBuilding && hit.userData.data) {
            onHoverBuilding(hit.userData.data);
          }
        }
      } else {
        if (hoveredMesh) {
          (hoveredMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
          hoveredMesh = null;
          if (onHoverBuilding) onHoverBuilding(null);
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshList);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const bData = hit.userData.data as BuildingDetails;
        if (bData && onSelectBuilding) {
          onSelectBuilding(bData);
        }
      }
    };

    const onDoubleClick = () => {
      // Double click resets camera to overview
      targetCamPos.current = { x: 48, y: 40, z: 48 };
      targetLookAt.current = { x: 0, y: 6, z: 0 };
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        targetCamPos.current = { x: 48, y: 40, z: 48 };
        targetLookAt.current = { x: 0, y: 6, z: 0 };
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener('dblclick', onDoubleClick);
    window.addEventListener('keydown', onKeyDown);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // 11. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Camera Lerp
      camera.position.x += (targetCamPos.current.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamPos.current.y - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.05;

      // Animate Cars
      cars.forEach((car, idx) => {
        car.position.z += 0.25 + (idx % 3) * 0.1;
        if (car.position.z > 50) car.position.z = -50;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('dblclick', onDoubleClick);
      window.removeEventListener('keydown', onKeyDown);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [onSelectBuilding, onHoverBuilding]);

  return (
    <div 
      ref={mountRef} 
      id="canvas-container" 
      className="fixed inset-0 z-0 opacity-100 pointer-events-auto cursor-grab active:cursor-grabbing" 
    />
  );
};

export default Background3D;
