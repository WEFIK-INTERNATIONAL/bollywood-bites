"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../media.css";

gsap.registerPlugin(ScrollTrigger);

const SEASONAL_SPECIALS = [
  {
    title: "Summer Monsoon Mango Fest",
    excerpt: "Celebrate the king of fruits with our special mango-infused menu including Alphonso Mango Lassi, Mango Mint Chicken Tikka, and Mango Rabdi dessert.",
    date: "LIMITED TIME",
    source: "SEASONAL PROMOTION",
  },
  {
    title: "Weekend Cocktail Happy Hour",
    excerpt: "Buy one, get the second one at half price on all signature botanicals and crafts between 5 PM and 7 PM, Friday to Sunday.",
    date: "WEEKLY OFFER",
    source: "BAR PROMOTION",
  },
  {
    title: "Royal Midweek Thali Discount",
    excerpt: "Get 15% off on our Maharaja Lunch Thalis every Wednesday and Thursday when you book your table in advance online.",
    date: "MIDWEEK SPECIAL",
    source: "DINING SPECIAL",
  },
];

export default function SpecialsPage() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".media-card");
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: ".media-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="media-hero">
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Seasonal Specials</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Limited Time Offers</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites Exclusives</p>
          </Copy>
        </div>
      </section>

      <section className="media-content" ref={cardsRef}>
        <div className="container">
          <div className="media-grid">
            {SEASONAL_SPECIALS.map((special, idx) => (
              <div className="media-card" key={idx}>
                <span className="date">{special.date}</span>
                <h4>{special.title}</h4>
                <p>{special.excerpt}</p>
                <span className="source">{special.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
