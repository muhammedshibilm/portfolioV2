"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getIcon } from "../utils/iconMap";

type SkillItem = {
  name: string;
  icon: string;
};

type SkillCategory = Record<string, SkillItem[]>;

export default function Tools() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
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

  // Flatten skills into tools format
  const tools = skills.flatMap(category => {
    const catName = Object.keys(category)[0];
    const items = category[catName] || [];
    return items.map((item: SkillItem): { name: string; icon: React.ReactNode; category: string } => ({
      name: item.name,
      icon: getIcon(item.icon),
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
            className="glass-card card-3d p-6 flex flex-col items-center gap-3 text-center group"
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
