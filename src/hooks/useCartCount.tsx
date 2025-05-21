import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useCartCount = () => {
  const { currentUser } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const cart = userDoc.data().cart || [];
          setCount(cart.length);
        }
      }
    };

    fetchCart();
  }, [currentUser]);

  return count;
};

export default useCartCount;