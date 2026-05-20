import { motion } from 'framer-motion';

const section = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function About() {
  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <p className="inline-flex items-center rounded-full bg-cyan-500/10 text-cyan-300 px-4 py-2 text-sm font-medium tracking-[0.18em] uppercase mb-4">
          Full-Service Software Innovation
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Code Builder
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-400 leading-8">
          At Code Builder, we transform ideas into powerful digital experiences. As a full-service software development company, we specialize in delivering robust, scalable, and innovative solutions tailored to the unique needs of startups, enterprises, and everything in between.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <motion.section
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8 prose prose-invert max-w-none text-lg leading-8"
        >
          <motion.p
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Founded with a passion for coding excellence and a vision for driving digital transformation, Code Builder has grown into a trusted partner for businesses across various industries. Our team of expert developers, designers, and strategists brings together deep technical knowledge and a creative mindset to craft applications that are not only functional but also user-centric and future-ready.
          </motion.p>

          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: 'Robust Architecture',
                text: 'Building resilient systems that scale with your business and support long-term growth.'
              },
              {
                title: 'User-Centered Design',
                text: 'Creating intuitive experiences that feel natural, polished, and delightful across devices.'
              },
              {
                title: 'Agile Delivery',
                text: 'Iterating quickly while keeping quality high so you can move faster with confidence.'
              },
              {
                title: 'Strategic Partnership',
                text: 'Aligning technology with your goals to deliver measurable value and sustainable outcomes.'
              }
            ].map((card) => (
              <motion.article
                key={card.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_18px_80px_rgba(15,23,42,0.18)]"
              >
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-7">{card.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.aside
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/95 p-8 shadow-[0_30px_90px_rgba(14,23,42,0.24)]"
        >
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
            <h2 className="text-3xl font-semibold mb-4">Mission</h2>
            <p className="text-gray-300 leading-7">
              “To empower businesses through innovative, scalable, and reliable IT solutions that drive growth, efficiency, and digital transformation. We are committed to delivering high-quality technology services that solve real-world problems and create long-term value for our clients.”
            </p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
            <h2 className="text-3xl font-semibold mb-4">Vision</h2>
            <p className="text-gray-300 leading-7">
              “To become a leading global provider of cutting-edge IT solutions, recognized for our creativity, agility, and excellence in transforming ideas into impactful technology.”
            </p>
          </div>
        </motion.aside>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 space-y-8"
      >
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-center"
        >
          What sets Code Builder apart
        </motion.h2>

        <div className="grid gap-6 xl:grid-cols-3">
          {[
            {
              title: 'Strategic Technology Partnerships',
              description: 'We combine business insight and engineering expertise to create solutions that work today and evolve with your future needs.'
            },
            {
              title: 'End-to-End Delivery',
              description: 'From concept and design to development and support, we manage the full product lifecycle with precision and care.'
            },
            {
              title: 'Future-Ready Innovation',
              description: 'We embrace modern tools and architectures to deliver scalable solutions that stay relevant and resilient.'
            }
          ].map((card) => (
            <motion.article
              key={card.title}
              variants={item}
              whileHover={{ translateY: -8 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            >
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-400 leading-7">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
