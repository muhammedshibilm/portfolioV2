"use client";

import Image from "next/image";
import profile from "../public/profile.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import exploredata from "../db/exploredata.json";
import Navbar from "../components/Navbar";

export default function Page() {
  const containerVariants = {
    initial: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3 } },
  };
  
  const textContainer = {
    initial: { scale: 1 }, 
    hover: { scale: 1.5, transition: { duration: 0.3 } },
  };
  
  const colorContiner = {
    initial: { color: "#d8cfbc" }, 
    hover: { color: "#292313", transition: { duration: 0.3 } }, 
  };
  

  return (
   <>
   <Navbar />

   <div className="relative top-8   text-beige z-10 container mx-auto ">
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
            I&apos;m an Engineer who loves turning complex ideas into efficient
            software solutions.{" "}
          </h2>
          <Link href={"/me"}>
            {" "}
            <button className=" border-2 mt-6 border-beige  text-beige py-2 px-4 rounded-lg   hover:bg-oliveGreen ">
              wanna know more about ?
            </button>
          </Link>
        </div>
      </main>
      <section className="py-20 px-10  md:container md:mx-auto">
        <h1 className="text-2xl  font-bold">Explore</h1>
        <div className="grid  pt-10 gap-10 h-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
          {exploredata.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
              <motion.div
                variants={containerVariants}
                initial="initial"
                whileHover="hover"
                className="bg-darkBrown rounded-lg  cursor-pointer w-full"
              >

                  <div className="text-2xl text-center font-extrabold h-full py-32 ">
                <motion.h1
                  variants={textContainer}
                  
                >
                  {item.name}
                </motion.h1>
                </div>
                <div className="bg-oliveGreen mt-0  py-2 px-6">
                  <motion.h1
                    variants={colorContiner}
                    className="flex justify-between font-bold text-lg"
                  >
                    <span>{item.name}</span>
                    <span className="hover:text-darkBrown">
                      <FaArrowRight size={18} />
                    </span>
                  </motion.h1>
                  <h1 className="">{item.description}</h1>
                </div>
              </motion.div>
            </Link>
            
            );
          })}
        </div>
      </section>
    </div>
   </>
  );
}
