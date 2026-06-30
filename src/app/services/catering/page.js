"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../services.css";

gsap.registerPlugin(ScrollTrigger);

export default function CateringServices() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="services-hero">
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Catering Services</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Professional Event Catering</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites Hospitality</p>
          </Copy>
        </div>
      </section>

      <section className="services-content" ref={pageRef}>
        <div className="container">
          <div className="services-grid">
            <div className="services-card">
              <h4>Corporate Events</h4>
              <p>Impress your colleagues and clients with our premium Indian box lunches, hot trays, or buffet spreads designed specifically for corporate meetings and gala dinners.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Min Guests</span>
                  <span className="value">15 Guests</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Delivery Setup</span>
                  <span className="value">Available</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Custom Branding</span>
                  <span className="value">Menu printing & labels</span>
                </div>
              </div>
            </div>

            <div className="services-card">
              <h4>Private Celebrations</h4>
              <p>From birthday parties and family gatherings to anniversaries and festive gatherings, we bring the warmth and cinema of Bollywood Bites straight to your dining room.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Service Options</span>
                  <span className="value">Drop-off or Full Service</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Cutlery & Servers</span>
                  <span className="value">Complimentary optionals</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Vegetarian Focus</span>
                  <span className="value">Custom vegan/veg menus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageBanner image="/about/sticky-card-2.jpg" />
      <Testimonials />
    </>
  );
}
