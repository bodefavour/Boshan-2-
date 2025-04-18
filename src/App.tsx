import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import JewellriesBeads from "./pages/BirthdayGiftPage";
import TravelSection from "./pages/TravelSection";
import ToteBag from "./pages/ToteBaSec";
import FashionSection from "./pages/FashionSection";
import LipGloss from "./pages/LipGloss";
import Décor from "./pages/Décor";
import EventsPae from "./pages/EventsPae";
import HolidaySpecials from "./pages/HolidaySpecials";
import BirthdayGifts from "./pages/BirthdayGiftPage";
import Layout from "./components/Layout";
import ProductPage from "./components/productpage";
import LandingContent from "./components/LandingContent";
import LandingContents from "./components/LandingContentPreorder";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const sampleProducts = [
    { id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
{ id: 1, name: "Red Gown", price: 599.99, oldPrice: 30000, image: "/images/31343C.svg", path: "./Product-page", features: ["Bluetooth 5.0", "Long battery life", "Noise cancellation"],
    isNew: true,
    rating: 4.5,
    reviews: 120 },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },// Add more products
  ];

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection backgroundImage="/images/IMG-20250402-WA0139.jpg" brandName="BOSHAN" />
              <LandingContent />
            </>
          } />
          <Route path="/birthday-gifts" element={<BirthdayGifts />} />
          <Route path="/Jewellries-Beads" element={<JewellriesBeads />} />
          <Route path="/Fashion" element={<FashionSection />} />
          <Route path="/travel-section" element={<TravelSection />} />
          <Route path="/tote-bags" element={<ToteBag />} />
          <Route path="/Lip-gloss" element={<LipGloss />} />
          <Route path="/Decor" element={<Décor />} />
          <Route path="/Events" element={<EventsPae />} />
          <Route path="/Holiday-Specials" element={<HolidaySpecials />} />
          <Route path="/Product-page" element={<ProductPage />} />
          <Route path="/Oldpa" element={<LandingContents />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
        </Routes>
        <Layout children={undefined} />
      </Router>
    </AuthProvider>
  );
}

export default App;