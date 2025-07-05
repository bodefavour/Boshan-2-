import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AccountPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/account" } });
      return;
    }

    const fetchUserData = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(userSnap.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={40} color="#C07C6C" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 text-black">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Profile Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
        <p><strong>Name:</strong> {profile?.profile?.name || "N/A"}</p>
        <p><strong>Email:</strong> {profile?.profile?.email || "N/A"}</p>
        <p><strong>Gender:</strong> {profile?.profile?.gender || "N/A"}</p>
        <p><strong>Age:</strong> {profile?.profile?.age || "N/A"}</p>
      </section>

      {/* Cart Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Items in Cart</h2>
        {profile?.cart?.length > 0 ? (
          <ul className="space-y-2">
            {profile.cart.map((item: any, index: number) => (
              <li key={index} className="text-sm text-gray-700">
                • Product ID: {item.productId} × {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No items in cart.</p>
        )}
      </section>

      {/* Wishlist Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
        {profile?.wishlist?.length > 0 ? (
          <ul className="space-y-2">
            {profile.wishlist.map((item: any, index: number) => (
              <li key={index} className="text-sm text-gray-700">
                • Product ID: {item.productId}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No items in wishlist.</p>
        )}
      </section>

      {/* Change Password */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <button
          onClick={() => navigate("/change-password")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full"
        >
          Change Password
        </button>
      </section>
    </div>
  );
};

export default AccountPage;