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

  const [receiverName, setReceiverName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

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
    if (!selectedState || !selectedLGA || !receiverName || !phoneNumber || !deliveryAddress) {
      return toast.error("Please fill in all required delivery details.");
    }

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const currentCart = userSnap.exists() ? userSnap.data().cart || [] : [];

    const exists = currentCart.some((item: any) => item.productId === product.id);
    if (exists) return;

    const newCart = [
      ...currentCart,
      {
        productId: product.id,
        quantity: 1,
        addedAt: new Date().toISOString(),
        state: selectedState,
        lga: selectedLGA,
        receiver: receiverName,
        phone: phoneNumber,
        address: deliveryAddress,
        note: deliveryNote,
      },
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

  const updateCartQuantity = async (newQty: number) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const cart = userSnap.exists() ? userSnap.data().cart || [] : [];

    if (newQty < 1) {
      const updatedCart = cart.filter((item: any) => item.productId !== product.id);
      await updateDoc(userRef, { cart: updatedCart });
      toast("Removed from cart.");
      setInCart(false);
      setQuantity(0);
    } else {
      const updatedCart = cart.map((item: any) =>
        item.productId === product.id ? { ...item, quantity: newQty } : item
      );
      await updateDoc(userRef, { cart: updatedCart });
      setQuantity(newQty);
    }
  };

  const addToWishlist = async () => {
    if (!currentUser) return toast.error("Please log in to add to wishlist.");

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const currentWishlist = userSnap.exists() ? userSnap.data().wishlist || [] : [];

    const exists = currentWishlist.some((item: any) => item.productId === product.id);
    if (exists) return toast("Already in wishlist.");

    await updateDoc(userRef, {
      wishlist: [
        ...currentWishlist,
        { productId: product.id, addedAt: new Date().toISOString() },
      ],
    });
    toast.success("Added to wishlist!");
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

      {/* Delivery Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select State</option>
            {statesData.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LGA</label>
          <select
            value={selectedLGA}
            onChange={(e) => setSelectedLGA(e.target.value)}
            disabled={!selectedState}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select LGA</option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="Enter full name"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 08012345678"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Note (Optional)</label>
          <textarea
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Action Buttons */}
      {inCart ? (
        <div className="flex items-center space-x-3 mt-4">
          <button
            onClick={() => updateCartQuantity(quantity - 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            −
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => updateCartQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            +
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={addToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition mt-4"
          >
            Add to Cart
          </button>
          <button
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md transition"
            onClick={() => {
              addToCart();
              toast("Redirect to checkout coming soon...");
            }}
          >
            Buy Now
          </button>
        </>
      )}

      {!inCart && (
        <button
          onClick={addToWishlist}
          className="w-full mt-2 border border-black py-3 rounded-md hover:bg-gray-100 transition"
        >
          Add to Wishlist
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
