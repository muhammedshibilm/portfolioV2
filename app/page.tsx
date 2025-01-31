"use client";

import Image from "next/image";
import profile from "../public/profile.png";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative top-8   text-beige z-10">
      <main className="grid place-items-center   h-[95vh]">
        <div className="w-72 md:w-96  flex flex-col justify-center items-center">
          <Image src={profile} alt="avathar" />
          <div className="content relative top-5   ">
            <span className="text-oliveGreen">
              Hi, Im{" "}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                👋
              </motion.span>
            </span>
            <h1 className="text-5xl font-extrabold">Shibil M</h1>
          </div>
          <h2 className=" text-center  pt-10   w-screen md:w-[600px]">
            I'm an Engineer who loves turning complex ideas into efficient
            software solutions.{" "}
          </h2>
          <Link href={"/me"}> <button className=" border-2 mt-6 border-beige  text-beige py-2 px-4 rounded-lg   hover:bg-oliveGreen ">
            wanna know more about ?
          </button></Link>
        </div>
      </main>
      <section className="h-screen">
        <h1>Explore</h1>
      </section>
    </div>
  );
}
