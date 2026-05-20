import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashPage from './components/SplashPage';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <Router>
      {!splashDone ? (
        <SplashPage onComplete={() => setSplashDone(true)} />
      ) : (
        <div className="min-h-screen bg-dark text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;