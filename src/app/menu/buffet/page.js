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
import "./buffet.css";

gsap.registerPlugin(ScrollTrigger);

const BUFFET_EDITORIAL = [
  {
    title: "Experience the Richness of Indian Cuisine",
    paragraphs: [
      "Indian food offers something for everyone. From creamy curries and grilled tandoori dishes to vegetarian favorites and flavorful desserts, every meal celebrates the diversity of Indian culinary traditions. A quality Indian buffet Los Angeles experience provides guests with the freedom to sample multiple dishes and discover new favorites.",
      "At Bollywood Bites, authentic flavors and fresh ingredients come together to create a dining experience inspired by India’s rich heritage. Every dish is carefully prepared to ensure exceptional taste and quality."
    ]
  },
  {
    title: "A Buffet Perfect for Every Occasion",
    paragraphs: [
      "Whether you’re planning a family gathering, a business lunch, or a casual meal with friends, an Indian buffet Los Angeles offers convenience and variety. Guests can enjoy an assortment of dishes while experiencing traditional flavors prepared with care and expertise.",
      "The buffet concept allows everyone to customize their meal according to their preferences. From mild dishes to bold and spicy specialties, there is something to satisfy every palate."
    ]
  },
  {
    title: "Fresh Ingredients and Authentic Recipes",
    paragraphs: [
      "Authenticity begins with quality ingredients. Fresh vegetables, aromatic spices, premium meats, and traditional cooking methods contribute to unforgettable flavors. Every dish is designed to preserve the essence of Indian cuisine while offering consistency and freshness.",
      "People seeking an Indian buffet Los Angeles often appreciate a menu that balances classic favorites with diverse options. This dedication to quality ensures that every bite delivers a true taste of India."
    ]
  },
  {
    title: "Variety That Satisfies Every Craving",
    paragraphs: [
      "One of the biggest advantages of a buffet is the ability to explore different flavors in a single visit. Guests can enjoy vegetarian dishes, chicken specialties, seafood options, rice preparations, and traditional breads without limiting themselves to just one entrée.",
      "As a trusted Indian restaurant Westwood, providing guests with authentic recipes and a welcoming atmosphere remains a priority. From lunch gatherings to weekend outings, a buffet experience brings people together through delicious food and shared moments."
    ]
  },
  {
    title: "Ideal for Families and Groups",
    paragraphs: [
      "Dining is about more than just food – it is about creating memories. An Indian buffet Los Angeles provides an enjoyable experience for families, friends, and colleagues looking to share quality time over exceptional meals.",
      "The wide selection available ensures that everyone, including vegetarians and those with different taste preferences, can find dishes they love. Generous portions and diverse options make buffet dining a popular choice for celebrations and everyday meals alike."
    ]
  },
  {
    title: "Authentic Flavors with Exceptional Hospitality",
    paragraphs: [
      "Great food deserves great service. At Bollywood Bites, guests are welcomed with warm hospitality and a commitment to quality. Every dish is prepared with attention to detail, ensuring a memorable experience from start to finish.",
      "For customers who enjoy meals on the go, our Indian food truck Los Angeles service also brings authentic flavors to events and gatherings throughout the city, offering another convenient way to enjoy traditional Indian cuisine."
    ]
  },
  {
    title: "Why Choose an Indian Buffet?",
    paragraphs: [
      "Choosing an Indian buffet Los Angeles means enjoying variety, convenience, and authentic flavors all in one place. Whether you are craving classic curries, fragrant biryanis, tandoori specialties, or delicious vegetarian dishes, buffet dining allows you to explore the richness of Indian cuisine without limits.",
      "Guests appreciate the opportunity to try multiple dishes while enjoying freshly prepared meals in a comfortable setting. Quality ingredients and traditional recipes ensure that every visit is satisfying and memorable."
    ]
  },
  {
    title: "Discover Authentic Indian Dining in Los Angeles",
    paragraphs: [
      "Food has the power to bring people together and create lasting memories. That’s why Bollywood Bites continues to serve authentic Indian cuisine inspired by generations of culinary traditions. Guests looking for an Indian buffet Los Angeles value freshness, variety, and exceptional flavors that keep them coming back.",
      "Whether you’re visiting for lunch, dinner, or a special gathering, our buffet offers an unforgettable experience filled with delicious options and warm hospitality. Enjoy the taste of India and discover why buffet dining remains a favorite among food lovers across Los Angeles."
    ]
  },
  {
    title: "Visit Us on Google",
    paragraphs: [
      "Explore our Google Business Profile to view photos, read customer reviews, and find directions. Discover why guests across Los Angeles trust us for authentic Indian cuisine and memorable dining experiences."
    ]
  }
];

