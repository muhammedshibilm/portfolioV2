"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
    closed: {
      opacity: 0,
      x: -100,
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.2 },
    },
  };

  const Links = [
    { "name": "Home", "target": "/" },
    { "name": "Me", "target": "/me" },
    { "name": "Blog", "target": "/blog" },
    { "name": "Projects", "target": "/projects" },
    { "name": "Contact", "target": "/contact" },
  ]

  return (
    <nav className="text-beige  z-50 w-screen text-md font-semibold ">
      {/* above mobile  */}
      <div className="w-full fixed z-40 hidden md:grid place-items-center">
        <ul className="flex  gap-10 pt-5">
          {
            Links.map((item, index) => {
              return (
                <li key={index} className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0  after:bg-oliveGreen after:transition-all after:duration-300 hover:after:w-full"><Link href={item.target}>{item.name}</Link></li>
              )
            })
          }
        </ul>
      </div>
      {/* mobile screen */}
      <div className={` h-full w-full  fixed z-40  ${open ? "bg-deepBrown transition-all duration-200" : ""}   md:hidden `}>

        <div  className="w-full flex justify-end pr-5 pt-5">
          <motion.span 
            initial={{
              scale: 1
            }}
            whileTap={{
              scale: 1.02
            }}
          
          className="border-4 p-2 rounded-full border-oliveGreen">
              {
                open ? <FaTimes size={30} onClick={() => setOpen(!open)} className="cursor-pointer" />: <FaBars size={30} onClick={() => setOpen(!open)} className="cursor-pointer" />
              }
          </motion.span>
        </div>

        <div className="flex flex-col justify-center  h-full">
          {
            open && <motion.ul
              initial="closed"
              animate={open ? "open" : "closed"}
              variants={menuVariants}
              className="flex flex-col justify-center pl-24 flex-1 gap-14 pt-5"
            >
              {Links.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className=" text-xl relative w-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-oliveGreen 
                        after:transition-all after:duration-300 hover:after:w-full"
                >
                  <Link href={item.target}>{item.name}</Link>
                </motion.li>
              ))}
            </motion.ul>

          }
        </div>


      </div>
    </nav>
  )
}