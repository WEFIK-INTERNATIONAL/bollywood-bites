"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const CATERING_TRAYS = [
  {
    category: "Appetizer Trays",
    tagline: "Serves approximately 10-12 guests",
    items: [
      { name: "Vegetable Samosa Tray (25 pcs)", price: "€45.00", description: "Crispy turnovers stuffed with potatoes and peas, served with mint & tamarind sauces" },
      { name: "Chicken Tikka Kebab Tray (20 pcs)", price: "€65.00", description: "Boneless chicken cubes spiced and flame-grilled in our authentic tandoor" },
      { name: "Onion Bhaji Tray (30 pcs)", price: "€38.00", description: "Lightly spiced chickpea-battered onion fritters" },
    ],
  },
  {
    category: "Main Course Trays",
    tagline: "Perfect for large family gatherings and office events",
    items: [
      { name: "Butter Chicken Tray (Half-Pan)", price: "€85.00", description: "Tender tandoori chicken simmered in rich creamy tomato and butter gravy" },
      { name: "Paneer Tikka Masala Tray (Half-Pan)", price: "€75.00", description: "Grilled cottage cheese cubes cooked in spicy onion, tomato, and bell pepper sauce" },
      { name: "Dal Makhani Tray (Half-Pan)", price: "€55.00", description: "Creamy black lentils slow-cooked overnight with traditional spices" },
      { name: "Chicken Biryani Tray (Half-Pan)", price: "€70.00", description: "Aromatic basmati rice cooked with spiced chicken, mint, saffron, and fried onions" },
    ],
  },
];

export default function CateringTrays() {
  const menuListRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".menu-grid").forEach((grid) => {
        const cards = grid.querySelectorAll(".menu-grid-card");
        gsap.set(cards, { opacity: 0, y: 30, scale: 0.75 });

        ScrollTrigger.create({
          trigger: grid,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
            });
          },
        });
      });
    }, menuListRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="menu-hero">
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Catering Trays</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Gatherings & Events</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites at Home</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {CATERING_TRAYS.map((category, idx) => (
            <div className="menu-category" key={idx}>
              <div className="menu-category-header">
                <Copy type="words" animateOnScroll>
                  <h3>{category.category}</h3>
                </Copy>
                {category.tagline && (
                  <Copy type="lines" animateOnScroll>
                    <p className="md">{category.tagline}</p>
                  </Copy>
                )}
              </div>

              <div className="menu-grid">
                {category.items.map((item, itemIdx) => (
                  <div
                    className={`menu-grid-card ${itemIdx % 2 !== 0 ? "alt" : ""}`}
                    key={itemIdx}
                  >
                    <div className="menu-grid-card-top">
                      <h6>{item.name}</h6>
                    </div>
                    <p>{item.description}</p>
                    <p className="menu-grid-card-price">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  );
}
