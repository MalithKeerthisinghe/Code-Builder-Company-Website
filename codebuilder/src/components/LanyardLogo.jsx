
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Extend meshline primitives safely into the JSX rendering ecosystem
extend({ MeshLineGeometry, MeshLineMaterial });

export default function LanyardLogo({ 
  position = [0, 2.5, 3.5], // Adjusted camera offset closer to fit standard layout boundaries
  gravity = [0, -40, 0], 
  fov = 25 
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-[200px] h-[350px] pointer-events-auto">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.2 : 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={Math.PI * 1.5} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { type: 'dynamic', canSleep: false, colliders: false, angularDamping: 3, linearDamping: 3 };
  
  // Directly references your local site logo image asset path securely
  const logoTexture = useTexture('/images/logo.png');
  
  // Extracts active viewport width/height configuration from the current WebGL render pipeline window context
  const { width, height } = useThree((state) => state.size);
  
  // FIX: Force clear initialization of track nodes across world space coordinates
  const [curve] = useState(() => {
    const points = Array.from({ length: 4 }, () => new THREE.Vector3());
    const c = new THREE.CatmullRomCurve3(points);
    c.curveType = 'chordal';
    return c;
  });

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 0.6, 0]]); // Anchored cleanly to top middle edge of 2D card surface

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    
    if (fixed.current && band.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      // Pass the matrix data securely down to the target buffer attributes
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      {/* Anchor point positioned natively at top center of canvas box scope */}
      <group position={[0, 2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        
        <RigidBody position={[0.1, -0.3, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.05]} />
        </RigidBody>
        <RigidBody position={[0.2, -0.6, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.05]} />
        </RigidBody>
        <RigidBody position={[0.3, -0.9, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.05]} />
        </RigidBody>
        
        <RigidBody position={[0.4, -1.2, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.4, 0.4, 0.01]} />
          <group
            position={[0, -0.2, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh>
              <planeGeometry args={[0.8, 0.8]} />
              <meshBasicMaterial 
                map={logoTexture} 
                transparent={true} 
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      
      {/* Ribbon track component relying directly on context frame state parameters */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#22d3ee" 
          depthTest={true}
          resolution={[width, height]} // FIX: Directly maps width and height to resolve ribbon pipeline sizing flawlessly
          lineWidth={0.2}
        />
      </mesh>
    </>
  );
}