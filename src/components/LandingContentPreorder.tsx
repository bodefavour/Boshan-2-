// Project: Boshan Beauty Preorder Landing Page
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { motion } from "framer-motion";

const services = [
    {
        title: "Skincare Essentials",
        desc: "Nurture your skin with our carefully crafted skincare essentials, inspired by rich Esan heritage and designed to celebrate your natural glow.",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Beardcare Essentials",
        desc: "Elevate your beard game with grooming rituals that honor tradition while delivering softness, strength, and style.",
        image: "/images/IMG-20250322-WA0048.jpg",
    },
    {
        title: "Personal Hygiene",
        desc: "Cleanse and refresh daily with products rooted in culture and crafted for lasting freshness and confidence.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Beauty Tools and Makeup Accessories",
        desc: "Tools and accessories designed to enhance your natural beauty and express your unique style with cultural pride.",
        image: "/images/IMG-20250402-WA0140.jpg",
    },
    {
        title: "Subscription Boxes",
        desc: "Curated self-care experiences delivered to your door; Discover the perfect blend of tradition and modern indulgence every month.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Skin Therapy and Consultations",
        desc: "Personalized skin solutions and expert advice that connect age-old wisdom with modern skincare science.",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Skinfood & Nutrition",
        desc: "Fuel your skin from within with nutrition inspired by nature and crafted for radiant, healthy skin.",
        image: "/images/IMG-20250402-WA0134.jpg",
    },
].map((service) => ({
    ...service,
    link: `/preorder/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, "-"))}`,
}));

const LandingContents = () => {
    function handleLogout(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error("Function not implemented.");
    }

    return (<><main>

    </main><div className="bg-white text-black px-6 md:px-16 py-12 space-y-20">
            {/* Awareness Teaser */}
            {/* <motion.section className="text-center">
              <p className="text-xl italic text-gray-700">“You’ve never glowed like this before… Boshan is almost here 👀✨”</p>
          </motion.section> */}

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome to Boshan
                </h2>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Skin. Your Ritual. Your Lifestyle.
                </h2>
                <p className="text-lg md:text-xl leading-relaxed">
                    BOSHAN is more than a brand, it's a movement. Rooted in rich Esan culture and elevated with modern elegance,
                    we curate handcrafted skincare, luxe fashion, and memorable gifting experiences for today’s bold, conscious generation.
                    Join the Glow List today to be the first to preorder and get exclusive early bird benefits!
                </p>
                <Link to="/auth">
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
                            className="rounded-xl mb-4 h-48 object-cover w-full" />
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
                        className="px-4 py-2 rounded-full text-black w-full md:w-1/3" />
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center space-y-6"
            >
                <h3 className="text-3xl md:text-4xl font-bold">Want to be a Boshan Babe?</h3>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    We’re looking for glow queens 👑 to try our products early!
                </p>

                <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  loop={true}
  spaceBetween={20}
  className="max-w-3xl mx-auto"
>
  {[
    "7493909151530142981",
    "7497125325999033606",
    "7501264179135843589",
    "7520560569456348421"
  ].map((id, index) => (
    <SwiperSlide key={index}>
      <div className="w-full flex justify-center min-h-[400px]">
        <iframe
          src={`https://www.tiktok.com/embed/${id}`}
          allowFullScreen
          allow="autoplay"
          frameBorder="0"
          className="w-[300px] h-[500px] rounded-xl shadow-xl"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
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
            </motion.section>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-[#FFF8F5] text-black py-8 px-4 md:px-8 rounded-3xl shadow-lg space-y-8"
            >
                <h3 className="text-2xl md:text-3xl font-bold text-center text-boshan mb-10 tracking-wide">
                    Meet the Glowmakers
                </h3>

                <Swiper
                    modules={[Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView={6}
                    loop
                    autoplay={{ delay: 3500 }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 120,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    className="w-full max-w-6xl mx-auto"
                >
                    {[
                        {
                            name: "Sarah Iyere",
                            role: "MD/Founder",
                            details: "Vision, Formulation, Strategy",
                            img: "/images/Sarah.png",
                            socials: { instagram: "#", twitter: "#", linkedin: "#" },
                        },
                        {
                            name: "Felicia",
                            role: "Clients Resource Manager",
                            details: "Brand & UI Aesthetics",
                            img: "/images/IMG-20250630-WA0002.jpg",
                            socials: { instagram: "#", twitter: "#", linkedin: "#" },
                        },
                        {
                            name: "Faith",
                            role: "Project Manager",
                            details: "Growth & Community",
                            img: "/images/Sarah.png",
                            socials: { instagram: "#", twitter: "#", linkedin: "#" },
                        },
                        {
                            name: "Bode Favour",
                            role: "Tech Lead & Socials",
                            details: "Tech & Socials",
                            img: "/images/Sarah.png",
                            socials: { instagram: "#", twitter: "#", linkedin: "#" },
                        },
                        {
                            name: "Janet",
                            role: "Resource Person",
                            details: "—",
                            img: "/images/Sarah.png",
                            socials: { instagram: "#", twitter: "#", linkedin: "#" },
                        },
                    ].map((member, i) => (
                        <SwiperSlide key={i} className="flex justify-center">
                            <div className="bg-white rounded-2xl shadow-lg px-6 py-8 w-[260px] transition duration-300 hover:scale-105 text-center">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-orange-400 mx-auto mb-4"
                                />
                                <h4 className="text-base font-semibold text-boshan">{member.name}</h4>
                                <p className="text-xs text-gray-600">{member.role}</p>
                                <p className="text-[11px] text-gray-500">{member.details}</p>
                                <div className="flex justify-center gap-3 text-sm mt-4 text-gray-400">
                                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram hover:text-orange-500"></i>
                                    </a>
                                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-twitter hover:text-orange-500"></i>
                                    </a>
                                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin hover:text-orange-500"></i>
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.section>

        </div></>
    );
};

export default LandingContents;