import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Preload } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { Suspense } from 'react';

const Breadboard = () => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Base board */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4, 0.4, 6]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Decorative details - Rails */}
      <mesh position={[-1.6, 0.21, 0]}>
        <boxGeometry args={[0.05, 0.02, 5.8]} />
        <meshStandardMaterial color="#cc1111" />
      </mesh>
      <mesh position={[-1.3, 0.21, 0]}>
        <boxGeometry args={[0.05, 0.02, 5.8]} />
        <meshStandardMaterial color="#1111cc" />
      </mesh>

      {/* Pins Pattern */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={"col-"+i} position={[-0.8 + i * 0.5, 0, 0]}>
          {Array.from({ length: 15 }).map((_, j) => (
             <group key={"pin-"+j} position={[0, 0.12, -1.2 + j * 0.8]}>
               <mesh castShadow receiveShadow>
                 <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
                 <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
               </mesh>
             </group>
          ))}
        </group>
      ))}
    </group>
  );
};

const NodeModule = ({ type, position }: { type: string, position: [number,number,number] }) => {
  // Very rough shapes for visual representation
  const colors: Record<string, string> = {
    esp32: "#1a1a1a",
    oled: "#2b4c7e",
    dht11: "#3b82f6",
    "hc-sr04": "#eab308",
    sg90: "#3b82f6",
    relay: "#ef4444"
  };
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.3, 2]} />
          <meshPhysicalMaterial 
            color={colors[type] || "#444444"} 
            roughness={0.5} 
            metalness={0.5} 
            clearcoat={1}
          />
        </mesh>
        
        {/* Tiny components on board */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        
        {/* Silkscreen text approximation */}
        <mesh position={[0, 0.16, 0.8]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[1, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

export const Scene3D = () => {
  const { selectedModuleIds } = useStore();
  
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 10, 30]} />
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 5]} 
          intensity={200} 
          angle={0.5} 
          penumbra={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <pointLight position={[-10, -10, -10]} intensity={20} color="#4f46e5" />
        <pointLight position={[10, 0, -10]} intensity={20} color="#ec4899" />
        
        <Environment preset="night" blur={0.8} />

        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Breadboard />
            
            {selectedModuleIds.map((id, index) => {
              // Layout them around the breadboard
              const radius = 3.5;
              const angle = (index / Math.max(1, selectedModuleIds.length)) * Math.PI * 2;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              
              return (
                <NodeModule 
                  key={id} 
                  type={id} 
                  position={[x, 1 + Math.sin(index) * 0.5, z]} 
                />
              );
            })}
          </group>
          <Preload all />
        </Suspense>

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

