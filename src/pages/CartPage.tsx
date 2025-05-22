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
  const [rawCart, setRawCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartProducts = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const cart = userSnap.exists() ? userSnap.data().cart || [] : [];
    setRawCart(cart); // Needed for updates

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

    const total = validProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCartProducts();
  }, [currentUser]);

  const updateCart = async (productId: string, quantity: number) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);

    const updatedCart = rawCart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    await updateDoc(userRef, { cart: updatedCart });
    fetchCartProducts();
  };

  const removeFromCart = async (productId: string) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);

    const updatedCart = rawCart.filter((item) => item.productId !== productId);

    await updateDoc(userRef, { cart: updatedCart });
    fetchCartProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-black">
      <h2 className="text-4xl font-bold mb-10">Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            <AnimatePresence>
              {cartProducts.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-6 border-b pb-6"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    </Link>
                    <p className="text-sm text-gray-600">
                      ₦{item.price.toLocaleString()} × {item.quantity}
                    </p>
                    <div className="flex items-center mt-3 space-x-2">
                      <button
                        onClick={() => updateCart(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 text-lg flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCart(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 text-lg flex items-center justify-center"
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
            <div className="text-right pt-8 border-t mt-12">
              <h3 className="text-2xl font-bold">
                Total: ₦{totalPrice.toLocaleString()}
              </h3>
              <Link to="/checkout">
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => window.history.back()}
        className="text-orange-500 underline mt-10 inline-block"
      >
        ← Continue Shopping
      </button>
    </div>
  );
};

export default CartPage;