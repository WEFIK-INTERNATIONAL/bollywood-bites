"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import Testimonials from "@/components/Testimonials/Testimonials";
import { 
  HiX,
  HiPlus,
  HiMinus
} from "react-icons/hi";
import "./foodtruck.css";

gsap.registerPlugin(ScrollTrigger);

const VEG_ITEMS = [
  { name: "Chana Masala", price: "Choice 1" },
  { name: "Aloo Gobhi", price: "Choice 2" },
  { name: "Saag Paneer / Tofu", price: "Choice 3" },
  { name: "Paneer Masala", price: "Choice 4" },
  { name: "Mix Veggie Korma", price: "Choice 5" },
  { name: "Vegetable Coconut Curry", price: "Choice 6" }
];

const CHICKEN_ITEMS = [
  { name: "Chicken Tikka Masala", price: "Choice 1" },
  { name: "Chicken Curry", price: "Choice 2" },
  { name: "Chicken Saag", price: "Choice 3" },
  { name: "Chicken Korma", price: "Choice 4" },
  { name: "Butter Chicken", price: "Choice 5" }
];

const LAMB_ITEMS = [
  { name: "Lamb Vindaloo", price: "Choice 1" },
  { name: "Lamb Curry", price: "Choice 2" }
];

const SEAFOOD_ITEMS = [
  { name: "Fish Masala", price: "Choice 1" },
  { name: "Shrimp Masala", price: "Choice 2" }
];

const SALAD_ITEMS = [
  { name: "Tandoor Chicken Salad", price: "$10.50" },
  { name: "Mix Garden Green Tofu Salad", price: "$8.75" }
];

const KATHI_ROLLS = [
  { name: "Veggie Kathi Roll", price: "$12.99" },
  { name: "Chicken Kathi Roll", price: "$12.99" },
  { name: "Lamb Kathi Roll / Tofu", price: "$13.99" },
  { name: "Shrimp Kathi Roll", price: "$14.99" },
  { name: "Pav Bhaji Kathi Roll", price: "$15.99" },
  { name: "Samosa Chaat Kathi Roll", price: "$12.99" }
];

const NAAN_WRAPS = [
  { name: "Paneer / Tofu Naan Wrap", price: "$11.99" },
  { name: "Chicken Naan Wrap", price: "$12.99" },
  { name: "Lamb Naan Wrap", price: "$13.99" },
  { name: "Shrimp Naan Wrap", price: "$14.99" },
  { name: "Bhel Puri Naan Wrap", price: "$12.99" },
  { name: "Samosa Naan Wrap (2 Pcs)", price: "$6.00" }
];

const SANDWICH_ITEMS = [
  { name: "Paneer Keema Sandwich", price: "$7.95" },
  { name: "Chicken Keema Sandwich", price: "$8.50" },
  { name: "Lamb Keema Sandwich", price: "$9.50" },
  { name: "Veg Pakoras Keema Sandwich", price: "$5.99" },
  { name: "Sev Puri Keema Sandwich", price: "$7.95" },
  { name: "Samosa Chaat Keema Sandwich", price: "$8.50" }
];

const BIRYANI_ITEMS = [
  { name: "Vegetable Biryani", price: "$13.99" },
  { name: "Chicken Biryani", price: "$14.99" },
  { name: "Lamb Biryani", price: "$15.99" },
  { name: "Shrimp Biryani", price: "$15.99" }
];

const DRINK_ITEMS = [
  { name: "Mango Lassi", price: "$5.75" },
  { name: "Thums Up", price: "$3.99" },
  { name: "Limca", price: "$3.99" }
];

const DESSERT_ITEMS = [
  { name: "Gulab Jamun (2 pieces)", price: "$3.00" }
];

