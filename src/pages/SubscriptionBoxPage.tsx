import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionBoxPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen bg-cover bg-center flex items-center justify-center px-6" style={{ backgroundImage: `url('/images/IMG-20250402-WA0141')` }}>
        <div className="bg-white/20 backdrop-blur-md p-8 md:p-16 rounded-3xl max-w-3xl text-center shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Your Glow, Delivered Monthly
          </motion.h1>
          <p className="text-sm md:text-base text-white/90 max-w-md mx-auto">
            Personalized subscription boxes that evolve with your skin’s needs. No repeats. Just glow.
          </p>
          <Link to="/subscribe">
            <button className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Build Your Box →
            </button>
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Boshan Subscriptions?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[{
            title: "Expert Curation",
            desc: "Every product is handpicked by our in-house dermatologists to suit your profile."
          }, {
            title: "Zero Waste, Full Impact",
            desc: "No duplicates. Just effective, tested, and updated care monthly."
          }, {
            title: "Flexible Plans",
            desc: "Pause, skip or cancel anytime. You’re in control of your glow."
          }].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition text-center">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-[#fff3eb] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {[{
              step: "1",
              title: "Profile Match",
              desc: "Fill out your skin type, lifestyle, and preferences."
            }, {
              step: "2",
              title: "Box Assembled",
              desc: "We curate your custom glow box with science-backed essentials."
            }, {
              step: "3",
              title: "Glow Delivered",
              desc: "Every month, receive a new set tailored to your evolving skin."
            }].map((step, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex-1 shadow text-left">
                <div className="text-orange-600 font-bold text-2xl mb-2">Step {step.step}</div>
                <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousel Section (simulated) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Popular In Boxes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Glow Oil", "Gentle Cleanser", "Brightening Serum", "Beard Elixir"].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="h-28 bg-orange-100 rounded-xl mb-4"></div>
              <h4 className="text-sm font-medium text-gray-800">{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('/images/subscription-cta.jpg')` }}>
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl text-white text-center max-w-xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Your Glow Ritual Starts Now</h2>
          <p className="text-sm md:text-base text-gray-100">Cancel anytime. Adjust your box. Always radiant.</p>
          <Link to="/subscribe">
            <button className="mt-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Start Subscription →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;