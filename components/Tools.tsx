"use client";

import { useState, useEffect } from "react";
import { FaReact, FaPython, FaNodeJs, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiFastapi,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiLangchain,
  SiHuggingface,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { ShieldCheck, Smartphone } from "lucide-react";

export default function Tools() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes("next")) return <SiNextdotjs />;
    if (n.includes("react")) return <FaReact />;
    if (n.includes("fastapi")) return <SiFastapi />;
    if (n.includes("django")) return <SiDjango />;
    if (n.includes("python")) return <FaPython />;
    if (n.includes("postgres")) return <SiPostgresql />;
    if (n.includes("node")) return <FaNodeJs />;
    if (n.includes("typescript")) return <SiTypescript />;
    if (n.includes("tailwind")) return <SiTailwindcss />;
    if (n.includes("auth")) return <ShieldCheck />;
    if (n.includes("flutter") || n.includes("dart") || n.includes("mobile")) return <Smartphone />;
    if (n.includes("langchain")) return <SiLangchain />;
    if (n.includes("hugging")) return <SiHuggingface />;
    if (n.includes("git")) return <FaGithub />;
    if (n.includes("code") || n.includes("vs")) return <VscVscode />;
    return <FaReact />; // Default
  };

  // Flatten skills into tools format
  const tools = skills.flatMap(category => {
    const catName = Object.keys(category)[0];
    return category[catName].map(name => ({
      name,
      icon: getIcon(name),
      category: catName
    }));
  });

  if (loading) return null;

  return (
    <div className="py-12">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
        <div className="flex-1 h-[1px] bg-white/10"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 flex flex-col items-center gap-3 text-center group"
          >
            <div className="text-4xl text-beige/40 group-hover:text-oliveGreen transition-colors duration-300">
              {tool.icon}
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">{tool.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-beige/30 font-medium">
                {tool.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
