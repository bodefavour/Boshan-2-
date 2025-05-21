import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ClipLoader } from "react-spinners";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("No such product!");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={40} color="#C07C6C" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-red-600 py-10">Product not found.</div>;
  }

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductImages images={product.images} />
          <ProductDetails product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;