import React, { useState } from "react"; import ProductFilter from "./ProductFilter";

interface Product { id: number; name: string; price: number; image: string; }

interface ProductGridProps { products: Product[]; }

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => { const [filteredProducts, setFilteredProducts] = useState(products);

interface Filters { sort?: "lowToHigh" | "highToLow"; priceRange?: string; }

const handleFilterChange = (filters: Filters) => { let updatedProducts = products;

if (filters.sort === "lowToHigh") {
  updatedProducts = [...products].sort((a, b) => a.price - b.price);
} else if (filters.sort === "highToLow") {
  updatedProducts = [...products].sort((a, b) => b.price - a.price);
}

if (filters.priceRange) {
  updatedProducts = updatedProducts.filter((p) => p.price <= Number(filters.priceRange));
}

setFilteredProducts(updatedProducts);

};

return ( <section className="py-6 px-4 md:py-12 md:px-6"> <ProductFilter onFilterChange={handleFilterChange} />

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    {filteredProducts.map((product) => (
      <div key={product.id} className="relative group bg-white shadow-md rounded-md p-2 md:p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 md:h-64 object-cover rounded-md transition-transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
          <h3 className="text-white text-sm md:text-lg font-semibold">{product.name}</h3>
          <p className="text-white text-xs md:text-md font-bold">${product.price}</p>
        </div>
      </div>
    ))}
  </div>
</section>

); };

export default ProductGrid;