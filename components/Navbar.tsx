"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

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
    { name: "Home", target: "/" },
    { name: "Me", target: "/me" },
    { name: "Blog", target: "/blog" },
    { name: "Projects", target: "/projects" },
    { name: "Contact", target: "/contact" },
  ];

  return (
    <nav className="text-beige z-50 w-screen text-md font-semibold">
      {/* Desktop Navigation */}
      <div className="w-full fixed z-40 hidden md:grid place-items-center">
        <ul className="flex gap-10 pt-5">
          {Links.map((item, index) => (
            <li
              key={index}
              className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-oliveGreen after:transition-all after:duration-300 hover:after:w-full"
            >
              <Link href={item.target}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Menu Button */}
        <div className="w-full flex justify-end pr-5 pt-5 fixed z-50">
          <motion.span
            initial={{ scale: 1 }}
            whileTap={{ scale: 1.02 }}
            className="border-4 p-2 rounded-full border-oliveGreen"
          >
            {open ? (
              <FaTimes size={30} onClick={() => setOpen(!open)} className="cursor-pointer" />
            ) : (
              <FaBars size={30} onClick={() => setOpen(!open)} className="cursor-pointer" />
            )}
          </motion.span>
        </div>

        {/* Full-Screen Overlay */}
        {open && (
          <motion.div
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-deepBrown z-40 flex flex-col justify-center items-center transition-all duration-200"
          >
            <motion.ul className="flex flex-col gap-14 text-center">
              {Links.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="text-xl relative w-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-oliveGreen after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => setOpen(false)} // Close menu on link click
                >
                  <Link href={item.target}>{item.name}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
