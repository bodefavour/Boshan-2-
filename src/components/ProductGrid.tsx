import React, { useState } from "react";
import ProductFilter from "./ProductFilter";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  features: string[];
  rating?: number;
  reviews?: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  interface Filters {
    sort?: "lowToHigh" | "highToLow";
    priceRange?: string;
  }

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

  return (
    <section className="py-6 px-4 md:py-12 md:px-6">
      {/* Filter Component */}
      <ProductFilter onFilterChange={handleFilterChange} />

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border border-gray-300 p-2">
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover"
            />

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
              {product.features.map((feature, index) => (
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