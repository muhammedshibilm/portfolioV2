"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const RotatingDiv = () => {
  const [rotationX, setRotationX] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef();

  // Prevent scrolling when locked
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
  }, [isLocked]);

  // Handle scroll for rotation
  const handleScroll = (e) => {
    if (!isLocked) return;
    e.preventDefault(); // Prevent default scrolling

    setRotationX((prev) => {
      const delta = e.deltaY > 0 ? 10 : -10; // Scroll direction
      let newRotation = prev + delta;

      if (newRotation >= 180) {
        setIsLocked(false); // Unlock at 180°
        return 180;
      } else if (newRotation <= 0) {
        setIsLocked(false); // Unlock at 0°
        return 0;
      }

      return newRotation;
    });
  };

  // Attach/remove scroll event listener
  useEffect(() => {
    if (isLocked) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", handleScroll);
    }
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isLocked]);

  // Observe element visibility to lock scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsLocked(entry.isIntersecting),
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative px-10 h-screen mt-10 flex items-center justify-center">
      <div ref={containerRef} className="w-full h-96">
        <motion.div
          className="relative w-full h-full"
          style={{ perspective: 800, transformStyle: "preserve-3d" }}
          animate={{ rotateX: rotationX }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-fit pb-4 px-3 text-black bg-white text-xl font-bold rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Header */}
            <div className="flex gap-2 py-4 border-b-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>
            {/* Body */}
            <h1 className="my-3 text-2xl text-center">Front end</h1>
            <div className="space-y-2">
              <div className="space-y-2">
                <h1 className="font-semibold">Languages</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Frameworks & Libraries</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>Vite</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Styling & UI Frameworks</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>Tailwind CSS</li>
                  <li>Bootstrap</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Design & Prototyping</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>Figma</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Development Tools</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>VS Code</li>
                  <li>Git</li>
                  <li>GitHub Actions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-fit pb-4 px-3 bg-white text-black text-xl font-bold rounded-lg"
            style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
            {/* Header */}
            <div className="flex gap-2 py-4 border-b-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>
            {/* Body */}
            <h1 className="my-3 text-2xl text-center">Back end</h1>
            <div className="space-y-2">
              <div className="space-y-2">
                <h1 className="font-semibold">Languages</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>Python</li>
                  <li>JavaScript</li>
                  <li>Java</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Frameworks & APIs</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>Django</li>
                  <li>FastAPI</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Databases & Storage</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>PostgreSQL</li>
                  <li>MongoDB</li>
                  <li>Redis</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">DevOps & Deployment</h1>
                <ul className="flex gap-2 text-[16px] pl-4">
                  <li>GitHub Actions</li>
                  <li>Linux</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RotatingDiv;
