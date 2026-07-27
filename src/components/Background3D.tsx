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
    category: 'Main Headquarters Tower',
    description: 'Central skyscraper representing Anand Jadhav — B.Tech Computer Science student at Parul University. Specializing in SAP ABAP Cloud & BTP architectures, Full-Stack Web (MEAN/MERN), and native iOS development (SwiftUI).',
    tags: ['SAP ABAP Cloud', 'SAP BTP', 'React / Next.js', 'SwiftUI', 'Node.js', 'TypeScript'],
    commits: 620,
    height: 22,
    highlight: true,
  },
  'ks-beauty': {
    id: 'ks-beauty',
    title: 'KS Beauty Luxury Tower',
    category: 'Luxury Pink Glass Skyscraper',
    description: 'Modern beauty and service platform crafted with modular React components, custom interactive quote calculators, and optimized responsive user journeys.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://ks-beauty-website.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/ks-beauty-website',
    commits: 118,
    height: 14,
  },
  'elvora-media': {
    id: 'elvora-media',
    title: 'Elvora Media Production Building',
    category: 'Purple Media & LED Tower',
    description: 'High-performance digital production agency web platform engineered for dynamic content delivery, responsive layouts, and modern visual storytelling.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    liveUrl: 'https://elvora-media.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/Elvora-Media-Premium-Digital-Media-Production-Agency',
    commits: 142,
    height: 15,
  },
  'funflix': {
    id: 'funflix',
    title: 'FunFlix Cinema Tower',
    category: 'Entertainment & Movie Center',
    description: 'Streaming & entertainment discovery application with real-time media search, category filtering, user watchlists, and interactive previews.',
    tags: ['React', 'REST API', 'CSS Glassmorphism', 'Netlify'],
    liveUrl: 'https://funflix03.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/FunFlix',
    commits: 85,
    height: 12,
  },
  'anashi-store': {
    id: 'anashi-store',
    title: 'Anashi Thrift Shopping Mall',
    category: 'E-Commerce Marketplace',
    description: 'Curated e-commerce storefront featuring vintage fashion catalogs, smooth cart management, product filtering, and mobile-first design.',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Netlify'],
    liveUrl: 'https://anashistore.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/anashi-cinematic-thrift',
    commits: 78,
    height: 11,
  },
  'event-management': {
    id: 'event-management',
    title: 'Event Management (Utsav26)',
    category: 'Campus Event Center',
    description: 'Comprehensive campus event management system featuring live schedule tracking, participant registrations, ticket verifications, and real-time status updates.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    liveUrl: 'https://utsav26.netlify.app',
    githubUrl: 'https://github.com/anandjadhav42004/event_management',
    commits: 96,
    height: 13,
  },
  'proflow-sap': {
    id: 'proflow-sap',
    title: 'ProFlow SAP Futuristic Tech Tower',
    category: 'Royal Blue SAP AI Tower',
    description: 'Enterprise workflow automation system combining MEAN stack with Google Gemini AI to process, summarize, and route SAP system requests.',
    tags: ['SAP BTP', 'ABAP Cloud', 'Angular', 'Node.js', 'Gemini AI'],
    liveUrl: 'https://portfolio-three-swart-hx117dkm4.vercel.app',
    githubUrl: 'https://github.com/anandjadhav42004/portfolio',
    commits: 180,
    height: 18,
  },
  'abap-cloud': {
    id: 'abap-cloud',
    title: 'ABAP Cloud Tech Pavilion',
    category: 'SAP Core Competency',
    description: 'Certified expertise in SAP ABAP Cloud, RESTful Application Programming Model (RAP), OData V2/V4 services, and SAP Business Technology Platform (BTP).',
    tags: ['ABAP Cloud', 'SAP BTP', 'RAP', 'CDS Views', 'OData V4'],
    commits: 130,
    height: 15,
  },
  'react-stack': {
    id: 'react-stack',
    title: 'React & TypeScript Campus',
    category: 'Full-Stack Competency',
    description: '94% proficiency in frontend web architecture using React 18, Next.js, TypeScript, Tailwind CSS, and state management.',
    tags: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    commits: 210,
    height: 16,
  },
  'swiftui-stack': {
    id: 'swiftui-stack',
    title: 'SwiftUI Mobile Pavilion',
    category: 'iOS Native Competency',
    description: '86% proficiency in native iOS application development with Swift, SwiftUI, Combine framework, and offline CoreData storage.',
    tags: ['Swift', 'SwiftUI', 'Combine', 'CoreData', 'iOS SDK'],
    commits: 90,
    height: 13,
  },
  'sap-cert-tower': {
    id: 'sap-cert-tower',
    title: 'SAP Credential Museum',
    category: 'Official SAP Credential',
    description: 'SAP Certified Associate - Back-End Developer - ABAP Cloud (Jul 2025 - Jul 2026). Credential ID: 99fc1274-a818-4ca7-8f0c-a1160e29a2d9.',
    tags: ['SAP Certified', 'ABAP Cloud', 'BTP', 'HANA Cloud'],
    liveUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    commits: 100,
    height: 14,
  },
  'oracle-ai-tower': {
    id: 'oracle-ai-tower',
    title: 'Oracle Cloud AI Museum',
    category: 'Official Oracle Credential',
    description: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Sep 2025). Certified in OCI Cloud AI & Machine Learning.',
    tags: ['Oracle Cloud', 'AI Foundations', 'Machine Learning', 'OCI'],
    liveUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    commits: 95,
    height: 13,
  },
  'ai-hub-node': {
    id: 'ai-hub-node',
    title: 'AI Smart Innovation Hub',
    category: 'AI Assistant & Job Matcher',
    description: 'Interactive AI Recruiter Chatbot trained on Anand Jadhav background and Job Description Match Analyzer powered by Claude AI API.',
    tags: ['Claude 3.5 Sonnet', 'Gemini AI', 'Job Match Analyzer', 'AI Chatbot'],
    commits: 160,
    height: 16,
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
  
  const targetCamPos = useRef<{ x: number; y: number; z: number }>({ x: 45, y: 38, z: 45 });
  const targetLookAt = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 5, z: 0 });

  useEffect(() => {
    switch (activeDistrict) {
      case 'hero':
        targetCamPos.current = { x: 45, y: 38, z: 45 };
        targetLookAt.current = { x: 0, y: 5, z: 0 };
        break;
      case 'projects':
        targetCamPos.current = { x: -30, y: 25, z: 30 };
        targetLookAt.current = { x: -12, y: 6, z: 0 };
        break;
      case 'skills':
        targetCamPos.current = { x: 30, y: 24, z: -25 };
        targetLookAt.current = { x: 12, y: 5, z: -5 };
        break;
      case 'certifications':
        targetCamPos.current = { x: -22, y: 22, z: -30 };
        targetLookAt.current = { x: -4, y: 5, z: -15 };
        break;
      case 'ai-lab':
        targetCamPos.current = { x: 30, y: 25, z: 30 };
        targetLookAt.current = { x: 14, y: 6, z: 14 };
        break;
      default:
        targetCamPos.current = { x: 45, y: 38, z: 45 };
        targetLookAt.current = { x: 0, y: 5, z: 0 };
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Warm Golden-Hour Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0c4ff);
    scene.fog = new THREE.FogExp2(0xa0c4ff, 0.0035);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(45, 38, 45);
    camera.lookAt(0, 5, 0);
    cameraRef.current = camera;

    // 3. Renderer
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
    controls.minDistance = 12;
    controls.maxDistance = 130;
    controlsRef.current = controls;

    // 5. Warm Golden-Hour Sunlight & Ambient Sky Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffb703, 1.4);
    sunLight.position.set(60, 60, -40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x74b9ff, 0.5);
    fillLight.position.set(-40, 40, 40);
    scene.add(fillLight);

    // 6. Lush Emerald Green Grass Terrain Base
    const grassGeo = new THREE.PlaneGeometry(160, 160);
    const grassMat = new THREE.MeshLambertMaterial({ color: 0x2ecc71 });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.rotation.x = -Math.PI / 2;
    grassMesh.position.y = -0.1;
    grassMesh.receiveShadow = true;
    scene.add(grassMesh);

    // 7. Dark Concrete Asphalt Roads & Crosswalks
    const roadGroup = new THREE.Group();
    scene.add(roadGroup);

    const mainRoadGeo = new THREE.PlaneGeometry(12, 160);
    const roadMat = new THREE.MeshLambertMaterial({ color: 0x34495e });

    const roadNS = new THREE.Mesh(mainRoadGeo, roadMat);
    roadNS.rotation.x = -Math.PI / 2;
    roadNS.position.y = 0.02;
    roadNS.receiveShadow = true;
    roadGroup.add(roadNS);

    const roadEW = new THREE.Mesh(mainRoadGeo, roadMat);
    roadEW.rotation.x = -Math.PI / 2;
    roadEW.rotation.z = Math.PI / 2;
    roadEW.position.y = 0.02;
    roadEW.receiveShadow = true;
    roadGroup.add(roadEW);

    // 8. Animated Blue River & Curved Bridges
    const riverGeo = new THREE.PlaneGeometry(160, 18);
    const riverMat = new THREE.MeshPhongMaterial({
      color: 0x3498db,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.rotation.x = -Math.PI / 2;
    riverMesh.position.set(0, 0.05, 42);
    scene.add(riverMesh);

    // Wooden Bridge
    const bridgeGeo = new THREE.BoxGeometry(14, 1.2, 22);
    const bridgeMat = new THREE.MeshLambertMaterial({ color: 0xe67e22 });
    const bridgeMesh = new THREE.Mesh(bridgeGeo, bridgeMat);
    bridgeMesh.position.set(0, 0.6, 42);
    scene.add(bridgeMesh);

    // 9. Low-Poly Cartoon Trees & Parks
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const createTree = (x: number, z: number) => {
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 2, 6);
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x795548 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(x, 1, z);
      trunk.castShadow = true;

      const canopyGeo = new THREE.DodecahedronGeometry(1.6, 1);
      const canopyMat = new THREE.MeshLambertMaterial({ color: 0x27ae60, flatShading: true });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.set(x, 2.6, z);
      canopy.castShadow = true;

      treeGroup.add(trunk);
      treeGroup.add(canopy);
    };

    // Plant trees along parks & road margins
    [
      [-18, -18], [-22, -14], [-16, 20], [-24, 22],
      [18, -18], [22, -12], [20, 20], [24, 24],
      [-28, 0], [28, 0], [0, -32], [0, 30]
    ].forEach(([tx, tz]) => createTree(tx, tz));

    // 10. Low-Poly Floating Clouds
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    for (let i = 0; i < 8; i++) {
      const cloud = new THREE.Group();
      const p1 = new THREE.Mesh(new THREE.DodecahedronGeometry(3, 1), new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true }));
      const p2 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 1), new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true }));
      p2.position.set(2, 0.5, 0);
      cloud.add(p1);
      cloud.add(p2);

      cloud.position.set((Math.random() - 0.5) * 120, 28 + Math.random() * 8, (Math.random() - 0.5) * 120);
      cloudGroup.add(cloud);
    }

    // 11. Custom Stylized Pixar Cartoon Skyscrapers
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const interactiveMeshList: THREE.Mesh[] = [];

    const cityLayout = [
      // Central Anand HQ Skyscraper (Emerald & Warm Gold)
      { id: 'anand-hq', x: 0, z: 0, w: 5.2, d: 5.2, h: 22, color: 0x00b894, roofColor: 0xffb703 },

      // KS Beauty (Luxury Pink Glass Tower with Gold Accents)
      { id: 'ks-beauty', x: -14, z: 8, w: 3.8, d: 3.8, h: 14, color: 0xfd79a8, roofColor: 0xffb703 },

      // Elvora Media (Vibrant Purple Tower with LED Billboard)
      { id: 'elvora-media', x: -14, z: -6, w: 4.0, d: 4.0, h: 15, color: 0x6c5ce7, roofColor: 0xa29bfe },

      // FunFlix (Cinema Tower with Cinema Red Accents)
      { id: 'funflix', x: -18, z: -14, w: 3.6, d: 3.6, h: 12, color: 0xff7675, roofColor: 0xd63031 },

      // Anashi Store (Shopping Mall with Warm Yellow Roof)
      { id: 'anashi-store', x: -12, z: 18, w: 3.5, d: 3.5, h: 11, color: 0xfdcb6e, roofColor: 0xe17055 },

      // Event Management Utsav26 (Campus Center)
      { id: 'event-management', x: -8, z: -16, w: 3.6, d: 3.6, h: 13, color: 0x0984e3, roofColor: 0x74b9ff },

      // ProFlow SAP AI (Futuristic Royal Blue Tech Tower)
      { id: 'proflow-sap', x: -7, z: -6, w: 4.2, d: 4.2, h: 18, color: 0x0984e3, roofColor: 0x6c5ce7 },

      // Skills Tech Campus
      { id: 'react-stack', x: 14, z: 8, w: 4.0, d: 4.0, h: 16, color: 0x74b9ff, roofColor: 0x0984e3 },
      { id: 'abap-cloud', x: 12, z: -5, w: 4.0, d: 4.0, h: 15, color: 0x6c5ce7, roofColor: 0xa29bfe },
      { id: 'swiftui-stack', x: 10, z: 16, w: 3.6, d: 3.6, h: 13, color: 0x00b894, roofColor: 0x55efc4 },

      // Credentials Museum Plaza
      { id: 'sap-cert-tower', x: -5, z: -24, w: 4.2, d: 4.2, h: 14, color: 0x6c5ce7, roofColor: 0xffb703 },
      { id: 'oracle-ai-tower', x: 5, z: -24, w: 4.2, d: 4.2, h: 13, color: 0xff7675, roofColor: 0xfdcb6e },

      // AI Innovation Hub
      { id: 'ai-hub-node', x: 16, z: 16, w: 4.6, d: 4.6, h: 16, color: 0xa29bfe, roofColor: 0x00cec9 }
    ];

    cityLayout.forEach((item) => {
      const data = buildingDatabase[item.id];
      
      // Building Main Body (Stylized Box with Rounded Bevel)
      const bodyGeo = new THREE.BoxGeometry(item.w, item.h, item.d);
      bodyGeo.translate(0, item.h / 2, 0);

      const bodyMat = new THREE.MeshPhongMaterial({
        color: item.color,
        flatShading: true,
        shininess: 60,
      });

      const mesh = new THREE.Mesh(bodyGeo, bodyMat);
      mesh.position.set(item.x, 0, item.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: item.id, data };

      // Rooftop Decorative Cap
      const capGeo = new THREE.BoxGeometry(item.w * 0.7, 1.5, item.d * 0.7);
      const capMat = new THREE.MeshLambertMaterial({ color: item.roofColor, flatShading: true });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(0, item.h + 0.75, 0);
      mesh.add(cap);

      // Lit Windows Grid
      const windowMat = new THREE.MeshLambertMaterial({ color: 0xfff3bf, emissive: 0xffe066, emissiveIntensity: 0.5 });
      const windowRows = Math.floor(item.h / 3);
      for (let r = 1; r <= windowRows; r++) {
        const winGeo = new THREE.BoxGeometry(item.w * 0.85, 0.8, item.d * 1.02);
        const winMesh = new THREE.Mesh(winGeo, windowMat);
        winMesh.position.set(0, r * 2.8, 0);
        mesh.add(winMesh);
      }

      cityGroup.add(mesh);
      interactiveMeshList.push(mesh);
    });

    // 12. Cartoon Cars Driving on Streets
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    const carColors = [0xe74c3c, 0xf1c40f, 0x9b59b6, 0x1abc9c];
    const cars: THREE.Mesh[] = [];

    for (let i = 0; i < 10; i++) {
      const carGeo = new THREE.BoxGeometry(1.2, 0.6, 2.2);
      const carMat = new THREE.MeshLambertMaterial({ color: carColors[i % carColors.length], flatShading: true });
      const car = new THREE.Mesh(carGeo, carMat);
      car.position.set((Math.random() - 0.5) * 50, 0.4, (Math.random() - 0.5) * 50);
      carGroup.add(car);
      cars.push(car);
    }

    // 13. Raycasting & Mouse Hover / Click
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
            hoveredMesh.scale.set(1, 1, 1);
          }
          hoveredMesh = hit;
          hoveredMesh.scale.set(1.05, 1.05, 1.05);
          
          if (onHoverBuilding && hit.userData.data) {
            onHoverBuilding(hit.userData.data);
          }
        }
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1);
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

    // 14. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Smooth Camera Lerp to target district
      camera.position.x += (targetCamPos.current.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamPos.current.y - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.05;

      targetLookAt.current.x += (targetLookAt.current.x - targetLookAt.current.x) * 0.05;

      // Animate Moving Cars
      cars.forEach((car, idx) => {
        car.position.z += (0.1 + (idx % 3) * 0.05);
        if (car.position.z > 50) car.position.z = -50;
      });

      // Animate Floating Clouds
      cloudGroup.children.forEach((cloud, idx) => {
        cloud.position.x += 0.02 + (idx % 2) * 0.01;
        if (cloud.position.x > 60) cloud.position.x = -60;
      });

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
      className="fixed inset-0 z-0 opacity-100 pointer-events-auto cursor-grab active:cursor-grabbing" 
    />
  );
};

export default Background3D;