const FOOD_TRUCK_EDITORIAL = [
  {
    title: "Experience Authentic Indian Cuisine Anywhere",
    paragraphs: [
      "Great food should be accessible wherever you are. Our Indian food truck Los Angeles experience combines authentic recipes with convenience, making it easier than ever to enjoy traditional Indian flavors at events, offices, and private celebrations.",
      "Every dish is crafted using fresh ingredients and carefully selected spices that highlight the essence of Indian cooking. Whether you are enjoying a quick lunch or feeding a crowd, our food truck menu offers exceptional taste and quality."
    ]
  },
  {
    title: "Perfect for Events and Catering",
    paragraphs: [
      "From birthday parties and weddings to corporate lunches and community festivals, our menu is perfect for creating memorable experiences. We proudly offer food truck catering services for private and public events, bringing authentic Indian cuisine directly to your guests.",
      "Whether you need meals for a small celebration or a large gathering, our team is committed to delivering quality food and exceptional service."
    ]
  },
  {
    title: "Fresh Ingredients and Authentic Recipes",
    paragraphs: [
      "Authenticity is at the heart of everything we serve. Traditional cooking methods, premium ingredients, and carefully balanced spices create dishes that capture the rich flavors of India. Guests seeking an Indian restaurant in Los Angeles appreciate the same dedication to quality and taste that we bring to our mobile dining experience.",
      "Our Indian food truck Los Angeles menu is designed to provide variety while maintaining the authentic flavors that people love. Every dish is prepared with care to ensure consistency and satisfaction."
    ]
  },
  {
    title: "Bringing Indian Flavors to Los Angeles",
    paragraphs: [
      "Food has the power to bring people together, and our mission is to create memorable dining experiences wherever we go. Whether you’re enjoying lunch with coworkers or hosting a special event, our Indian food truck Los Angeles menu offers something delicious for everyone.",
      "With a commitment to quality, freshness, and exceptional service, Bollywood Bites continues to serve flavorful meals inspired by India’s rich culinary traditions. Guests across the city trust our Indian food truck Los Angeles experience for authentic dishes, generous portions, and unforgettable flavors."
    ]
  },
  {
    title: "Follow Us & Get in Touch Today",
    paragraphs: [
      "Stay connected with us on Instagram for updates, upcoming locations, and special offers. Contact us today for catering inquiries, private events, and experience authentic flavors from our Indian food truck Los Angeles, serving delicious cuisine fresh on the go.",
      "Visit our Google Business Profile to explore photos, reviews, and directions, and see why guests across Los Angeles love our authentic Indian food truck experience."
    ]
  }
];

