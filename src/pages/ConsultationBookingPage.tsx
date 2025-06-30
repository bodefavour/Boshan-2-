import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "./images/heroimage.png"

const ConsultationLandingPage = () => {
  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section className="relative w-full bg-[url('/images/heroimage.png')] bg-cover bg-center h-[80vh] md:h-screen flex items-center justify-center px-6">
        <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 md:p-14 max-w-3xl text-cente   r text-white space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Personalized Skin Therapy, Tailored For You
          </motion.h1>
          <p className="text-sm md:text-base text-gray-200">
            Book a virtual consultation with a certified Boshan skincare expert. Zero stress. Maximum glow.
          </p>
          <Link to="/consultation/booking">
            <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Book Your Session
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
        {[{
          title: "Expert Guidance",
          text: "Consult with licensed dermatologists and skincare specialists who understand melanin-rich skin.",
        }, {
          title: "Tailored Routines",
          text: "Receive step-by-step regimens built just for your skin type, lifestyle and budget.",
        }, {
          title: "Monthly Progress Checks",
          text: "Track your transformation with monthly follow-ups and live chats.",
        }].map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-orange-600">{item.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Steps Section */}
      <section className="bg-[#fff3eb] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[{
              step: "1",
              title: "Fill Your Skin Profile",
              desc: "Tell us about your skin, goals, and lifestyle. It’s quick and secure.",
            }, {
              step: "2",
              title: "Meet Your Specialist",
              desc: "Get matched with an expert for a live video consultation.",
            }, {
              step: "3",
              title: "Glow With Confidence",
              desc: "Get your curated product list, routine and progress check-ins.",
            }].map((step, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition space-y-2">
                <div className="text-4xl font-bold text-orange-500">{step.step}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Real People. Real Results.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["My acne cleared in 4 weeks.", "Best skin advice I’ve ever gotten.", "The follow-up system is a game-changer."].map((quote, idx) => (
            <blockquote key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-sm italic text-gray-700">
              “{quote}”
            </blockquote>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#fde8dd] py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Your skin deserves more than guesses.</h2>
        <p className="text-sm md:text-base text-gray-700 mt-2">Let’s make skincare make sense — for you.</p>
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
