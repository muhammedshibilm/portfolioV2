import Navbar from "../../components/Navbar";

export default function Page(){
    return(
        <>
         <Navbar/>
        <div className="py-28 container mx-auto md:px-[100px] space-y-10 ">
        <h1 className="text-5xl font-bold text-oliveGreen">Featured Projects</h1>
        <p className="text-beige text-xl md:text-2xl">A collection of projects that showcase my skills and experiences</p>
        <div className="h-full text-center  text-xl">
           In this page is  maintanace work 
        </div>
    </div>
    </>
    )
}