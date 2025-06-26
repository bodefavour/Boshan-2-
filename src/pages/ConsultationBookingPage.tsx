import React, { useState } from "react"; import { useNavigate } from "react-router-dom";

const ConsultationBookingPage = () => { const navigate = useNavigate(); const [selectedDate, setSelectedDate] = useState<string>(""); const [selectedTime, setSelectedTime] = useState<string>("");

const handleBooking = () => { if (!selectedDate || !selectedTime) { alert("Please select a date and time"); return; } // Save booking to Firestore later navigate("/confirmation"); };

return ( <div className="bg-white min-h-screen text-black px-4 py-8 md:px-16"> {/* Header */} <div className="text-center mb-8"> <h1 className="text-2xl md:text-4xl font-bold">Book a Consultation</h1> <p className="text-sm md:text-base text-gray-600 mt-2">Choose a date and time to get personalized skincare advice from a Boshan expert.</p> </div>

{/* Consultant Card */}
  <div className="rounded-xl shadow-md bg-[#fff8f5] p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
    <img src="/images/consultant.jpg" alt="Consultant" className="w-20 h-20 rounded-full object-cover" />
    <div>
      <h2 className="font-semibold text-lg">Dr. Boshan Glow</h2>
      <p className="text-sm text-gray-600">Skincare Consultant | 4.9 ⭐</p>
    </div>
  </div>

  {/* Calendar Section (Placeholder for now) */}
  <div className="mb-8">
    <h3 className="font-semibold mb-2">Select a Date</h3>
    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border px-4 py-2 rounded w-full" />
  </div>

  {/* Time Slots */}
  <div className="mb-10">
    <h3 className="font-semibold mb-2">Select a Time Slot</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        "9:00 AM",
        "11:00 AM",
        "1:00 PM",
        "3:00 PM",
        "5:00 PM",
      ].map((slot) => (
        <button
          key={slot}
          onClick={() => setSelectedTime(slot)}
          className={`px-4 py-2 rounded border ${selectedTime === slot ? "bg-orange-600 text-white" : "bg-white text-black"}`}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>

  {/* Summary & CTA */}
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4 shadow-lg">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm">Date: <span className="font-medium">{selectedDate || "-"}</span></p>
        <p className="text-sm">Time: <span className="font-medium">{selectedTime || "-"}</span></p>
      </div>
      <button
        onClick={handleBooking}
        className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700"
      >
        Confirm Booking
      </button>
    </div>
  </div>
</div>

); };

export default ConsultationBookingPage;

