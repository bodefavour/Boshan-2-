import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import statesData from "../data/statesAndLgas.json";

interface Props {
  product: any;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const { currentUser } = useAuth();
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      const state = statesData.find((s) => s.state === selectedState);
      setLgas(state ? state.lgas : []);
      setSelectedLGA(""); // Reset LGA when state changes
    }
  }, [selectedState]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleLGAChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLGA(e.target.value);
  };

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

  useEffect(() => {
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
      { productId: product.id, quantity: 1, addedAt: new Date().toISOString(), state: selectedState, lga: selectedLGA },
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
      // Remove from cart
      const updatedCart = cart.filter((item: any) => item.productId !== product.id);
      await updateDoc(userRef, { cart: updatedCart });
      toast("Removed from cart.");
      setInCart(false);
      setQuantity(0);
    } else {
      // Update quantity
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
    <div className="max-w-5xl mx-auto p-6 md:p-10 grid md:grid-cols-2 gap-10 items-start text-black">
      {/* Left – Product Image */}
      <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
      </div>

      {/* Right – Details */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <p className="text-2xl text-orange-600 font-semibold">₦{product.price.toLocaleString()}</p>
            {product.oldPrice && (
              <p className="line-through text-gray-400 text-lg">₦{product.oldPrice.toLocaleString()}</p>
            )}
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {/* Features */}
        {product.features?.length > 0 && (
          <ul className="space-y-1 text-sm text-gray-700">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">🔸 {feature}</li>
            ))}
          </ul>
        )}

        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">State</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select a state</option>
              {statesData.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Local Government</label>
            <select
              value={selectedLGA}
              onChange={handleLGAChange}
              disabled={!selectedState}
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select an LGA</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cart Interaction */}
        {inCart ? (
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => updateCartQuantity(quantity - 1)}
              className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 text-xl"
            >
              −
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => updateCartQuantity(quantity + 1)}
              className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 text-xl"
            >
              +
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-4">
            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition font-medium shadow-md"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart();
                toast("Redirect to checkout coming soon...");
              }}
              className="w-full bg-orange-600 text-white py-3 rounded-full hover:bg-orange-700 transition font-medium shadow-md"
            >
              Buy Now
            </button>
          </div>
        )}

        {/* Wishlist */}
        {!inCart && (
          <button
            onClick={addToWishlist}
            className="w-full border border-black text-black py-3 rounded-full hover:bg-gray-100 transition"
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );

};

export default ProductDetails;