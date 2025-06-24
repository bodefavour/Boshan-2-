import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

interface Props {
  product: any;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const { currentUser } = useAuth();
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchCartStatus = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const cart = userSnap.exists() ? userSnap.data().cart || [] : [];

      const item = cart.find((item: any) => item.productId === product.id);
      if (item) {
        setInCart(true);
        setQuantity(item.quantity || 1);
      } else {
        setInCart(false);
        setQuantity(0);
      }
    };

    fetchCartStatus();
  }, [currentUser, product.id]);

  const addToCart = async () => {
    if (!currentUser) {
      toast.error("Please log in to add to cart.");
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const currentCart = userSnap.exists() ? userSnap.data().cart || [] : [];

    const exists = currentCart.some((item: any) => item.productId === product.id);
    if (exists) return;

    const newCart = [
      ...currentCart,
      { productId: product.id, quantity: 1, addedAt: new Date().toISOString() },
    ];

    try {
      await updateDoc(userRef, { cart: newCart });
      toast.success("Added to cart!");
      setInCart(true);
      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart.");
    }
  };

  const updateCartQuantity = async (newQuantity: number) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const cart = userSnap.exists() ? userSnap.data().cart || [] : [];

    if (newQuantity < 1) {
      const updatedCart = cart.filter((item: any) => item.productId !== product.id);
      await updateDoc(userRef, { cart: updatedCart });
      toast("Removed from cart.");
      setInCart(false);
      setQuantity(0);
    } else {
      const updatedCart = cart.map((item: any) =>
        item.productId === product.id ? { ...item, quantity: newQuantity } : item
      );

      await updateDoc(userRef, { cart: updatedCart });
      setQuantity(newQuantity);
    }
  };

  const addToWishlist = async () => {
    if (!currentUser) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const currentWishlist = userSnap.exists() ? userSnap.data().wishlist || [] : [];

    const exists = currentWishlist.some((item: any) => item.productId === product.id);
    if (exists) {
      toast("Already in wishlist.");
      return;
    }

    try {
      await updateDoc(userRef, {
        wishlist: [
          ...currentWishlist,
          { productId: product.id, addedAt: new Date().toISOString() },
        ],
      });
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error("Failed to add to wishlist.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-boshan">{product.name}</h1>
      <p className="text-2xl text-black font-semibold">₦{product.price.toLocaleString()}</p>
      {product.oldPrice && (
        <p className="text-gray-400 line-through">₦{product.oldPrice.toLocaleString()}</p>
      )}

      <div className="text-sm text-gray-600 space-y-2">
        <p>{product.description}</p>
        <ul className="list-disc pl-5">
          {product.features?.map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4 space-y-4 text-sm text-gray-700">
        <div><strong>Skin Type:</strong> All</div>
        <div><strong>Texture:</strong> Smooth & Non-greasy</div>
        <div><strong>Recommended Use:</strong> Apply morning and night to clean skin.</div>
        <div><strong>Estimated Delivery:</strong> 1–3 working days in Nigeria.</div>
      </div>

      {inCart ? (
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateCartQuantity(quantity - 1)}
            className="bg-gray-200 px-4 py-2 rounded-full"
          >−</button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => updateCartQuantity(quantity + 1)}
            className="bg-gray-200 px-4 py-2 rounded-full"
          >+</button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={addToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >Add to Cart</button>

          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md transition"
            onClick={() => {
              addToCart();
              toast("Redirect to checkout coming soon...");
            }}
          >Buy Now</button>
        </div>
      )}

      {!inCart && (
        <button
          onClick={addToWishlist}
          className="w-full border border-black py-3 rounded-md hover:bg-gray-100 transition"
        >Add to Wishlist</button>
      )}
    </div>
  );
};

export default ProductDetails;