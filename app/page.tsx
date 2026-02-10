"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import profile from "../public/profile.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import exploredata from "../db/exploredata.json";
import Navbar from "../components/Navbar";
import Hero3D from "../components/Hero3D";
import gsap from "gsap";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.querySelectorAll(".reveal"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.5,
        }
      );
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Navbar />
      <Hero3D />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          ref={heroTextRef}
          className="text-center z-10 space-y-6"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="relative w-32 h-32 md:w-40 md:h-40 p-1 rounded-full border border-oliveGreen/30 glass"
            >
              <Image
                src={profile}
                alt="Shibil M"
                fill
                className="rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <h2 className="reveal text-oliveGreen font-medium tracking-widest text-sm uppercase mb-2">
              Software Engineer & Designer
            </h2>
          </div>

          <div className="overflow-hidden">
            <h1 className="reveal text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              Shibil <span className="text-oliveGreen">M</span>
            </h1>
          </div>

          <div className="overflow-hidden max-w-2xl mx-auto">
            <p className="reveal text-beige/70 text-lg md:text-xl leading-relaxed">
              I turn complex problems into elegant 3D experiences and scalable backend solutions.
              Based in India, building for the world.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:shibil@example.com" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className="p-3 rounded-full glass border border-white/10 hover:border-oliveGreen/50 hover:text-oliveGreen transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-beige/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-12 bg-gradient-to-b from-oliveGreen to-transparent"
          />
        </motion.div>
      </section>

      {/* Explore Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-oliveGreen text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-oliveGreen"></span> Selection
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Explore my <br /> Work & Journey.
            </h3>
          </div>
          <p className="text-beige/50 max-w-sm text-right">
            A curated selection of my professional experience, skills, and personal projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exploredata.map((item, index) => (
            <Link key={index} href={item.href} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-[400px] overflow-hidden rounded-3xl glass-card flex flex-col justify-end p-10"
              >
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <ArrowDownRight size={40} className="text-oliveGreen" />
                </div>

                <h4 className="text-5xl font-bold tracking-tighter mb-4 group-hover:text-oliveGreen transition-colors duration-500">
                  {item.name}
                </h4>
                <p className="text-beige/60 text-lg leading-relaxed max-w-xs transition-colors duration-500 group-hover:text-beige">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-oliveGreen">
                  <span>View Details</span>
                  <div className="w-12 h-[1px] bg-oliveGreen group-hover:w-20 transition-all duration-500" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Sneak Peek */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-beige/20 text-xs uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} Muhammed Shibil M. Designed with Passion.
        </p>
      </footer>
    </div>
  );
}
