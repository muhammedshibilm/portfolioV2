"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiHomeFill,
  RiUserFill,
  RiBookFill,
  RiProjectorFill,
  RiContactsBookFill,
} from "react-icons/ri";
import { usePathname } from "next/navigation";

const name = "shibil";

const buttons = [
  { name: "Home", target: "/" },
  { name: "Me", target: "/me" },
  { name: "Blog", target: "/blog" },
  { name: "Projects", target: "/projects" },
  { name: "Contact", target: "/contact" },
];

function firstCharUpper(str: string) {
  if (!str) {
    return "";
  }
  if (str == "/") {
    return "Home";
  } else {
    const value = str.slice(1);
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <nav className="text-beige z-50 w-screen text-md font-semibold">
      {/* Desktop Navigation */}
      <div className="w-full fixed z-40 hidden md:grid place-items-center">
        <ul className="flex gap-10 pt-5">
          {buttons.map((item, index) => (
            <motion.li
              variants={itemVariants}
              key={index}
              className={`relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-oliveGreen after:transition-all after:duration-300 hover:after:w-full ${
                pathname == item.target && " border-b-2  border-oliveGreen"
              }`}
            >
              <Link href={item.target}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 w-full flex justify-between items-center p-5 z-50 bg-darkBrown">
          {open && (
            <motion.ul
              variants={menuVariants}
              animate={open ? "open" : "closed"}
              initial="closed"
              className="grid grid-cols-3 w-screen gap-10 py-2 place-items-center "
            >
              {buttons.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.target}
                    className="flex items-center gap-1 text-oliveGreen font-semibold"
                  >
                    <div className="flex  flex-col items-center">
                      {item.name == "Home" && <RiHomeFill size={16} />}
                      {item.name == "Me" && <RiUserFill size={16} />}
                      {item.name == "Blog" && <RiBookFill size={16} />}
                      {item.name == "Projects" && <RiProjectorFill size={16} />}
                      {item.name == "Contact" && (
                        <RiContactsBookFill size={16} />
                      )}

                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}

          <span className="text-oliveGreen font-semibold text-lg">
            {!open && name}
          </span>
          <span>{!open && firstCharUpper(pathname.trim().toString())}</span>
          <motion.span
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            animate={{ scale: 1.1, rotate: open ? 90 : 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`right-5 bottom-5  border-4 p-2 rounded-full border-oliveGreen cursor-pointer ${
              open ? " fixed " : " static"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={16} /> : <FaBars size={16} />}
          </motion.span>
        </div>
      </div>
    </nav>
  );
}
