import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<any>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setProfile(data.profile || {});
        const cart = data.cart || [];
        const wishlist = data.wishlist || [];

        const cartDetails = await Promise.all(
          cart.map(async (item: any) => {
            const productRef = doc(db, "products", item.productId);
            const productSnap = await getDoc(productRef);
            return productSnap.exists()
              ? { ...productSnap.data(), quantity: item.quantity }
              : null;
          })
        );

        const wishlistDetails = await Promise.all(
          wishlist.map(async (item: any) => {
            const productRef = doc(db, "products", item.productId);
            const productSnap = await getDoc(productRef);
            return productSnap.exists() ? productSnap.data() : null;
          })
        );

        setCartItems(cartDetails.filter(Boolean));
        setWishlistItems(wishlistDetails.filter(Boolean));
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6 py-20">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Please log in to view your account.</h2>
          <Link
            to="/login"
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-black space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Link
          to="/store"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm"
        >
          Start Shopping →
        </Link>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2 text-boshan">Profile Information</h2>
        <p><strong>Name:</strong> {profile.name || "—"}</p>
        <p><strong>Email:</strong> {profile.email || "—"}</p>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-100">
        <h2 className="text-xl font-semibold text-boshan">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border rounded-md p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-600">₦{item.price?.toLocaleString()} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Items */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-100">
        <h2 className="text-xl font-semibold text-boshan">Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">No items in wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border rounded-md p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-600">₦{item.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="text-center">
        <Link
          to="/change-password"
          className="text-sm text-orange-600 underline hover:text-orange-800"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;