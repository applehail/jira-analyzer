import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface CubeProps extends React.ComponentProps<"div"> {
  color?: string; // Цвет ребер куба
  lineWidth?: number; // Толщина линий ребер
  speed?: number; // Скорость вращения
  filled?: boolean;
  isHovered: boolean;
}

/**
 * cube mesh
 * @param param0
 * @returns
 */
function CubeMesh({ color = "#3b82f6", lineWidth = 1.5, speed = 1.5, filled, isHovered }: Omit<CubeProps, "className">) {
  const rotationGroupRef = useRef<THREE.Group>(null);
  const boxGeom = useMemo(() => new THREE.BoxGeometry(2.2, 2.2, 2.2), []);
  const currentSpeed = useRef(0);

  // useFrame запускается на каждый кадр анимации (60fps/120fps)
  useFrame((_state, delta) => {
    if (rotationGroupRef.current) {
      const targetSpeed = isHovered ? speed : 0;

      // THREE.MathUtils.lerp плавно приближает текущую скорость к целевой (эффект инерции)
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, delta * 4);

      if (currentSpeed.current > 0.001) {
        // rotationGroupRef.current.rotation.z += delta * 0.5 * speed;
        rotationGroupRef.current.rotation.y += delta * 0.5 * currentSpeed.current;
      }
    }
  });

  if (!filled) {
    return (
      <group ref={rotationGroupRef}>
        <lineSegments rotation={[0, 0.4, 0]}>
          <edgesGeometry args={[boxGeom]} />
          <lineBasicMaterial color={color} linewidth={lineWidth} transparent opacity={0.8} />
        </lineSegments>
      </group>
    );
  }

  return (
    <group ref={rotationGroupRef}>
      <group rotation={[0.61, 0, 0.61]}>
        <mesh geometry={boxGeom}>
          {/* 0: Правая */} <meshBasicMaterial attach="material-0" color="black" />
          {/* 1: Левая  */} <meshBasicMaterial attach="material-1" color="black" />
          {/* 2: Верхняя */} <meshBasicMaterial attach="material-2" color="white" />
          {/* 3: Нижняя */} <meshBasicMaterial attach="material-3" color="white" />
          {/* 4: Передняя*/} <meshBasicMaterial attach="material-4" color="black" />
          {/* 5: Задняя */} <meshBasicMaterial attach="material-5" color="white" />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[boxGeom]} />
          <lineBasicMaterial color={color} transparent opacity={0.9} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
        </lineSegments>
      </group>
    </group>
  );
}

/**
 * main component
 * @param param0
 * @returns
 */
export function Cube({ color, lineWidth, speed, className, filled, isHovered, ...props }: CubeProps) {
  return (
    <div className={cn("w-8 h-8", className)} {...props}>
      <Canvas renderer={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <CubeMesh color={color} lineWidth={lineWidth} speed={speed} filled={filled} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
