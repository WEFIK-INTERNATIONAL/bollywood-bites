"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "../media.css";

gsap.registerPlugin(ScrollTrigger);

const UPCOMING_EVENTS = [
  {
    title: "Diwali Feast & Sufi Night",
    excerpt: "Celebrate the festival of lights with a grand royal buffet spread, special candlelit mandalas, and live Sufi music performance by guest musicians.",
    date: "12 NOV 2026",
    time: "7:00 PM - 11:30 PM",
    source: "SPECIAL EVENT",
  },
  {
    title: "Bollywood Classics Cinema Brunch",
    excerpt: "Indulge in a fusion brunch menu featuring live chaat stations, with classic Bollywood movie soundtrack tunes playing in the background.",
    date: "27 SEP 2026",
    time: "11:30 AM - 3:00 PM",
    source: "MONTHLY BRUNCH",
  },
  {
    title: "Indian Wine & Kebab Pairing",
    excerpt: "An exclusive culinary event matching five premium Indian estate wines from Nashik Valley with signature charcoal tandoori kebabs, guided by our head sommelier.",
    date: "15 AUG 2026",
    time: "6:30 PM - 9:30 PM",
    source: "TICKETED EVENT",
  },
];

export default function EventPage() {
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
            <h2>Events & Music</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Upcoming Experiences</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Reserve Your Spot</p>
          </Copy>
        </div>
      </section>

      <section className="media-content" ref={cardsRef}>
        <div className="container">
          <div className="media-grid">
            {UPCOMING_EVENTS.map((event, idx) => (
              <div className="media-card" key={idx}>
                <div className="event-details">
                  <span>{event.date}</span>
                  <span>|</span>
                  <span>{event.time}</span>
                </div>
                <h4>{event.title}</h4>
                <p>{event.excerpt}</p>
                <span className="source">{event.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
