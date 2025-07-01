import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import Layout from "./components/Layout";
import ProductPage from "./components/productpage";
// import LandingContent from "./components/LandingContent";
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
import StoreFrontPage from "./components/StoreFrontPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import '@fortawesome/fontawesome-free/css/all.min.css';
import ConsultationBookingPage from "./pages/ConsultationBookingPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
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
          {/* <Route path="/" element={
            <>
              <HeroSection
                backgroundImage="/images/heroimage.png"
                brandName="Boshan"
                ctaText="For less than the cost of another failed Serum, Boshan sends you dermatologist-backed, Afrocentric beauty products right to your door. No stress. No guesswork. Just glow"
                ctaButton="Shop Now"
                onCtaClick={() => console.log("CTA Clicked")}
              >
                <p className="text-lg">Glowing Skin. Zero Guesswork. Delivered Monthly.</p>
              </HeroSection>
              <LandingContent />
            </>
          } /> */}
          <Route path="/auth" element={<AuthPage />} /><Route path="/preorder/skin-therapy-and-consultations" element={<ConsultationBookingPage />} />

          <Route path="/Preorder-items" element={<>
            <HeroSection backgroundImage="/images/heroimage.png" brandName="BOSHAN" />
            <ProductGrid />
          </>
          } />
          <Route path="/AccountPage" element={<PrivateRoute> <AccountPage /> </PrivateRoute>} />
          <Route path="/preorder/skin-therapy-and-consultations" element={<PrivateRoute> <PreorderCategoryPage /> </PrivateRoute>} />
          <Route path="/preorder/skinfood-and-nutrition" element={<PrivateRoute> <PreorderCategoryPage /> </PrivateRoute>} />
          <Route path="/preorder/subscription-boxes" element={<PrivateRoute> <PreorderCategoryPage /> </PrivateRoute>} />
          <Route path="/store" element={<StoreFrontPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/preorder/:category" element={<PreorderCategoryPage />} />
          <Route path="/cart" element={<PrivateRoute> <CartPage /> </PrivateRoute>} />
          <Route path="/wishlist" element={<PrivateRoute> <WishlistPage /> </PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute> <CheckoutSummaryPage /> </PrivateRoute>} />
          <Route path="/" element={<>
            <HeroSection
              backgroundImage="/images/heroimage.png"
              brandName="Boshan"
              ctaText="For less than the cost of another failed Serum, Boshan sends you dermatologist-backed, Afrocentric beauty products right to your door"
              ctaButton="Start Your Glow Journey"
              onCtaClick={() => console.log("CTA Clicked")}
            >
              <p className="text-lg">First beauty club of Nigeria.</p>
            </HeroSection>
            <LandingContents />
          </>
          } />
        </Routes>
        <Layout children={undefined} />
      </Router>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
