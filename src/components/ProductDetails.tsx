import React from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { toast } from "react-hot-toast";

interface Props {
  product: any;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const { currentUser } = useAuth();

  const addToCart = async () => {
    if (!currentUser) {
      toast.error("Please log in to add to cart.");
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);

    try {
      await updateDoc(userRef, {
        cart: arrayUnion({
          productId: product.id,
          quantity: 1,
          addedAt: new Date().toISOString(),
        }),
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart.");
    }
  };

  const addToWishlist = async () => {
    if (!currentUser) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);

    try {
      await updateDoc(userRef, {
        wishlist: arrayUnion({
          productId: product.id,
          addedAt: new Date().toISOString(),
        }),
      });
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error("Failed to add to wishlist.");
    }
  };

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

      <button
        onClick={addToCart}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>

      <button
        onClick={addToWishlist}
        className="w-full border border-black py-3 rounded-md hover:bg-gray-100 transition"
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductDetails;