import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: "SL Gaming Hub",
      desc: "A polished gaming community site with featured tournaments, live news, and membership onboarding.",
      category: "Website",
      image: "/projects/slgaming.jpeg",
      link: "https://www.slgaminghub.com/"
    },
    {
      title: "NIC Campus",
      desc: "Modern education portal for students and faculty with course access, announcements, and campus resources.",
      category: "Website",
      image: "/projects/nic.jpeg",
      link: "https://niccampus.com/"
    },
    {
      title: "Nadee Villas & Tours",
      desc: "Travel booking and destination showcase site for luxury villas, tours, and custom vacation experiences.",
      category: "Website",
      image: "/projects/nadeevilla.jpeg",
      link: "https://www.nadevillasandtours.com/"
    },
    {
      title: "Serendip Hub",
      desc: "A digital hub for entrepreneur services, community events, and brand discovery with a strong visual identity.",
      category: "Website",
      image: "/projects/serendip.jpeg",
      link: "https://serendiphub.com/"
    },
    {
      title: "Tech Giant",
      desc: "Corporate IT services website showcasing technology solutions, client success stories, and contact capture.",
      category: "Website",
      image: "/projects/techgiant.jpeg",
      link: "https://techgiant.lk/"
    }
  ];

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Projects</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Delivering high-quality digital solutions across Sri Lanka and beyond
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { 
            transition: { staggerChildren: 0.1 } 
          }
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title}
            desc={project.desc}
            category={project.category}
            image={project.image}
            link={project.link}
          />
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-3xl p-12"
      >
        <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
        <p className="text-gray-400 mb-8">Let's discuss how we can bring your idea to life.</p>
        <a 
          href="/contact"
          className="inline-block bg-primary text-black font-semibold px-10 py-4 rounded-full hover:bg-cyan-400 transition text-lg"
        >
          Start Your Project →
        </a>
      </motion.div>
    </div>
  );
}