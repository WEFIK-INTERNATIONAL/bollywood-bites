"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../services.css";

gsap.registerPlugin(ScrollTrigger);

export default function WestWoodVillage() {
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
            <h2>West Wood Village</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Flagship Location</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">London Landmark</p>
          </Copy>
        </div>
      </section>

      <section className="services-content" ref={pageRef}>
        <div className="container">
          <div className="services-grid">
            <div className="services-card">
              <h4>Hours & Contact</h4>
              <p>Come visit us at our premier Westwood branch in London. We offer a wonderful dining room and outdoor patio.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Mon - Thu</span>
                  <span className="value">12:00 PM - 10:00 PM</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Fri - Sat</span>
                  <span className="value">12:00 PM - 11:30 PM</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Sunday</span>
                  <span className="value">12:00 PM - 9:30 PM</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Phone</span>
                  <span className="value">+44 (0) 20 7946 0958</span>
                </div>
              </div>
            </div>

            <div className="services-card">
              <h4>Location Features</h4>
              <p>Experience the finest hospitality and luxury Bollywood styling.</p>
              <div className="services-details-list">
                <div className="services-detail-item">
                  <span className="label">Seating Capacity</span>
                  <span className="value">120 Indoor / 40 Patio</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Private Dining Rooms</span>
                  <span className="value">2 Rooms (Available)</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Valet Parking</span>
                  <span className="value">Complimentary Friday/Saturday</span>
                </div>
                <div className="services-detail-item">
                  <span className="label">Bar Services</span>
                  <span className="value">Full Botanical Bar & Craft Beers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageBanner image="/about/sticky-card-1.jpg" />
      <Testimonials />
    </>
  );
}
