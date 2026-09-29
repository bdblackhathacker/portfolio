import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

const ParticleSystem = ({ count = 2000, color = '#00ff41', size = 1.5, speed = 0.3 }: ParticleProps) => {
  const positionsRef = useRef<Float32Array>();
  const velocitiesRef = useRef<Float32Array>();
  const originalPositionsRef = useRef<Float32Array>();
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const alphas = new Float32Array(count);

    const colorObj = new THREE.Color(color);
    const radius = 40;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = size * (0.5 + Math.random() * 1.5);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      alphas[i] = 0.3 + Math.random() * 0.7;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    positionsRef.current = positions;
    velocitiesRef.current = velocities;
    originalPositionsRef.current = originalPositions;

    return geo;
  }, [count, color, size]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: size,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [size]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !positionsRef.current || !velocitiesRef.current || !originalPositionsRef.current) return;

    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const originalPositions = originalPositionsRef.current;
    const time = performance.now() * 0.001;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i3] * speed * 60 * delta;
      positions[i3 + 1] += velocities[i3 + 1] * speed * 60 * delta;
      positions[i3 + 2] += velocities[i3 + 2] * speed * 60 * delta;

      const dx = positions[i3] - mouse.x * 50;
      const dy = positions[i3 + 1] - mouse.y * 50;
      const dz = positions[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 30) {
        const force = (30 - dist) / 30 * 0.05;
        positions[i3] += dx / dist * force;
        positions[i3 + 1] += dy / dist * force;
        positions[i3 + 2] += dz / dist * force;
      }

      const origDist = Math.sqrt(
        Math.pow(positions[i3] - originalPositions[i3], 2) +
        Math.pow(positions[i3 + 1] - originalPositions[i3 + 1], 2) +
        Math.pow(positions[i3 + 2] - originalPositions[i3 + 2], 2)
      );

      if (origDist > 50) {
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.01;
        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.01;
        positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.01;
      }

      positions[i3] += Math.sin(time + i * 0.1) * 0.005;
      positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.005;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    pointsRef.current.rotation.y += 0.0001 * speed;
    pointsRef.current.rotation.x += 0.00005 * speed;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

interface GeometricShapeProps {
  type: 'torus' | 'octahedron' | 'icosahedron' | 'dodecahedron';
  position: [number, number, number];
  scale?: number;
  color?: string;
  wireframe?: boolean;
  rotationSpeed?: number;
  floatingSpeed?: number;
}

const GeometricShape = ({ 
  type, 
  position, 
  scale = 1, 
  color = '#00ff41', 
  wireframe = true, 
  rotationSpeed = 1,
  floatingSpeed = 1,
}: GeometricShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (type) {
      case 'torus':
        return new THREE.TorusGeometry(3, 1, 16, 32);
      case 'octahedron':
        return new THREE.OctahedronGeometry(3, 0);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(3, 0);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(3, 0);
      default:
        return new THREE.BoxGeometry(3, 3, 3);
    }
  }, [type]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      wireframe,
      transparent: true,
      opacity: wireframe ? 0.4 : 0.3,
      metalness: 0.3,
      roughness: 0.4,
    });
  }, [color, wireframe]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    const time = performance.now() * 0.001;
    
    meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
    meshRef.current.rotation.z += delta * rotationSpeed * 0.3;
    
    meshRef.current.position.y = position[1] + Math.sin(time * floatingSpeed) * 1.5;
    meshRef.current.position.x = position[0] + Math.cos(time * floatingSpeed * 0.7) * 0.5;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
};

interface SceneWrapperProps {
  children: React.ReactNode;
}

export const SceneWrapper = ({ children }: SceneWrapperProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows={false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <color attach="background" args={['#0d1117']} />
      <fog attach="fog" args={['#0d1117', 30, 100]} />
      
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#00ff41" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8b949e" />
      <pointLight position={[0, 10, 20]} intensity={0.5} color="#00ff41" decay={2} distance={100} />
      
      <ParticleSystem count={3000} color="#00ff41" size={1.2} speed={0.2} />
      <ParticleSystem count={1500} color="#8b949e" size={0.8} speed={0.3} />
      
      <GeometricShape 
        type="torus" 
        position={[-25, 5, -20]} 
        scale={1.2} 
        color="#00ff41" 
        wireframe={true} 
        rotationSpeed={0.8}
        floatingSpeed={0.8}
      />
      <GeometricShape 
        type="octahedron" 
        position={[25, -5, -15]} 
        scale={1} 
        color="#8b949e" 
        wireframe={true} 
        rotationSpeed={1.2}
        floatingSpeed={1.1}
      />
      <GeometricShape 
        type="icosahedron" 
        position={[-20, -10, -30]} 
        scale={0.8} 
        color="#00ff41" 
        wireframe={false} 
        rotationSpeed={0.6}
        floatingSpeed={0.9}
      />
      <GeometricShape 
        type="dodecahedron" 
        position={[20, 12, -25]} 
        scale={1.1} 
        color="#8b949e" 
        wireframe={false} 
        rotationSpeed={0.9}
        floatingSpeed={1.0}
      />
      
      {children}
    </Canvas>
  );
};

export const HeroCanvas = () => {
  return (
    <SceneWrapper>
      <ParticleSystem count={5000} color="#00ff41" size={1.5} speed={0.15} />
      <ParticleSystem count={2000} color="#8b949e" size={1} speed={0.25} />
      
      <GeometricShape 
        type="torus" 
        position={[0, 0, 0]} 
        scale={2.5} 
        color="#00ff41" 
        wireframe={true} 
        rotationSpeed={0.5}
        floatingSpeed={0.5}
      />
      <GeometricShape 
        type="octahedron" 
        position={[0, 0, 0]} 
        scale={1.8} 
        color="#8b949e" 
        wireframe={true} 
        rotationSpeed={-0.7}
        floatingSpeed={0.7}
      />
    </SceneWrapper>
  );
};