import React, { useState } from "react"; import { AdjustmentsIcon, XIcon } from "@heroicons/react/outline";

const ProductFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => { const [filters, setFilters] = useState({ priceRange: "", category: "", sort: "newest", line: "", color: "", material: "", });

const [isOpen, setIsOpen] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => { const { name, value } = e.target; setFilters((prevFilters) => { const newFilters = { ...prevFilters, [name]: value }; onFilterChange(newFilters); return newFilters; }); };

return ( <div className="w-full max-w-7xl mx-auto py-2 border-b border-gray-300 flex items-center justify-between"> <h2 className="text-lg font-medium whitespace-nowrap hidden md:block">Filter Products</h2>

{/* Mobile Filter Button */}
  <button 
    className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm"
    onClick={() => setIsOpen(true)}
  >
    <AdjustmentsIcon className="w-6 h-6" />
    <span>Filters</span>
  </button>
  
  {/* Desktop Filters */}
  <div className="hidden md:flex flex-wrap items-center gap-3">
    <select name="sort" value={filters.sort} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm">
      <option value="newest">Newest</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
    <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32" />
    <input type="text" name="line" placeholder="Line" value={filters.line} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32" />
    <input type="text" name="color" placeholder="Color" value={filters.color} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32" />
    <input type="text" name="material" placeholder="Material" value={filters.material} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32" />
    <input type="number" name="priceRange" placeholder="Max Price" value={filters.priceRange} onChange={handleChange} className="px-3 py-2 border border-gray-400 rounded-md bg-transparent text-sm w-32" />
    <button onClick={() => onFilterChange(filters)} className="px-4 py-2 bg-black text-white rounded-md text-sm">Apply Filters</button>
  </div>
  
  {/* Mobile Filter Modal */}
  {isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-4/5 max-w-md shadow-lg relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 p-2">
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-bold mb-4">Filter Products</h3>
        <select name="sort" value={filters.sort} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2">
          <option value="newest">Newest</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2" />
        <input type="text" name="line" placeholder="Line" value={filters.line} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2" />
        <input type="text" name="color" placeholder="Color" value={filters.color} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2" />
        <input type="text" name="material" placeholder="Material" value={filters.material} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2" />
        <input type="number" name="priceRange" placeholder="Max Price" value={filters.priceRange} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2" />
        <button onClick={() => { onFilterChange(filters); setIsOpen(false); }} className="w-full px-4 py-2 bg-black text-white rounded-md">Apply Filters</button>
      </div>
    </div>
  )}
</div>

); };

export default ProductFilter;