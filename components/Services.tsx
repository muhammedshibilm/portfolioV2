"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Service() {
  const [services] = useState([
    "Frontend Development",
    "Responsive Web Development",
    "User Interface (UI) Development",
    "Interactive Web Components",
    "Performance Optimization",
    "Testing and Debugging",
    "Progressive Web App (PWA) Development",
    "SEO Optimization for Websites",
    "Next.js & React Development",
    "Full-Stack Development (FastAPI & PostgreSQL)",
  ]);

  // In a real app, we might fetch these from an API too.
  // For now, they are static but I'll add a fetch placeholder.
  /*
  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);
  */

  return (
    <div className="py-12">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <div className="flex-1 h-[1px] bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass card-3d p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-oliveGreen/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-oliveGreen/10 flex items-center justify-center group-hover:bg-oliveGreen/20 transition-colors">
              <Check className="text-oliveGreen" size={20} />
            </div>
            <span className="text-lg font-medium text-beige/90">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}