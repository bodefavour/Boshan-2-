import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  category: string;
}

const PreorderCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", category));
        const snapshot = await getDocs(q);
        const items: Product[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="bg-white text-black px-6 md:px-16 py-16 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          {category?.toUpperCase()} COLLECTION
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FFF8F5] p-4 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-3"
                  />
                  <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">₦{product.price}</p>
                  {product.oldPrice && (
                    <p className="text-xs text-gray-500 line-through">₦{product.oldPrice}</p>
                  )}
                  {product.rating && (
                    <p className="text-xs text-yellow-600">⭐ {product.rating} ({product.reviews})</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link to="/" className="text-orange-600 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreorderCategoryPage;