import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const WishlistPage = () => {
  const { currentUser } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const wishlist = userSnap.exists() ? userSnap.data().wishlist || [] : [];

      const productPromises = wishlist.map(async (item: any) => {
        const productSnap = await getDoc(doc(db, "products", item.productId));
        if (productSnap.exists()) {
          return { ...productSnap.data(), id: item.productId };
        }
        return null;
      });

      const resolvedProducts = await Promise.all(productPromises);
      const validProducts = resolvedProducts.filter(Boolean) as Product[];
      setWishlistProducts(validProducts);
    };

    fetchWishlist();
  }, [currentUser]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((item) => (
            <li key={item.id} className="text-center">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
              <h4 className="mt-2 font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">₦{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;