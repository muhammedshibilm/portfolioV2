"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars, Dodecahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function RotatingPolyhedron() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <Dodecahedron ref={meshRef} args={[1.5, 0]}>
                <MeshDistortMaterial
                    color="#5c6b46" // Darker olive
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.4}
                    metalness={0.6}
                    wireframe={true}
                />
            </Dodecahedron>
        </Float>
    );
}

function InnerCore() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = -time * 0.2;
        meshRef.current.rotation.z = time * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
            <Dodecahedron ref={meshRef} args={[0.8, 0]}>
                <meshStandardMaterial
                    color="#d4d4aa"
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#5c6b46"
                    emissiveIntensity={0.2}
                />
            </Dodecahedron>
        </Float>
    );
}

export default function Admin3D() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-black/20">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -5, 5]} intensity={0.5} color="#8a9064" />

                <RotatingPolyhedron />
                <InnerCore />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <fog attach="fog" args={["#050505", 5, 20]} />
            </Canvas>
        </div>
    );
}
