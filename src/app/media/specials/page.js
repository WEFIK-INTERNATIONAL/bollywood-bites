"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./specials.css";

gsap.registerPlugin(ScrollTrigger);

const SPECIALS_FLYERS = [
  {
    image: "/special/special1.jpg",
    title: "Signature Catering & Events",
    tag: "Exclusive Offers",
  },
  {
    image: "/special/special2.jpg",
    title: "Gourmet Lunch & Buffet",
    tag: "Daily Specials",
  },
  {
    image: "/special/special3.jpg",
    title: "Food Truck Street Eats",
    tag: "Weekly Promotions",
  },
];

export default function SpecialsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".specials-card");
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: ".specials-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
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

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="specials-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Specials Background"
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
            <span className="specials-hero-tagline" style={{ display: "block" }}>Limited Time Offers & Exclusive Promotions</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="hero-title">Seasonal Specials</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="hero-desc">
              Discover our exclusive dining promotions, street food discounts, 
              and seasonal menus crafted with passion.
            </p>
          </Copy>
        </div>
      </section>

      {/* Specials Content */}
      <section className="specials-content">
        <div className="container">
          <div className="specials-grid">
            {SPECIALS_FLYERS.map((item, idx) => (
              <div className="specials-card" key={idx}>
                <div className="specials-flyer-frame">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={1125}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority={idx === 0}
                  />
                </div>
                <span>{item.tag}</span>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
