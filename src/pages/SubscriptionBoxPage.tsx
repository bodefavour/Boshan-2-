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
      {/* Hero */}
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
            Explore tailored skincare & beardcare boxes or build your own.
          </p>
          <Link to="/subscribe/setup">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Create My Own Box
            </button>
          </Link>
        </div>
      </section>

      {/* Display Boxes */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Available Boxes</h2>
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

        {/* CTA to Custom Box */}
        <div className="text-center mt-16">
          <Link to="/subscribe/setup">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base transition">
              Build My Own Box →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionBoxPage;