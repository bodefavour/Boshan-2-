import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import Layout from "./components/Layout";
import ProductPage from "./components/productpage";
import LandingContent from "./components/LandingContent";
import LandingContents from "./components/LandingContentPreorder";
import PrivateRoute from './components/PrivateRoute';
import AuthPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./context/AuthContext"
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import PreorderCategoryPage from "./pages/PreorderCategoryPage";
import CheckoutSummaryPage from "./pages/CheckoutSummaryPage";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "14px",
              background: "#FFF8F5",
              color: "#222",
              borderRadius: "10px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#C07C6C",
                secondary: "#fff",
              },
            },
          }}
        />

        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection
                backgroundImage="/images/IMG-20250402-WA0139.jpg"
                brandName="Boshan"
                ctaText="For less than the cost of another failed Serum, Boshan sends you dermatologist-backed, Afrocentric beauty products right to your door. No stress. No guesswork. Just glow"
                ctaButton="Shop Now"
                onCtaClick={() => console.log("CTA Clicked")}
              >
                <p className="text-lg">Glowing Skin. Zero Guesswork. Delivered Monthly.</p>
              </HeroSection>
              <LandingContent />
            </>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/Preorder-items" element={<>
            <HeroSection backgroundImage="/images/IMG-20250402-WA0139.jpg" brandName="BOSHAN" />
            <ProductGrid />
          </>
          } />
          <Route path="/AccountPage" element={<PrivateRoute> <AccountPage /> </PrivateRoute>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/preorder/:category" element={<PreorderCategoryPage />} />
          <Route path="/cart" element={<PrivateRoute> <CartPage /> </PrivateRoute>} />
          <Route path="/wishlist" element={<PrivateRoute> <WishlistPage /> </PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute> <CheckoutSummaryPage /> </PrivateRoute>} />
          <Route path="/Oldpa" element={<>
            <HeroSection
              backgroundImage="/images/IMG-20250402-WA0139.jpg"
              brandName="Boshan"
              ctaText="For less than the cost of another failed Serum, Boshan sends you dermatologist-backed, Afrocentric beauty products right to your door. No stress. No guesswork. Just glow"
              ctaButton="Start Your Glow Journey"
              onCtaClick={() => console.log("CTA Clicked")}
            >
              <p className="text-lg">Glowing Skin. Zero Guesswork. Delivered Monthly.</p>
            </HeroSection>
            <LandingContents />
          </>
          } />
        </Routes>
        <Layout children={undefined} />
      </Router>
    </AuthProvider>
  );
}

export default App;
