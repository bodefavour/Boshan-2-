import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaInstagram, FaXTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#FFF8F5] text-black py-16 px-6 md:px-20">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-boshan mb-10"
      >
        Get in Touch with Boshan
      </motion.h1>

      {/* Contact + Info Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-5"
        >
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              required
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Team Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-6"
        >
          <div className="bg-[#fff3eb] p-6 rounded-xl shadow text-sm">
            <h3 className="text-lg font-semibold text-boshan mb-2">Support Team</h3>
            <p>Have questions about your order, skin consultation, or subscription box?</p>
            <p className="mt-2">Our team is available Monday – Saturday from 9am to 6pm.</p>
          </div>

          {/* WhatsApp Integration */}
          <a
            href="https://wa.me/+2349023640812" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow w-fit"
          >
            <FaWhatsapp />
            Chat with Us on WhatsApp
          </a>

          {/* Socials */}
          <div className="mt-6">
            <h4 className="font-semibold text-sm text-gray-800 mb-2">Follow Us</h4>
            <div className="flex gap-4 text-xl text-gray-600">
              <a href="https://www.instagram.com/boshan.co" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-orange-500" />
              </a>
              <a href="https://x.com/boshanofficial" target="_blank" rel="noreferrer">
                <FaXTwitter className="hover:text-orange-500" />
              </a>
              <a href="https://www.tiktok.com/@boshan.co" target="_blank" rel="noreferrer">
                <FaTiktok className="hover:text-orange-500" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;