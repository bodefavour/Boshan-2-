import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionBoxPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section
        className="relative w-full h-[85vh] md:h-screen bg-cover bg-center flex items-center justify-center px-6"
        style={{ backgroundImage: `url('/images/subscription-hero.jpg')` }}
      >
        <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 md:p-16 max-w-4xl text-center text-white space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Your Glow, Curated Monthly
          </motion.h1>
          <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            A premium subscription box experience built around your unique skin needs — curated by Boshan experts for melanin-rich skin.
          </p>
          <Link to="/subscribe">
            <button className="mt-4 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition font-semibold shadow-md">
              Build Your Box →
            </button>
          </Link>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[{
          title: "Tailored For You",
          desc: "Powered by your profile, our skincare specialists curate a box with your exact skin tone, texture, and needs in mind."
        }, {
          title: "Rooted in Afrocentric Care",
          desc: "We prioritize brands and ingredients that honor melanin-rich skin and support glow without compromise."
        }, {
          title: "A Surprise Every Month",
          desc: "Each box brings freshness to your routine — think trending picks, seasonal upgrades, and skincare surprises."
        }].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition border-t-4 border-orange-100">
            <h3 className="text-lg font-bold text-orange-600 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* What's Inside */}
      <section className="bg-[#fff3eb] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-2xl md:text-4xl font-bold">What's in Your Box?</h2>
          <p className="text-base text-gray-700 max-w-xl mx-auto">
            No fillers. No fluff. Just dermatologist-approved products to hydrate, balance, and nourish your glow.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Glow Oils", "Hydrating Cleansers", "Targeted Serums", "Beard & Body Care"].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border text-sm font-semibold text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual CTA */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center mt-16 flex items-center justify-center"
        style={{ backgroundImage: `url('/images/subscription-cta.jpg')` }}
      >
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl text-white text-center max-w-2xl space-y-4 shadow-xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide">
            You’re 1 Step From Effortless Skincare
          </h2>
          <p className="text-sm md:text-base text-gray-200 max-w-md mx-auto">
            Join the Boshan glow club. Cancel anytime. Glow always.
          </p>
          <Link to="/subscribe">
            <button className="mt-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base font-semibold transition">
              Start Subscription →
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Glow Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["This box changed my routine. My skin’s never looked better!", "No more trial and error. I just wait for my Boshan box now.", "I get excited each month — it’s giving self-care AND surprise."].map((quote, idx) => (
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