"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./restaurant.css";

gsap.registerPlugin(ScrollTrigger);

const MENU_FLYERS = [
  {
    image: "/restaurant/res1.webp",
    title: "Appetizers & Soups",
    tag: "Menu Page 1",
  },
  {
    image: "/restaurant/res2.webp",
    title: "Chaats & Kathi Rolls",
    tag: "Menu Page 2",
  },
  {
    image: "/restaurant/res3.webp",
    title: "Tandoori Sizzlers",
    tag: "Menu Page 3",
  },
  {
    image: "/restaurant/res4.webp",
    title: "Royal Curries (Chicken & Lamb)",
    tag: "Menu Page 4",
  },
  {
    image: "/restaurant/res5.webp",
    title: "Seafood & Vegetarian Entrées",
    tag: "Menu Page 5",
  },
  {
    image: "/restaurant/res6.webp",
    title: "Rice Specialties & Biryanis",
    tag: "Menu Page 6",
  },
  {
    image: "/restaurant/res7.webp",
    title: "Fresh Breads & Tandoori Naan",
    tag: "Menu Page 7",
  },
  {
    image: "/restaurant/res8.webp",
    title: "Desserts & Specialty Beverages",
    tag: "Menu Page 8",
  },
];

export default function RestaurantMenu() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".menu-card");
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: ".menu-column-grid",
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
      <section className="menu-hero">
        <div className="bg-mandala-centered" style={{ opacity: 0.03 }} />
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.35}>
            <h1>Restaurant Menu</h1>
          </Copy>
          <p className="menu-hero-tagline">Traditional Fine Dining & Authenticity</p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="container">
          <div className="menu-column-grid">
            {MENU_FLYERS.map((item, idx) => (
              <div className="menu-card" key={idx}>
                <div className="restaurant-menu-frame">
                  <Image
                    src={item.image}
                    alt="Bollywood Bites Restaurant Menu"
                    width={900}
                    height={1125}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
