import React, { useState } from "react";

const ProductFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    priceRange: "",
    category: "",
    sort: "newest",
    line: "",
    color: "",
    material: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 border-b border-gray-300 flex items-center justify-between">
      <h2 className="text-lg font-medium whitespace-nowrap">Filter Products</h2>
      
      <div className="flex flex-wrap items-center gap-3">
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm"
        >
          <option value="newest">Newest</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32"
        />

        <input
          type="text"
          name="line"
          placeholder="Line"
          value={filters.line}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32"
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={filters.color}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32"
        />

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={filters.material}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32"
        />

        <input
          type="number"
          name="priceRange"
          placeholder="Max Price"
          value={filters.priceRange}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32"
        />

        <button
          onClick={() => onFilterChange(filters)}
          className="px-4 py-2 bg-black text-white rounded-md text-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
