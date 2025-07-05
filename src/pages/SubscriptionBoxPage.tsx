import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
}

const SubscriptionBoxPage = () => {
  const [boxes, setBoxes] = useState<Product[]>([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const q = query(collection(db, "products"), where("category", "==", "subscription-boxes"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setBoxes(list);
    };

    fetchBoxes();
  }, []);

  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section
        className="w-full h-[80vh] md:h-screen bg-cover bg-center flex items-center justify-center px-6 relative"
        style={{ backgroundImage: "url('/images/subscription-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl text-center text-white space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Your Monthly Glow — Curated, Personalized, Delivered.
          </motion.h1>
          <p className="text-sm md:text-base">
            Discover Boshan’s expertly designed subscription boxes that evolve with your skin. 
          </p>
          <Link to="/subscribe/setup">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Create My Glow Box →
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
            desc: "Stay ahead of the glow game with seasonal product drops, tools & trends.",
          },
          {
            title: "Expert-Backed",
            desc: "Dermatologists & product developers handpick what works best for melanin-rich skin.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 space-y-2 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-orange-600">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How it Works */}
      <section className="bg-[#fff2eb] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto mb-10">
            From your first skin profile to doorstep delivery, here’s how Boshan keeps your glow on autopilot.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1. Build Your Profile",
                desc: "Tell us your skin type, tone, goals, allergies & preferences.",
              },
              {
                step: "2. Get Curated Boxes",
                desc: "Every month, we send a handpicked box based on your journey.",
              },
              {
                step: "3. Glow & Adjust",
                desc: "Rate, review, and update your preferences — so your box evolves with you.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">{item.step}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Boxes from Firestore */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Explore Our Glow Kits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-xl shadow p-6 space-y-4 hover:shadow-md transition"
            >
              <img
                src={box.image || "/images/default.jpg"}
                alt={box.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-boshan">{box.name}</h3>
              <p className="text-sm text-gray-600">{box.description}</p>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {box.features?.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <p className="text-orange-600 font-bold text-lg">
                ₦{box.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {boxes.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No subscription boxes available yet.</p>
        )}

        <div className="text-center mt-16">
          <Link to="/subscribe/setup">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Build My Custom Box →
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#fdece5]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Glow Stories</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
          {[
            {
              name: "Chioma, Lagos",
              quote: "I finally stopped wasting money on random products. Boshan knows my skin better than I do.",
            },
            {
              name: "Titi, Abuja",
              quote: "It’s like a little luxury gift to myself every month. My skin looks like money.",
            },
            {
              name: "Kunle, PH",
              quote: "The beard care kits are unmatched. Smooth, well-groomed, no flakes.",
            },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <p className="italic">“{t.quote}”</p>
              <p className="text-xs text-right mt-2">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Treat your skin to a ritual — not a routine.</h2>
        <p className="text-sm md:text-base text-gray-700 mb-6">
          Start your glow journey with Boshan’s expertly curated boxes.
        </p>
        <Link to="/subscribe/setup">
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
            Start My Glow Box →
          </button>
        </Link>
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;