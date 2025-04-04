import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import JewellriesBeads from "./pages/BirthdayGiftPage"; // Import the new page
import TravelSection from "./pages/TravelSection"; // Import the new page
import ToteBag from "./pages/ToteBaSec"; // Import the new page
import FashionSection from "./pages/FashionSection"; // Import the new page
import LipGloss from "./pages/LipGloss"; // Import the new page
import Décor from "./pages/Décor"; // Import the new page
import EventsPae from "./pages/EventsPae"; // Import the new page
import HolidaySpecials from "./pages/HolidaySpecials"; // Import the new page
import BirthdayGifts from "./pages/BirthdayGiftPage"; // Import the new page
import Layout from "./components/Layout";
import ProductPage from "./components/productpage"; 
import LandingContent from "./components/LandingContent";


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
    <Router> 
      <NavBar /> {/* NavBar stays on every page */}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection backgroundImage="/images/IMG-20250402-WA0139.jpg" brandName="BOSHAN" /> 
            <LandingContent /> {/* New carousel under the hero section */}
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
      </Routes> 
<Layout children={undefined} /> {/* Wrap the entire app with the Layout component */}
    </Router>
  );
}

export default App;
//     //The  App  component is the main component that renders the navigation bar and the main content.
