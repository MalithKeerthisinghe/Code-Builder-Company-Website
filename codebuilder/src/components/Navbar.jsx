import { useState, useEffect } from "react";

import { Menu, X } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import ShinyText from "./ShinyText.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          
          <ShinyText
            text="CodeBuilder"
            speed={3}
            shineColor="#22d3ee"
            color="#ffffff"
            spread={140}
            pauseOnHover={true}
            className="font-extrabold text-2xl md:text-4xl tracking-tight"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12 text-sm font-medium tracking-wide uppercase">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative py-2 text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            to="/contact"
            className="bg-cyan-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-cyan-300 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="flex items-center relative z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              duration: 0.35,
            }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8 text-3xl font-semibold tracking-wide">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`transition ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex items-center justify-center bg-cyan-400 text-black px-6 py-4 rounded-full text-lg font-bold hover:bg-cyan-300 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
