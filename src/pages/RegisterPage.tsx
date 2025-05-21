import React, { useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FcGoogle } from 'react-icons/fc'; 
import { ClipLoader } from 'react-spinners'; 
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { auth } from '../firebaseConfig'; 
import { db } from '../firebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore'; import { toast } from 'react-hot-toast';
import { getDoc } from "firebase/firestore";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import { useLocation } from 'react-router-dom';


const LoginPage = () => { const [isRegister, setIsRegister] = useState(false); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [name, setName] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Correct position
  const redirectPath = (location.state as any)?.from?.pathname || "/account";

  const handleGoogleSignIn = async () => { 
    try { const provider = new GoogleAuthProvider(); 
      const result = await signInWithPopup(auth, provider); 
      const user = result.user; 
      toast.success(`Welcome to Boshan, ${user.displayName || "Glow Queen"}!`);
      navigate(redirectPath);

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          profile: {
            name: user.displayName || "",
            email: user.email || "",
          },
          cart: [],
          wishlist: [],
          orders: [],
        });
      }
    } catch (error) { 
      console.error(error); 
      toast.error('Google Sign-In failed. Try again!'); 
    } 
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login attempt started"); // Debugging line
  
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      console.log("Login successful", user); // Debugging line
      toast.success(`Welcome back to Boshan, ${user.displayName || "Glow Queen"}!`);
  
      // Check if user data exists
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
  
      if (!userSnap.exists()) {
        console.log("User does not exist, creating profile"); // Debugging line
        await setDoc(userDocRef, {
          profile: {
            name: user.displayName || "User",
            email: user.email || "",
          },
          cart: [],
          wishlist: [],
          orders: [],
        });
      }
  
      navigate(redirectPath);
    } catch (error: any) {
      console.error("Login failed", error); // More detailed logging
      toast.error(`Login failed: ${error.message}`);
  
      // Specific error messages based on error code
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };  
  
    
    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
    
        await updateProfile(user, { displayName: name });
    
        await setDoc(doc(db, "users", user.uid), {
          profile: {
            name: name,
            email: email,
            gender: "",
            age: "",
          },
          cart: [],
          wishlist: [],
          orders: [],
        });
    
        toast.success(`Welcome to Boshan, ${name || "Glow Queen"}!`);
        navigate(redirectPath);
      } catch (error: any) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Try logging in.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    

  return ( 
  <div className="min-h-screen flex items-center justify-center bg-[#FFF8F5] px-4 py-16"> 
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"> 
      <div className="hidden md:block bg-orange-100"> 
        <img
          src="/images/IMG-20250402-WA0139.jpg"
          alt="Boshan Visual"
          className="w-full h-full object-cover"
        /> 
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="p-10 flex flex-col justify-center space-y-8"
      >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#C07C6C]">
        {isRegister ? 'Create Your Account' : 'Welcome Back to Boshan'}
      </h2>

      <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} className="space-y-5">
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500"
        />  <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500"
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
      </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
        >
          {loading ? <ClipLoader size={24} color="#fff" /> : isRegister ? 'Create Account' : 'Login'}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-full hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        {isRegister ? 'Sign up with Google' : 'Continue with Google'}
      </button>

      <div className="text-center text-gray-600">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="ml-2 text-orange-500 font-semibold hover:underline"
        >
          {isRegister ? 'Login here' : 'Register'}
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 pt-6">
        <Link to="/" className="hover:underline">
          ← Back to Home
        </Link>
      </div>
    </motion.div>
  </div>
</div>

); };

export default LoginPage;

