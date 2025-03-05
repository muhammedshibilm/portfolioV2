import { motion } from "framer-motion";

export default function Service(){
    const services: string[] = [
      "Frontend Development",
        "Responsive Web Development",
        "User Interface (UI) Development",
        "Interactive Web Components",
        "Performance Optimization",
        "Testing and Debugging",
        "Progressive Web App (PWA) Development",
        "SEO Optimization for Websites",
        "Next.js & React Development",
        "Full-Stack Development (FastAPI & PostgreSQL)"
      ];
      
    return(
     <div className="grid place-items-center">
      
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: 1, duration: 1 },
                }}
                viewport={{ once: true }}
                className="my-10 text-3xl font-semibold text-oliveGreen text-center"
              >
                Services
              </motion.h1>
       <motion.div 
  
  initial={{y: 100, opacity:0}} whileInView={{y:0,opacity:1,transition: { delay: 1, duration: 1}}} viewport={{once: true}}
 
  className=" grid  grid-cols-1 md:grid-cols-2 gap-5 rounded-xl " >
      {
         services.map((items,index)=>{
             return(
                
                    <motion.h1 initial={{
                      scale: 1,
                    
                    }} 
                    
                    whileHover={{
                      scale: 1.01,
                      
                    }}
                    key={index} className="bg-[#282828] p-7  font-semibold text-lg text-center"> {items}</motion.h1>
           
             )
         })
      }
  </motion.div>
     </div>
  )
}