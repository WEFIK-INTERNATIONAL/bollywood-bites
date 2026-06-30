"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../services.css";

gsap.registerPlugin(ScrollTrigger);

export default function FoodTruckServices() {
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
            <h2>Food Trucks</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Bollywood Bites Mobile</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Street Food Festivals</p>
          </Copy>
        </div>
      </section>

      <section className="services-content" ref={pageRef}>
        <div className="container">
          <div className="services-grid">
            <div className="services-card">
              <h4>Weekly Schedules</h4>
              <p>Find our food trucks parking at popular London markets and high-streets. Enjoy quick warm street foods and fresh drinks on the go.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Mon - Wed</span>
                  <span className="value">Financial District (11 AM - 3 PM)</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Thu - Fri</span>
                  <span className="value">Soho Market Square (12 PM - 8 PM)</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Sat - Sun</span>
                  <span className="value">Hyde Park Food Fest (10 AM - 6 PM)</span>
                </div>
              </div>
            </div>

            <div className="services-card">
              <h4>Private Booking & Rental</h4>
              <p>Rent our fully-equipped, beautifully decorated Bollywood food truck for block parties, corporate lunches, or backyard celebrations.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Min Booking Duration</span>
                  <span className="value">3 Hours</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Staff & Chefs</span>
                  <span className="value">2 Dedicated onsite workers</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Special Custom Menu</span>
                  <span className="value">Pre-select up to 6 street eats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageBanner image="/about/sticky-card-6.jpg" />
      <Testimonials />
    </>
  );
}
