"use client";

import Navbar from "../../components/Navbar";
import Cards from "../../components/Cards";
export default function Page() {
  return (
    <>
    <Navbar/>
    <div className="py-28 container px-4  mx-auto md:px-[100px] space-y-10 ">
      <h1 className="text-5xl font-bold text-oliveGreen">Let&apos;s Connect</h1>
      <p className="text-beige text-xl md:text-2xl">
        Feel free to reach out through any of these platforms. I&apos;m always
        open to new connections and conversations.
      </p>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Cards />
      </div>
    </div>
    </>
  );
}
