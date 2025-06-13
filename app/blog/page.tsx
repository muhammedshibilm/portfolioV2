"use client";

import { BlogPosts } from "../../utils/BlogPost";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

interface Post {
  title: string;
  pubDate: string;
  link: string;
  image: string;
  description: string;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await BlogPosts();
      setPosts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <>
    <Navbar/>
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-5   md:px-[100px] space-y-5 py-5 md:py-28 mb-32 md:mb-0"
    >
      <h1 className="text-5xl  font-bold text-oliveGreen text-center md:text-left">My Blogs</h1>
      <p className="text-beige text-xl">
        My Experiences, Lessons, and Technical Journeys
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse rounded-lg flex flex-col space-y-4 p-4"
                >
                  <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
                  <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
                  <div className="w-1/2 h-6 bg-gray-400 rounded"></div>
                </div>
              ))
          : posts.map((item, index) => (
              <motion.span
                initial={{ opacity: 0, y: 100, scale: 1 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={index}
                className="hover:shadow-xl  hover:shadow-deepBrown "
              >
                <Link href={item.link}>
                  <div className="space-y-5 rounded-xl p-4 hover:cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                    <div className="flex gap-5 px-2 items-center">
                      <SlCalender />
                      <p>{item.pubDate}</p>
                    </div>
                    <h1 className="text-xl font-bold px-2">{item.title}</h1>
                    <h4 className="text-md text-clip px-2">{item.description}</h4>
                  </div>
                </Link>
              </motion.span>
            ))}
      </div>
    </motion.div>
    </>
  );
}
