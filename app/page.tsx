import Image from "next/image";
import profile from "../public/profile.png";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="relative top-8  flex justify-center items-center text-beige z-10">
      <div className="w-72 md:w-96">
        <Image src={profile} alt="avathar" />
        <div className="content relative top-5">
          <span>
            Hi, Im{" "}
            <motion.div
              className="inline-block"
              animate={{ rotate: [0, 20, -20, 20, -20, 0] }} // Waving effect
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }} // Infinite loop
            >
              👋
            </motion.div>
          </span>
        </div>
      </div>
    </div>
  );
}
