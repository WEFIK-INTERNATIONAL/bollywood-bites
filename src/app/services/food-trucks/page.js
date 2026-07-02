"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./trucks.css";

gsap.registerPlugin(ScrollTrigger);

const MENU_CATEGORIES = [
  { id: "combos", label: "Bowls & Combos" },
  { id: "rolls", label: "Rolls & Naan Wraps" },
  { id: "street", label: "Street Food & Keema" },
  { id: "drinks", label: "Drinks & Desserts" },
];

const MENU_ITEMS = {
  combos: [
    { name: "BOWL", price: "$13.99 + Tax", desc: "One delicious entrée served over a bed of fragrant basmati rice. Great for a quick lunch on the go." },
    { name: "COMBO", price: "$17.99 + Tax", desc: "Choose two entrées served with fragrant basmati rice, fresh garden salad, and hot clay-oven naan." },
    { name: "TANDOOR CHICKEN SALAD", price: "$10.50 + Tax", desc: "Healthy choice of flame-grilled chicken tikka over a bed of fresh mixed greens and light vinaigrette." },
    { name: "MIX GARDEN GREEN TOFU SALAD", price: "$8.75 + Tax", desc: "Crispy green salad topped with organic spiced tofu cubes and signature herb dressing." },
  ],
  rolls: [
    { name: "KATHI ROLL - VEGGIE", price: "$12.99", desc: "Warm flatbread rolled with spiced mixed garden vegetables and signature house chutneys." },
    { name: "KATHI ROLL - CHICKEN", price: "$12.99", desc: "Classic Indian street roll stuffed with flame-grilled chicken tikka, sliced onions, and mint chutney." },
    { name: "KATHI ROLL - LAMB / TOFU", price: "$13.99", desc: "Juicy pieces of spiced lamb or organic tofu cubes wrapped with roasted bell peppers." },
    { name: "KATHI ROLL - SHRIMP", price: "$14.99", desc: "Succulent shrimp sauteed in street spices and rolled in a warm flatbread." },
    { name: "NAAN WRAP - PANEER / TOFU", price: "$11.99", desc: "Fresh hot clay-oven naan wrapped around spiced paneer cheese or organic tofu." },
    { name: "NAAN WRAP - CHICKEN", price: "$12.99", desc: "Tandoori chicken chunks wrapped in a fluffy clay-oven baked naan with fresh vegetables." },
    { name: "NAAN WRAP - LAMB", price: "$13.99", desc: "Stir-fried spiced lamb tenderloin wrapped inside a warm naan bread." },
    { name: "NAAN WRAP - SHRIMP", price: "$14.99", desc: "Grilled garlic-spiced shrimp wrapped with yogurt herbs in a fluffy naan." },
  ],
  street: [
    { name: "PAV BHAJI", price: "$15.99", desc: "Mumbai's famous street classic: a thick mashed mixed vegetable curry served with soft butter-toasted rolls." },
    { name: "SAMOSA CHAAT", price: "$8.50", desc: "Crispy potato samosas crushed and topped with warm chickpea curry, sweetened yogurt, tamarind, and mint chutneys." },
    { name: "PANEER KEEMA SANDWICH", price: "$7.95", desc: "Spiced grated paneer cottage cheese pressed inside a warm, buttery toasted sandwich." },
    { name: "CHICKEN KEEMA SANDWICH", price: "$8.50", desc: "Savory minced chicken slow-cooked with ginger, garlic, and street spices in a toasted sandwich." },
    { name: "LAMB KEEMA SANDWICH", price: "$9.50", desc: "Premium minced lamb sauteed with street herbs and toasted in a crispy sandwich." },
    { name: "SEV PURI", price: "$7.95", desc: "Crisp flat puris topped with potatoes, chopped onions, dynamic chutneys, and fine sev chickpea noodles." },
    { name: "BHEL PURI", price: "$12.99", desc: "Savory puffed rice salad tossed with potatoes, raw mango, tomatoes, and tangy tamarind sauce." },
    { name: "VEG PAKORAS", price: "$5.99", desc: "Assorted vegetables coated in spiced chickpea batter and deep-fried to a golden crunch." },
  ],
  drinks: [
    { name: "MANGO LASSI", price: "$5.75", desc: "Cool, creamy traditional yogurt drink blended with sweet Alphonso mango pulp." },
    { name: "THUMS UP", price: "$3.99", desc: "Popular carbonated cola beverage imported from India with a stronger, spicier kick." },
    { name: "LIMCA", price: "$3.99", desc: "Indian carbonated lemon-lime soda, perfect for hot weather." },
    { name: "GULAB JAMUN (2 PIECES)", price: "$3.00", desc: "Warm, soft milk-solid dumplings fried golden and soaked in a sweet green cardamom syrup." },
  ],
};

