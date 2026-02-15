"use client";

import React, { useRef, useMemo, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RotatingShape() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const mouse = useRef({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, time * 0.2 + mouse.current.y * 0.5, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, time * 0.3 + mouse.current.x * 0.5, 0.1);
        const targetScale = hovered ? 1.08 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    });

    return (
        <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.2}>
            <mesh
                ref={meshRef}
                position={[0.2, 0.1, -0.6]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setActive((prev) => !prev)}
            >
                <icosahedronGeometry args={[1.15, 1]} />
                <meshStandardMaterial
                    color="#7f8f6a"
                    roughness={0.25}
                    metalness={0.9}
                    emissive="#3f4636"
                    emissiveIntensity={hovered ? 0.7 : 0.45}
                    wireframe={!active}
                />
            </mesh>
        </Float>
    );
}



function TechGrid() {
    const grid = useMemo(() => new THREE.GridHelper(18, 40, "#2f332a", "#1c1f19"), []);

    return (
        <primitive
            object={grid}
            position={[0, -2.2, -2]}
            rotation={[Math.PI / 2.4, 0, 0]}
        />
    );
}


function ParallaxCamera() {
    const { camera, mouse } = useThree();

    useFrame(() => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.8, 0.06);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.6, 0.06);
        camera.lookAt(0, 0, 0);
    });

    return null;
}



function Particles({ count = 400 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const pointsRef = useRef<THREE.Points>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#9aa68a"
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 -z-10 h-screen w-full">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ParallaxCamera />
                    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[6, 8, 6]} intensity={1.1} color="#dfe6d6" />
                    <pointLight position={[10, 10, 10]} intensity={1.2} color="#8a9064" />
                    <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1.1} />

                    <RotatingShape />
                 
                    <TechGrid />
                    <Particles />

                    <fog attach="fog" args={["#0a0a0a", 5, 15]} />
                </Suspense>
            </Canvas>
        </div>
    );
}
