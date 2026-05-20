

import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
const MotionLink = motion(Link);
import {
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Users,
  Award,
} from "lucide-react";

import LiquidEther from "../components/LiquidEther";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen relative flex items-center bg-black">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={["#00d4ff", "#22d3ee", "#a855f7"]}
            mouseForce={25}
            cursorSize={110}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-20 grid md:grid-cols-2 gap-12 items-center w-full pointer-events-none">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight select-none">
              We Build <span className="text-primary">Digital Excellence</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg select-none">
              Transforming ideas into powerful websites, mobile apps, and custom software solutions.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {/** motion-wrapped Link for SPA navigation */}
              <>
                <MotionLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  to="/contact"
                  className="bg-primary hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition"
                >
                  Start Your Project
                  <ArrowRight size={20} />
                </MotionLink>

                <MotionLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  to="/projects"
                  className="border border-white/30 hover:bg-white/5 px-8 py-4 rounded-full transition"
                >
                  View Our Projects
                </MotionLink>
              </>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:flex justify-center pointer-events-auto"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-[4rem] flex items-center justify-center border border-primary/20">
                <Code2 size={140} className="text-primary opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔥 HERO → SERVICES SMOOTH TRANSITION */}
      <div className="h-32 bg-gradient-to-b from-black to-[#0b0b0b]" />

      {/* SERVICES SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#0b0b0b] via-[#0f0f0f] to-[#0b0b0b] relative z-30">

        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Expertise
            </h2>
            <p className="text-gray-400 text-lg">
              Modern solutions for modern businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={Globe} title="Custom Websites" desc="WordPress, React, and headless CMS solutions" />
            <ServiceCard icon={Code2} title="Custom Software Development" desc="ERP, CRM, inventory & business tools" />
            <ServiceCard icon={Smartphone} title="Mobile App Development" desc="iOS & Android native and cross-platform apps" />
            <ServiceCard icon={Users} title="UI/UX Design" desc="Beautiful and user-centered interfaces" />
            <ServiceCard icon={Award} title="SEO Optimization" desc="Improve your Google rankings" />
            <ServiceCard icon={Globe} title="Social Media Marketing" desc="Strategic growth across platforms" />
          </div>
        </div>
      </section>

      {/* 🔥 SERVICES → WHY US TRANSITION */}
      <div className="h-32 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f]" />

      {/* WHY US SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#0f0f0f] via-[#0b0b0b] to-black relative z-30">

        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose CodeBuilder?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              { title: "Fast Delivery", desc: "On-time delivery with exceptional quality." },
              { title: "Expert Team", desc: "Experienced developers and creative designers." },
              { title: "Full Support", desc: "Maintenance and technical support after launch." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121212] p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* 🔥 WHY US → CTA TRANSITION */}
      <div className="h-32 bg-gradient-to-b from-black to-transparent" />

      {/* CTA SECTION */}
      {/* CTA → FINAL SECTION */}
<section className="py-24 bg-gradient-to-b from-transparent via-black/40 to-black relative z-30">

  <div className="max-w-4xl mx-auto text-center px-6">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
    >
      Ready to Bring Your <span className="text-primary">Idea to Life?</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
    >
      Let’s discuss your project and create something extraordinary together.
      From concept to deployment, we handle everything for you.
    </motion.p>

    <MotionLink
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      to="/contact"
      className="inline-block bg-primary text-black font-semibold text-xl px-12 py-5 rounded-full hover:bg-cyan-400 transition shadow-lg shadow-primary/20"
    >
      Get Consultation
    </MotionLink>

  </div>
</section>

    </>
  );
}