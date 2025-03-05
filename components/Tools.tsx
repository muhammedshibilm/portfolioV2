import { FaReact, FaPython, FaNodeJs, FaKey, FaGithub } from "react-icons/fa";
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

export default function Tools() {
  const tools = [
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "React.js", icon: <FaReact /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "Django", icon: <SiDjango /> },
    { name: "Python", icon: <FaPython /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Javascript", icon: <SiJavascript /> },
    { name: "Nodejs", icon: <FaNodeJs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "JWT Authentication", icon: <FaKey /> },
    { name: "LangChain", icon: <SiLangchain /> },
    { name: "Hugging Face", icon: <SiHuggingface /> },
    { name: "Git", icon: <FaGithub /> },
    { name: "Vs Code", icon: <VscVscode /> },
  ];

  return (
    <div className="p-6  text-white rounded-lg shadow-lg">
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: {  duration: 1 },
        }}
        viewport={{ once: true }}
        className="my-10 text-3xl font-semibold text-oliveGreen  text-center"
      >
        Tech Stack & Tools
      </motion.h1>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 1 },
        }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center"
      >
        {tools.map((tool, index) => (
          <motion.div
          initial={{
            scale:1
          }}

          whileHover={{
            scale: 1.04
          }}
            key={index}
            className="flex flex-col items-center p-4 bg-[#282828]  rounded-lg shadow-md  transition"
          >
            <div className="text-4xl text-oliveGreen mb-2">{tool.icon}</div>
            <p className="text-sm font-medium">{tool.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
