import {  NextResponse } from "next/server";
import { DateUtils } from "../../../utils/dateUtils";

import Parser from "rss-parser";
import { ContentUtils } from "../../../utils/contentUtils";

const parser =  new Parser();

const MEDIUM_URL= process.env.MEDIUM_URL!;

interface Post{
  title: string
  pubDate: string
  link: string,
  image: string
  description: string
}


export   async function GET() {

 

  if (!MEDIUM_URL) {
    return NextResponse.json({"error": "Url not find"},{status: 302}) 
  }
    
  try {
    const feed = (await parser.parseURL(MEDIUM_URL)).items;

 

  
  const posts: Post[]  = feed.map((items)=>{
    const pubDate = DateUtils(items["pubDate"]!)
    const { figure, description }  =  ContentUtils(items["content:encoded"]!);
 
      return({
        title: items["title"] || "Title not found",
        pubDate: pubDate || "Date not found",
        link: items["link"] || "Link not found",
        image : figure || "Image not found",
        description: description || "Description not found"
      });
  })


  return NextResponse.json(posts,{status: 200})
  } catch (error) {
     console.log(error);
     return NextResponse.json(error,{status: 404})
  }


}

