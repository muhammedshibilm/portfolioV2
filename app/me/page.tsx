"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Service from "../../components/Services";
import Tools from "../../components/Tools";
import Proexp from "../../components/Proexp";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen container px-4 pt-5   md:pt-20 md:mx-auto lg:px-[100px]">
        <h1 className=" text-4xl md:text-5xl font-extrabold text-oliveGreen pb-10 text-center md:text-left">
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
          passion for building scalable systems, I&apos;ve dedicated my career
          to crafting efficient and reliable software solutions. My journey in
          technology started with a curiosity about how things work under the
          hood, which led me to specialize in backend development.
        </motion.p>

        {/* services */}

        <Service />

        {/* Tools */}

        <Tools />

        {/* Professional exp */}

        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
          className="mt-10  text-3xl font-semibold text-oliveGreen"
        >
          Professional Experience
        </motion.h1>
        <Proexp />
      </main>
    </>
  );
}
