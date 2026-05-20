// src/components/LiquidEther.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidEther({
  colors = ['#00d4ff', '#22d3ee', '#a855f7'],
  mouseForce = 25, // Now used! Controls the intensity of the ripple ripples
  cursorSize = 110, // Now used! Controls the radius of the ripple effect
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true 
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uColor1: { value: new THREE.Color(colors[0]) },
        uColor2: { value: new THREE.Color(colors[1]) },
        uColor3: { value: new THREE.Color(colors[2]) },
        // Passing the React props down as GLSL Uniforms
        uMouseForce: { value: mouseForce },
        uCursorSize: { value: cursorSize },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uMouseForce;
        uniform float uCursorSize;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          
          // Compensate aspect ratio so the cursor ripple stays perfectly circular
          uv.x *= uResolution.x / uResolution.y;
          vec2 correctedMouse = uMouse * vec2(uResolution.x / uResolution.y, 1.0);
          
          float dist = distance(uv, correctedMouse);
          
          // Wave background animation
          float wave = sin(uv.x * 12.0 + uTime * 2.0) * 
                       sin(uv.y * 10.0 - uTime * 1.8) * 0.5 + 0.5;
          
          // Utilizing the custom size and force props in the ripple calculations
          float normalizedSize = uCursorSize / uResolution.y; 
          float rippleMask = smoothstep(normalizedSize, 0.0, dist);
          float ripple = rippleMask * sin(dist * uMouseForce - uTime * 8.0);
          
          float final = wave * 0.6 + ripple * 0.8;
          
          vec3 color = mix(uColor1, uColor2, final);
          color = mix(color, uColor3, sin(final * 8.0) * 0.3 + 0.3);
          
          float alpha = 0.75 + final * 0.25;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let time = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - (e.clientY / window.innerHeight);
      material.uniforms.uMouse.value.set(x, y);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const x = e.touches[0].clientX / window.innerWidth;
        const y = 1 - (e.touches[0].clientY / window.innerHeight);
        material.uniforms.uMouse.value.set(x, y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      time += 0.018;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [colors, mouseForce, cursorSize]); // Added missing dependencies to useEffect array

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}