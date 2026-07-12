"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import CTA from "@/components/CTA/CTA";
import "../gallery.css";
import "./event-gallery.css";

gsap.registerPlugin(ScrollTrigger);

const EVENT_PHOTOS = [
  { image: "/event_gallery/1519100628event1.jpg", title: "Corporate Gala Dinner" },
  { image: "/event_gallery/1519100629event2.jpg", title: "Traditional Celebration" },
  { image: "/event_gallery/1519100739event3.jpg", title: "Intimate Catering Reception" },
  { image: "/event_gallery/1519100739event4.jpg", title: "Live Concert Buffet" },
  { image: "/event_gallery/1519100740event5.jpg", title: "Grand Wedding Banquet" },
  { image: "/event_gallery/1519100740event6.jpg", title: "Cocktail Masterclass" }
];

export default function EventGallery() {
  const galleryRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  // Stagger animate gallery items on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".gallery-item");
      if (items.length === 0) return;

      gsap.killTweensOf(items);
      gsap.set(items, { opacity: 0, y: 30, scale: 0.96 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        overwrite: "auto",
        delay: 0.5
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // Sync body overflow with lightbox state
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLightboxOpen]);

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setSlideDirection("left");
    setIsLightboxOpen(true);
  };

  // Close Lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Navigate prev
  const prevPhoto = () => {
    setSlideDirection("right");
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? EVENT_PHOTOS.length - 1 : prevIndex - 1
    );
  };

  // Navigate next
  const nextPhoto = () => {
    setSlideDirection("left");
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === EVENT_PHOTOS.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentPhotoIndex]);

  const activePhoto = EVENT_PHOTOS[currentPhotoIndex];

  return (
    <>
      <section className="star-gallery-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-bg-overlay" />

        {/* Traditional Mandana Borders */}
        <div className="leaf-border-top" />

        {/* Central Content */}
        <div className="hero-content-wrapper">
          <Copy type="words" animateOnScroll={false} delay={0.8}>
            <span className="hero-tagline" style={{ display: "block" }}>Precious Moments Captured</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="hero-title">Event Gallery</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="hero-desc">
              A curated chronicle of cinema icons, cultural legends, and memorable 
              moments captured at Bollywood Bites.
            </p>
          </Copy>
        </div>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          
          {/* Grid Layout */}
          <div className="gallery-grid">
            {EVENT_PHOTOS.map((item, idx) => (
              <div 
                className="gallery-item" 
                key={idx}
                onClick={() => openLightbox(idx)}
                style={{ cursor: "pointer" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading={idx < 4 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <div className={`lightbox-overlay ${isLightboxOpen ? "active" : ""}`}>
        {/* Close Button */}
        <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isLightboxOpen && activePhoto && (
          <>
            {/* Nav Arrows */}
            <button className="lightbox-nav-btn prev" onClick={prevPhoto} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button className="lightbox-nav-btn next" onClick={nextPhoto} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Main Lightbox Content */}
            <div className="lightbox-main">
              <div className="lightbox-img-wrapper">
                <div key={currentPhotoIndex} className={`lightbox-img-container lightbox-slide-${slideDirection}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="lightbox-img"
                    style={{
                      maxHeight: "70vh",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Photo Info / Caption */}
            <div className="lightbox-info">
              <div className="lightbox-counter">
                {currentPhotoIndex + 1} of {EVENT_PHOTOS.length}
              </div>
            </div>
          </>
        )}
      </div>

      <CTA />
    </>
  );
}
