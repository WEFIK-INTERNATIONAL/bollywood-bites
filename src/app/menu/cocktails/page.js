"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../menu.css";

gsap.registerPlugin(ScrollTrigger);

const COCKTAIL_MENU = [
  {
    category: "Signature Craft Cocktails",
    tagline: "Indian botanical infusions with modern mixology techniques",
    items: [
      { name: "Bollywood Mule", price: "€11.50", description: "Cardamom-infused vodka, freshly squeezed lime juice, organic ginger beer, and mint sprig" },
      { name: "Mumbai Express Espresso", price: "€12.50", description: "Double shot espresso, Dark Rum, chai syrup, Kahlua liqueur, dusted with nutmeg" },
      { name: "Taj Sunset Sour", price: "€12.00", description: "Kashmiri saffron gin, fresh lemon juice, egg white foam, and a float of red wine" },
      { name: "Goa Coco Breeze", price: "€11.00", description: "White rum, fresh coconut water, curry leaf infusion, lime juice, and coconut syrup" },
    ],
  },
  {
    category: "Refined Mocktails (Zero Proof)",
    tagline: "Sophisticated blends without the spirits",
    items: [
      { name: "Delhi Shikanji Mocktail", price: "€7.00", description: "Lime juice, black salt, fresh mint leaves, roasted cumin syrup, and sparkling soda" },
      { name: "Mango Lassi Colada", price: "€7.50", description: "Alphonso mango puree, coconut milk, yogurt, and a dash of cardamom powder" },
    ],
  },
];

export default function CocktailMenu() {
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
            <h2>Cocktail Menu</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Spirits & Botanicals</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Exotic Liquid Crafts</p>
          </Copy>
        </div>
      </section>

      <section className="menu-list" ref={menuListRef}>
        <div className="container">
          {COCKTAIL_MENU.map((category, idx) => (
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