export default function BuffetMenu() {
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
      const cards = gsap.utils.toArray(".buffet-banner-card, .buffet-info-block");
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
    <div ref={pageRef} className="buffet-menu-page">
      {/* Hero Section */}
      <section className="buffet-hero">
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
            <h1>Indian Buffet</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="buffet-hero-tagline">Enjoy Authentic Flavors & Unlimited Variety</p>
          </Copy>

          <p className="buffet-hero-desc">
            Vibrant spices, rich traditions, and incredible selection. Experience our grand weekend buffet and festival street food chaat tables in Los Angeles.
          </p>

          {/* Action CTAs */}
          <div className="buffet-ctas-row">
            <Button 
              href="javascript:;" 
              className="buffet-cta-btn buffet-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="buffet-cta-btn buffet-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="buffet-cta-btn buffet-btn-tertiary"
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
      <section className="buffet-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="buffet-two-col-layout">
            
            {/* Left Column: Editorial Content */}
            <div className="buffet-editorial-content">
              <div className="buffet-article-header">
                <h2>Indian Buffet Los Angeles</h2>
                <p className="lead-p">
                  Indian cuisine is known for its vibrant spices, rich traditions, and incredible variety. Whether you enjoy flavorful curries, freshly baked naan, aromatic rice dishes, or delicious vegetarian specialties, a buffet experience allows you to explore a wide range of authentic recipes in one meal. At Bollywood Bites, finding a place that combines quality ingredients, traditional recipes, and exceptional service makes every dining experience truly memorable.
                </p>
              </div>

              {/* Banners & Highlights */}
              <div className="buffet-highlight-banners">
                <div className="buffet-banner-card">
                  <h3>Best Indian Food Buffet in Los Angeles</h3>
                  <p>
                    Join us on weekends at both locations: <strong>Saturdays & Sundays 11:30 AM – 3:00 PM</strong>.
                  </p>
                  <p style={{ marginTop: "0.5rem" }}>
                    Featuring a large selection of premium Entrées (Chicken, Lamb, Vegetarian, and Vegan specialties) served with fragrant Basmati Rice, Biryani, Salad, Raita, Desserts, Fresh Fruits, hot buttered Naan, and more.
                  </p>
                </div>

                <div className="buffet-banner-card">
                  <h3>BB&apos;s Special Festival Buffet – Indian Street</h3>
                  <p>
                    One of its kind in Los Angeles! Experience a live, interactive street food table where you have fun making your own authentic <strong>Indian Street Chaats</strong>, including: <strong>Bhel Puri</strong>, <strong>Sev Puri</strong>, and <strong>Pani Puri</strong>.
                  </p>
                </div>
              </div>

              {/* Editorial Blocks */}
              <div className="buffet-editorial-blocks">
                {BUFFET_EDITORIAL.map((block, idx) => (
                  <div key={idx} className="buffet-info-block">
                    <h4>{block.title}</h4>
                    {block.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Flyer Image */}
            <div className="buffet-sticky-sidebar">
              <div 
                className="buffet-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/menu/buffet.jpg"
                  alt="Bollywood Bites Weekend Grand Buffet Flyer"
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
        <div className="buffet-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Weekend Buffet
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
                src="/menu/menu/buffet.jpg"
                alt="Grand Buffet Menu Card"
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
      <section className="buffet-footer-ctas">
        <div className="container">
          <h3 className="section-title">Ready to Dine With Us?</h3>
          <p className="section-subtitle">Order our delicious dishes straight to your home, book a weekend buffet table, or request event catering.</p>
          <div className="buffet-ctas-row">
            <Button 
              href="javascript:;" 
              className="buffet-cta-btn buffet-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="buffet-cta-btn buffet-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="buffet-cta-btn buffet-btn-tertiary"
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
