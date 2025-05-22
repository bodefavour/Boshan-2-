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

 {/* Location Selection */}
 <div className="space-y-4">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
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
          <label htmlFor="lga" className="block text-sm font-medium text-gray-700">
            Local Government Area
          </label>
          <select
            id="lga"
            name="lga"
            value={selectedLGA}
            onChange={handleLGAChange}
            disabled={!selectedState}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
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

      {inCart ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateCartQuantity(quantity - 1)}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => updateCartQuantity(quantity + 1)}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={addToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md transition"
            onClick={() => {
              addToCart();
              toast("Redirect to checkout coming soon...");
            }}
          >
            Buy Now
          </button>
        </>
      )}

      {/* Hide Wishlist button if item is in cart */}
      {!inCart && (
        <button
          onClick={addToWishlist}
          className="w-full border border-black py-3 rounded-md hover:bg-gray-100 transition"
        >
          Add to Wishlist
        </button>
      )}
    </div>
  );
};

export default ProductDetails;