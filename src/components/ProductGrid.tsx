import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ProductFilter from "./ProductFilter";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  features?: string[];
  rating?: number;
  reviews?: number;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  interface Filters {
    sort?: "lowToHigh" | "highToLow";
    priceRange?: string;
  }

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
        setFilteredProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters: Filters) => {
    let updatedProducts = products;

    if (filters.sort === "lowToHigh") {
      updatedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "highToLow") {
      updatedProducts = [...products].sort((a, b) => b.price - a.price);
    }

    if (filters.priceRange) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price <= Number(filters.priceRange)
      );
    }

    setFilteredProducts(updatedProducts);
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <section className="py-6 px-4 md:py-12 md:px-6">
      {/* Filter Component */}
      <ProductFilter onFilterChange={handleFilterChange} />

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border border-gray-300 p-2 rounded-md shadow hover:shadow-lg transition">
            {/* Product Image */}
            <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            </Link>

            {/* "New Arrival" Badge */}
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                New Arrival
              </span>
            )}

            {/* Product Name */}
            <h3 className="text-sm font-medium mt-2">{product.name}</h3>

            {/* Product Features */}
            <div className="text-xs text-gray-600 flex flex-col gap-1">
              {product.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-black">⚫</span> {feature}
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex justify-between items-center text-sm font-bold mt-2">
              <span className="text-black">₦{product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-500 text-xs">
                  ₦{product.oldPrice}
                </span>
              )}
            </div>

            {/* Star Rating */}
            {product.rating !== undefined && (
              <div className="flex items-center text-xs mt-1">
                <span className="text-green-500 font-bold">{product.rating}</span>
                <span className="text-green-500 ml-1">★</span>
                <span className="text-gray-500 ml-1">({product.reviews})</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;