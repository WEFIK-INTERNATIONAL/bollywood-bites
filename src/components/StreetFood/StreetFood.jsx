"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";

import "./StreetFood.css";

gsap.registerPlugin(ScrollTrigger);

const STREET_FOODS = [
  {
    id: "pani-puri",
    title: "Pani Puri",
    desc: "Crispy hollow puris filled with spiced potato, chickpeas, and flooded with tangy mint-tamarind water.",
    image: "/home/feast-pani-puri.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        <path d="M8 15h8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "bhel-puri",
    title: "Bhel Puri",
    desc: "A crunchy, savory medley of puffed rice, peanuts, onions, tomatoes, and spicy-sweet chutneys.",
    image: "/home/about-3.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 20h18L12 4z" />
        <path d="M7 16h10" />
      </svg>
    )
  },
  {
    id: "kati-roll",
    title: "Kati Roll",
    desc: "Skewer-roasted kebabs and fresh veggies wrapped in a warm, flaky paratha flatbread.",
    image: "/about/sticky-card-3.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M6 8h12M6 14h12" />
      </svg>
    )
  },
  {
    id: "naan-wrap",
    title: "Naan Wrap",
    desc: "Soft, freshly baked tandoori naan rolled with spiced meats, paneer, and mint yogurt dressing.",
    image: "/about/sticky-card-2.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="5" ry="9" />
        <path d="M8 12h8" />
      </svg>
    )
  },
  {
    id: "pav-bhaji",
    title: "Pav Bhaji",
    desc: "A thick, spicy vegetable mash simmered in butter, served hot with toasted, butter-soaked pav buns.",
    image: "/dining-menu/dining-menu.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    )
  },
  {
    id: "samosa-chaat",
    title: "Samosa Chaat",
    desc: "Crushed golden samosas layered with warm chickpea curry, cool yogurt, and dynamic sweet-tangy chutneys.",
    image: "/about/sticky-card-4.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l9 16H3L12 3z" />
      </svg>
    )
  }
];

const StreetFood = () => {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".street-card");
    const headerElements = section.querySelectorAll(".street-header-animate");
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

        {/* Interactive Accordion Layout */}
        <div className="street-cards-row">
          {STREET_FOODS.map((food, idx) => (
            <div
              key={food.id}
              className={`street-card ${activeIdx === idx ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIdx(idx)}
            >
              {/* Background Image */}
              <div className="street-card-bg">
                <Image
                  src={food.image}
                  alt={food.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="street-card-image"
                  priority={idx === 0}
                />
              </div>

              {/* Vertical Title (reads top to bottom) */}
              <div className="street-card-vertical-header">
                <span className="street-card-vertical-title">{food.title}</span>
              </div>

              {/* Collapsed Bottom Icon */}
              <div className="street-card-collapsed-icon">
                {food.icon}
              </div>

              {/* Expanded Content Overlay */}
              <div className="street-card-expanded-content">
                <p className="street-card-desc">{food.desc}</p>
              </div>
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
