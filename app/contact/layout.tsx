import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata={
    title: "Contact"
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