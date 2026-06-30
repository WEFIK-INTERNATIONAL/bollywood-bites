"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const LUNCH_MENU = [
  {
    category: "Royal Thali Specials",
    tagline: "A complete gourmet meal served in traditional style",
    items: [
      { name: "Royal Veg Thali", price: "€12.50", description: "Paneer butter masala, yellow dal tadka, mix veg, aromatic basmati rice, butter naan, raita, and sweet gulab jamun" },
      { name: "Maharaja Non-Veg Thali", price: "€14.50", description: "Butter chicken, mutton rogan josh, yellow dal, basmati rice, garlic naan, raita, and sweet gulab jamun" },
    ],
  },
  {
    category: "Naan Wraps & Rolls",
    tagline: "Quick, tasty, and satisfying mid-day rolls",
    items: [
      { name: "Paneer Kathi Roll", price: "€8.50", description: "Spiced cottage cheese chunks rolled in flatbread with onions, bell peppers, and mint chutney" },
      { name: "Chicken Tikka Wrap", price: "€9.50", description: "Tandoori chicken breast pieces, crunchy lettuce, and house masala sauce wrapped in fresh naan" },
    ],
  },
  {
    category: "Lunch Bowls",
    tagline: "Light, healthy, and high-flavor bowls",
    items: [
      { name: "Chana Masala Rice Bowl", price: "€9.00", description: "Tangy chickpea curry served over steamed basmati rice with cucumber salad" },
      { name: "Chicken Curry Rice Bowl", price: "€10.50", description: "Boneless chicken curry served over saffron basmati rice with sliced red onions" },
    ],
  },
];

export default function LunchMenu() {
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
            <h2>Lunch Specials</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Available Daily 12 PM - 3:30 PM</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Quick Gourmet Delights</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {LUNCH_MENU.map((category, idx) => (
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
