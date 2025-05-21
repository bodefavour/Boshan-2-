import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  features?: string[];
  rating?: number;
  reviews?: number;
}

const PreorderCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-black">
      <h1 className="text-4xl font-bold mb-6 capitalize">
        {category?.replace(/-/g, " ")}
      </h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="border rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="mt-3 text-lg font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-500">₦{product.price}</p>
              {product.oldPrice && (
                <p className="text-xs text-gray-400 line-through">
                  ₦{product.oldPrice}
                </p>
              )}
              {product.isNew && (
                <span className="text-xs text-green-600 font-medium">
                  New Arrival
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreorderCategoryPage;
