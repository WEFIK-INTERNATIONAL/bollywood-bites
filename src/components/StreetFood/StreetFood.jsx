"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./StreetFood.css";

gsap.registerPlugin(ScrollTrigger);

const STREET_FOODS = [
  { id: "pani-puri", title: "Pani Puri", class: "card-short", image: "/home/feast-pani-puri.png" },
  { id: "bhel-puri", title: "Bhel Puri", class: "card-medium", image: "/home/about-3.jpg" },
  { id: "kati-roll", title: "Kati Roll", class: "card-tall", image: "/about/sticky-card-3.jpg" },
  { id: "naan-wrap", title: "Naan Wrap", class: "card-tall", image: "/about/sticky-card-2.jpg" },
  { id: "pav-bhaji", title: "Pav Bhaji", class: "card-medium", image: "/dining-menu/dining-menu.jpg" },
  { id: "samosa-chaat", title: "Samosa Chaat", class: "card-short", image: "/about/sticky-card-4.jpg" },
];

const SPICES = [
  {
    name: "Cumin",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#1b120c" stroke="var(--base-300)" strokeWidth="1"/>
        <path d="M22 25 Q24 23 26 26" stroke="#c5a880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 20 Q34 18 36 21" stroke="#c5a880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 34 Q20 32 22 35" stroke="#c5a880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 38 Q40 36 42 39" stroke="#c5a880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M25 42 Q27 40 29 43" stroke="#c5a880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 32 Q32 30 34 33" stroke="#a38c6b" strokeWidth="2" strokeLinecap="round"/>
        <path d="M44 26 Q46 24 48 27" stroke="#a38c6b" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 22 Q16 20 18 23" stroke="#a38c6b" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 15 Q26 13 28 16" stroke="#a38c6b" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Coriander",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#221810" stroke="var(--base-300)" strokeWidth="1"/>
        <circle cx="20" cy="22" r="3" fill="#bfa680"/>
        <circle cx="34" cy="18" r="3.5" fill="#a38c6b"/>
        <circle cx="28" cy="28" r="3.2" fill="#bfa680"/>
        <circle cx="42" cy="25" r="3" fill="#a38c6b"/>
        <circle cx="18" cy="36" r="3.5" fill="#bfa680"/>
        <circle cx="32" cy="40" r="3.2" fill="#a38c6b"/>
        <circle cx="44" cy="38" r="3" fill="#bfa680"/>
        <circle cx="25" cy="14" r="3" fill="#a38c6b"/>
      </svg>
    ),
  },
  {
    name: "Cardamom",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#141c12" stroke="var(--base-300)" strokeWidth="1"/>
        <path d="M22 28 C20 22 28 20 30 26 C32 32 24 34 22 28 Z" fill="#60704c" stroke="#8f9e7b" strokeWidth="1"/>
        <path d="M38 34 C36 28 44 26 46 32 C48 38 40 40 38 34 Z" fill="#546440" stroke="#7e8c6a" strokeWidth="1"/>
        <path d="M28 42 C26 36 34 34 36 40 C38 46 30 48 28 42 Z" fill="#60704c" stroke="#8f9e7b" strokeWidth="1"/>
        <path d="M34 20 C32 14 40 12 42 18 C44 24 36 26 34 20 Z" fill="#546440" stroke="#7e8c6a" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: "Turmeric",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#2d1d03" stroke="var(--base-300)" strokeWidth="1"/>
        <path d="M12 42 C16 32 24 16 30 16 C36 16 44 32 48 42 Z" fill="#e0a93c"/>
        <path d="M16 42 C20 35 25 24 30 24 C35 24 40 35 44 42 Z" fill="#c99128"/>
      </svg>
    ),
  },
  {
    name: "Kashmiri Chili",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#220b08" stroke="var(--base-300)" strokeWidth="1"/>
        <path d="M12 42 C16 30 24 18 30 18 C36 18 44 30 48 42 Z" fill="#c23f2f"/>
        <path d="M16 42 C20 33 25 24 30 24 C35 24 40 33 44 42 Z" fill="#9c271b"/>
        <path d="M22 28 Q28 20 32 28 Q34 32 38 34" stroke="#c23f2f" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Black Pepper",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#111111" stroke="var(--base-300)" strokeWidth="1"/>
        <circle cx="20" cy="20" r="2.5" fill="#3b3835"/>
        <circle cx="26" cy="18" r="3" fill="#222222"/>
        <circle cx="32" cy="24" r="2.5" fill="#3b3835"/>
        <circle cx="38" cy="20" r="3" fill="#222222"/>
        <circle cx="22" cy="32" r="3" fill="#222222"/>
        <circle cx="28" cy="36" r="2.8" fill="#3b3835"/>
        <circle cx="34" cy="32" r="3.2" fill="#222222"/>
        <circle cx="42" cy="30" r="2.5" fill="#3b3835"/>
        <circle cx="40" cy="40" r="3" fill="#222222"/>
        <circle cx="18" cy="42" r="2.5" fill="#3b3835"/>
      </svg>
    ),
  },
  {
    name: "Cinnamon",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="#1b120c" stroke="var(--base-300)" strokeWidth="1"/>
        <rect x="22" y="16" width="6" height="30" rx="1.5" transform="rotate(-15 22 16)" fill="#8a5e3b" stroke="#6b4629" strokeWidth="1"/>
        <rect x="34" y="14" width="6" height="30" rx="1.5" transform="rotate(15 34 14)" fill="#784f30" stroke="#5a391f" strokeWidth="1"/>
      </svg>
    ),
  },
];

