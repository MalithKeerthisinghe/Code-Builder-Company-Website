import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card p-8 rounded-3xl border border-white/5 hover:border-primary/30 
                 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="mb-6 transition-transform group-hover:scale-110">
        {Icon && <Icon size={48} className="text-primary" />}
      </div>
      
      <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}