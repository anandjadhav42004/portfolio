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
    category: 'Engineering Headquarter',
    description: 'Central command tower representing Anand Jadhav — B.Tech Computer Science student at Parul University. Specializing in SAP ABAP Cloud & BTP architectures, Full-Stack Web (MEAN/MERN), and native iOS development (SwiftUI).',
    tags: ['SAP ABAP Cloud', 'SAP BTP', 'React / Next.js', 'SwiftUI', 'Node.js', 'TypeScript'],
    commits: 620,
    height: 20,
    highlight: true,
  },
  'elvora-media': {
    id: 'elvora-media',
    title: 'Elvora Media Platform',
    category: 'Production Agency Web App',
    description: 'High-performance digital production agency web platform engineered for dynamic content delivery, responsive layouts, and modern visual storytelling.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    liveUrl: 'https://elvora-media.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/Elvora-Media-Premium-Digital-Media-Production-Agency',
    commits: 142,
    height: 14,
  },
  'ks-beauty': {
    id: 'ks-beauty',
    title: 'KS Beauty Web Application',
    category: 'E-Commerce & Service Web App',
    description: 'Modern beauty and service platform crafted with modular React components, custom interactive quote calculators, and optimized responsive user journeys.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://ks-beauty-website.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/ks-beauty-website',
    commits: 118,
    height: 12,
  },
  'event-management': {
    id: 'event-management',
    title: 'Event Management (Utsav26)',
    category: 'Enterprise Event System',
    description: 'Comprehensive campus event management system featuring live schedule tracking, participant registrations, ticket verifications, and real-time status updates.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    liveUrl: 'https://utsav26.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/event_management',
    commits: 96,
    height: 11,
  },
  'funflix': {
    id: 'funflix',
    title: 'FunFlix Entertainment Hub',
    category: 'Media Discovery App',
    description: 'Streaming & entertainment discovery application with real-time media search, category filtering, user watchlists, and interactive previews.',
    tags: ['React', 'REST API', 'CSS Glassmorphism', 'Netlify'],
    liveUrl: 'https://funflix03.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/FunFlix',
    commits: 85,
    height: 10,
  },
  'anashi-store': {
    id: 'anashi-store',
    title: 'Anashi Cinematic Thrift Store',
    category: 'E-Commerce Storefront',
    description: 'Curated e-commerce storefront featuring vintage fashion catalogs, smooth cart management, product filtering, and mobile-first design.',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Netlify'],
    liveUrl: 'https://anashistore.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/anashi-cinematic-thrift',
    commits: 78,
    height: 9,
  },
  'proflow-sap': {
    id: 'proflow-sap',
    title: 'ProFlow SAP Enterprise AI',
    category: 'SAP BTP & Gemini AI',
    description: 'Enterprise workflow automation system combining MEAN stack with Google Gemini AI to process, summarize, and route SAP system requests.',
    tags: ['SAP BTP', 'ABAP Cloud', 'Angular', 'Node.js', 'Gemini AI'],
    liveUrl: 'https://portfolio-three-swart-hx117dkm4.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/portfolio',
    commits: 180,
    height: 16,
  },
  'abap-cloud': {
    id: 'abap-cloud',
    title: 'ABAP Cloud & RAP Tower',
    category: 'SAP Technical Competency',
    description: 'Certified expertise in SAP ABAP Cloud, RESTful Application Programming Model (RAP), OData V2/V4 services, and SAP Business Technology Platform (BTP).',
    tags: ['ABAP Cloud', 'SAP BTP', 'RAP', 'CDS Views', 'OData V4'],
    commits: 130,
    height: 15,
  },
  'react-stack': {
    id: 'react-stack',
    title: 'React & TypeScript Tower',
    category: 'Full-Stack Web Competency',
    description: '94% proficiency in frontend web architecture using React 18, Next.js, TypeScript, Tailwind CSS, and state management.',
    tags: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    commits: 210,
    height: 16,
  },
  'swiftui-stack': {
    id: 'swiftui-stack',
    title: 'SwiftUI Native Mobile Hub',
    category: 'iOS Native Competency',
    description: '86% proficiency in native iOS application development with Swift, SwiftUI, Combine framework, and offline CoreData storage.',
    tags: ['Swift', 'SwiftUI', 'Combine', 'CoreData', 'iOS SDK'],
    commits: 90,
    height: 12,
  },
  'sap-cert-tower': {
    id: 'sap-cert-tower',
    title: 'SAP Certified ABAP Cloud',
    category: 'Official SAP Credential',
    description: 'SAP Certified Associate - Back-End Developer - ABAP Cloud (Jul 2025 - Jul 2026). Credential ID: 99fc1274-a818-4ca7-8f0c-a1160e29a2d9.',
    tags: ['SAP Certified', 'ABAP Cloud', 'BTP', 'HANA Cloud'],
    liveUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    commits: 100,
    height: 13,
  },
  'oracle-ai-tower': {
    id: 'oracle-ai-tower',
    title: 'Oracle Cloud AI Certified',
    category: 'Official Oracle Credential',
    description: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Sep 2025). Certified in OCI Cloud AI & Machine Learning.',
    tags: ['Oracle Cloud', 'AI Foundations', 'Machine Learning', 'OCI'],
    liveUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    commits: 95,
    height: 12,
  },
  'ai-hub-node': {
    id: 'ai-hub-node',
    title: 'AI Innovation Hub & Analyzer',
    category: 'AI Assistant & Job Matcher',
    description: 'Interactive AI Recruiter Chatbot trained on Anand Jadhav background and Job Description Match Analyzer powered by Claude AI API.',
    tags: ['Claude 3.5 Sonnet', 'Gemini AI', 'Job Match Analyzer', 'AI Chatbot'],
    commits: 160,
    height: 15,
  }
};

