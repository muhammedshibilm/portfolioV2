
import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata={
    title: "About - Backend and Frontend Engineer",
    description: "Backend and Frontend Engineer"
}
export default function Layout({children,}:{children: ReactNode}){
   return(
      <html lang="en">
          <body>
            {children}
          </body>
        </html>
   )
}