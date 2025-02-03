"use client";

import { BlogPosts } from "@/utils/BlogPost";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";

interface Post{
    title: string
    pubDate: string
    link: string,
    image: string
    description: string
  }


export default function Page(){
    const [post, setPost ] = useState<Post[]>([]);

    useEffect(()=>{
       async  function loadData(){
          const data = await BlogPosts();
          setPost(data);
       }
       loadData();
    },[]);

    
    return(
     <div className="py-28 container mx-auto md:px-[100px] space-y-5">
        <h1 className="text-5xl font-bold text-oliveGreen">My Blogs</h1>
        <p className="text-beige text-xl">My Experiences, Lessons, and Technical Journeys</p>
        <div className="grid grid-cols-2 gap-10">
             {
                post.map((item,index)=>{
                    return(
                       <Link  key={index} href={item.link}>
                         <div className="space-y-5 rounded-lg">
                            <Image src={item.image} alt={item.image} width={500} height={100}/>
                            <div className="flex gap-5 items-center"> <SlCalender/> <p>{item.pubDate}</p></div>
                            <h1 className="text-xl font-bold">{item.title}</h1>
                             <h4 className="text-md">{item.description}</h4>
                        </div>
                       </Link>
                    )
                })
             }
        </div>
     </div>
    )
}