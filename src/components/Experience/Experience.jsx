"use client";

import { useEffect, useRef, useState } from "react";
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
    image: "/home/resturent.webp",
    description: "Warm, luxurious hospitality in Los Angeles. Enjoy classic Indian recipes refined for the modern palate.",
  },
  {
    id: "catering",
    title: "Catering",
    btnText: "Explore Catering",
    link: "/menu/catering-trays",
    image: "/home/services-catering.png",
    description: "From intimate gatherings to grand celebrations, we design custom menus that leave a lasting impression.",
  },
  {
    id: "food-trucks",
    title: "Food Trucks",
    btnText: "Book the Truck",
    link: "/menu/food-truck",
    image: "/home/foodtrack.jpeg",
    description: "Book us to bring hot, fresh street food and vibrant food truck flavors directly to your event.",
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
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" ref={sectionRef}>
      {/* Subtle mandana background watermarks for premium theme styling */}
      {/* Corner mandanas — frame the section top-left and bottom-right */}
      <Image
        src="/mandana/corner/Group.svg"
        className="mandala-corner mandala-corner-tl"
        width={200}
        height={200}
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/mandana/corner/Group.svg"
        className="mandala-corner mandala-corner-tr"
        width={200}
        height={200}
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/mandana/corner/Group.svg"
        className="mandala-corner mandala-corner-bl"
        width={200}
        height={200}
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/mandana/corner/Group.svg"
        className="mandala-corner mandala-corner-br"
        width={200}
        height={200}
        alt=""
        aria-hidden="true"
      />


      <div className="container">
        <div className="experience-header">
          <Copy type="lines" animateOnScroll>
            <span className="experience-tagline">Experience Bollywood Bites</span>
          </Copy>

          <Copy type="lines" animateOnScroll delay={0.1}>
            <h2 className="experience-title">
              One Kitchen. <br />
              <span className="highlight-text">Three Ways to Enjoy</span>
            </h2>
          </Copy>

          <Copy type="lines" animateOnScroll delay={0.25}>
            <p className="experience-subtitle">
              Enjoy authentic Indian cuisine your way—whether dining in, catering a special event, or visiting our food truck.
            </p>
          </Copy>
        </div>

        <div className="experience-cards">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`experience-card${activeCard === service.id ? " is-touch-active" : ""}`}
              onClick={() => handleCardClick(service.id)}
            >
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
