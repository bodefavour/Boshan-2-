// src/pages/ThankYouPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/payment-confirmation");
    }, 4000); // Redirect after 4 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col items-center justify-center text-center text-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <img src="/images/glow-animation.gif" alt="Thank you" className="w-36 mx-auto" />
        <h1 className="text-2xl md:text-4xl font-bold text-orange-600">Thank You!</h1>
        <p className="text-sm md:text-base max-w-md mx-auto">
          Your payment was successful and your order is being prepared.
        </p>
        <p className="text-boshan font-semibold text-md">Now it’s time to glow ✨</p>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;