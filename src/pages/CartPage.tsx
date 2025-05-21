import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const { currentUser } = useAuth();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartProducts = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const cart = userSnap.exists() ? userSnap.data().cart || [] : [];

    const productPromises = cart.map(async (item: any) => {
      const productId = String(item.productId);
      if (!productId) return null;

      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return {
          ...productSnap.data(),
          id: productId,
          quantity: item.quantity || 1,
        };
      }
      return null;
    });

    const resolvedProducts = await Promise.all(productPromises);
    const validProducts = resolvedProducts.filter(Boolean) as Product[];
    setCartProducts(validProducts);

    // Calculate total
    const total = validProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCartProducts();
  }, [currentUser]);

  const updateCart = async (productId: string, quantity: number) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const cart = userSnap.data().cart || [];
    const updatedCart = cart.map((item: any) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    await updateDoc(userRef, { cart: updatedCart });
    fetchCartProducts(); // refresh
  };

  const removeFromCart = async (productId: string) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const updatedCart = (userSnap.data().cart || []).filter(
      (item: any) => item.productId !== productId
    );

    await updateDoc(userRef, { cart: updatedCart });
    fetchCartProducts(); // refresh
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {cartProducts.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="border-b pb-4 flex items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-700">₦{item.price} × {item.quantity}</p>
                  <div className="flex items-center mt-2 space-x-3">
                    <button
                      onClick={() => updateCart(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCart(item.id, item.quantity + 1)}
                      className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Total */}
          <div className="text-right pt-6 border-t mt-10">
            <h3 className="text-2xl font-semibold">Total: ₦{totalPrice.toLocaleString()}</h3>
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-medium">
              Checkout
            </button>
          </div>
        </div>
      )}

      <Link to="/preorder" className="text-orange-500 underline mt-8 inline-block">
        ← Continue Shopping
      </Link>
    </div>
  );
};

export default CartPage;