import ServiceCard from '../components/ServiceCard';
import { Globe, Code2, Smartphone, Palette, BarChart3, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const heading = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } }
};

const gridReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function Services() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <motion.div
        variants={heading}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-16"
      >
        <p className="inline-flex items-center justify-center rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300 mb-4">
          Services & Capabilities
        </p>
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          End-to-end digital solutions designed to help your business scale, engage, and outperform.
        </p>
      </motion.div>

      <motion.div
        variants={gridReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ServiceCard icon={Globe} title="Custom WordPress Development" desc="Fast, secure, and SEO-optimized websites" />
        <ServiceCard icon={Code2} title="Custom Software Development" desc="Tailored business applications & systems" />
        <ServiceCard icon={Smartphone} title="Mobile App Development" desc="Native & Flutter/React Native apps" />
        <ServiceCard icon={Palette} title="UI/UX Design" desc="Beautiful and intuitive user experiences" />
        <ServiceCard icon={BarChart3} title="Social Media Marketing" desc="Strategic growth across platforms" />
        <ServiceCard icon={Shield} title="Maintenance & Support" desc="Reliable ongoing technical support" />
      </motion.div>
    </div>
  );
}
