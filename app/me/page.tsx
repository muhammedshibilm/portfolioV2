"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Service from "../../components/Services";
import Tools from "../../components/Tools";
import Proexp from "../../components/Proexp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".about-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pb-32">
      <Navbar />

      <section className="container mx-auto px-6 pt-32 max-w-5xl">
        <div className="mb-20">
          <h1 className="about-title text-6xl md:text-8xl font-bold tracking-tighter mb-12">
            About <span className="text-oliveGreen">Me.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="about-text text-xl md:text-2xl text-beige/80 leading-relaxed">
                As a <span className="text-white font-semibold">Backend & Frontend Engineer</span> with a passion for building scalable systems,
                I&apos;ve dedicated my career to crafting efficient and reliable software solutions.
                My journey in technology started with a curiosity about how things work under the hood,
                which led me to specialize in architecting complex digital landscapes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="about-text glass card-3d p-6 rounded-2xl border border-white/5">
                <span className="text-xs uppercase tracking-widest text-oliveGreen font-bold block mb-2">Location</span>
                <span className="text-lg font-medium">Kerala, India</span>
              </div>
              <div className="about-text glass card-3d p-6 rounded-2xl border border-white/5">
                <span className="text-xs uppercase tracking-widest text-oliveGreen font-bold block mb-2">Focus</span>
                <span className="text-lg font-medium">Architecture & UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* sections */}
        <div className="space-y-32">
          <section>
            <Service />
          </section>

          <section>
            <Tools />
          </section>

          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Professional Experience</h2>
              <div className="w-12 h-1 bg-oliveGreen"></div>
            </div>
            <Proexp />
          </section>
        </div>
      </section>
    </div>
  );
}
