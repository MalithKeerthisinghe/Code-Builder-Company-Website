import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ title, desc, image, category, link }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30"
    >
      <div className="h-64 overflow-hidden relative">
        <img 
          src={image || "https://picsum.photos/600/400"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-black/70 px-4 py-1 rounded-full text-xs uppercase tracking-widest">
          {category}
        </div>
      </div>
      <div className="p-7">
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 line-clamp-3 mb-6">{desc}</p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-primary hover:text-cyan-300 transition"
          >
            View Project <ExternalLink size={18} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-gray-500">
            Coming soon
          </span>
        )}
      </div>
    </motion.div>
  );
}