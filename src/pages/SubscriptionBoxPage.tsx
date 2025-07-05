import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

const SubscriptionBoxPage = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const snapshot = await getDocs(collection(db, "subscriptionTiers"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlans(list);
    };
    fetchPlans();
  }, []);

  return (
    <div className="bg-[#FFF8F5] text-black">
      {/* Hero Section */}
      <section
        className="w-full h-[80vh] md:h-[85vh] bg-cover bg-center flex items-center justify-center px-6 relative"
        style={{ backgroundImage: "url('/images/subscription-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl text-center text-white space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Subscription Boxes Curated Just For You
          </motion.h1>
          <p className="text-sm md:text-base">
            Explore our expertly tailored skincare and beard care boxes. Choose what suits you, or create your own glow box.
          </p>
          <Link to="/subscribe/setup">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Create My Own Box
            </button>
          </Link>
        </div>
      </section>

      {/* Plans Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Available Boxes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow p-6 space-y-4 hover:shadow-md transition"
            >
              <img
                src={plan.image || "/images/default.jpg"}
                alt={plan.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-orange-600">{plan.name}</h3>
              <p className="text-sm text-gray-700">₦{plan.price?.toLocaleString()}</p>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {plan.features?.map((f: string, idx: number) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No subscription boxes available yet.</p>
        )}
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;