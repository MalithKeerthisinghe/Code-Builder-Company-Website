import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-50 bg-black pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              CodeBuilder
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Transforming ideas into powerful digital solutions across Sri
              Lanka.
            </p>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-primary hover:text-cyan-300 transition group"
            >
              Back to Top
              <ArrowUp
                className="group-hover:-translate-y-1 transition"
                size={18}
              />
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <div className="space-y-3">
              <Link
                to="/"
                onClick={scrollToTop}
                className="block text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={scrollToTop}
                className="block text-gray-400 hover:text-white transition"
              >
                About Us
              </Link>

              <Link
                to="/services"
                onClick={scrollToTop}
                className="block text-gray-400 hover:text-white transition"
              >
                Services
              </Link>

              <Link
                to="/projects"
                onClick={scrollToTop}
                className="block text-gray-400 hover:text-white transition"
              >
                Projects
              </Link>

              <Link
                to="/contact"
                onClick={scrollToTop}
                className="block text-gray-400 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-5">Our Services</h3>

            <div className="space-y-3 text-gray-400">
              <p>Custom Websites</p>
              <p>Mobile App Development</p>
              <p>Custom Software</p>
              <p>UI/UX Design</p>
              <p>Social Media Marketing</p>
              <p>SEO Optimization</p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-gray-400">
              <a
                href="tel:+94762112626"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <Phone size={20} />
                +94 76 211 2626
              </a>

              <a
                href="mailto:cbuilderit@gmail.com"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <Mail size={20} />
                cbuilderit@gmail.com
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5" />

                <span>
                  Samagi Mawatha,
                  <br />
                  Katuwana, Sri Lanka
                </span>
              </div>
            </div>

            
            {/* Social Links */}
            <div className="mt-8">
              <h4 className="uppercase text-xs tracking-widest text-gray-500 mb-4">
                Follow Us
              </h4>

              <div className="flex items-center gap-5">
                {/* Facebook */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <img
                    src="/icons/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <img
                    src="/icons/linkedin.png"
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} Code Builder. All Rights Reserved.
        </motion.div>
      </div>
    </footer>
  );
}
