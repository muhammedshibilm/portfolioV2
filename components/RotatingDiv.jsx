"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const RotatingDiv = () => {
  // State for rotation on the X-axis (in degrees)
  const [rotationX, setRotationX] = useState(0);
  // Lock scrolling while the rotation effect is active
  const [isLocked, setIsLocked] = useState(false);
  // Create a ref for the container element
  const containerRef = useRef();

  // Update body overflow based on the locked state
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
  }, [isLocked]);

  // Handler to update rotation on scroll events
  const handleScroll = (e) => {
    if (!isLocked) return;
    e.preventDefault(); // Prevent default scrolling
    setRotationX((prev) => {
      const newRotation = prev + 10; // Increase rotation by 10° per scroll event
      if (newRotation >= 180) {
        setIsLocked(false); // Unlock scrolling when fully rotated
        return 180;
      }
      return newRotation;
    });
  };

  // Attach or remove the wheel event listener based on isLocked state
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

  // Use an Intersection Observer on the containerRef element to lock rotation when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLocked(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When the user scrolls further (the element moves out of view), reset the rotation to 0.
  useEffect(() => {
    const handleReset = () => {
      if (containerRef.current && rotationX === 180) {
        const rect = containerRef.current.getBoundingClientRect();
        // If the top of the container is scrolled above the viewport by at least 50px, reset.
        if (rect.top < -50) {
          setRotationX(0);
        }
      }
    };

    window.addEventListener("scroll", handleReset);
    return () => window.removeEventListener("scroll", handleReset);
  }, [rotationX]);

  return (
    <div className="relative px-10  h-screen mt-10 flex items-center justify-center">
      {/* Attach the ref to the container */}
      <div ref={containerRef} className="w-full h-96">
        {/* Framer Motion container for smooth rotation */}
        <motion.div
          className="relative w-full h-full"
          style={{
            perspective: 800,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: rotationX }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {/* Front Side (visible when rotationX is less than 90°) */}
          <div
            className="absolute w-full h-fit pb-4 px-3 text-black bg-white text-xl font-bold rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
             {/* header */}
             <div className="flex gap-2 py-4 border-b-2 ">
                 <div className="w-4 h-4 rounded-full bg-red-500"></div>
                 <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                 <div className="w-4 h-4 rounded-full bg-green-500"></div>
             </div>
             {/* body */}
             <h1 className="my-3 text-2xl text-center">Front end</h1>
            <div className="space-y-2" >
                <div className="space-y-2">
                  <h1 className="font-semibold">Languages</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>JavaScript</li>
                    <li>TypeScript </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold">Frameworks & Libraries</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>React.js</li>
                    <li>Next.js </li>
                    <li>Vite</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold">Styling & UI Frameworks</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>Tailwind CSS</li>
                    <li>Bootstrap </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold">Design & Prototyping</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>Figma </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold">Development Tools</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>VS Code</li>
                    <li>Git </li>
                    <li>GitHub Actions</li>
                  </ul>
                </div>
            </div>
          </div>

          {/* Back Side (pre-rotated 180° so it appears after the flip) */}
          <div
            className="absolute w-full h-fit pb-4 px-3  bg-white text-black text-xl font-bold rounded-lg"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
             {/* header */}
             <div className="flex gap-2 py-4 border-b-2 ">
                 <div className="w-4 h-4 rounded-full bg-red-500"></div>
                 <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                 <div className="w-4 h-4 rounded-full bg-green-500"></div>
             </div>
             {/* body */}
             <h1 className="my-3 text-2xl text-center">Back end</h1>
            <div className="space-y-2" >
                <div className="space-y-2">
                  <h1 className="font-semibold">Languages</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>Python</li>
                    <li>JavaScript </li>
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
                    <li>MongoDB </li>
                    <li>Redis</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold">DevOps & Deployment</h1>
                  <ul className="flex gap-2 text-[16px] pl-4">
                    <li>GitHub Actions </li>
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
