import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const PaymentConfirmationPage = () => {
  const { currentUser } = useAuth();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!currentUser) return;
      const orderRef = collection(db, "users", currentUser.uid, "orders");
      const q = query(orderRef, orderBy("createdAt", "desc"), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setOrder(snap.docs[0].data());
      }
    };
    fetchLatestOrder();
  }, [currentUser]);

  const handleDownload = () => {
    if (!order) return;
    const doc = new jsPDF();
    doc.text("Boshan Payment Receipt", 14, 20);

    const items = order.items?.length
      ? order.items.map((item: any) => [item.name, item.qty || 1, `₦${item.price?.toLocaleString()}`])
      : [["No items", "-", "-"]];

    doc.autoTable({
      startY: 30,
      head: [["Item", "Qty", "Price"]],
      body: items,
    });

    const finalY = (doc as any).lastAutoTable?.finalY ?? 50;
    doc.text(`Total: ₦${order.total?.toLocaleString()}`, 14, finalY + 10);
    doc.text(`Transaction ID: ${order.txnId}`, 14, finalY + 20);
    doc.save(`Boshan-Receipt-${order.txnId}.pdf`);
  };

  if (!order) {
    return (
      <div className="p-12 text-center text-gray-600">
        Fetching your receipt... please wait.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5] px-6 py-20 text-black text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <img src="/images/success.gif" alt="Success" className="w-20 mx-auto" />
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">Payment Successful</h1>
        <p className="text-sm md:text-base text-gray-600">
          Thanks for shopping with Boshan! Your glow journey has begun.
        </p>

        <div className="bg-[#fff6f2] p-4 rounded-md text-left space-y-2 text-sm md:text-base">
          <p><strong>Transaction ID:</strong> {order.txnId}</p>
          <p><strong>Total:</strong> ₦{order.total?.toLocaleString()}</p>
          <div>
            <strong>Items:</strong>
            <ul className="list-disc ml-6">
              {order.items?.map((item: any, idx: number) => (
                <li key={idx}>
                  {item.name} – ₦{item.price?.toLocaleString()}
                </li>
              )) ?? <li>No items</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Download Receipt
          </button>
          <Link to="/store" className="px-5 py-2 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50">
            Back to Store
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentConfirmationPage;