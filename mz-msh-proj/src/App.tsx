/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Leaf, 
  Truck, 
  ChefHat, 
  Heart, 
  ArrowDown, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Star, 
  Play, 
  MapPin, 
  ShoppingBag,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Users,
  Award,
  Phone
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const WHATSAPP_NUMBER = "919538474586";

const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Oyster Mushrooms",
    weight: "200g",
    oldPrice: "100",
    newPrice: "80",
    image: "/fresh oyester 200 gram.jpeg",
    link: "https://www.whatsapp.com/product/25458119097164279/919538474586/?app_absent=0"
  },
  {
    id: 2,
    name: "Fresh Oyster Mushrooms",
    weight: "500g",
    oldPrice: "250",
    newPrice: "200",
    image: "/fresh oyester 400 gram.webp",
    link: "https://www.whatsapp.com/product/25699272723039163/919538474586/?app_absent=0"
  },
  {
    id: 3,
    name: "Fresh Oyster Mushrooms",
    weight: "1 Kg",
    oldPrice: "500",
    newPrice: "350",
    image: "/freash oyester 80 gram.webp",
    link: "https://www.whatsapp.com/product/25317848851232822/919538474586/?app_absent=0"
  },
  {
    id: 4,
    name: "Dried Oyster Mushrooms",
    weight: "100g",
    oldPrice: "350",
    newPrice: "250",
    image: "/dried oyester mushroom.jpg",
    link: "https://www.whatsapp.com/product/25574604305509245/919538474586/?app_absent=0"
  },
];

const REVIEWS = [
  {
    name: "Sandhya Gavade",
    rating: 5,
    text: "Healthy, tasty 😋 same like natural mushroom, I am now a regular customer  of Mycozen Mushrooms",
    time: "2 weeks ago"
  },
  {
    name: "Santosh Gouli",
    rating: 5,
    text: "Very good oyster mushrooms available here, I tried this tyoe of mushroom first time. Very good replacement for non veg. Vegans must try this",
    time: "1 month ago"
  },
  {
    name: "NikhilKumar M Sureban",
    rating: 5,
    text: "I tasted oyster mushroom biryani here on opening ceremony, Also I was amazed with the benefits when I looked deep into the oyster mushroom benefits. I suggest everyone to eat oyster mushrooms seeing the health benefits.",
    time: "3 months ago"
  }
];

const BENEFITS = [
  { icon: <Heart className="w-6 h-6" />, title: "Heart Health", desc: "Contains beta-glucans that help lower cholesterol." },
  { icon: <Leaf className="w-6 h-6" />, title: "Protein Rich", desc: "A fantastic plant-based protein source for muscle growth." },
  { icon: <ChefHat className="w-6 h-6" />, title: "Meat Substitute", desc: "Perfect meaty texture for vegan and vegetarian dishes." },
  { icon: <ShoppingBag className="w-6 h-6" />, title: "Low Calorie", desc: "Great for weight management without sacrificing nutrition." },
  { icon: <Star className="w-6 h-6" />, title: "Immunity Booster", desc: "Rich in antioxidants and vitamins to strengthen your body." },
];

// --- Components ---

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("text-4xl md:text-5xl font-bold mb-4", light ? "text-cream" : "text-primary")}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn("text-lg max-w-2xl mx-auto", light ? "text-cream/80" : "text-text/70")}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className="h-1 bg-secondary mx-auto mt-6 rounded-full"
    />
  </div>
);

