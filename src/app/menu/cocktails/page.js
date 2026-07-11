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
import "./cocktails.css";

gsap.registerPlugin(ScrollTrigger);

const BEER_ITEMS = [
  { name: "King Fisher (Indian Beer)", price: "$4.99", description: "Crisp and clean lager, the classic choice to pair with Indian curries." },
  { name: "Taj Mahal (Indian Beer)", price: "$4.99 / $7.99", description: "Smooth and refreshing premium lager. Available in Regular and Big bottles." },
  { name: "Old Monk 1000 (Indian Beer)", price: "$7.99", description: "Strong and rich Indian specialty brewed craft beer (Big size)." },
  { name: "Haywards 5000", price: "$4.99 / $7.99", description: "Iconic, full-bodied strong Indian lager. Available in Regular and Big bottles." },
  { name: "Newcastle", price: "$4.99", description: "Rich, smooth, and classic English brown ale." },
  { name: "Sierra Nevada", price: "$4.99", description: "Vibrant pale ale brewed with premium cascade hops." },
  { name: "Heineken", price: "$4.99", description: "Refreshing European pale lager." },
  { name: "Corona", price: "$4.99", description: "Light, crisp lager served with a fresh lime wedge." },
  { name: "Royal Challenge", price: "$4.99", description: "Popular premium Indian lager known for its smooth texture." }
];

const COCKTAIL_ITEMS = [
  { name: "Karma (Bollywood Bites Special)", price: "$6.50", description: "Han liquor blended perfectly with sweet alphonso mango juice." },
  { name: "Han Straight Up", price: "$6.50", description: "Premium Han liquor served chilled or on the rocks." },
  { name: "Cosmopolitan", price: "$6.50", description: "A refreshing mix of Han liquor, cranberry juice, and triple sec." },
  { name: "Asian Bull", price: "$6.50", description: "Energetic blend of premium Han liquor and Red Bull." },
  { name: "Electric Lemonade", price: "$6.50", description: "A vibrant fusion of Han liquor, Blue Curacao, and fresh lemonade." },
  { name: "Apple Martini", price: "$6.50", description: "Han liquor shaken with sweet granny smith apple cocktail mix." }
];

export default function CocktailMenu() {
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
      const cards = gsap.utils.toArray(".cocktails-category-block");
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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
    <div ref={pageRef} className="cocktails-menu-page">
      {/* Hero Section */}
      <section className="cocktails-hero">
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
            <h1>Cocktail Menu</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="cocktails-hero-tagline">Exotic Spirits, Craft Beer & Fine Wines</p>
          </Copy>

          <p className="cocktails-hero-desc">
            Explore our extensive drinks range, from classic premium Indian lagers to signature, low-calorie exotic Han cocktails crafted to satisfy your cravings.
          </p>

          {/* Action CTAs */}
          <div className="cocktails-ctas-row">
            <Button 
              href="javascript:;" 
              className="cocktails-cta-btn cocktails-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="cocktails-cta-btn cocktails-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="cocktails-cta-btn cocktails-btn-tertiary"
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
      <section className="cocktails-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="cocktails-two-col-layout">
            
            {/* Left Column: Drinks Lists */}
            <div className="cocktails-menu-display">
              <div className="cocktails-menu-section-header">
                <h2>Our Premium Beverage Selection</h2>
                <p className="section-desc">
                  Our beverage collection is carefully curated to complement the bold spices of Indian cuisine. We offer a selection of the best craft beers, fine wines, and custom cocktails to promise an exceptional drinking experience.
                </p>
              </div>

              {/* Beer Section */}
              <div className="cocktails-category-block">
                <div className="cocktails-category-title-wrap">
                  <h3>Indian & Craft Beers</h3>
                  <p className="cocktails-category-subtitle">Crisp and refreshing selection to cool the palate</p>
                </div>
                <div className="cocktails-items-list">
                  {BEER_ITEMS.map((item, idx) => (
                    <div className="cocktail-menu-item" key={idx}>
                      <div className="cocktail-item-top">
                        <span className="cocktail-item-name">{item.name}</span>
                        <span className="cocktail-item-price">{item.price}</span>
                      </div>
                      <p className="cocktail-item-description">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cocktails Section */}
              <div className="cocktails-category-block">
                <div className="cocktails-category-title-wrap">
                  <h3>Signature Han Cocktails</h3>
                  <p className="cocktails-category-subtitle">
                    All cocktails are crafted with HAN, a unique premium liquor from Asia similar to Vodka. At 48 proof, HAN makes light, refreshing, exotic cocktails that are 1/3 the calories of other spirit brands.
                  </p>
                </div>
                <div className="cocktails-items-list">
                  {COCKTAIL_ITEMS.map((item, idx) => (
                    <div className="cocktail-menu-item" key={idx}>
                      <div className="cocktail-item-top">
                        <span className="cocktail-item-name">{item.name}</span>
                        <span className="cocktail-item-price">{item.price}</span>
                      </div>
                      <p className="cocktail-item-description">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Flyer Image */}
            <div className="cocktails-sticky-sidebar">
              <div 
                className="cocktails-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/menu/cocktails.jpg"
                  alt="Bollywood Bites Beer and Cocktails Menu Flyer"
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
        <div className="cocktails-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Drinks Menu
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
                src="/menu/menu/cocktails.jpg"
                alt="Drinks Menu Flyer"
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
      <section className="cocktails-footer-ctas">
        <div className="container">
          <h3 className="section-title">Ready for a Premium Dining Experience?</h3>
          <p className="section-subtitle">Order our delicious dishes straight to your door, book a table for fine dining, or hire us for catering.</p>
          <div className="cocktails-ctas-row">
            <Button 
              href="javascript:;" 
              className="cocktails-cta-btn cocktails-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="cocktails-cta-btn cocktails-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="cocktails-cta-btn cocktails-btn-tertiary"
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
