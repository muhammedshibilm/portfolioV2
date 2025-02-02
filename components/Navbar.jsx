"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";


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
    <nav className="text-beige fixed z-50 w-screen text-md font-semibold ">
      {/* above mobile  */}
      <div className="w-full hidden md:grid place-items-center">
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
      <div className={`w-full    flex      ${open ? "justify-around bg-darkBrown h-screen overflow-y-hidden fixed " : "justify-end relative"}  md:hidden`}>

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
                className="relative w-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-oliveGreen 
                        after:transition-all after:duration-300 hover:after:w-full"
              >
                <Link href={item.target}>{item.name}</Link>
              </motion.li>
            ))}
          </motion.ul>

        }

        <div className="  pt-5 pr-5 w-[95vw] flex justify-end ">
          <div className={`icon p-2 rounded-lg hover:bg-oliveGreen space-y-2 cursor-pointer w-fit h-fit  ${open ? "bg-none     " : "  rounded-lg "}`}
            onClick={() => setOpen(!open)}>
            <div className={`w-8 bg-beige h-1 rounded-lg transition-all duration-500 ${open ? "rotate-45 translate-y-3 " : "rotate-0"}`}></div>
            <div className={`bg-beige  h-1 rounded-lg transition-all duration-300 ${open ? "w-0 opacity-0" : "w-8 opacity-100"}`} ></div>
            <div className={`w-8 bg-beige  h-1 rounded-lg transition-all duration-500 ${open ? "-rotate-45 -translate-y-2.5" : "rotate-0"}`} ></div>
          </div>
        </div>
      </div>
    </nav>
  )
}