import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionBoxPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] md:h-[90vh] bg-cover bg-center flex items-center justify-center px-6"
        style={{ backgroundImage: `url('/images/subscription-hero.jpg')` }}
      >
        <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6 md:p-14 max-w-3xl text-center text-white space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Your Glow, Curated Monthly
          </motion.h1>
          <p className="text-sm md:text-base text-gray-200">
            Discover the luxury of self-care delivered. Personalized Boshan
            subscription boxes built around your skin’s needs.
          </p>
          <Link to="/subscribe">
            <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Build Your Box →
            </button>
          </Link>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
        {[
          {
            title: "Tailored for You",
            desc: "We analyze your skin profile to craft a box that suits your tone, texture, and glow goals.",
          },
          {
            title: "Afrocentric Excellence",
            desc: "Our dermatologists select products that honor and nourish melanin-rich skin.",
          },
          {
            title: "New Drops, Every Month",
            desc: "Skincare doesn’t stand still — so neither should you. Get fresh picks and seasonal glow-ups.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* What's Inside */}
      <section className="bg-[#fff3eb] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">What’s Inside?</h2>
          <p className="text-sm md:text-base max-w-xl mx-auto text-gray-700">
            From cleansers to serums, lip balms to glow oils — each item is
            curated to elevate your skin journey. You’ll never get two boxes
            the same.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              "Hydrating Cleansers",
              "Targeted Serums",
              "Beard & Body Care",
              "Monthly Surprises",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-md text-sm font-medium text-gray-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual CTA */}
      <section
        className="relative w-full h-[50vh] md:h-[60vh] bg-cover bg-center mt-12 flex items-center justify-center"
        style={{ backgroundImage: `url('/images/subscription-cta.jpg')` }}
      >
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl text-white text-center max-w-xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            You’re 1 Step From Effortless Skincare
          </h2>
          <p className="text-sm md:text-base text-gray-200">
            Join Boshan’s subscription glow club. Cancel anytime, glow forever.
          </p>
          <Link to="/subscribe">
            <button className="mt-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Start Subscription →
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Glow Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "This box changed my routine. My skin’s never looked better!",
            "No more trial and error. I just wait for my Boshan box now.",
            "I get excited each month — it’s giving self-care AND surprise.",
          ].map((quote, idx) => (
            <blockquote
              key={idx}
              className="bg-white p-6 rounded-xl shadow text-sm italic text-gray-700"
            >
              “{quote}”
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;