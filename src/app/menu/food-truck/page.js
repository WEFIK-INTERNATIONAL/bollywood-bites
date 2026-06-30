"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const FOOD_TRUCK_MENU = [
  {
    category: "Street Eats",
    tagline: "Quintessential Indian roadside culinary gems",
    items: [
      { name: "Pav Bhaji", price: "€8.00", description: "Spiced mashed vegetable curry slow-cooked with tomatoes, served with hot buttered soft buns" },
      { name: "Chole Bhature", price: "€9.50", description: "Tangy chickpea curry cooked with spices, served with soft puffed deep-fried bread" },
      { name: "Vada Pav (x2)", price: "€6.50", description: "Spicy potato fritter coated in gram flour, placed inside soft bread buns with garlic chutney" },
    ],
  },
  {
    category: "Street Skewers & Fries",
    tagline: "Quick-fire charcoal delicacies on the go",
    items: [
      { name: "Masala French Fries", price: "€4.50", description: "Golden fries tossed with chat masala, peri peri spices, and served with tamarind dip" },
      { name: "Paneer Tikka Roll", price: "€8.50", description: "Grilled marinated paneer wrapped in layered paratha with mint glaze and shredded onions" },
      { name: "Kolkata Chicken Roll", price: "€9.00", description: "Tandoori chicken kebabs wrapped in egg-layered flatbread with lime and chilies" },
    ],
  },
];

export default function FoodTruckMenu() {
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
            <h2>Food Truck Menu</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Fresh & Fast Street Eats</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites Mobile</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {FOOD_TRUCK_MENU.map((category, idx) => (
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