export default function FoodTruckMenu() {
  const pageRef = useRef(null);
  const contentSectionRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Manage body scroll lock via useEffect side-effects
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox]);

  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const nextZoom = prev + direction * 0.5;
      return Math.min(Math.max(1, nextZoom), 3.0);
    });
  };

  // Scroll animations for content blocks
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".pricing-tier-card, .foodtruck-category-block, .foodtruck-info-block");
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="foodtruck-menu-page">
      {/* Hero Section */}
      <section className="foodtruck-hero">
        <div className="hero-img">
          <Image 
            src="/restaurant/homegallery2.jpg" 
            fill 
            priority 
            sizes="100vw" 
            style={{ objectFit: "cover" }} 
            alt="" 
          />
        </div>
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0}>
            <h1>Food Truck Menu</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="foodtruck-hero-tagline">Indian Food Truck Los Angeles | Authentic Indian Flavors on the Go</p>
          </Copy>

          <p className="foodtruck-hero-desc">
            Experience our famous mobile dining, bringing gourmet curries, fresh naan wraps, street style kathi rolls, and traditional vegetarian delights right to your neighborhood.
          </p>

          {/* Action CTAs */}
          <div className="foodtruck-ctas-row">
            <Button 
              href="javascript:;" 
              className="foodtruck-cta-btn foodtruck-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="foodtruck-cta-btn foodtruck-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="foodtruck-cta-btn foodtruck-btn-tertiary"
            >
              Request Catering
            </Button>
          </div>

          <div className="section-footer">
            <Copy type="lines" animateOnScroll={false} delay={0.2}>
              <p className="sm">Est. 2009</p>
            </Copy>
            <Copy type="lines" animateOnScroll={false} delay={0.3}>
              <p className="sm">Los Angeles, California, USA</p>
            </Copy>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="foodtruck-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="foodtruck-two-col-layout">
            
            {/* Left Column: Menu Display */}
            <div className="foodtruck-menu-display">
              <div className="foodtruck-menu-section-header">
                <h2>Indian Food Truck Los Angeles</h2>
                <p className="section-desc" style={{ marginBottom: "1.25rem" }}>
                  Indian food truck Los Angeles brings the vibrant taste of India to streets, events, and gatherings across Southern California with a menu designed for those who crave fresh, flavorful, and convenient meals. Whether you are planning a corporate lunch, attending a local festival, or simply looking for delicious cuisine on the go, our menu offers a variety of traditional dishes prepared with authentic ingredients and rich spices.
                </p>
                <p className="section-desc">
                  Known for serving quality Indian cuisine, Bollywood Bites delivers memorable dining experiences with freshly prepared dishes that satisfy every palate. From comforting vegetarian favorites to hearty chicken specialties and savory seafood creations, our menu has something for everyone.
                </p>
              </div>

              {/* Meal Package Pricing */}
              <div className="foodtruck-pricing-highlights">
                <div className="pricing-tier-card">
                  <h4>Entrée Bowl</h4>
                  <span className="price-tag">$13.99 + Tax</span>
                  <p>Choose any one delicious entrée served over fragrant steamed Basmati rice.</p>
                </div>
                <div className="pricing-tier-card">
                  <h4>Entrée Combo</h4>
                  <span className="price-tag">$17.99 + Tax</span>
                  <p>Choose any two delicious entrées served with Basmati rice, fresh salad, and warm Naan.</p>
                </div>
              </div>

              {/* Category Grids */}
              <div className="foodtruck-categories-grid">
                {/* Veg Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Vegetable Entrées</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {VEG_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chicken Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Chicken Specialties</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {CHICKEN_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lamb Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Lamb Specials</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {LAMB_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seafood Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Seafood Entrées</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {SEAFOOD_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kathi Rolls Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Street Kathi Rolls</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {KATHI_ROLLS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Naan Wraps Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Fresh Naan Wraps</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {NAAN_WRAPS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keema Sandwiches Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Keema Sandwiches</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {SANDWICH_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biryanis Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Fragrant Biryanis</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {BIRYANI_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salads Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Fresh Salads</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {SALAD_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drinks & Desserts Block */}
                <div className="foodtruck-category-block">
                  <div className="foodtruck-category-title-wrap">
                    <h3>Drinks & Desserts</h3>
                  </div>
                  <div className="foodtruck-items-list">
                    {DRINK_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                    {DESSERT_ITEMS.map((item, idx) => (
                      <div className="foodtruck-menu-item" key={idx}>
                        <span className="foodtruck-item-name">{item.name}</span>
                        <span className="foodtruck-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editorial Paragraph Blocks */}
              <div className="foodtruck-editorial-blocks">
                {FOOD_TRUCK_EDITORIAL.map((block, idx) => (
                  <div key={idx} className="foodtruck-info-block">
                    <h4>{block.title}</h4>
                    {block.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Sticky Flyer Image */}
            <div className="foodtruck-sticky-sidebar">
              <div 
                className="foodtruck-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/services/foodtruck.jpeg"
                  alt="Bollywood Bites Food Truck Mobile Catering Menu Flyer"
                  width={900}
                  height={1200}
                  className="menu-flyer-image"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="foodtruck-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Food Truck Menu
            </span>
            <div className="lightbox-controls">
              <button className="zoom-btn" onClick={() => handleZoom(1)} title="Zoom In">
                <HiPlus />
              </button>
              <button className="zoom-btn" onClick={() => handleZoom(-1)} title="Zoom Out">
                <HiMinus />
              </button>
            </div>
          </div>

          <div className="lightbox-image-wrapper" onClick={closeLightbox}>
            <div 
              className="lightbox-image-container"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.25s ease-out",
                cursor: zoomLevel > 1 ? "grab" : "default"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/menu/services/foodtruck.jpeg"
                alt="Food Truck Menu Card"
                width={1200}
                height={1600}
                className="lightbox-flyer-image"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick CTAs Footer section */}
      <section className="foodtruck-footer-ctas">
        <div className="container">
          <h3 className="section-title">Bring the Food Truck to Your Next Event</h3>
          <p className="section-subtitle">Book our mobile truck to serve fresh Indian street food on the go, or order gourmet dishes delivered straight to you.</p>
          <div className="foodtruck-ctas-row">
            <Button 
              href="javascript:;" 
              className="foodtruck-cta-btn foodtruck-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="foodtruck-cta-btn foodtruck-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="foodtruck-cta-btn foodtruck-btn-tertiary"
            >
              Request Catering
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
