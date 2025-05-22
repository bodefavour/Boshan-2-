import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutSummaryPage = () => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({ state: "", lga: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const cartData = userSnap.exists() ? userSnap.data().cart || [] : [];

      const productPromises = cartData.map(async (item: any) => {
        const productSnap = await getDoc(doc(db, "products", item.productId));
        if (productSnap.exists()) {
          return {
            ...productSnap.data(),
            id: item.productId,
            quantity: item.quantity || 1,
          };
        }
        return null;
      });

      const resolved = await Promise.all(productPromises);
      const validCart = resolved.filter(Boolean) as Product[];
      setCart(validCart);

      const totalPrice = validCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalPrice);

      // Assume shipping details exist on the first item
      if (cartData.length > 0) {
        setShippingInfo({
          state: cartData[0].state || "",
          lga: cartData[0].lga || "",
        });
      }
    };

    fetchCart();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout Summary</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-lg">State: <span className="font-medium">{shippingInfo.state}</span></p>
          <p className="text-lg">LGA: <span className="font-medium">{shippingInfo.lga}</span></p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="py-4 flex items-center gap-4">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
              </Link>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">₦{item.price.toLocaleString()} × {item.quantity}</p>
              </div>
              <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
            </li>
          ))}
        </ul>

        <div className="text-right mt-6">
          <p className="text-lg font-semibold">Subtotal: ₦{total.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Delivery Fee: ₦1,500</p>
          <p className="text-xl font-bold mt-2">Total: ₦{(total + 1500).toLocaleString()}</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <p className="text-gray-700 mb-4">Choose your preferred payment method to proceed.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md shadow-md transition">Pay with Card</button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-md transition">Pay on Delivery</button>
        </div>
      </section>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-orange-600 underline"
        >
          ← Continue Shopping
        </button>
        <button
          onClick={() => navigate("/payment-confirmation")}
          className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummaryPage;