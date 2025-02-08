"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Development from "../../public/Development.svg";
import Design from "../../public/Desgin.svg";
import Cyber from "../../public/Cyber.png";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import TechExpCard from "../../components/TechExpCard";

export default function Page() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen container px-4   pt-20 md:mx-auto lg:px-[100px]">
      <h1 className=" text-4xl md:text-5xl font-extrabold text-oliveGreen pb-10">
        About me
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex items-center text-3xl font-bold relative">
          <motion.span
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <FaChevronLeft size={35} />
          </motion.span>
          <motion.div
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 15, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-[5px] h-[45px] bg-oliveGreen mx-2"
          ></motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            I&apos;m Shibil M
          </motion.span>
          <motion.span
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative left-2"
          >
            <FaChevronRight size={35} />
          </motion.span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-10 px-10 text-lg"
      >
        As a <span className="text-oliveGreen">Backend Engineer</span> and{" "}
        <span className="text-oliveGreen">Frontend Engineer</span> with a
        passion for building scalable systems, I&apos;ve dedicated my career to
        crafting efficient and reliable software solutions. My journey in
        technology started with a curiosity about how things work under the
        hood, which led me to specialize in backend development.
      </motion.p>
      <h1 className="mt-10 text-3xl font-semibold text-oliveGreen">
        Professional Experience
      </h1>
      {/* Professional exp cards */}
      <div className="pl-5 border-l-4 border-deepBrown relative mt-20">
        <div className="w-4 h-4 rounded-full bg-oliveGreen absolute -left-3 -top-4"></div>
        <div className="shadow-lg shadow-deepBrown px-6 pb-5 space-y-2 rounded-lg">
          <div className="flex flex-col md:flex-row  md:justify-between ">
            <div className="py-2">
              <h1 className="text-xl py-2 font-bold">Backend & Frontend Engineer</h1>
              <h2 className="text-md text-oliveGreen">Celestia</h2>
            </div>
            <p className="text-xs text-beige">2024 - Present </p>
          </div>
          <ul>
            <li>
              Developed and maintained backend services and frontend Services
            </li>
            <li>Optimized database performance and query efficiency</li>
            <li>Developed RESTful APIs for internal and external services</li>
          </ul>
          {/* tools */}
          <div className="pt-5 flex gap-5 flex-wrap">
            <span className="bg-deepBrown px-4 rounded-lg py-2 w-fit">
              FastApi
            </span>{" "}
            <span className="bg-deepBrown px-4 rounded-lg py-2 w-fit">
              React
            </span>{" "}
            <span className="bg-deepBrown px-4 rounded-lg py-2 w-fit">
              PostgreSQL
            </span>{" "}
            <span className="bg-deepBrown px-4 rounded-lg py-2 w-fit">
              Python
            </span>{" "}
            <span className="bg-deepBrown px-4 rounded-lg py-2 w-fit">
              TailwindCss
            </span>
          </div>
        </div>
      </div>

      {/* Technical Expertise */}
      <h1 className="mt-10 text-3xl font-semibold text-oliveGreen">
      Technical Expertise
      </h1>
       <div className="grid grid-cols-1 mt-5  md:grid-cols-2 gap-10 place-items-center">
       <TechExpCard/>
       </div>
      <div className="mt-10  space-y-20 ">
        <h1 className="text-3xl font-bold text-oliveGreen">
          I can help you with ...
        </h1>
        {/* datas */}
        <div className="space-y-5 grid md:grid-cols-2 gap-2">
          <div className="space-y-5">
          <h1 className="border-b-2 border-yellow-500 pb-2 w-3/4 text-3xl font-bold">
            01.
          </h1>
          <h1 className="text-yellow-500 text-3xl font-semibold space-x-3">
            <span>Development</span> <span> &#123;</span>
          </h1>
          <p className="text-xl py-6  text-white">
            I specialize in full-stack development using React, Next.js,
            FastAPI, Django, PostgreSQL, and MongoDB. I build scalable,
            high-performance applications with a focus on security, efficiency,
            and modern design patterns.
          </p>
          </div>
          <div className="w-full flex justify-center ">
            <Image src={Development} alt="development image" />
          </div>
        </div>

        <div className="space-y-5 grid md:grid-cols-2 gap-2">
         <div className="space-y-5 md:order-2">
         <h1 className="border-b-2 border-rose-500 pb-2 w-3/4 text-3xl font-bold">
            02. 
          </h1>
          <h1 className="text-rose-500 text-3xl font-semibold space-x-3">
            <span>Cybersecurity</span> <span> &#123;</span>
          </h1>
          <p className="text-xl py-6  text-white">
          I have experience in penetration testing and ethical hacking, using tools such as Nmap, Hydra, SQLMap, Wireshark, Burp Suite, BeEF, SET Toolkit, and Metasploit. I can help with network security, vulnerability assessment, and ethical hacking practices to secure web applications and infrastructures.
          </p>
         </div>
          <div className="w-full flex justify-center  md:order-1  ">
            <Image src={Cyber} alt="Cyber image" className="w-72 h-72" />
          </div>
        </div>

        <div className="space-y-5 grid md:grid-cols-2">
          <div className="space-y-5">
          <h1 className="border-b-2 border-cyan-500 pb-2 w-3/4 text-3xl font-bold">
            03.
          </h1>
          <h1 className="text-cyan-500 text-3xl font-semibold space-x-3">
            <span>Design</span> <span> &#123;</span>
          </h1>
          <p className="text-xl py-6  text-white">
          I create responsive and user-friendly interfaces using Figma, Tailwind CSS, Bootstrap, and modern UI/UX principles. I ensure seamless user experiences by combining design aesthetics with functional usability.
          </p>
          </div>
          <div className="w-full flex justify-center ">
            <Image src={Design} alt="development image" />
          </div>
        </div>
      </div>
      <div className="h-28">

      </div>
    </main>
    </>
  );
}
