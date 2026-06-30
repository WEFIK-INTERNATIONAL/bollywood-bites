"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const RESTAURANT_MENU = [
  {
    category: "Starters & Small Plates",
    tagline: "Authentic bites to ignite your palate",
    items: [
      { name: "Samosa Chaat", price: "€7.50", description: "Crisp pastry filled with spiced potatoes, chickpeas, sweet yogurt, tamarind and mint chutney" },
      { name: "Paneer Tikka Angare", price: "€9.50", description: "Clay-oven roasted cottage cheese infused with mustard oil, yogurt and hot spices" },
      { name: "Chicken Tikka Lal Mirch", price: "€10.50", description: "Succulent chicken thigh chunks marinated in Kashmiri chili and Greek yogurt" },
      { name: "Lasan Onion Bhaji", price: "€6.50", description: "Crispy onion fritters with garlic, gram flour, and roasted cumin seeds" },
    ],
  },
  {
    category: "Maharaja Mains",
    tagline: "Curated heirloom curries from the royal kitchens",
    items: [
      { name: "Old Delhi Butter Chicken", price: "€16.50", description: "Tandoori chicken pulled and simmered in a silky tomato, cashew and butter gravy" },
      { name: "Nawabi Lamb Biryani", price: "€18.00", description: "Aromatic basmati rice, tender lamb chunks, saffron and spices cooked under dum" },
      { name: "Dal Bukhara", price: "€13.50", description: "Creamy black lentils slow-cooked overnight with tomatoes, butter and garlic" },
      { name: "Paneer Butter Masala", price: "€14.50", description: "Cottage cheese cubes tossed in onion tomato gravy with fresh cream and fenugreek" },
      { name: "Kashmiri Lamb Rogan Josh", price: "€17.50", description: "Slow-cooked lamb shank in a rich red gravy flavored with dry ginger and fennel seeds" },
    ],
  },
  {
    category: "Signature Desserts",
    tagline: "Royal sweet endings to complete your journey",
    items: [
      { name: "Shahi Gulab Jamun", price: "€6.50", description: "Warm milk dumplings soaked in cardamom saffron syrup, served with vanilla ice cream" },
      { name: "Pista Kulfi Falooda", price: "€7.00", description: "Traditional Indian pistachio ice cream with vermicelli, rose syrup and sweet basil seeds" },
      { name: "Kesari Rasmalai", price: "€7.50", description: "Spongy cottage cheese patties dunked in thickened saffron-infused milk" },
    ],
  },
];

export default function RestaurantMenu() {
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
            <h2>Restaurant Menu</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Traditional Fine Dining</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites London</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {RESTAURANT_MENU.map((category, idx) => (
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
