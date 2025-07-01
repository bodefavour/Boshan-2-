import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroBg from "/images/subscription-hero.jpg";
import CtaBg from "/images/subscription-cta.jpg";
import CleanserImg from "/images/cleanser.jpg"; // Replace with real assets
import SerumImg from "/images/serum.jpg";
import OilImg from "/images/oil.jpg";
import ToolImg from "/images/tool.jpg";

const SubscriptionBoxPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full h-[85vh] md:h-screen bg-cover bg-center flex items-center justify-center px-6"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="bg-black/60 backdrop-blur-md p-8 md:p-14 rounded-3xl text-white max-w-2xl text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Your Glow, Curated Monthly
          </motion.h1>
          <p className="text-sm md:text-base text-gray-200">
            Boshan’s personalized skincare boxes evolve with your skin. Less stress, more glow.
          </p>
          <Link to="/subscribe">
            <button className="mt-3 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Build Your Glow Box →
            </button>
          </Link>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Tailored to You",
            desc: "We use your profile to curate products that suit your skin’s real needs — no guessing games.",
          },
          {
            title: "New Discoveries Monthly",
            desc: "Stay ahead of the glow game with seasonal product drops, trends & tools.",
          },
          {
            title: "Expert-Backed",
            desc: "Dermatologists & product developers help handpick what works best for melanin-rich skin.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 space-y-2 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-orange-600">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* What's Inside */}
      <section className="bg-[#fff2eb] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What’s Inside Your Box?</h2>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-10">
            Each box contains 3–5 full-size products curated for your skin goals — cleansers, oils, exfoliants, body scrubs & sometimes a surprise accessory.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[CleanserImg, SerumImg, OilImg, ToolImg].map((img, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-3">
                <img src={img} alt="box-item" className="w-full h-32 object-cover rounded-md mb-2" />
                <p className="text-sm text-gray-600 font-medium">
                  {["Gentle Cleanser", "Serum or Mask", "Glow Oil", "Surprise Tool"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              step: "1. Build Your Profile",
              desc: "Tell us your skin type, goals, allergies & routine.",
            },
            {
              step: "2. Get Your Box",
              desc: "We curate a box and ship directly to your doorstep every month.",
            },
            {
              step: "3. Adjust As You Glow",
              desc: "Rate products, update preferences, and evolve your routine.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 space-y-2 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-orange-600">{item.step}</h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual CTA */}
      <section
        className="relative w-full h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center mt-12"
        style={{ backgroundImage: `url(${CtaBg})` }}
      >
        <div className="bg-black/60 backdrop-blur-md text-white text-center p-8 rounded-2xl max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold">A Ritual You’ll Look Forward To</h2>
          <p className="text-sm md:text-base mt-2">
            You deserve more than random products. Get personalized, tested, and luxurious skincare in one box.
          </p>
          <Link to="/subscribe">
            <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Start My Ritual →
            </button>
          </Link>
        </div>
      </section>

      {/* Glow Stories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Glow Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "I didn’t know skincare could feel this luxurious. Everything fits my skin.",
            "No more TikTok confusion — Boshan made my routine personal.",
            "I don’t have to think. I just open my box and glow.",
          ].map((quote, idx) => (
            <blockquote key={idx} className="bg-white p-6 rounded-xl shadow text-sm italic text-gray-700">
              “{quote}”
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;