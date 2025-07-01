import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ConsultationLandingPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] md:h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <img
            src="/images/IMG-20250402-WA0139.jpg"
            alt="Consultation Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        </div>

        <div className="relative z-10 max-w-2xl text-center text-white p-6 md:p-12 bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold leading-tight"
          >
            Personalized Skin Therapy — Backed by Experts, Built for You
          </motion.h1>
          <p className="text-sm md:text-base text-gray-200">
            Get paired with a certified Boshan skin consultant who knows your skin type, culture, and goals. No more trial and error.
          </p>
          <Link to="/consultation/booking">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Book a Session Now
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Boshan Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Expert-Led, Afrocentric",
            desc: "Our consultants understand melanin-rich skin and tailor every step with cultural care.",
          },
          {
            title: "No Guesswork, Just Glow",
            desc: "Get a custom routine that aligns with your lifestyle, skin goals, and real-time skin conditions.",
          },
          {
            title: "Built-In Accountability",
            desc: "We follow up monthly with updates, new recs, and real support as your skin transforms.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition space-y-3"
          >
            <h3 className="text-lg font-semibold text-orange-600">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Process Section */}
      <section className="bg-[#fff3eb] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-8">Your Journey to Better Skin Starts Here</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📝",
                title: "Fill Out Your Skin Profile",
                text: "Give us a snapshot of your skin type, habits, and concerns in minutes.",
              },
              {
                icon: "💻",
                title: "Connect With a Consultant",
                text: "Enjoy a private video consultation and ask every question on your mind.",
              },
              {
                icon: "📦",
                title: "Receive Your Regimen",
                text: "Get a custom product list + how-to guide. Monthly follow-ups included.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow text-left hover:shadow-md transition space-y-2"
              >
                <div className="text-3xl">{step.icon}</div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Testimonial Highlights */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">What Clients Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[
            {
              name: "Amaka, Abuja",
              quote: "I spent years buying random products. Boshan gave me a routine that finally works.",
            },
            {
              name: "Kemi, Lagos",
              quote: "Their dermatologist explained my skin triggers in a way no one else ever did.",
            },
            {
              name: "Chuka, Port Harcourt",
              quote: "Monthly check-ins kept me disciplined. My skin's never looked this alive.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-lg shadow text-gray-700 space-y-2 hover:shadow-md transition"
            >
              <p className="italic">“{t.quote}”</p>
              <p className="text-xs text-gray-500 font-medium text-right">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#fde8dd] text-center py-16 px-6">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
          Ready for glow you can see and feel?
        </h2>
        <p className="text-sm md:text-base text-gray-700 mt-2">
          Book your personalized skin consultation with Boshan today.
        </p>
        <Link to="/consultation/booking">
          <button className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
            Start Your Journey →
          </button>
        </Link>
      </section>
    </div>
  );
};

export default ConsultationLandingPage;