const FloatingSpores = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const nextReview = () => setActiveReview((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative mushroom-spore-bg min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-card py-4 px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform border-2 border-primary/20">
            <img src="/logo.jpg" alt="MycoZen Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-tight leading-none">MycoZen</span>
            <span className="text-[10px] md:text-xs font-sans font-bold text-secondary uppercase tracking-[0.3em] mt-1">Mushrooms</span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#home" className="hover:text-secondary transition-colors">Home</a>
          <a href="#about" className="hover:text-secondary transition-colors">About</a>
          <a href="#products" className="hover:text-secondary transition-colors">Products</a>
          <a href="#benefits" className="hover:text-secondary transition-colors">Benefits</a>
          <a href="#recipes" className="hover:text-secondary transition-colors">Recipes</a>
          <button 
            onClick={() => openWhatsApp("Hello MycoZen! I'd like to place an order.")}
            className="bg-primary text-cream px-6 py-2 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <WhatsAppLogo className="w-[18px] h-[18px]" /> Order Now
          </button>
        </div>

        <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 text-2xl font-serif"
          >
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#benefits" onClick={() => setIsMenuOpen(false)}>Benefits</a>
            <a href="#recipes" onClick={() => setIsMenuOpen(false)}>Recipes</a>
            <button 
              onClick={() => openWhatsApp("Hello MycoZen! I'd like to place an order.")}
              className="bg-primary text-cream px-8 py-3 rounded-full flex items-center gap-2"
            >
              <WhatsAppLogo className="w-6 h-6" /> Order on WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Home section-Background photo.jpg" 
            alt="Fresh Oyster Mushrooms" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <FloatingSpores />

        <div className="relative z-10 text-center text-cream px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Farm-Fresh Mushrooms, <br />
            <span className="text-accent italic">Straight to Your Kitchen</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-cream/90 font-light max-w-2xl mx-auto"
          >
            Experience the taste of nature — grown with love, delivered fresh to your door in Hubballi-Dharwad.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => openWhatsApp("Hello MycoZen! I'd like to explore your products.")}
              className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
            >
              <WhatsAppLogo className="w-6 h-6" /> Order on WhatsApp
            </button>
            <a 
              href="#products"
              className="w-full sm:w-auto border-2 border-cream text-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-cream hover:text-primary transition-all flex items-center justify-center"
            >
              Explore Products
            </a>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream flex flex-col items-center gap-2"
        >
          <span className="text-sm uppercase tracking-widest font-medium">Scroll to explore</span>
          <ArrowDown size={24} />
        </motion.div>
      </section>

      {/* USP Strip */}
      <section className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Leaf className="text-accent" />, title: "Farm Fresh", desc: "Harvested & delivered within 24 hours" },
            { icon: <Truck className="text-accent" />, title: "Home Delivery", desc: "Across Hubballi-Dharwad" },
            { icon: <ChefHat className="text-accent" />, title: "Chef's Choice", desc: "Loved by home cooks & pros" },
            { icon: <Heart className="text-accent" />, title: "100% Natural", desc: "No chemicals or preservatives" },
          ].map((usp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 text-cream"
            >
              <div className="p-3 bg-cream/10 rounded-2xl">
                {usp.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{usp.title}</h3>
                <p className="text-cream/70 text-sm">{usp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-secondary font-bold uppercase tracking-widest text-sm"
              >
                Our Journey
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6">
                Cultivating Wellness, <br />
                <span className="text-secondary italic">One Mushroom at a Time</span>
              </h2>
              <p className="text-lg text-text/70 leading-relaxed">
                MycoZen Mushrooms began with a simple vision: to bring the purest, most nutritious oyster mushrooms to the local community of Hubballi-Dharwad. Our journey started in a small, climate-controlled space where we experimented with organic growing methods to ensure every harvest is as fresh as nature intended.
              </p>
              <p className="text-lg text-text/70 leading-relaxed mt-4">
                Today, we are proud to be a trusted source for home cooks and chefs alike, providing 100% natural, chemical-free mushrooms that are harvested and delivered within the same day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Sprout className="text-secondary" />, label: "Farm Fresh", sub: "Quality" },
                { icon: <Users className="text-secondary" />, label: "1000+", sub: "Customers" },
                { icon: <Award className="text-secondary" />, label: "100%", sub: "Organic" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-primary/5 border border-primary/10"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="font-bold text-lg md:text-xl text-primary">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-text/50 uppercase tracking-wider">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              "https://www.instagram.com/reel/DSPW9RhkWr_/",
              "https://www.instagram.com/reel/DUP4mvEEbny/",
              "https://www.instagram.com/reel/DV_arNgk-8E/"
            ].map((url, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-dark-bg group cursor-pointer border-4 border-primary/10 transition-all"
              >
                <iframe
                  src={`${url}embed/`}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="Grown with care, harvested at peak freshness for the best flavor and nutrition.">
          Our Premium Products
        </SectionTitle>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-secondary text-cream px-3 py-1 rounded-full text-sm font-bold">
                  {product.weight}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 leading-tight">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-sm text-text/40 line-through">₹{product.oldPrice}</span>
                  <span className="text-2xl font-bold text-secondary">₹{product.newPrice}/-</span>
                  <span className="text-sm text-text/60 ml-auto font-medium">{product.weight}</span>
                </div>
                <button 
                  onClick={() => window.open(product.link, '_blank')}
                  className="w-full bg-primary text-cream py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                >
                  <WhatsAppLogo className="w-[18px] h-[18px]" /> Order on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Health Benefits Section */}
      <section id="benefits" className="py-24 bg-primary/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl" />
            <img 
              src="/freash oyester 80 gram.webp" 
              alt="Mushroom Benefits" 
              className="relative rounded-[40px] shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-cream p-8 rounded-3xl shadow-xl z-20 max-w-[240px]">
              <p className="text-lg font-serif italic">"The perfect non-veg replacement for vegans!"</p>
            </div>
          </motion.div>

          <div>
            <SectionTitle subtitle="Oyster mushrooms aren't just delicious; they are a nutritional powerhouse backed by science.">
              Nature's Superfood
            </SectionTitle>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {BENEFITS.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden flex flex-col items-center text-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group border border-primary/5 h-40 justify-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-3">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-base text-primary">{benefit.title}</h4>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-cream text-xs leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Guide Section */}
      <section id="recipes" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="Discover delicious ways to bring MycoZen mushrooms to your table.">
          Farm to Food
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kannada Recipes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Play className="fill-primary" size={20} /> Kannada Cooking Guide
            </h3>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLGfLW5nJC-Nx5ZWt6KBLO7Bw56RneKNbZ"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* English Recipes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Play className="fill-primary" size={20} /> English Cooking Guide
            </h3>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLGfLW5nJC-NyV55iuPzz6Ci-0eH-tZSzu"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <motion.a
            href="https://youtube.com/playlist?list=PLGfLW5nJC-Nx5ZWt6KBLO7Bw56RneKNbZ&si=OtvC6yrAXoPt_RhJ"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-primary/90 transition-all"
          >
            <Youtube className="w-6 h-6" /> More Recipes
          </motion.a>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-cream px-6 overflow-hidden">
        <SectionTitle subtitle="Join hundreds of happy customers in Hubballi-Dharwad.">
          What Our Community Says
        </SectionTitle>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#FDFBF7] p-10 md:p-16 rounded-[40px] shadow-lg border border-primary/5 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(REVIEWS[activeReview].rating)].map((_, i) => (
                  <Star key={i} className="text-accent fill-accent" size={24} />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-serif italic text-primary mb-8 leading-relaxed">
                "{REVIEWS[activeReview].text}"
              </p>
              <div>
                <h4 className="font-bold text-xl text-text">{REVIEWS[activeReview].name}</h4>
                <p className="text-text/50 text-sm">{REVIEWS[activeReview].time}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prevReview} className="p-4 bg-white rounded-full shadow-md hover:bg-primary hover:text-cream transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextReview} className="p-4 bg-white rounded-full shadow-md hover:bg-primary hover:text-cream transition-all">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://g.page/r/CfNrVH7vgQxEEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-cream px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 mx-auto hover:scale-105 transition-all"
            >
              Drop Us a 5-Star Review <Star size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Community / Social Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary to-[#1e4a1a] rounded-[50px] p-12 md:p-24 text-center text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">Join the MycoZen Community</h2>
          <p className="text-xl text-cream/80 mb-12 max-w-2xl mx-auto relative z-10">
            Stay updated with our latest harvests, exclusive offers, and mind-blowing mushroom stories.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a 
              href="https://www.instagram.com/mycozen_mushrooms/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#E1306C] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
            >
              <Instagram size={24} /> Follow on Instagram
            </a>
            <a 
              href="https://www.facebook.com/mycozen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
            >
              <Facebook size={24} /> Visit Facebook Page
            </a>
            <a 
              href="https://www.youtube.com/@mycozenshrooms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FF0000] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
            >
              <Youtube size={24} /> Subscribe on YouTube
            </a>
            <a 
              href="https://chat.whatsapp.com/K3Qbxxb5vbQCajKmSQcYmb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
            >
              <WhatsAppLogo className="w-6 h-6" />
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg pt-24 pb-12 px-6 border-t border-cream/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform border-2 border-white/10">
                <img src="/logo.jpg" alt="MycoZen Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-cream tracking-tight leading-none">MycoZen</span>
                <span className="text-[8px] font-sans font-bold text-accent uppercase tracking-[0.2em] mt-1">Mushrooms</span>
              </div>
            </a>
            <p className="text-cream/60 leading-relaxed">
              Grown Fresh. Eaten Happy. <br />
              Bringing the finest oyster mushrooms from our farm to your kitchen in Hubballi-Dharwad.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/mycozen_mushrooms/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#E1306C] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white"><InstagramLogo className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/mycozen" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white"><FacebookLogo className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@mycozenshrooms" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white"><YoutubeLogo className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-cream/60">
              <li><a href="#home" className="hover:text-cream transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-cream transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-cream transition-colors">Our Products</a></li>
              <li><a href="#benefits" className="hover:text-cream transition-colors">Health Benefits</a></li>
              <li><a href="#recipes" className="hover:text-cream transition-colors">Cooking Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Contact Information</h4>
            <ul className="space-y-4 text-cream/60">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0" />
                <span>Hubballi-Dharwad, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppLogo className="w-[18px] h-[18px] text-secondary shrink-0" />
                <span>+91 95384 74586</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>+91 82176 10535</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Order Now</h4>
            <p className="text-cream/60 mb-6">Ready to experience fresh mushrooms? Message us on WhatsApp to order.</p>
            <button 
              onClick={() => openWhatsApp("Hello MycoZen! I'd like to place an order.")}
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg"
            >
              <WhatsAppLogo className="w-5 h-5" />
              WhatsApp Order
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-6 text-cream/40 text-sm">
          <p>© 2026 MycoZen Mushrooms. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openWhatsApp("Hello MycoZen! I'm interested in your mushrooms.")}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <WhatsAppLogo className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
          Order Now
        </span>
      </motion.button>
    </div>
  );
}
