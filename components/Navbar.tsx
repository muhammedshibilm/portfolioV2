"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiHomeFill,
  RiUserFill,
  RiBookFill,
  RiProjectorFill,
  RiContactsBookFill,
} from "react-icons/ri";
import { usePathname } from "next/navigation";

const buttons = [
  { name: "Home", target: "/" },
  { name: "Me", target: "/me" },
  { name: "Blog", target: "/blog" },
  { name: "Projects", target: "/projects" },
  { name: "Contact", target: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <motion.div
        variants={navVariants}
        initial="initial"
        animate="animate"
        className={`mx-auto max-w-5xl rounded-full transition-all duration-300 ${scrolled ? "glass border border-white/10 px-8 py-3" : "px-4 py-4"
          }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:text-oliveGreen transition-colors">
            SHIBIL<span className="text-oliveGreen">.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {buttons.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.target}
                  className={`text-sm tracking-wide transition-all duration-300 hover:text-oliveGreen ${pathname === item.target ? "text-oliveGreen font-bold" : "text-beige/80"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-oliveGreen p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {buttons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.target}
                  onClick={() => setOpen(false)}
                  className={`text-3xl font-bold transition-colors ${pathname === item.target ? "text-oliveGreen" : "text-beige"
                    }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
