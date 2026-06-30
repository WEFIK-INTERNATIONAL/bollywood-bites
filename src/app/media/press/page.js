"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../media.css";

gsap.registerPlugin(ScrollTrigger);

const PRESS_ARTICLES = [
  {
    title: "Bollywood Bites brings culinary cinema to London",
    excerpt: "An dazzling experience of pure Indian heritage. Chef Sanjay Patel redefines fine dining with intense flavours and cinematic design.",
    date: "14 MAY 2026",
    source: "THE LONDON CHRONICLE",
  },
  {
    title: "The spice journey you cannot miss this season",
    excerpt: "From their signature Butter Chicken to the Indian-infused craft cocktails, Bollywood Bites offers an elite dining experience that stands out in the heart of London.",
    date: "02 APR 2026",
    source: "METROPOLITAN FOOD GUIDE",
  },
  {
    title: "Best New Indian Restaurant of 2026",
    excerpt: "Awarded five stars for outstanding flavor profiles, beautiful mandala-inspired decorations, and unmatched hospitality.",
    date: "18 FEB 2026",
    source: "GREAT BRITISH EATS",
  },
];

export default function PressPage() {
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
            <h2>Press & Awards</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Critically Acclaimed</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Bollywood Bites Story</p>
          </Copy>
        </div>
      </section>

      <section className="media-content" ref={cardsRef}>
        <div className="container">
          <div className="media-grid">
            {PRESS_ARTICLES.map((article, idx) => (
              <div className="media-card" key={idx}>
                <span className="date">{article.date}</span>
                <h4>{article.title}</h4>
                <p>&ldquo;{article.excerpt}&rdquo;</p>
                <span className="source">{article.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