const StreetFood = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".street-card");
    const headerElements = section.querySelectorAll(".street-header-animate");
    const spices = section.querySelectorAll(".spice-item");
    const ctaWrapper = section.querySelector(".street-cta-wrapper");

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
          trigger: ".street-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".street-cards-row",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      spices,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".street-spices-row",
          start: "top 90%",
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
          trigger: ".street-cta-wrapper",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="street-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="street-header">
          <div className="street-header-animate header-flourish-top">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="45" y2="10" stroke="var(--base-300)" strokeWidth="1"/>
              <circle cx="60" cy="10" r="4" fill="none" stroke="var(--base-300)" strokeWidth="1.5"/>
              <path d="M57 10 L60 7 L63 10 L60 13 Z" fill="var(--base-300)"/>
              <line x1="75" y1="10" x2="120" y2="10" stroke="var(--base-300)" strokeWidth="1"/>
            </svg>
          </div>

          <span className="street-header-animate street-tagline">Bollywood Bites Signatures</span>
          
          <h2 className="street-header-animate street-title">
            India&rsquo;s Street <br />
            <span className="highlight-text">Food Classics</span>
          </h2>

          <div className="street-header-animate header-flourish-bottom">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
              <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
            </svg>
          </div>

          <p className="street-header-animate street-subtitle">
            The iconic flavors that made India fall in love with street food.
          </p>
        </div>

        {/* 6-Card Staggered Stature Row */}
        <div className="street-cards-row">
          {STREET_FOODS.map((food) => (
            <div key={food.id} className={`street-card ${food.class}`}>
              <div className="street-card-bg">
                <Image
                  src={food.image}
                  alt={food.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="street-card-image"
                />
              </div>
              <div className="street-card-overlay">
                <h3 className="street-card-title">{food.title}</h3>
                <div className="street-card-divider">
                  <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="4" x2="16" y2="4" stroke="var(--base-300)" strokeWidth="0.8" />
                    <circle cx="20" cy="4" r="1.5" fill="var(--base-300)" />
                    <line x1="24" y1="4" x2="40" y2="4" stroke="var(--base-300)" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spices Horizontal Showcase */}
        <div className="street-spices-row">
          {SPICES.map((spice, idx) => (
            <div key={idx} className="spice-item">
              <div className="spice-bowl-container">
                {spice.icon}
              </div>
              <span className="spice-name">{spice.name}</span>
              {idx < SPICES.length - 1 && (
                <div className="spice-dot-divider">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2 L8 6 L10 6 L8 8 L9 10 L6 8 L3 10 L4 8 L2 6 L4 6 Z" fill="rgba(197, 168, 128, 0.4)"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="street-cta-wrapper">
          <Button href="/menu" className="street-explore-btn">
            Explore Our Full Menu
          </Button>
        </div>

      </div>
    </section>
  );
};

export default StreetFood;
