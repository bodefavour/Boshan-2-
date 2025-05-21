interface Props {
  product: any;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="text-xl text-gray-700">₦{product.price}</p>
      {product.oldPrice && (
        <p className="line-through text-gray-400">₦{product.oldPrice}</p>
      )}
      <p className="text-gray-600">{product.description}</p>

      <ul className="text-sm text-gray-500 space-y-1">
        {product.features?.map((feature: string, index: number) => (
          <li key={index}>🔸 {feature}</li>
        ))}
      </ul>

      <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
        Add to Cart
      </button>

      <button className="w-full border border-black py-3 rounded-md hover:bg-gray-100 transition">
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductDetails;