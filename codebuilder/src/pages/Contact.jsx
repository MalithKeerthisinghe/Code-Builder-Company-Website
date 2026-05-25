import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';


const API = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Handle Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Handle Form Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/contact`,
        formData
      );

      alert(response.data.message);

      /*
      |--------------------------------------------------------------------------
      | Reset Form
      |--------------------------------------------------------------------------
      */

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

    } catch (error) {
      console.log(error);

      alert('Failed to send message');
    }

    setLoading(false);
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          Let's Build Something Great
        </h1>

        <p className="text-xl text-gray-400">
          Tell us about your project
        </p>
      </motion.div>

      {/* Form */}

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-card p-10 rounded-3xl space-y-6"
      >

        {/* Name + Email */}

        <div className="grid md:grid-cols-2 gap-6">

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none w-full"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none w-full"
          />

        </div>

        {/* Phone */}

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none w-full"
        />

        {/* Service */}

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="service"
          placeholder="Service Needed"
          value={formData.service}
          onChange={handleChange}
          className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none w-full"
        />

        {/* Message */}

        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          name="message"
          rows="6"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none w-full"
        />

        {/* Submit Button */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-cyan-400 text-black font-bold py-5 rounded-2xl text-lg transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </motion.button>

      </motion.form>
    </div>
  );
}