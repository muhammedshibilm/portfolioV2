"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Plus, Trash2, Save, Edit2, X, Lock, LogIn, Search, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Admin3D from "../../components/Admin3D";
import { IconMap, getIconNames } from "../../utils/iconMap";

type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
};

type EditingProject = Project & { index: number };

type SkillItem = {
    name: string;
    icon: string;
};

type SkillCategory = Record<string, SkillItem[]>;

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // Project Editing State
    const [editingProject, setEditingProject] = useState<EditingProject | null>(null);

    // Skill Editing State
    const [editingSkill, setEditingSkill] = useState<{ categoryIndex: number, itemIndex: number, item: SkillItem, categoryName: string } | null>(null);
    const [newSkillCategory, setNewSkillCategory] = useState<string>("");
    const [iconSearch, setIconSearch] = useState("");
    const [showIconPicker, setShowIconPicker] = useState(false);

    const [activeTab, setActiveTab] = useState("projects");

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                setLoginError("Invalid credentials");
                setLoading(false);
            }
        } catch {
            setLoginError("An error occurred");
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projRes, skillRes] = await Promise.all([
                fetch("/api/projects"),
                fetch("/api/skills"),
            ]);
            const projData = await projRes.json();
            const skillData = await skillRes.json();
            setProjects(projData);
            setSkills(skillData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Projects Handlers ---
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

    // --- Skills Handlers ---
    const handleSaveSkills = async (updatedSkills: SkillCategory[]) => {
        const res = await fetch("/api/skills", {
            method: "POST",
            body: JSON.stringify(updatedSkills),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            setSkills(updatedSkills);
            setEditingSkill(null);
        }
    };

    const handleAddSkill = (categoryIndex: number) => {
        const newSkills = [...skills];
        const categoryName = Object.keys(newSkills[categoryIndex])[0];
        newSkills[categoryIndex][categoryName].push({ name: "New Skill", icon: "Globe" });
        handleSaveSkills(newSkills);
    };

    const handleUpdateSkill = () => {
        if (!editingSkill) return;
        const newSkills = [...skills];
        const { categoryIndex, itemIndex, item, categoryName } = editingSkill;
        newSkills[categoryIndex][categoryName][itemIndex] = item;
        handleSaveSkills(newSkills);
    };

    const handleDeleteSkill = (categoryIndex: number, itemIndex: number) => {
        const newSkills = [...skills];
        const categoryName = Object.keys(newSkills[categoryIndex])[0];
        newSkills[categoryIndex][categoryName] = newSkills[categoryIndex][categoryName].filter((_, i) => i !== itemIndex);
        handleSaveSkills(newSkills);
    };

    const handleAddCategory = () => {
        if (!newSkillCategory.trim()) return;
        const newSkills = [...skills, { [newSkillCategory]: [] }];
        handleSaveSkills(newSkills);
        setNewSkillCategory("");
    };

    const handleDeleteCategory = (index: number) => {
        if (!confirm("Are you sure you want to delete this category and all its skills?")) return;
        const newSkills = skills.filter((_, i) => i !== index);
        handleSaveSkills(newSkills);
    };

    const filteredIcons = getIconNames().filter(name => name.toLowerCase().includes(iconSearch.toLowerCase()));


    if (!isAuthenticated) {
        return (
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <Admin3D />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="z-10 glass-card p-10 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl shadow-oliveGreen/10"
                >
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-full bg-oliveGreen/10 border border-oliveGreen/20">
                            <Lock className="text-oliveGreen" size={32} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Admin Access</h1>
                    <p className="text-center text-beige/40 text-sm mb-8">Enter your credentials to continue</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-oliveGreen ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-oliveGreen/50 transition-all text-beige placeholder:text-white/10"
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-oliveGreen ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-oliveGreen/50 transition-all text-beige placeholder:text-white/10"
                                placeholder="Enter password"
                            />
                        </div>

                        {loginError && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                            >
                                {loginError}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-oliveGreen text-white font-bold rounded-xl hover:bg-oliveGreen/80 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-oliveGreen/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center relative">
            <Admin3D />
            <div className="z-10 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oliveGreen"></div>
        </div>
    );

    return (
        <div className="relative min-h-screen pb-32">
            <Admin3D />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] -z-10" />

            <Navbar />
            <section className="container mx-auto px-6 pt-32 max-w-6xl relative z-10">
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
                            className="w-full py-4 glass border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 hover:border-oliveGreen/50 transition-all group hover:bg-oliveGreen/5"
                        >
                            <Plus className="text-oliveGreen group-hover:scale-110 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-xs text-oliveGreen">Add New Project</span>
                        </button>

                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={index}
                                    className="glass p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start gap-6 group hover:border-oliveGreen/20 transition-all"
                                >
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
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="glass p-8 rounded-3xl border border-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <p className="text-beige/40 text-sm uppercase tracking-widest font-bold">Manage Tech Stack</p>
                            <div className="flex gap-2 w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="New Category Name..."
                                    value={newSkillCategory}
                                    onChange={(e) => setNewSkillCategory(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-oliveGreen flex-1 md:w-48"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="p-2 bg-oliveGreen text-white rounded-xl hover:bg-oliveGreen/80 transition-all flex items-center justify-center"
                                    title="Add CategoryCluster"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            {skills.map((category, idx) => {
                                const categoryName = Object.keys(category)[0];
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={idx}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-oliveGreen font-bold uppercase tracking-widest text-xs flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                            {categoryName}
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleAddSkill(idx)}
                                                    className="p-1.5 hover:bg-oliveGreen/20 text-oliveGreen rounded-md transition-colors"
                                                    title="Add Skill"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(idx)}
                                                    className="p-1.5 hover:bg-red-500/20 text-red-500 rounded-md transition-colors"
                                                    title="Delete Category"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </h4>
                                        <div className="flex gap-3 flex-wrap">
                                            {category[categoryName].map((item, i) => {
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                const Icon = (IconMap[item.icon] || Globe) as any;
                                                return (
                                                    <div key={i} className="group relative">
                                                        <span
                                                            onClick={() => {
                                                                setEditingSkill({ categoryIndex: idx, itemIndex: i, item, categoryName });
                                                                setShowIconPicker(false);
                                                            }}
                                                            className="px-3 py-2 glass rounded-lg border border-white/5 text-sm hover:border-oliveGreen/50 hover:bg-oliveGreen/10 transition-all cursor-pointer flex items-center gap-2"
                                                        >
                                                            <Icon className="text-oliveGreen" size={16} />
                                                            {item.name}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteSkill(idx, i);
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 hover:scale-100"
                                                        >
                                                            <X size={10} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
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
                            className="relative glass-card border border-white/10 w-full max-w-2xl p-8 rounded-[2.5rem] z-10 box-shadow-2xl"
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

            {/* Edit Skill Modal */}
            <AnimatePresence>
                {editingSkill && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingSkill(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative glass-card border border-white/10 w-full max-w-md p-8 rounded-[2.5rem] z-10 box-shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold tracking-tight">Edit Skill</h2>
                                <button onClick={() => setEditingSkill(null)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                    <X />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Name</label>
                                    <input
                                        type="text"
                                        value={editingSkill.item.name}
                                        onChange={(e) => setEditingSkill({ ...editingSkill, item: { ...editingSkill.item, name: e.target.value } })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-oliveGreen transition-all"
                                    />
                                </div>

                                <div className="space-y-2 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-oliveGreen">Icon</label>

                                    <div
                                        onClick={() => setShowIconPicker(!showIconPicker)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-oliveGreen/50 transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            {IconMap[editingSkill.item.icon] ?
                                                <span className="text-oliveGreen text-xl">{(() => {
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    const I = IconMap[editingSkill.item.icon] as any; return <I />
                                                })()}</span>
                                                : <span className="text-red-400">?</span>
                                            }
                                            {editingSkill.item.icon}
                                        </span>
                                        <Edit2 size={14} className="opacity-50" />
                                    </div>

                                    {showIconPicker && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl z-20 max-h-60 overflow-hidden flex flex-col"
                                        >
                                            <div className="relative mb-3">
                                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                                <input
                                                    type="text"
                                                    placeholder="Search icons..."
                                                    value={iconSearch}
                                                    onChange={(e) => setIconSearch(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-oliveGreen"
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1">
                                                {filteredIcons.map(iconName => {
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    const Icon = IconMap[iconName] as any;
                                                    return (
                                                        <button
                                                            key={iconName}
                                                            onClick={() => {
                                                                setEditingSkill({ ...editingSkill, item: { ...editingSkill.item, icon: iconName } });
                                                                setShowIconPicker(false);
                                                            }}
                                                            className={`p-2 rounded-lg flex flex-col items-center gap-1 hover:bg-white/10 transition-colors ${editingSkill.item.icon === iconName ? 'bg-oliveGreen/20 border border-oliveGreen/30' : ''}`}
                                                            title={iconName}
                                                        >
                                                            <Icon className="text-xl" />
                                                            <span className="text-[9px] w-full truncate text-center opacity-50">{iconName.replace(/Fa|Si|Tb|Lu/g, '')}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <button
                                    onClick={handleUpdateSkill}
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
