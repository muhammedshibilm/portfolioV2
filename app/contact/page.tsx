"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import FloatingShapes from "../../components/FloatingShapes";
import Cards from "../../components/Cards";
import gsap from "gsap";

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen pb-32 overflow-hidden">
      <Navbar />
      <FloatingShapes />
      <div className="relative z-10">
        <section className="container mx-auto px-6 pt-32 max-w-5xl">
          <div className="mb-20">
            <h1 className="contact-reveal text-6xl md:text-8xl font-bold tracking-tighter mb-12">
              Let&apos;s <span className="text-oliveGreen">Connect.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div>
                <p className="contact-reveal text-xl md:text-2xl text-beige/80 leading-relaxed max-w-xl">
                  I&apos;m always open to new opportunities, collaborations,
                  or just a friendly chat about technology and design.
                </p>
              </div>
              <div className="contact-reveal flex flex-col items-end gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-oliveGreen font-bold">Based in</span>
                <span className="text-3xl font-bold tracking-tighter">India, GMT+5:30</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Cards />
          </div>

          {/* Closing Quote/Text */}
          <div className="mt-32 text-center">
            <div className="contact-reveal opacity-20 text-[10vw] font-bold tracking-tighter leading-none select-none pointer-events-none mb-12">
              SHIBIL M
            </div>
            <p className="contact-reveal text-beige/40 text-sm uppercase tracking-[0.5em]">
              Building the future, one pixel at a time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
