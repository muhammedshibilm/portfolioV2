"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import gsap from "gsap";

export default function Page() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [projectsList, setProjectsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => {
                setProjectsList(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading && projectsList.length > 0) {
            const ctx = gsap.context(() => {
                gsap.from(".proj-title", {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                });

                gsap.from(".proj-card", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power2.out",
                });
            }, pageRef);

            return () => ctx.revert();
        }
    }, [loading, projectsList]);

    return (
        <div ref={pageRef} className="min-h-screen pb-32">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 max-w-7xl">
                <div className="mb-20">
                    <h1 className="proj-title text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                        Selected <span className="text-oliveGreen">Works.</span>
                    </h1>
                    <p className="proj-title text-xl text-beige/60 max-w-2xl leading-relaxed">
                        A showcase of my engineering experiments, architectural studies,
                        and collaborative digital solutions.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oliveGreen"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projectsList.map((proj, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="proj-card group relative h-[500px] rounded-[2.5rem] overflow-hidden glass border border-white/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 z-10" />

                                {/* Background Decoration */}
                                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-oliveGreen/10 blur-[100px] rounded-full group-hover:bg-oliveGreen/20 transition-all duration-700" />

                                <div className="absolute inset-0 p-12 flex flex-col justify-between z-20">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-oliveGreen">
                                            <Layers size={24} />
                                        </div>
                                        <div className="flex gap-3">
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                                <Github size={18} />
                                            </a>
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-oliveGreen hover:text-white transition-colors">
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex gap-2 mb-6 flex-wrap">
                                            {proj.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-beige/50">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-4xl font-bold tracking-tighter mb-4 group-hover:text-oliveGreen transition-colors duration-500">
                                            {proj.title}
                                        </h3>
                                        <p className="text-beige/60 text-lg leading-relaxed max-w-md">
                                            {proj.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}