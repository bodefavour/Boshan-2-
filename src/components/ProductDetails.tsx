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
      setSelectedLGA("");
    }
  }, [selectedState]);

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
    if (!currentUser) return toast.error("Please log in to add to cart.");
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
      setInCart(false);
      setQuantity(0);
      toast("Removed from cart.");
    } else {
      const updatedCart = cart.map((item: any) =>
        item.productId === product.id ? { ...item, quantity: newQuantity } : item
      );
      await updateDoc(userRef, { cart: updatedCart });
      setQuantity(newQuantity);
    }
  };

  const addToWishlist = async () => {
    if (!currentUser) return toast.error("Please log in to add to wishlist.");
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const currentWishlist = userSnap.exists() ? userSnap.data().wishlist || [] : [];

    const exists = currentWishlist.some((item: any) => item.productId === product.id);
    if (exists) return toast("Already in wishlist.");

    try {
      await updateDoc(userRef, {
        wishlist: [
          ...currentWishlist,
          { productId: product.id, addedAt: new Date().toISOString() },
        ],
      });
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist.");
    }
  };

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="space-y-1">
        <p className="text-2xl font-semibold text-orange-600">₦{product.price.toLocaleString()}</p>
        {product.oldPrice && (
          <p className="line-through text-gray-500 text-sm">₦{product.oldPrice.toLocaleString()}</p>
        )}
      </div>

      <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

      <ul className="list-disc ml-5 text-sm text-gray-600">
        {product.features?.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Location Dropdown */}
      <div className="space-y-4 pt-4">
        <div>
          <label className="text-sm font-medium">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select a state</option>
            {statesData.map((state) => (
              <option key={state.state} value={state.state}>{state.state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Local Government Area</label>
          <select
            value={selectedLGA}
            onChange={(e) => setSelectedLGA(e.target.value)}
            disabled={!selectedState}
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select an LGA</option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 space-y-3">
        {inCart ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateCartQuantity(quantity - 1)}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >−</button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => updateCartQuantity(quantity + 1)}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >+</button>
          </div>
        ) : (
          <>
            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
            >Add to Cart</button>

            <button
              onClick={() => {
                addToCart();
                toast("Redirect to checkout coming soon...");
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md"
            >Buy Now</button>
          </>
        )}

        {!inCart && (
          <button
            onClick={addToWishlist}
            className="w-full border border-black py-3 rounded-md hover:bg-gray-100"
          >Add to Wishlist</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;