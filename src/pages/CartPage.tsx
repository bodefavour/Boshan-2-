import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setCartItems(userDoc.data().cart || []);
        }
      }
    };

    fetchCart();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item, index) => (
            <li key={index} className="border-b py-4 flex justify-between">
              <span>{item.productId}</span>
              <span>Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <Link to="/preorder" className="text-orange-500 underline mt-8 inline-block">
        ← Continue Shopping
      </Link>
    </div>
  );
};

export default CartPage;