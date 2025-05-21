import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useCartCount = () => {
  const { currentUser } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      setCount(0); // Reset count when user logs out
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const cart = docSnap.data().cart || [];
        setCount(cart.length);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return count;
};

export default useCartCount;