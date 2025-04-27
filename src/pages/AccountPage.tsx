import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig"; // adjust this path if needed

initializeApp(firebaseConfig);
const auth = getAuth();

const AccountPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            window.location.href = "/"; // redirect to homepage or dashboard
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-[#fff8f5] p-8 rounded-2xl shadow-xl text-center"
            >
                <h2 className="text-3xl font-bold text-[#C07C6C] mb-6">
                    {isLogin ? "Login to Your Boshan Account" : "Create Your Boshan Account"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#C07C6C] text-white py-2 rounded hover:bg-opacity-90"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <p className="text-sm mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[#C07C6C] font-bold hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default AccountPage;
