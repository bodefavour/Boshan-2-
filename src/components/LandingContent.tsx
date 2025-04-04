import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Skincare Essentials",
    desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
    image: "/images/IMG-20250322-WA0051.jpg",
    link: "/skincare",
  },
  {
    title: "Beardcare Essentials",
    desc: "Handcrafted skincare essentials and beard grooming rituals that nourish, glow, and respect your roots.",
    image: "/images/IMG-20250322-WA0048.jpg",
    link: "/Fashion",
  },
  {
    title: "Personal ",
    desc: "Curated gift boxes, party props, and special occasion sets that elevate memories with culture and love.",
    image: "/images/IMG-20250322-WA0046",
    link: "/birthday-gifts",
  },
  {
    title: "Event Styling & Decor",
    desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
    image: "/images/decor.jpg",
    link: "/Decor",
  }, {
    title: "Event Styling & Decor",
    desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
    image: "/images/decor.jpg",
    link: "/Decor",
  }, {
    title: "Event Styling & Decor",
    desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
    image: "/images/decor.jpg",
    link: "/Decor",
  }, {
    title: "Event Styling & Decor",
    desc: "Aesthetic event experiences with decor that tells a story and speaks your tribe.",
    image: "/images/decor.jpg",
    link: "/Decor",
  },
];

const LandingContent = () => {
  return (
    <div className="bg-white text-black px-6 md:px-16 py-12 space-y-20">
      {/* About Boshan */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to BOSHAN</h2>
        <p className="text-lg md:text-xl leading-relaxed">
          BOSHAN is more than a brand – it's a movement. Rooted in rich Esan culture and elevated with modern elegance,
          we curate handcrafted skincare, luxe fashion, and memorable gifting experiences for today’s bold, conscious generation.
          Whether you’re preordering our glow sets or dressing up with drip, Boshan is your canvas for cultural self-expression.
        </p>
      </motion.section>

      {/* Preorder CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="bg-black text-white p-8 md:p-16 rounded-3xl shadow-2xl text-center space-y-6"
      >
        <h3 className="text-3xl md:text-4xl font-semibold">🎉 Preorders Now Live</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Get early access to our exclusive Boshan Beauty Sets. All preorders come with a cultural collectible + a surprise gift on launch day.
          Don’t miss out on the glow-up!
        </p>
        <Link to="/Product-page">
          <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-full text-lg font-medium shadow-xl">
            Preorder Now
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
        <Link to="/Product-page">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md">
            Shop Now
          </button>
        </Link>
      </motion.section>
    </div>
  );
};

export default LandingContent;
