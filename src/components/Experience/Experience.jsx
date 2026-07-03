"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "restaurant",
    title: "Restaurant",
    btnText: "Reserve a Table",
    link: "/reservation",
    image: "/home/services-restaurant.png",
    description: "Experience our warm, luxurious hospitality firsthand in the heart of London. Indulge in classic recipes refined for the modern palate.",
  },
  {
    id: "catering",
    title: "Catering",
    btnText: "Explore Catering",
    link: "/services/catering",
    image: "/home/services-catering.png",
    description: "From intimate gatherings to grand celebrations, we create exceptional culinary experiences that leave a lasting impression.",
  },
  {
    id: "food-trucks",
    title: "Food Trucks",
    btnText: "Book the Truck",
    link: "/services/food-trucks",
    image: "/home/services-food-truck.png",
    description: "Catch us on the streets of London or book us to bring hot, fresh street food directly to your private party or corporate event.",
  },
];

const VALUES = [
  {
    title: "Authentic Recipes",
    subtitle: "True flavors of India",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c0 2-2 7-6 10" />
        <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
        <path d="M12.5 16.5c-1 1-2.5 2-4.5 2.5" />
      </svg>
    ),
  },
  {
    title: "Finest Ingredients",
    subtitle: "Sourced with care",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 10c0 4.4 3.6 8 8 8s8-3.6 8-8H5z" />
        <path d="M8 10V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v5" />
        <path d="M9 18v2c0 1.1-.9 2-2 2h10c-1.1 0-2-.9-2-2v-2" />
        <path d="M12 3v3" />
      </svg>
    ),
  },
  {
    title: "Crafted with Passion",
    subtitle: "Made from the heart",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5C10.5 3.5 8 3.5 6.5 5C5 6.5 5 9 6.5 10.5L12 16L17.5 10.5C19 9 19 6.5 17.5 5C16 3.5 13.5 3.5 12 5Z" />
        <path d="M8 14c-2.5 1.5-4 4-4 6h16c0-2-1.5-4.5-4-6" />
      </svg>
    ),
  },
  {
    title: "Memorable Experiences",
    subtitle: "For every occasion",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".experience-card");
    const values = section.querySelectorAll(".value-item");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-cards",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      values,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-values-row",
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="experience-section" ref={sectionRef}>
      {/* Subtle mandana background watermarks for premium theme styling */}

      <div className="container">
        <div className="experience-header">
          <Copy type="lines" animateOnScroll>
            <span className="experience-tagline">Experience Bollywood Bites</span>
          </Copy>

          <Copy type="lines" animateOnScroll delay={0.1}>
            <h2 className="experience-title">
              How would you like to <br />
              <span className="highlight-text">experience Bollywood Bites?</span>
            </h2>
          </Copy>

          <Copy type="lines" animateOnScroll delay={0.25}>
            <p className="experience-subtitle">
              From an exquisite dining experience to unforgettable celebrations on your special day or a vibrant food experience on the go – we bring India&rsquo;s finest flavors to you, your way.
            </p>
          </Copy>
        </div>

        <div className="experience-cards">
          {SERVICES.map((service, index) => (
            <div key={service.id} className="experience-card">
              <div className="experience-card-bg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                  className="experience-card-image"
                />
              </div>

              {/* Default View (Overlay Text + Button) */}
              <div className="experience-card-default">
                <h3 className="card-title-main">{service.title}</h3>
                
                <div className="experience-card-line-divider">
                  <span className="card-line" />
                  <span className="card-dot" />
                  <span className="card-line" />
                </div>

                <div className="card-action">
                  <Button href={service.link} className="experience-btn">
                    {service.btnText}
                  </Button>
                </div>
              </div>

              {/* Glassmorphic Hover Panel */}
              <div className="experience-card-hover-panel">
                <div className="hover-panel-content">
                  <h3 className="hover-title">{service.title}</h3>
                  <div className="hover-divider" />
                  <p className="hover-desc">{service.description}</p>
                  <Button href={service.link} className="experience-btn-hover">
                    {service.btnText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-values-row">
          {VALUES.map((val, idx) => (
            <div key={idx} className="value-item">
              <div className="value-icon">{val.icon}</div>
              <div className="value-text">
                <h4>{val.title}</h4>
                <p>{val.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
