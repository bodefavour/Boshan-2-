import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 font-light tracking-wide">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        {/* Customer Service */}
        <div>
          <h3 className="text-base uppercase mb-6 font-semibold tracking-widest text-gray-400">Customer Service</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="/contact-us" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/shipping" className="hover:text-white transition">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-white transition">Returns & Exchanges</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-base uppercase mb-6 font-semibold tracking-widest text-gray-400">About Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="/our-story" className="hover:text-white transition">Our Story</a></li>
            <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="/sustainability" className="hover:text-white transition">Sustainability</a></li>
            <li><a href="/press" className="hover:text-white transition">Press</a></li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="text-base uppercase mb-6 font-semibold tracking-widest text-gray-400">Connect with Us</h3>
          <ul className="flex space-x-5">
            <li>
              <a href="https://www.facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f text-gray-300 hover:text-white text-lg transition" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/boshan.co?igsh=bWxyaWFmZzQyYTAy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram text-gray-300 hover:text-white text-lg transition" />
              </a>
            </li>
            <li>
              <a href="https://x.com/boshanofficial?t=aeFbnZw5uvCktn5pN6Q9-g&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter text-gray-300 hover:text-white text-lg transition" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube text-gray-300 hover:text-white text-lg transition" />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-base uppercase mb-6 font-semibold tracking-widest text-gray-400">Legal</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/cookie-policy" className="hover:text-white transition">Cookie Policy</a></li>
            <li><a href="/accessibility" className="hover:text-white transition">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10 text-center">
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Boshan Beauty. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
