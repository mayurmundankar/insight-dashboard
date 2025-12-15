import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { Suspense } from 'react'

const PointCloud = ({ url }) => {
  try {
    const points = useLoader(PCDLoader, url)
    return (
      <primitive 
        object={points} 
        scale={[0.5, 0.5, 0.5]} 
        rotation={[0, 0, 0]}
      /> 
    )
  } catch (error) {
    console.error('Error loading PCD:', error)
    return null
  }
}

const LoadingSpinner = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#3B82F6" />
  </mesh>
)

export default function MapView({ className }) {
  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 8, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<LoadingSpinner />}>
          {/* Load the actual PCD file */}
          <PointCloud url="/office1.pcd" />
        </Suspense>
        
        <OrbitControls 
          makeDefault 
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={50}
        />
        
        {/* Grid helper for reference */}
        <Grid 
          args={[20, 20]} 
          cellColor="#cbd5e1" 
          sectionColor="#64748b"
          fadeDistance={30}
          fadeStrength={1}
        />
        
        {/* Add some lighting effects */}
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  )
}
