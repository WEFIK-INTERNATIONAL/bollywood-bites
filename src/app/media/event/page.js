"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./event.css";

gsap.registerPlugin(ScrollTrigger);

const EVENTS_FLYERS = [
  {
    image: "/events/event1.webp",
    title: "Catering Menu Showcase",
    tag: "Exclusive Event",
  },
  {
    image: "/events/event2.webp",
    title: "Indian Buffet & Lunch Specials",
    tag: "Sherman Oaks Event",
  },
  {
    image: "/events/event3.webp",
    title: "Live Comedy & Bollywood Karaoke",
    tag: "Entertainment Night",
  },
  {
    image: "/events/event4.webp",
    title: "Weekend Brunch Specials",
    tag: "Weekend Event",
  },
  {
    image: "/events/event5.png",
    title: "Grand Celebration Catering",
    tag: "Special Celebration",
  },
  {
    image: "/events/event6.jpg",
    title: "Royal Maharaja Buffet",
    tag: "Weekly Buffet Fest",
  },
];

export default function EventPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".events-card");
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: ".events-grid",
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
      <section className="events-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Events Background"
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
            <span className="events-hero-tagline" style={{ display: "block" }}>Live Experiences & Celebrations</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="hero-title">Events & Music</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="hero-desc">
              Join us for live stand-up comedy, karaoke nights, special buffets, and 
              celebrations that bring community and flavor together.
            </p>
          </Copy>
        </div>
      </section>

      {/* Events Content */}
      <section className="events-content">
        <div className="container">
          <div className="events-grid">
            {EVENTS_FLYERS.map((item, idx) => (
              <div className="events-card" key={idx}>
                <div className="events-flyer-frame">
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
