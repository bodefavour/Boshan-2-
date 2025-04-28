// src/pages/AuthPage.tsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; //anyhow
import { FaFacebookF } from "react-icons/fa";

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F5] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#C07C6C]">
          {isRegistering ? "Create your Boshan Account" : "Welcome Back to Boshan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#C07C6C] hover:bg-[#b06e5f] transition text-white font-semibold py-3 rounded-lg"
          >
            {isRegistering ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Social login buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <button
            onClick={handleFacebookSignIn}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaFacebookF className="text-blue-600 text-2xl" />
            Continue with Facebook
          </button>
        </div>

        {/* Toggle between login and register */}
        <p className="text-center text-sm text-gray-500">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-[#C07C6C] cursor-pointer font-semibold"
              >
                Login
              </span>
            </>
          ) : (
            <>
              New to Boshan?{" "}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-[#C07C6C] cursor-pointer font-semibold"
              >
                Create Account
              </span>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;