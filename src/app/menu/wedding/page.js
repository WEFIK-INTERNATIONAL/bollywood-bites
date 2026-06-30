"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const WEDDING_MENU = [
  {
    category: "Royal Wedding Packages",
    tagline: "Uncompromising Indian heritage feasts for your special day",
    items: [
      { name: "Silver Package", price: "€45 / Guest", description: "Includes 2 appetizers, 3 mains, rice, selection of naan bread, cucumber raita, salad, and a dessert" },
      { name: "Gold Royal Package", price: "€65 / Guest", description: "Includes 3 appetizers, 4 mains, specialty biryani, tandoori bread basket, raita, salad, and 2 desserts" },
      { name: "Diamond Maharaja Package", price: "€95 / Guest", description: "Includes live tandoor and chaat stations, 4 premium appetizers, 5 mains, royal biryani, bread basket, dessert bar, and welcome drinks" },
    ],
  },
  {
    category: "Live Gourmet Stations",
    tagline: "Interactive culinary experiences to amaze your guests",
    items: [
      { name: "Tandoori Grill Station", price: "Request Quote", description: "Live clay ovens baking fresh naan bread, paneer, and chicken skewers on the spot" },
      { name: "Delhi Chaat Corner", price: "Request Quote", description: "Interactive street food counter serving fresh golgappe, papdi chaat, and samosas" },
    ],
  },
];

export default function WeddingMenu() {
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
            <h2>Wedding Catering</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Bespoke Dining Packages</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Weddings by Bollywood Bites</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {WEDDING_MENU.map((category, idx) => (
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
