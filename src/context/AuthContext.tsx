// src/context/AuthContext.tsx 
import React, { createContext, useContext, useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
const [currentUser, setCurrentUser] = useState<User | null>(null); 
const auth = getAuth();

useEffect(() => { 
const unsubscribe = onAuthStateChanged(auth, (user) => { setCurrentUser(user); }); return () => unsubscribe(); }, [auth]);

const logout = () => signOut(auth);

return ( 
<AuthContext.Provider value={{ currentUser, logout }}> 
{children} 
</AuthContext.Provider> ); };

export const useAuth = () => useContext(AuthContext);