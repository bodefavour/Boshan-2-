import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
    {
        title: "Skincare Essentials",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250402-WA0132.jpg",
        link: "/skincare",
      },
      {
        title: "Beardcare Essentials",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250322-WA0048.jpg",
        link: "/Fashion",
      },
      {
        title: "Personal Hygiene",
        desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
        image: "/images/IMG-20250322-WA0051.jpg",
        link: "/birthday-gifts",
      },
      {
        title: "Beauty Tools and Makeup Accessories",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0140.jpg",
        link: "/Decor",
      }, {
        title: "Subscription Boxes",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250322-WA0051.jpg",
        link: "/Decor",
      }, {
        title: "Skin Therapy and Consultations",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0132.jpg",
        link: "/Decor",
      }, {
        title: "Skinfood & Nutrition",
        desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
        image: "/images/IMG-20250402-WA0134.jpg",
        link: "/Decor",
      }, 
];

const LandingContent = () => {
  return (
    <div className="bg-white text-black px-6 md:px-16 py-12 space-y-20">
      {/* Awareness Teaser */}
      <motion.section className="text-center">
        <p className="text-xl italic text-gray-700">“You’ve never glowed like this before… Boshan is almost here 👀✨”</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Boshan – Your Skin. Your Ritual. Your Lifestyle.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed">
            BOSHAN is more than a brand – it's a movement. Rooted in rich Esan culture and elevated with modern elegance,
            we curate handcrafted skincare, luxe fashion, and memorable gifting experiences for today’s bold, conscious generation.
            Join the Glow List today to be the first to preorder and get exclusive early bird benefits!
        </p>
        <Link to="/Product-page">
            <button className="mt-6 bg-orange-600 hover:bg-orange-700 transition text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl">
                Be the First to Pre-Order
            </button>
        </Link>
        </motion.section>
      
{/* Services Overview */}
<motion.section
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="grid md:grid-cols-2 gap-10"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="group bg-[#fdf8f3] hover:shadow-xl transition p-6 rounded-2xl flex flex-col justify-between"
          >
            <img
              src={service.image}
              alt={service.title}
              className="rounded-xl mb-4 h-48 object-cover w-full"
            />
            <h4 className="text-2xl font-semibold mb-2">{service.title}</h4>
            <p className="text-base text-gray-700 mb-4">{service.desc}</p>
            <Link
              to={service.link}
              className="text-orange-500 hover:underline font-medium"
            >
              Explore More →
            </Link>
          </motion.div>
        ))}
      </motion.section>
{/* CTA + Email Capture */}
<motion.section
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ delay: 0.3, duration: 1 }}
         className="bg-black text-white p-8 md:p-16 rounded-3xl shadow-2xl text-center space-y-6"
       >
         <h3 className="text-4xl font-semibold">Your Skin. Your Ritual. Your Lifestyle.</h3>
         <p className="text-lg max-w-xl mx-auto">Be the First to Pre-Order. Join the Glow List.</p>
         <form className="flex flex-col md:flex-row gap-4 justify-center">
           <input
             type="email"
             placeholder="Enter your email"
             className="px-4 py-2 rounded-full text-black w-full md:w-1/3"
           />
           <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-2 rounded-full text-lg font-medium shadow-xl">
             Join Now
           </button>
         </form>
         <p className="text-sm italic">Thanks for joining Boshan’s Glow List. We’ll let you know when pre-orders open!</p>
       </motion.section>
      
      {/* Product Sneak Peek */}
    <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-orange-100 text-black p-8 md:p-16 rounded-3xl shadow-md space-y-6 text-center"
        >
        <h3 className="text-2xl font-bold">Product Sneak Peek</h3>
        <p>“Can you guess what’s inside our first box? 💋”</p>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 1" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 2" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 3" className="w-60 h-60 object-cover rounded-xl blur-sm" /> <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 1" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 2" className="w-60 h-60 object-cover rounded-xl blur-sm" />
          <img src="/images/IMG-20250322-WA0051.jpg" alt="Sneak Peek 3" className="w-60 h-60 object-cover rounded-xl blur-sm" />
        </div>
    </motion.section>
 
      {/* Fun Roast Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-orange-100 text-black p-8 md:p-16 rounded-3xl shadow-md space-y-6 text-center"
        >
        <p className="text-lg">“How often do you use makeup brushes? 🤔”</p>
        <p className="font-semibold">“Each Boshan Box = brushes, beauty, and bold confidence.”</p>
        <img src="/images/IMG-20250322-WA0051.jpg" alt="Makeup Brushes" className="w-64 h-64 object-cover rounded-xl mx-auto" />
      </motion.section>

      {/* UGC Invite */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-orange-100 text-black p-8 md:p-16 rounded-3xl shadow-md space-y-6 text-center"
        >
        <h3 className="text-2xl font-bold">“Want to be a Boshan Babe?”</h3>
        <p>We’re looking for glow queens 👑 to try our products early!</p>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Replace these with TikTok embeds or thumbnail previews */}
          <video controls className="w-60 rounded-xl" src="/videos/tiktok1.mp4"></video>
          <video controls className="w-60 rounded-xl" src="/videos/tiktok2.mp4"></video>
          <video controls className="w-60 rounded-xl" src="/videos/tiktok3.mp4"></video><video controls className="w-60 rounded-xl" src="/videos/tiktok1.mp4"></video>
          <video controls className="w-60 rounded-xl" src="/videos/tiktok2.mp4"></video>
          <video controls className="w-60 h-100 rounded-xl" src="/videos/tiktok3.mp4"></video>
        </div>
      </motion.section>

      {/* Countdown Section */}
      <motion.section className="text-center bg-orange-100 py-10 rounded-2xl">
        <h3 className="text-3xl font-semibold">Boshan is Almost Here!</h3>
        <p className="text-lg">Something gorgeous arrives. Pre-orders drop soon.</p>
        <p className="text-lg mt-2">Only 50 pre-order spots left! Don’t miss out.</p>
      </motion.section>

      {/* Preorder CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-black text-white p-8 md:p-16 rounded-3xl shadow-2xl text-center space-y-6"
      >
        <h3 className="text-3xl md:text-4xl font-semibold">Be the first to glow. Pre-orders drop soon. Join our list.</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Get early access to our exclusive Boshan Beauty Sets. All preorders come with a cultural collectible + a surprise gift on launch day.
        </p>
        <Link to="/product-page">
          <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-full text-lg font-medium shadow-xl">
            Preorder Now
          </button>
        </Link>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6"
      >
        <h3 className="text-3xl font-bold">Glow Different. Gift Bold. The Boshan Way.</h3>
        <p className="max-w-2xl mx-auto text-lg">
          Join the tribe that's redefining beauty, fashion, and celebration. Culture meets Gen-Z energy in every drop, stitch, and beat.
        </p>
        <Link to="/product-page">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md">
            Shop Now
          </button>
        </Link>
      </motion.section> {/* Founder Section */}
    <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-orange-100 text-black p-8 md:p-16 rounded-3xl shadow-md space-y-6 text-center"
    >
        <h3 className="text-3xl font-semibold">Meet the Founder</h3>
        <p className="text-lg">“My journey from skin struggles to skincare. Boshan was born from my story.”</p>
        <img src="/images/IMG-20250322-WA0051.jpg" alt="Founder" className="w-full max-w-md mx-auto rounded-xl" />
    </motion.section>

    </div>
  );
};

export default LandingContent;