import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const SubscribeSetupPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);

  const skinConcerns = [
    "Acne", "Dark Spots", "Oily Skin", "Dry Skin", "Hyperpigmentation", "Wrinkles"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() })) as Product[]
        .filter((p) => p.category === "subscription-boxes");
      setProducts(filtered);
    };
    fetchProducts();
  }, []);

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleProduct = (product: Product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);
    if (exists) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 5) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      toast.error("You can only select up to 5 items");
    }
  };

  const handleSubmit = async () => {
    if (!skinType || concerns.length === 0 || selectedProducts.length === 0) {
      toast.error("Fill all fields and select products");
      return;
    }

    const subscription = {
      userId: currentUser?.uid,
      skinType,
      concerns,
      products: selectedProducts,
      total: selectedProducts.reduce((acc, item) => acc + item.price, 0),
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to /subscriptions
      await addDoc(collection(db, "subscriptions"), subscription);

      // Save to user's history
      await addDoc(collection(doc(db, "users", currentUser!.uid), "subscriptions"), subscription);

      toast.success("Subscription created!");
      navigate("/account");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#FFF8F5] min-h-screen px-6 py-10 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          {step === 1 ? "Tell us about your skin" : "Pick your Box"}
        </h1>

        {step === 1 && (
          <>
            <div>
              <label className="block font-semibold mb-2">Skin Type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="input w-full"
              >
                <option value="">Select Skin Type</option>
                {["Oily", "Dry", "Combination", "Normal", "Sensitive"].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold mb-2">Skin Concerns</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skinConcerns.map((c) => (
                  <label key={c} className="text-sm flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={concerns.includes(c)}
                      onChange={() => toggleConcern(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full"
              onClick={() => setStep(2)}
              disabled={!skinType || concerns.length === 0}
            >
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600">
              Choose 3–5 products for your box
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-3 text-sm cursor-pointer transition ${
                    selectedProducts.find((p) => p.id === product.id)
                      ? "border-orange-600 bg-orange-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-orange-600 font-bold">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right mt-6">
              <button
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full"
                onClick={handleSubmit}
              >
                Confirm Subscription →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribeSetupPage;