"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../gallery.css";

gsap.registerPlugin(ScrollTrigger);

const STAR_PHOTOS = [
  { image: "/home/about-1.jpg", title: "Amitabh Bachchan Visit", description: "The legendary actor admiring our custom clay-pot recipes" },
  { image: "/home/about-2.jpg", title: "Priyanka Chopra Jonas", description: "Celebrating her film release with our signature spice cocktail" },
  { image: "/home/about-3.jpg", title: "Shah Rukh Khan Dinner", description: "A late-night private dining event with Chef Sanjay Patel" },
  { image: "/home/about-4.jpg", title: "Ranbir Kapoor & Alia Bhatt", description: "Enjoying the Grand Weekend Thali" },
  { image: "/home/about-5.jpg", title: "A.R. Rahman Lounge", description: "Relaxing at our heritage lounge before his London concert" },
  { image: "/home/about-6.jpg", title: "Deepika Padukone", description: "Praising our Delhi Chaat station and hospitality" },
];

export default function StarGallery() {
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
            <h2>Star Gallery</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Celebrity & Icon Visits</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites Elite guests</p>
          </Copy>
        </div>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          <div className="gallery-grid">
            {STAR_PHOTOS.map((item, idx) => (
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
