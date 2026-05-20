import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll contact you soon.");
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">Let's Build Something Great</h1>
        <p className="text-xl text-gray-400">Tell us about your project</p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-card p-10 rounded-3xl space-y-6"
      >
        {/* Form fields with stagger animation */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.input whileFocus={{ scale: 1.02 }} type="text" placeholder="Your Name" required
            className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none" />
          <motion.input whileFocus={{ scale: 1.02 }} type="email" placeholder="Email Address" required
            className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none" />
        </div>

        {/* Other fields... */}

        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-primary hover:bg-cyan-400 text-black font-bold py-5 rounded-2xl text-lg transition"
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
}