import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
}

const categories = [
  { key: "all", label: "All" },
  { key: "skincare-essentials", label: "Skincare" },
  { key: "beardcare-essentials", label: "Beardcare" },
  { key: "personal-hygiene", label: "Hygiene" },
  { key: "subscription-boxes", label: "Subscriptions" },
  { key: "skin-therapy-and-consultations", label: "Therapy" },
  { key: "skinfood-&-nutrition", label: "Skinfood" },
];

const StoreFrontPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "products"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Product, "id">) }));
      setProducts(list);
      setFiltered(list);
    })();
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "all") setFiltered(products);
    else setFiltered(products.filter(p => p.category === cat));
  };

  return (
    <div className="bg-white text-black pt-20 px-4 md:px-16 lg:px-28">

      {/* Hero Banner */}
      <section className="relative mb-12">
        <div
          className="w-full h-52 md:h-80 bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: "url(/images/heroimage.png)" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center pl-6 md:pl-12">
          <div className="space-y-1 md:space-y-3">
            <h1 className="text-xl md:text-3xl font-quicksand uppercase text-white">
              Shop Boshan’s Curated Rituals
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              Skincare, beardcare, therapy & essentials tailored to your choice as you want it
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => handleCategorySelect(cat.key)}
              className={`px-4 py-2 rounded-full border text-sm transition ${selectedCategory === cat.key
                ? "bg-black text-white"
                : "bg-white text-gray-800"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found in this category.
            </p>
          ) : (
            filtered.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 sm:h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                  <p className="text-orange-600 font-bold mt-1 text-sm">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Promo Cards - now below products */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative h-40 bg-cover bg-center rounded-xl overflow-hidden shadow"
          style={{ backgroundImage: "url(/images/heroimage.png)" } as React.CSSProperties}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-lg font-bold text-white mb-1">Glow Kits</h2>
            <Link to="/preorder/subscription-boxes">
              <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-full">
                Explore Kits
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative h-40 bg-cover bg-center rounded-xl overflow-hidden shadow"
          style={{ backgroundImage: "url(/images/heroimage.png)" } as React.CSSProperties}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-lg font-bold text-white mb-1">Self-Care Sale</h2>
            <Link to="/preorder/personal-hygiene">
              <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-full">
                Shop Hygiene
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-orange-50 p-8 md:p-16 rounded-xl text-center">
        <h3 className="text-lg md:text-2xl font-semibold mb-2">
          Get First Dibs on New Drops
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Join Boshan's mailing list — fresh rituals, surprise sales, and early access.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400"
          />
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default StoreFrontPage;