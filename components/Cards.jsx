"use client";
import { CgMail } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { LiaGithub, LiaLinkedin } from "react-icons/lia";
import datas from "../db/contact.json";
import { delay, motion } from "framer-motion";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { useState } from "react";

export default function Cards() {
    const icons = {
        LinkedIn: <LiaLinkedin size={60} className="text-beige" />,
        Twitter: <FaXTwitter size={60} className="text-beige" />,
        GitHub: <LiaGithub size={60} />,
        Mail: <CgMail size={60} className="text-beige" />,
    };

    const iconsSelector = (itemname) => icons[itemname] || null;

    const variants = {
        visible: i => ({
            opacity: 1,
            y: 0,  
            scale: 1, 
            transition: {
                delay: i * 0.2,
                duration: 0.6, 
                ease: "easeInOut",
            },
        
        }),

        hidden: {
            opacity: 0,
            y: 100,  
            scale: 0.98, 
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            }
        }
    };

    return (
        datas.map((items, index) => {

            const [isHovered, setIsHovered] = useState(false);

            return (
                <motion.span
                key={index}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{once: true}}
            >
                <Link href={items.url} >
               
                        <motion.div
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            initial={{
                                scale: 1,
                                borderWidth: "0px",
                                borderImage: "none",
                            }}
                            whileHover={{
                                scale: 1.05,
                                borderBottomWidth: "6px",
                                borderImageSource: "linear-gradient(to right, rgba(41,35,19,0), #8a9064, rgba(41,35,19,0))",
                                borderImageSlice: [1],
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="py-12 rounded-lg flex flex-col space-y-5 justify-center items-center w-full bg-darkBrown"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{
                                    rotate: 0,
                                    scale: 1
                                }}
                                animate={{
                                    rotate: isHovered ? 5 : 0,
                                    scale: 1.05,
                                }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-full p-4 text-black`}
                                style={{ backgroundColor: items.color }}
                            >
                                {iconsSelector(items.name, 60)}
                            </motion.div>
                            <div className={`text-oliveGreen text-xl flex gap-2 ${items.name == "Mail" ? "md:text-xs overflow-hidden lg:text-md xl:text-lg" : ""}`}>
                                <h1>@{items.name == "Mail"? items.username.substring(0,18) : items.username}</h1>
                                <motion.span
                                    initial={{
                                        opacity: 0,
                                        y: 10
                                    }}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        y: isHovered ? 0 : 10
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                    className="text-beige font-bold"> <GoArrowUpRight /> </motion.span>
                            </div>
                            <p className="text-beige ">{items.description}</p>
                        </motion.div>
                   
                </Link>

                </motion.span>
            )
        })
    );
}
