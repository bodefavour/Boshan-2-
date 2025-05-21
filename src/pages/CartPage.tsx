import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const cart = userSnap.exists() ? userSnap.data().cart || [] : [];

      const productPromises = cart.map(async (item: any) => {
        const productId = String(item.productId); // Ensure it's a string
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
    };

    fetchCartProducts();
  }, [currentUser]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cartProducts.map((item) => (
            <li key={item.id} className="border-b pb-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-700">₦{item.price} × {item.quantity}</p>
              </div>
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