export const Background3D: React.FC<Background3DProps> = ({
  activeDistrict = 'hero',
  selectedFilter = 'all',
  onSelectBuilding,
  onHoverBuilding,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  const targetCamPos = useRef<{ x: number; y: number; z: number }>({ x: 42, y: 36, z: 42 });
  const targetLookAt = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 5, z: 0 });

  useEffect(() => {
    switch (activeDistrict) {
      case 'hero':
        targetCamPos.current = { x: 42, y: 36, z: 42 };
        targetLookAt.current = { x: 0, y: 5, z: 0 };
        break;
      case 'projects':
        targetCamPos.current = { x: -28, y: 24, z: 28 };
        targetLookAt.current = { x: -10, y: 6, z: 0 };
        break;
      case 'skills':
        targetCamPos.current = { x: 28, y: 22, z: -24 };
        targetLookAt.current = { x: 10, y: 5, z: -4 };
        break;
      case 'certifications':
        targetCamPos.current = { x: -20, y: 20, z: -28 };
        targetLookAt.current = { x: -4, y: 4, z: -14 };
        break;
      case 'ai-lab':
        targetCamPos.current = { x: 28, y: 24, z: 28 };
        targetLookAt.current = { x: 14, y: 6, z: 14 };
        break;
      default:
        targetCamPos.current = { x: 42, y: 36, z: 42 };
        targetLookAt.current = { x: 0, y: 5, z: 0 };
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.006);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(42, 36, 42);
    camera.lookAt(0, 5, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 10;
    controls.maxDistance = 120;
    controlsRef.current = controls;

    // 5. Dusk Lighting
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xf97316, 1.4);
    sunLight.position.set(60, 50, -50);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const centralLight = new THREE.PointLight(0x39d353, 3, 100);
    centralLight.position.set(0, 22, 0);
    scene.add(centralLight);

    // 6. Water Bay Surface
    const waterGeo = new THREE.PlaneGeometry(140, 36);
    const waterMat = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      shininess: 95,
      transparent: true,
      opacity: 0.9,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -0.2, 32);
    scene.add(waterMesh);

    // 7. Base Grid
    const gridHelper = new THREE.GridHelper(60, 30, 0x6366f1, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 8. 3D City Skyscraper Mesh Construction
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const interactiveMeshList: THREE.Mesh[] = [];

    const cityLayout = [
      { id: 'anand-hq', x: 0, z: 0, w: 4.8, d: 4.8, h: 20, color: 0x39d353 },
      { id: 'proflow-sap', x: -6, z: -5, w: 3.8, d: 3.8, h: 16, color: 0x6366f1 },
      { id: 'elvora-media', x: -12, z: -4, w: 3.6, d: 3.6, h: 14, color: 0x38bdf8 },
      { id: 'ks-beauty', x: -14, z: 6, w: 3.4, d: 3.4, h: 12, color: 0x10b981 },
      { id: 'event-management', x: -8, z: -14, w: 3.2, d: 3.2, h: 11, color: 0x818cf8 },
      { id: 'funflix', x: -16, z: -12, w: 3.2, d: 3.2, h: 10, color: 0xf59e0b },
      { id: 'anashi-store', x: -10, z: 14, w: 3.0, d: 3.0, h: 9, color: 0xec4899 },

      { id: 'react-stack', x: 12, z: 6, w: 3.6, d: 3.6, h: 16, color: 0x38bdf8 },
      { id: 'abap-cloud', x: 10, z: -4, w: 3.6, d: 3.6, h: 15, color: 0x6366f1 },
      { id: 'swiftui-stack', x: 8, z: 14, w: 3.2, d: 3.2, h: 12, color: 0x10b981 },

      { id: 'sap-cert-tower', x: -4, z: -22, w: 3.8, d: 3.8, h: 13, color: 0x6366f1 },
      { id: 'oracle-ai-tower', x: 4, z: -22, w: 3.8, d: 3.8, h: 12, color: 0xf43f5e },

      { id: 'ai-hub-node', x: 14, z: 14, w: 4.2, d: 4.2, h: 15, color: 0xa855f7 }
    ];

    cityLayout.forEach((item) => {
      const data = buildingDatabase[item.id];
      const boxGeo = new THREE.BoxGeometry(item.w, item.h, item.d);
      boxGeo.translate(0, item.h / 2, 0);

      const boxMat = new THREE.MeshPhongMaterial({
        color: item.color,
        flatShading: true,
        transparent: true,
        opacity: 0.9,
        shininess: 50,
      });

      const mesh = new THREE.Mesh(boxGeo, boxMat);
      mesh.position.set(item.x, 0, item.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: item.id, data };

      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      mesh.add(edges);

      cityGroup.add(mesh);
      interactiveMeshList.push(mesh);
    });

    // 9. Animated Traffic Beams
    const trafficCount = 50;
    const trafficGeo = new THREE.BufferGeometry();
    const trafficPos = new Float32Array(trafficCount * 3);

    for (let i = 0; i < trafficCount; i++) {
      trafficPos[i * 3] = (Math.random() - 0.5) * 60;
      trafficPos[i * 3 + 1] = 0.2;
      trafficPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    trafficGeo.setAttribute('position', new THREE.BufferAttribute(trafficPos, 3));
    const trafficMat = new THREE.PointsMaterial({
      size: 0.45,
      color: 0xf97316,
      transparent: true,
      opacity: 0.9,
    });
    const trafficMesh = new THREE.Points(trafficGeo, trafficMat);
    scene.add(trafficMesh);

    // 10. Raycasting & Mouse Hover / Click Events
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
            (hoveredMesh.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
          }
          hoveredMesh = hit;
          (hoveredMesh.material as THREE.MeshPhongMaterial).emissive.setHex(0x38bdf8);
          
          if (onHoverBuilding && hit.userData.data) {
            onHoverBuilding(hit.userData.data);
          }
        }
      } else {
        if (hoveredMesh) {
          (hoveredMesh.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
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

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);

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
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Animate Traffic Streams
      const tArray = trafficGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < trafficCount; i++) {
        const i3 = i * 3;
        tArray[i3] += 0.18;
        if (tArray[i3] > 30) tArray[i3] = -30;
      }
      trafficGeo.attributes.position.needsUpdate = true;

      // Animate Central HQ Pulsing Light
      centralLight.intensity = 2.5 + Math.sin(elapsedTime * 2) * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onClick);
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
      className="fixed inset-0 z-0 opacity-90 pointer-events-auto cursor-grab active:cursor-grabbing" 
    />
  );
};

export default Background3D;
