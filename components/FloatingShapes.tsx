"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function Shape({ position, color, speed, distort, type }: { position: [number, number, number], color: string, speed: number, distort: number, type: 'sphere' | 'torus' | 'octahedron' | 'icosahedron' }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
        meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.5;
    });

    return (
        <Float speed={speed} rotationIntensity={2} floatIntensity={2} position={position}>
            <mesh ref={meshRef}>
                {type === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
                {type === 'torus' && <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />}
                {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
                {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}

                {distort > 0 ? (
                    <MeshDistortMaterial
                        color={color}
                        speed={speed}
                        distort={distort}
                        roughness={0.2}
                        metalness={0.8}
                    />
                ) : (
                    <MeshWobbleMaterial
                        color={color}
                        speed={speed}
                        factor={0.4}
                        roughness={0.2}
                        metalness={0.8}
                    />
                )}
            </mesh>
        </Float>
    );
}

function Scene() {
    const { viewport } = useThree();

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#8a9064" />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

            <Shape
                position={[-viewport.width / 4, viewport.height / 4, 0]}
                color="#8a9064"
                speed={1.5}
                distort={0.4}
                type="sphere"
            />
            <Shape
                position={[viewport.width / 3, -viewport.height / 3, -1]}
                color="#a3a88a"
                speed={2}
                distort={0.2}
                type="torus"
            />
            <Shape
                position={[viewport.width / 4, viewport.height / 3, -2]}
                color="#717653"
                speed={1}
                distort={0}
                type="octahedron"
            />

            <fog attach="fog" args={["#0a0a0a", 5, 20]} />
        </>
    );
}

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
