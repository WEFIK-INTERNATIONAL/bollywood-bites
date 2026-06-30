"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../gallery.css";

gsap.registerPlugin(ScrollTrigger);

const EVENT_PHOTOS = [
  { image: "/about/sticky-card-1.jpg", title: "Corporate Gala Dinner", description: "Bespoke fine dining setup for executive meetings" },
  { image: "/about/sticky-card-2.jpg", title: "Traditional Sangeet Reception", description: "Vibrant flower arrangements and warm lighting" },
  { image: "/about/sticky-card-3.jpg", title: "Intimate Mehndi Party", description: "Colorful seating lounges and aromatic spice tables" },
  { image: "/about/sticky-card-4.jpg", title: "Live Sufi Concert Night", description: "Enchanting musical performance and custom appetizers" },
  { image: "/about/sticky-card-5.jpg", title: "Grand Wedding Buffet", description: "Traditional silver platters and multi-course display" },
  { image: "/about/sticky-card-6.jpg", title: "Cocktail Masterclass Event", description: "Hands-on mixology with Indian botanicals" },
];

export default function EventGallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".gallery-item");
      gsap.set(items, { opacity: 0, y: 40, scale: 0.9 });

      ScrollTrigger.create({
        trigger: ".gallery-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          });
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="menu-hero">
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Event Gallery</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Precious Moments Captured</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Celebrations & Feasts</p>
          </Copy>
        </div>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          <div className="gallery-grid">
            {EVENT_PHOTOS.map((item, idx) => (
              <div className="gallery-item" key={idx}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="gallery-caption">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
