import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  features?: string[];
  rating?: number;
  reviews?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block border border-gray-300 p-2 hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full object-cover" />
      {product.isNew && (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New Arrival</span>
      )}
      <h3 className="text-sm font-medium mt-2">{product.name}</h3>
      <div className="text-xs text-gray-600 flex flex-col gap-1">
        {product.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-black">⚫</span> {feature}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm font-bold mt-2">
        <span className="text-black">₦{product.price}</span>
        {product.oldPrice && (
          <span className="line-through text-gray-500 text-xs">₦{product.oldPrice}</span>
        )}
      </div>
      {product.rating !== undefined && (
        <div className="flex items-center text-xs mt-1">
          <span className="text-green-500 font-bold">{product.rating}</span>
          <span className="text-green-500 ml-1">★</span>
          <span className="text-gray-500 ml-1">({product.reviews})</span>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;