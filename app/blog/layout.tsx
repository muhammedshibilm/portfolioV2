import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata={
    title: "Blog"
}
export default function Layout({children,}:{children: ReactNode}){
   return(
      <html lang="en">
          <body>
            <Navbar/>
            {children}
          </body>
        </html>
   )
}