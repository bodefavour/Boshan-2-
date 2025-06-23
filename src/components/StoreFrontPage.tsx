import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
}

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productList: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white text-black py-10 px-6 md:px-16">
      {/* Banner */}
      <div className="w-full h-[280px] md:h-[400px] bg-cover bg-center rounded-3xl shadow-lg mb-12"
        style={{ backgroundImage: "url(/images/IMG-20250402-WA0134.jpg)" }}>
        <div className="h-full w-full bg-black bg-opacity-40 rounded-3xl flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wide">Discover Boshan's Glow</h1>
            <p className="text-sm md:text-lg max-w-md mx-auto">Explore curated essentials across skincare, beauty tools, hygiene, and personalized care.</p>
            <Link to="/auth">
              <button className="mt-3 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm md:text-base shadow">Sign In for Personalized Access</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Skincare", image: "/images/IMG-20250402-WA0132.jpg", path: "/preorder/skincare-essentials" },
            { title: "Beardcare", image: "/images/IMG-20250322-WA0048.jpg", path: "/preorder/beardcare-essentials" },
            { title: "Personal Hygiene", image: "/images/IMG-20250322-WA0051.jpg", path: "/preorder/personal-hygiene" },
            { title: "More", image: "/images/IMG-20250402-WA0140.jpg", path: "/Oldpa" },
          ].map((cat, i) => (
            <Link to={cat.path} key={i} className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
              <img src={cat.image} alt={cat.title} className="w-full h-32 object-cover" />
              <div className="p-3 text-center font-medium bg-[#fff8f5]">{cat.title}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Highlights */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                <p className="text-orange-600 font-semibold mt-1 text-sm">₦{item.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreFrontPage;