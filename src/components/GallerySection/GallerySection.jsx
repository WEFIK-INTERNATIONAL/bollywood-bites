"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./GallerySection.css";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: "/home/about-5.jpg", alt: "Luxury Indoor Restaurant Dining Room" },
  { src: "/dining-menu/dining-menu-foodsharing.jpg", alt: "Gourmet Food Sharing" },
  { src: "/home/chef-cooking.png", alt: "Chef Sanjay Patel Cooking" },
  { src: "/home/services-food-truck.png", alt: "Bollywood Bites Food Truck at Night" },
  { src: "/dining-menu/dining-menu-drinks.jpg", alt: "Indian Spiced Cocktail and Appetizer" },
  { src: "/about/about-image-banner.jpg", alt: "Beautiful Banquet Table Setting" },
  { src: "/home/about-3.jpg", alt: "Indian Family Dining Together" },
  { src: "/home/services-catering.png", alt: "Luxury Indian Buffet Catering Spread" },
];

const GallerySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".gallery-item");
    const headerElements = section.querySelectorAll(".gallery-header-animate");
    const ctaWrapper = section.querySelector(".gallery-cta-wrapper");

    gsap.fromTo(
      headerElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ctaWrapper,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-cta-wrapper",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="gallery-header">
          <div className="gallery-header-animate header-flourish-top">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
              <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
            </svg>
          </div>

          <span className="gallery-header-animate gallery-tagline">The Bollywood Bites Experience</span>
          
          <h2 className="gallery-header-animate gallery-title">
            Where Every Meal <br />
            <span className="highlight-text">Becomes a Memory.</span>
          </h2>

          <div className="gallery-header-animate header-flourish-bottom">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="45" y2="10" stroke="var(--base-300)" strokeWidth="1"/>
              <circle cx="60" cy="10" r="4" fill="none" stroke="var(--base-300)" strokeWidth="1.5"/>
              <path d="M57 10 L60 7 L63 10 L60 13 Z" fill="var(--base-300)"/>
              <line x1="75" y1="10" x2="120" y2="10" stroke="var(--base-300)" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        {/* 4x2 Photo Collage Grid */}
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="gallery-image"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-hover-text">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="gallery-cta-wrapper">
          <Button href="/media" className="gallery-explore-btn">
            View Our Gallery
          </Button>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
