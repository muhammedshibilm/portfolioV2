"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

// In a real app, this data would also come from an API.
// For now, I'll keep it as a static array but set up for easy transition.
const staticData = [
  {
    title: "Backend & Frontend Engineer",
    organization: "Celestia",
    year: "Dec 2024 - Present",
    descriptions: [
      "Developed and maintained backend services and frontend Services",
      "Optimized database performance and query efficiency",
      "Developed RESTful APIs for internal and external services",
    ],
    tools: ["FastApi", "React", "Postgresql", "Python", "Tailwind"],
  },
];

const Proexp = () => {
  const [data, setData] = useState(staticData);

  /*
  useEffect(() => {
    fetch("/api/experience")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  */

  return (
    <div className="space-y-12">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative pl-12 pb-12 border-l border-white/10 last:pb-0"
        >
          {/* Timeline Dot */}
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-oliveGreen border-4 border-background shadow-[0_0_15px_rgba(138,144,100,0.5)]"></div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Briefcase size={16} className="text-oliveGreen" />
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
              </div>
              <p className="text-oliveGreen font-semibold tracking-wide uppercase text-xs">
                {item.organization}
              </p>
            </div>
            <div className="glass px-4 py-2 rounded-full border border-white/5 whitespace-nowrap">
              <span className="text-sm font-medium text-beige/60">{item.year}</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <ul className="space-y-4">
              {item.descriptions.map((desc, i) => (
                <li key={i} className="flex gap-3 text-beige/70 leading-relaxed">
                  <span className="text-oliveGreen mt-1.5">•</span>
                  {desc}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 flex-wrap pt-4">
              {item.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-oliveGreen/5 border border-oliveGreen/10 text-[11px] font-bold text-oliveGreen tracking-widest uppercase"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Proexp;
