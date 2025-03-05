import { motion } from "framer-motion";

const data = [
  {
    title: "Backend & Frontend Engineer",
    organization: "Celestia",
    year: "Dec 2024 - Present",
    descriptions: [
      "Developed and maintained backend services and frontend Services",
      "Optimized database performance and query efficiency",
      "Developed RESTful APIs for internal and external services",
    ],
    tools: ["FastApi", "React", "Postgresql", "Python", "Tailwind"],
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
    },
  }),
};

const Proexp = () =>
  data.map((item, index) => {
    return (
      <motion.div
        key={index}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="pl-5 border-l-4 border-deepBrown relative my-20"
      >
        <div className="w-4 h-4 rounded-full bg-oliveGreen absolute -left-3 -top-4"></div>
        <div className="shadow-lg shadow-deepBrown px-6 pb-5 space-y-2 rounded-lg">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="py-2">
              <h1 className="text-xl py-2 font-bold">{item.title}</h1>
              <h2 className="text-md text-oliveGreen">{item.organization}</h2>
            </div>
            <p className="text-xs text-beige">{item.year}</p>
          </div>
          <ul className="list-disc space-y-4 text-md">
            {item.descriptions.map((desc, i) => (
              <motion.li
                key={i}
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
              >
                {desc}
              </motion.li>
            ))}
          </ul>
          {/* Tools */}
          <ul className="pt-5 flex gap-5 flex-wrap">
            {item.tools.map((tool, i) => (
              <motion.li
                key={i}
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="bg-deepBrown px-4 rounded-lg py-2 w-fit"
              >
                {tool}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  });

export default Proexp;
