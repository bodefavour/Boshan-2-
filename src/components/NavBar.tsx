import React, { useState } from "react";
import { MenuIcon, XIcon, SearchIcon, ShoppingBagIcon, ArrowLeftIcon, UserIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import boshanLogo from "./assets/Boshanlogo.png"; // Import logo

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems = [
    "Skincare Essentails",
    "Beard Care Essentials",
    "Beauty Tools & Makeup Accessories",
    "Personal Hygiene",
    "Wellness and Supplements",
    "Subscription Boxes",
    "Skin Therapy/ Consultation",
    "Skinfood & Nutrition",
    "About Us",
    "Blogs",
    "Contact Us",
  ];

  //Submenu items for each menu item.
  const subMenus: { [key: string]: { name: string; image: string; path: string }[] } = {
    "Skincare Essentails": [
      { name: "For Him", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Her", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ],
    "Personal Hygiene": [
      { name: "For Him", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Her", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ], 
    "Wellness and Supplements": [
      { name: "For Him", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Her", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ], "Subscription Boxes": [
      { name: "For Him", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Her", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ],
    "Skin Therapy/ Consultation": [
      { name: "For Him", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Her", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ],
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white py-2 px-6 z-50 flex justify-between items-center">
      {/* Left Section: Boshan Logo */}
      <div className="flex items-center">
        <Link to="Oldpa">
          <img src={boshanLogo} alt="Boshan Logo" className="h-10 w-auto" />
        </Link>
      </div>
      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        {/* Hide other icons on mobile */}
        <div className="hidden md:flex space-x-4">
          <UserIcon className="w-6 h-6 cursor-pointer text-white" />
          <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
          <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
        </div>
        
        {/* MenuIcon is always visible, but only icon visible on mobile */}
        <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
          <MenuIcon className="w-6 h-6 cursor-pointer text-white" />
        </button>
      </div>

      {/* Overlay with Blur Effect */}
      {menuOpen && (
        <div className={'fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-50 flex justify-end transition-opacity duration-500 ${menuOPen ? "opacity-100" : "opacity-0 pointer-events-none"}'}>
          {/* Popup Panel – Fullscreen on mobile, 43% width on desktop */}
          <div
            className={'relative bg-white w-full h-full md:w-[43%] shadow-lg p-6 flex flex-col transform transition-all duration-1200 ease-in-out ${menuOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}'}>
            
            {/* Close Button */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setActiveSection(null);
              }}
              className="absolute top-4 right-4 focus:outline-none"
            >
              <XIcon className="w-6 h-6 text-black" />
            </button>

            {/* Main Menu */}
            {!activeSection ? (
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-phudu text-black text-center">Categories</h2>
                <ul className="space-y-3">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveSection(item)}
                        className="text-xl font-phudu uppercase tracking-wider text-black block w-full text-left hover:text-gray-500 transition" 
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // Submenu View with Transition Effect
              <div className={'flex flex-col space-y-4 transform transition-all duration-500 ease-out ${activeSection ? "translate-x-0 opacity-100 scale-100" : "translate-x-10 opacity-0 scale-95"}'}>
                {/* Back Button */}
                <button onClick={() => setActiveSection(null)} className="flex items-center text-black hover:text-gray-500 transition">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </button>

                <h2 className="text-2xl font-phudu text-black">{activeSection}</h2>

                {/* Submenu List with Images */}
                <div className="grid grid-cols-1 gap-4">
                  {subMenus[activeSection]?.map((subItem, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <img
                        src={subItem.image}
                        alt={subItem.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                      <Link to={`/${subItem.path}`} onClick={() => setMenuOpen(false)} className="text-lg font-phudu text-black hover:text-gray-500 transition">
                      {subItem.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;