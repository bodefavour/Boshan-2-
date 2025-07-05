import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const BookConsultationPage = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchUser = async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const profile = userSnap.data().profile;
          setName(profile.name || "");
          setEmail(profile.email || "");
        }
      };
      fetchUser();
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !skinType || concerns.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const consultationData = {
      name,
      email,
      phone,
      skinType,
      concerns,
      date: date.toISOString(),
      method: "Zoom Call",
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to /consultations
      await addDoc(collection(db, "consultations"), consultationData);

      // Save under user history
      const userDoc = doc(db, "users", currentUser!.uid);
      await addDoc(collection(userDoc, "consultationHistory"), consultationData);

      // Update skin type on user profile
      await updateDoc(userDoc, {
        "profile.skinType": skinType,
      });

      toast.success("Consultation booked successfully!");
      navigate("/account");

      // TODO: Trigger email notifications via Firebase Functions or EmailJS
    } catch (err) {
      console.error("Booking failed", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const skinConcernOptions = [
    "Acne",
    "Hyperpigmentation",
    "Dryness",
    "Oily Skin",
    "Dark Spots",
    "Uneven Tone",
    "Wrinkles & Aging",
    "Others",
  ];

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
  <div className="bg-[#FFF8F5] min-h-screen pt-20 px-4 md:px-8">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold text-center text-boshan mb-10"
    >
      Book Your Skin Consultation
    </motion.h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" value={name} readOnly className="input" />
        <input type="email" value={email} readOnly className="input" />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone Number"
          className="input"
        />
        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          required
          className="input"
        >
          <option value="">Select Skin Type</option>
          {["Dry", "Oily", "Combination", "Sensitive", "Normal"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="font-medium mb-2">Skin Concerns (Select all that apply)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skinConcernOptions.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={c}
                checked={concerns.includes(c)}
                onChange={() => toggleConcern(c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Preferred Date & Time</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          timeIntervals={30}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select date and time"
          className="input w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full font-medium"
      >
        Confirm Booking
      </button>
    </form>
  </div>
);
};

export default BookConsultationPage;