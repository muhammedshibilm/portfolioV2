"use client";

import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import datas from "../db/contact.json";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Cards() {
    const getIcon = (name) => {
        switch (name) {
            case "LinkedIn": return <Linkedin size={24} />;
            case "Twitter": return <Twitter size={24} />;
            case "GitHub": return <Github size={24} />;
            case "Mail": return <Mail size={24} />;
            default: return null;
        }
    };

    return (
        <>
            {datas.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                >
                    <Link href={item.url} target="_blank">
                        <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden h-full">
                            {/* Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-oliveGreen/5 blur-3xl rounded-full group-hover:bg-oliveGreen/10 transition-all duration-500" />

                            <div className="flex justify-between items-start">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                >
                                    {getIcon(item.name)}
                                </div>
                                <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                    <ArrowUpRight size={18} className="text-oliveGreen" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-oliveGreen transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-beige/40 font-medium mb-4">
                                    {item.username}
                                </p>
                                <p className="text-beige/60 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="pt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-oliveGreen opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span>Connect with me</span>
                                <div className="w-8 h-[1px] bg-oliveGreen" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </>
    );
}
