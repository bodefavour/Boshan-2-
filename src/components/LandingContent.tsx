import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lottie from "lottie-react";
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const services = [
    {
        title: "Skincare Essentials",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250402-WA0132.jpg",
        link: "/skincare",
      },
      {
        title: "Beardcare Essentials",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250322-WA0048.jpg",
        link: "/Fashion",
      },
      {
        title: "Personal Hygiene",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250322-WA0051.jpg",
        link: "/birthday-gifts",
      },
      {
        title: "Beauty Tools and Makeup Accessories",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0140.jpg",
        link: "/Decor",
      }, {
        title: "Subscription Boxes",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250322-WA0051.jpg",
        link: "/Decor",
      }, {
        title: "Skin Therapy and Consultations",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0132.jpg",
        link: "/Decor",
      }, {
        title: "Skinfood & Nutrition",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0134.jpg",
        link: "/Decor",
      }, 
];

const LandingContent = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", gender: "", ageRange: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
const formRef = useRef<HTMLFormElement>(null);
const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email) setShowPopup(true);
  };

  const handleFinalSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault();

  const templateParams = {
    email: email,
    name: formData.name,
    gender: formData.gender,
    ageRange: formData.ageRange,
    phone: formData.phone || "N/A",
  };

  emailjs
    .send(
      'service_1j6yt08',
      'template_6h3c04s',
      templateParams,
      'O_7iX1tN5LyntxS2V'
    )
    .then(() => {
  setSubmitted(true);
  setEmail("");
  setFormData({ name: "", gender: "", ageRange: "", phone: "", email: "" });
  setShowPopup(false);
  setShowThankYou(true); // Show the thank-you feedback
})
};
{showThankYou && (
  <div className="thank-you-modal">
    <p>You're on the Glow List! We've sent a confirmation email.</p>
    <div className="happy-animation"> {/* You can use Lottie or GIF here */} </div>
    <button onClick={() => setShowThankYou(false)}>Close</button>
  </div>
)}
  return (
    <div className="bg-white text-black px-6 md:px-16 py-12 space-y-20">
      {/* Awareness Teaser */}
      <motion.section className="text-center">
        <p className="text-xl italic text-gray-700">“You’ve never glowed like this before… Boshan is almost here 👀✨”</p>
      </motion.section>
      {/* CTA + Email Capture */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="bg-black text-white p-8 md:p-16 rounded-3xl shadow-2xl text-center space-y-6"
      >
        <h3 className="text-4xl font-semibold">Your Skin. Your Ritual. Your Lifestyle.</h3>
        <p className="text-lg max-w-xl mx-auto">Be the First to Pre-Order. Join the Glow List.</p>
        <form className="flex flex-col md:flex-row gap-4 justify-center" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-2 rounded-full text-black w-full md:w-1/3"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-2 rounded-full text-lg font-medium shadow-xl"
          >
            Join Now
          </button>
        </form>
      </motion.section>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-2xl w-[90%] max-w-lg space-y-4">
          {!submitted ? (
              <>
                <h3 className="text-xl font-semibold mb-4 text-center">Complete Your Sign-Up</h3>
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <select
                    required
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Select Age Range</option>
                    {Array.from({ length: 34 }, (_, i) => 17 + i).map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-full w-full hover:bg-opacity-90 transition"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <Lottie animationData={require("../animations/success.json")} loop={false} className="h-40 mx-auto" />
                <h4 className="text-lg font-semibold mt-4">
                  Thanks for joining Boshan's Glow List!
                </h4>
                <p className="mt-2">We’ll let you know when pre-orders open.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Product Sneak Peek */}
    <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-orange-100 text-black p-8 md:p-16 rounded-3xl shadow-md space-y-6 text-center"
        >
        <h3 className="text-2xl font-bold">Product Sneak Peek</h3>
        <p>“Can you guess what’s inside our first box? 💋”</p>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 1" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 2" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 3" className="w-60 h-60 object-cover rounded-xl blur-sm" /> <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 1" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 2" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 3" className="w-60 h-60 object-cover rounded-xl blur-sm" />
        </div>
    </motion.section>

    </div>
  );
};

export default LandingContent;