export default function FoodTruckServices() {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("combos");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered intro rows fade in
      gsap.utils.toArray(".trucks-intro-grid").forEach((grid) => {
        gsap.fromTo(
          grid.querySelectorAll(".trucks-intro-text, .trucks-intro-image-wrapper"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Price cards fade in
      gsap.fromTo(
        ".trucks-pricing-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trucks-pricing-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Handle active tab change and trigger entry animation for cards
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Short defer to animate after DOM updates
    setTimeout(() => {
      gsap.fromTo(
        ".trucks-food-card",
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }, 50);
  };

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="trucks-hero">
        <div className="bg-mandala-centered" style={{ opacity: 0.03 }} />
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.35}>
            <h1>Gourmet Food Trucks</h1>
          </Copy>
          <p className="trucks-hero-tagline">Authentic Indian Flavors on the Go</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="trucks-intro">
        <div className="container">
          <div className="trucks-intro-grid">
            <div className="trucks-intro-text">
              <span className="accent-label">Street food reinvented</span>
              <h3>Mouthwatering Indian Food Trucks in Los Angeles</h3>
              <p>
                Indian food truck Los Angeles brings the vibrant taste of India to streets, events, and gatherings 
                across Southern California with a menu designed for those who crave fresh, flavorful, and convenient meals. 
                Whether you are planning a corporate lunch, attending a local festival, or simply looking for delicious cuisine on the go, 
                our menu offers a variety of traditional dishes prepared with authentic ingredients and rich spices.
              </p>
              <p>
                Known for serving quality Indian cuisine, Bollywood Bites delivers memorable dining experiences with freshly prepared dishes 
                that satisfy every palate. From comforting vegetarian favorites to hearty chicken specialties and savory lamb or seafood creations, 
                our menu has something for everyone.
              </p>
            </div>
            <div className="trucks-intro-image-wrapper">
              <div className="trucks-luxury-frame">
                <Image
                  src="/home/services-food-truck.png"
                  alt="Bollywood Bites Food Truck"
                  fill
                  sizes="(max-width: 991px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section className="trucks-menu-section">
        <div className="container">
          <div className="trucks-menu-header">
            <h2>Our Street Menu</h2>
            <p>Select a category below to explore the authentic Indian specialties prepared fresh on our trucks daily.</p>
            <span className="vegan-friendly-badge">Great Choices of Vegan & Gluten Free Items</span>
          </div>

          {/* Interactive Category Selector */}
          <div className="trucks-tabs-container">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`trucks-tab ${activeTab === cat.id ? "active" : ""}`}
                onClick={() => handleTabChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="trucks-food-grid">
            {MENU_ITEMS[activeTab].map((item, idx) => (
              <div className="trucks-food-card" key={idx}>
                <div className="trucks-food-details">
                  <h5>{item.name}</h5>
                  <p>{item.desc}</p>
                </div>
                <div className="trucks-food-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Pricing Section */}
      <section className="trucks-pricing-section">
        <div className="container">
          <div className="trucks-pricing-title">
            <h2>Street Platters & Packages</h2>
            <p>Generous portions and incredible value designed for quick, delicious meals.</p>
          </div>
          <div className="trucks-pricing-grid">
            <div className="trucks-pricing-card">
              <h3>The Street Bowl</h3>
              <div className="price">$13.99 <span style={{ fontSize: '1rem', color: 'var(--base-300)' }}>+ Tax</span></div>
              <p>
                Our signature single-serving container featuring <strong>one full entrée</strong> of your choice served on top of aromatic, fluffy basmati rice. 
                Perfect for busy corporate lunches or a fast, satisfying street snack.
              </p>
            </div>
            <div className="trucks-pricing-card">
              <h3>The Royal Combo</h3>
              <div className="price">$17.99 <span style={{ fontSize: '1rem', color: 'var(--base-300)' }}>+ Tax</span></div>
              <p>
                A royal feast on the go! Choose <strong>two of your favorite entrées</strong>, served with a side of basmati rice, crisp fresh salad, 
                and a warm, buttered tandoori naan baked right on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Booking Callout */}
      <section className="trucks-catering-section">
        <div className="bg-mandala-centered" style={{ opacity: 0.02 }} />
        <div className="container">
          <div className="trucks-catering-container">
            <div className="trucks-catering-title">
              <h3>Rent our Food Trucks for Parties & Events</h3>
              <p>
                From corporate events and birthday celebrations to weddings and local street festivals, we bring the award-winning 
                Bollywood Bites mobile kitchen directly to you. Rent our food truck and treat your guests to fresh, hot Indian street food!
              </p>
            </div>
            <div className="trucks-btn-group">
              <Link href="/contact" className="trucks-btn trucks-btn-primary">
                Inquire Catering
              </Link>
              <Link href="/menu" className="trucks-btn trucks-btn-outline">
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
