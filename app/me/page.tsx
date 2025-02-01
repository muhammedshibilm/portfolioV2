"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import RotatingDiv from "../../components/RotatingDiv";

export default function Page() {
  return (
    <main className="min-h-screen container px-2  pt-20 md:mx-auto lg:px-[200px]">
      <h1 className="text-4xl font-extrabold text-oliveGreen pb-10">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="mt-10 px-10 text-lg"
      >
        As a <span className="text-oliveGreen">Backend Engineer</span> and{" "}
        <span className="text-oliveGreen">Frontend Engineer</span> with a
        passion for building scalable systems, I&apos;ve dedicated my career to
        crafting efficient and reliable software solutions. My journey in
        technology started with a curiosity about how things work under the
        hood, which led me to specialize in backend development.
      </motion.p>
      <h1 className="mt-10 text-2xl font-semibold text-oliveGreen">
        Professional Experience
      </h1>
      {/* Professional exp cards */}
      <div className="pl-5 border-l-4 border-deepBrown relative mt-20">
        <div className="w-4 h-4 rounded-full bg-oliveGreen absolute -left-3 -top-4"></div>
        <div className="shadow-lg shadow-deepBrown px-6 py-5 space-y-2 rounded-lg">
        <div className="flex flex-col md:flex-row  md:justify-between ">
            <div>
              <h1 className="text-lg font-bold">Backend & Frontend Engineer</h1>
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

      <h1 className="mt-10  text-center text-4xl text-oliveGreen font-bold relative">Technical Expertise</h1>
      <RotatingDiv/>
    </main>
  );
}
