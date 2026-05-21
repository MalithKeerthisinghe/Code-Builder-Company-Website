import { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-dark/80 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/20' 
        : 'py-6 bg-transparent'
    }`}>
      
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center group relative z-50">
          <span className="font-extrabold text-3xl md:text-5xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent drop-shadow-lg">
            CodeBuilder
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`relative py-2 text-white/70 hover:text-white transition-colors duration-300 group`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5 relative z-50">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      

      {/* ✅ ADD THIS SECTION INSTEAD */}
      {isOpen && (
        <div className="fixed inset-0 bg-dark/98 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8 transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-6 text-2xl font-semibold tracking-wide">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10 my-4" />
          </div>
        </div>
      )}
    </nav>
  );
}