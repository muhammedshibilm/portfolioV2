import Link from "next/link";


export default function Navbar(){

    const Links = [
        {"name": "Home","target": "/"},
        {"name": "Me","target": "/me"},
        {"name": "Blog","target": "/blog"},
        {"name": "Projects","target": "/projects"},
        {"name": "Contact","target": "/contacts"},
    ]

    return(
        <nav className="text-beige"> 
            {/* above mobile  */}
            <div className="w-full hidden md:grid place-items-center">
                 <ul className="flex  gap-10 pt-5">
                    {
                        Links.map((item,index)=>{
                           return(
                            <li key={index} className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0  after:bg-oliveGreen after:transition-all after:duration-300 hover:after:w-full"><Link href={item.target}>{item.name}</Link></li>
                           )
                        })
                    }
                 </ul>
            </div>
        </nav>
    )
}