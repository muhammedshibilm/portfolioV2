import {
    FaReact, FaPython, FaNodeJs, FaGithub, FaLinux, FaMobileAlt, FaMapMarkedAlt
} from "react-icons/fa";
import {
    SiNextdotjs, SiFastapi, SiTailwindcss, SiDjango, SiPostgresql,
    SiTypescript, SiLangchain, SiHuggingface, SiMongodb, SiMysql,
    SiRedis, SiDocker, SiFlutter, SiDart, SiKalilinux, SiGreensock
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { ShieldCheck, Smartphone, Globe, Database, Terminal, Cpu } from "lucide-react";
import { TbApi, TbBrandThreejs } from "react-icons/tb";
import { LuWebhook } from "react-icons/lu";

export const IconMap: Record<string, React.ElementType> = {
    // Frontend
    FaReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    TbBrandThreejs,
    SiGreensock,

    // Backend
    SiFastapi,
    SiDjango,
    FaNodeJs,
    FaPython,
    TbApi,
    LuWebhook,

    // Database
    SiPostgresql,
    SiMongodb,
    SiMysql,
    SiRedis,

    // Mobile
    SiFlutter,
    SiDart,
    FaMobileAlt,
    FaMapMarkedAlt,

    // Tools
    FaLinux,
    FaGithub,
    SiKalilinux,
    SiDocker,
    VscVscode,

    // AI/ML
    SiLangchain,
    SiHuggingface,

    // Aliases for compatibility with techexpdata.json
    SiKali: SiKalilinux,
    TbBrandGreensock: SiGreensock,

    // General/Fallback
    ShieldCheck,
    Smartphone,
    Globe,
    Database,
    Terminal,
    Cpu
};

export const getIcon = (iconName: string): React.ReactNode => {
    const IconComponent = IconMap[iconName] as React.ComponentType<any>;

    if (!IconComponent) {
        return <Globe />;
    }

    return <IconComponent key={iconName} />;
};

export const getIconNames = () => Object.keys(IconMap).sort();
