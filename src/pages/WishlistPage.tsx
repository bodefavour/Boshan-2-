import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const WishlistPage = () => {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setWishlist(userDoc.data().wishlist || []);
        }
      }
    };

    fetchWishlist();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">You have no items in your wishlist.</p>
      ) : (
        <ul className="space-y-6">
          {wishlist.map((item, index) => (
            <li key={index} className="border-b py-4">
              {item.productId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;