// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface AuthContextType {
  currentUser: User | null;
  userData: any | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [UserData, setUserData] = useState<any | null>(null);
  const auth = getAuth();

  const createUserDocument = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        profile: {
          name: user.displayName || "",
          email: user.email || "",
        },
        cart: [],
        wishlist: [],
        orders: [],
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await createUserDocument(user);
        const UserDoc = await getDoc(doc(db, "users", user.uid));
        if (UserDoc.exists()) {
          setUserData(UserDoc.data());
        } else {
            setUserData(null);
          }
        }
          else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, UserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// This hook provides access to the authentication context, allowing components to access the current user and logout function.
// The `AuthProvider` component wraps the application and provides the authentication context to all child components.
// The `createUserDocument` function creates a user document in Firestore when a new user signs up.
// The `useEffect` hook listens for authentication state changes and updates the current user accordingly.
// The `logout` function allows the user to sign out of their account.
// The `useAuth` hook is used to access the authentication context in other components.
// This context is essential for managing user authentication and user data in the application.