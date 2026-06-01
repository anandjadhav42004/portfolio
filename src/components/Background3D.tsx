import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 500 : 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i+=3) {
      // Spread particles widely
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i+1] = (Math.random() - 0.5) * 100;
      posArray[i+2] = (Math.random() - 0.5) * 100;

      // Base colors are set to white so material.color shift affects all particles uniformly
      colorsArray[i] = 1.0;
      colorsArray[i+1] = 1.0;
      colorsArray[i+2] = 1.0;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0004;

      // Smooth linear interpolation (lerp) with a smooth coefficient
      particlesMesh.position.x += (targetX - particlesMesh.position.x) * 0.03;
      particlesMesh.position.y += (-targetY - particlesMesh.position.y) * 0.03;
      
      // Dynamic color shift cycling over 8 seconds: Electric Blue (0x00c8ff) -> Cyan (0x06ffd4) -> Purple (0xb026ff)
      const time = elapsedTime % 8;
      const cBlue = new THREE.Color(0x00c8ff);
      const cCyan = new THREE.Color(0x06ffd4);
      const cPurple = new THREE.Color(0xb026ff);
      
      const currentShiftColor = new THREE.Color();
      if (time < 2.67) {
        currentShiftColor.copy(cBlue).lerp(cCyan, time / 2.67);
      } else if (time < 5.33) {
        currentShiftColor.copy(cCyan).lerp(cPurple, (time - 2.67) / 2.67);
      } else {
        currentShiftColor.copy(cPurple).lerp(cBlue, (time - 5.33) / 2.67);
      }
      material.color.copy(currentShiftColor);
      
      // Floating wave effect
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for(let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        positions[i3 + 1] += Math.sin(elapsedTime + x * 0.1) * 0.008;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} id="canvas-container" className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />;
};

export default Background3D;
