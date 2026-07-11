"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import Testimonials from "@/components/Testimonials/Testimonials";
import { 
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiPlus,
  HiMinus
} from "react-icons/hi";
import "./restaurant.css";

gsap.registerPlugin(ScrollTrigger);

const MENU_FLYERS = [
  {
    image: "/restaurant/res1.webp",
    title: "Bollywood Bites Menu Cover",
    tag: "Menu Cover",
  },
  {
    image: "/restaurant/res2.webp",
    title: "Appetizers & Soups",
    tag: "Menu Page 1",
  },
  {
    image: "/restaurant/res3.webp",
    title: "Chaats & Kathi Rolls",
    tag: "Menu Page 2",
  },
  {
    image: "/restaurant/res4.webp",
    title: "Tandoori Sizzlers",
    tag: "Menu Page 3",
  },
  {
    image: "/restaurant/res5.webp",
    title: "Royal Curries (Chicken & Lamb)",
    tag: "Menu Page 4",
  },
  {
    image: "/restaurant/res6.webp",
    title: "Seafood & Vegetarian Entrées",
    tag: "Menu Page 5",
  },
  {
    image: "/restaurant/res7.webp",
    title: "Rice Specialties & Biryanis",
    tag: "Menu Page 6",
  },
  {
    image: "/restaurant/res8.webp",
    title: "Fresh Breads, Desserts & Beverages",
    tag: "Menu Page 7",
  },
];

export default function RestaurantMenu() {
  const pageRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Manage body scroll lock via useEffect side-effects
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomLevel(1);
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      let nextIndex = prevIndex + direction;
      if (nextIndex < 0) nextIndex = MENU_FLYERS.length - 1;
      if (nextIndex >= MENU_FLYERS.length) nextIndex = 0;
      return nextIndex;
    });
    setZoomLevel(1);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const nextZoom = prev + direction * 0.5;
      return Math.min(Math.max(1, nextZoom), 3.0);
    });
  };

  // Staggered fade-in scroll animation for menu cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".menu-card");
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          });
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
  };

  return (
    <div ref={pageRef} className="restaurant-menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        {/* <Image 
          src="/mandana/rounded_mandala/Group 9.svg" 
          className="bg-mandala-centered" 
          style={{ opacity: 0.08 }} 
          width={800} 
          height={800} 
          loading="eager" 
          alt="" 
        /> */}
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
            <h1>Restaurant Menu</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="menu-hero-tagline">Traditional Fine Dining & Authenticity</p>
          </Copy>

          <p className="menu-hero-desc">
            Experience our award-winning Indian delicacies handcrafted with authentic spices and fresh local ingredients. Located in Westwood Village, Los Angeles.
          </p>

          {/* Action CTAs */}
          <div className="menu-ctas-row">
            <Button 
              href="javascript:;" 
              className="menu-cta-btn menu-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="menu-cta-btn menu-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="menu-cta-btn menu-btn-tertiary"
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

      {/* Menu Content */}
      <section className="menu-content">
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />
        <div className="container">
          <div className="menu-column-grid">
            {MENU_FLYERS.map((item, idx) => (
              <div 
                className="menu-card" 
                id={`menu-card-${idx}`} 
                key={idx}
              >
                <div 
                  className="restaurant-menu-frame"
                  onClick={() => openLightbox(idx)}
                  title="Click to view full screen"
                >
                  <div className="frame-overlay">
                    <span className="expand-text">Click to View Full Screen</span>
                  </div>
                  <Image
                    src={item.image}
                    alt={`${item.title} - Bollywood Bites Menu`}
                    width={900}
                    height={1125}
                    className="menu-flyer-image"
                    priority={idx < 2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="menu-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              {MENU_FLYERS[lightboxIndex].title} ({lightboxIndex + 1}/{MENU_FLYERS.length})
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

          <button className="lightbox-arrow prev" onClick={() => navigateLightbox(-1)}>
            <HiChevronLeft />
          </button>

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
                src={MENU_FLYERS[lightboxIndex].image}
                alt={MENU_FLYERS[lightboxIndex].title}
                width={1200}
                height={1500}
                className="lightbox-flyer-image"
                priority
              />
            </div>
          </div>

          <button className="lightbox-arrow next" onClick={() => navigateLightbox(1)}>
            <HiChevronRight />
          </button>
        </div>
      )}

      {/* Quick CTAs Footer section */}
      <section className="menu-footer-ctas">
        <div className="bg-mandala-right" style={{ opacity: 0.02 }} />
        <div className="container">
          <h3 className="section-title">Ready to Experience Bollywood Bites?</h3>
          <p className="section-subtitle">Order our gourmet dishes straight to your door, book a table for fine dining, or hire us for catering.</p>
          <div className="menu-ctas-row">
            <Button 
              href="javascript:;" 
              className="menu-cta-btn menu-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="menu-cta-btn menu-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="menu-cta-btn menu-btn-tertiary"
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
