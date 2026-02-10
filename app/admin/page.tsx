"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Plus, Trash2, Save, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
};

type EditingProject = Project & { index: number };

type SkillCategory = Record<string, string[]>;

export default function AdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<EditingProject | null>(null);
    const [activeTab, setActiveTab] = useState("projects");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [projRes, skillRes] = await Promise.all([
            fetch("/api/projects"),
            fetch("/api/skills"),
        ]);
        const projData = await projRes.json();
        const skillData = await skillRes.json();
        setProjects(projData);
        setSkills(skillData);
        setLoading(false);
    };

    const handleSaveProjects = async (updatedProjects: Project[]) => {
        const res = await fetch("/api/projects", {
            method: "POST",
            body: JSON.stringify(updatedProjects),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            setProjects(updatedProjects);
            setEditingProject(null);
        }
    };

    const handleDeleteProject = (index: number) => {
        const newProjects = projects.filter((_, i) => i !== index);
        handleSaveProjects(newProjects);
    };

    const handleUpdateProject = (index: number, updatedProject: Project) => {
        const newProjects = [...projects];
        newProjects[index] = updatedProject;
        handleSaveProjects(newProjects);
    };

    const handleAddProject = () => {
        const newProject = {
            title: "New Project",
            description: "Project description...",
            tags: ["Tech"],
            link: "https://github.com",
            image: "/projects/default.jpg",
        };
        handleSaveProjects([...projects, newProject]);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oliveGreen"></div>
        </div>
    );

    return (
        <div className="min-h-screen pb-32">
            <Navbar />
            <section className="container mx-auto px-6 pt-32 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Admin <span className="text-oliveGreen">Dashboard.</span>
                    </h1>
                    <div className="flex glass p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab("projects")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "projects" ? "bg-oliveGreen text-white" : "hover:bg-white/5"}`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab("skills")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "skills" ? "bg-oliveGreen text-white" : "hover:bg-white/5"}`}
                        >
                            Skills
                        </button>
                    </div>
                </div>

                {activeTab === "projects" ? (
                    <div className="space-y-6">
                        <button
                            onClick={handleAddProject}
                            className="w-full py-4 glass border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 hover:border-oliveGreen/50 transition-all group"
                        >
                            <Plus className="text-oliveGreen group-hover:scale-110 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-xs">Add New Project</span>
                        </button>

                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, index) => (
                                <div key={index} className="glass p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start gap-6 group">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                                        <p className="text-beige/60 text-sm mb-4 line-clamp-2">{proj.description}</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {proj.tags.map((tag, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-beige/40 border border-white/5 uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingProject({ index, ...proj })}
                                            className="p-3 glass border border-white/5 rounded-xl hover:bg-oliveGreen hover:text-white transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(index)}
                                            className="p-3 glass border border-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="glass p-8 rounded-3xl border border-white/5">
                        <p className="text-beige/40 text-sm mb-8 uppercase tracking-widest font-bold">Manage Tech Stack</p>
                        {/* Skills editing would go here - simplified for space */}
                        <div className="grid gap-8">
                            {skills.map((category, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h4 className="text-oliveGreen font-bold uppercase tracking-widest text-xs">
                                        {Object.keys(category)[0]}
                                    </h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {Object.values(category)[0].map((item, i) => (
                                            <span key={i} className="px-3 py-1 glass rounded-lg border border-white/5 text-sm">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 pt-8 border-t border-white/5 text-xs text-beige/20 text-center uppercase tracking-widest">
                            Skill editing is coming in the next patch.
                        </p>
                    </div>
                )}
            </section>

            {/* Edit Project Modal */}
            <AnimatePresence>
                {editingProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingProject(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative glass-card border border-white/10 w-full max-w-2xl p-8 rounded-[2.5rem] z-10"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
                                <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                    <X />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Title</label>
                                    <input
                                        type="text"
                                        value={editingProject.title}
                                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-oliveGreen transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Description</label>
                                    <textarea
                                        rows={4}
                                        value={editingProject.description}
                                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-oliveGreen transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Link</label>
                                        <input
                                            type="text"
                                            value={editingProject.link}
                                            onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-oliveGreen transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={editingProject.tags.join(", ")}
                                            onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",").map(t => t.trim()) })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-oliveGreen transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleUpdateProject(editingProject.index, {
                                        title: editingProject.title,
                                        description: editingProject.description,
                                        tags: editingProject.tags,
                                        link: editingProject.link,
                                        image: editingProject.image
                                    })}
                                    className="w-full py-4 bg-oliveGreen text-white font-bold rounded-2xl hover:bg-oliveGreen/80 transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
