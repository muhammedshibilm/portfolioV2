import Navbar from "../../components/Navbar";

export default function Page(){
    return(
        <>
         <Navbar/>
        <div className=" container mx-auto md:px-[100px] space-y-10 py-5 md:py-28">
        <h1 className="text-5xl font-bold text-oliveGreen text-center md:text-left">Featured Projects</h1>
        <p className="text-beige text-xl md:text-2xl">A collection of projects that showcase my skills and experiences</p>
        <div className="h-full text-center  text-xl">
           In this page is  maintanace work 
        </div>
    </div>
    </>
    )
}