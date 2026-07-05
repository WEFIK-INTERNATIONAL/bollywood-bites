"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";

import "./Ingredients.css";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS_DATA = [
  { name: "Cumin", image: "/ingredients/cumin.png" },
  { name: "Coriander", image: "/ingredients/coriander.png" },
  { name: "Cardamom", image: "/ingredients/cardamom.png" },
  { name: "Turmeric", image: "/ingredients/turmeric.png" },
  { name: "Kashmiri Chili", image: "/ingredients/kashmiri_chili.png" },
  { name: "Black Pepper", image: "/ingredients/black_pepper.png" },
  { name: "Cinnamon", image: "/ingredients/cinnamon.png" }
];

export default function Ingredients() {
  const containerRef = useRef(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".ingredients-item");
    const lines = section.querySelectorAll(".ingredients-divider");

    gsap.set(items, { y: 30, autoAlpha: 0 });
    gsap.set(lines, { scaleY: 0, autoAlpha: 0 });

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
        
        gsap.to(lines, {
          scaleY: 1,
          autoAlpha: 0.25,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        });
      }
    });

    return () => scrollTrigger.kill();
  }, []);

  return (
    <section className="ingredients-section" ref={containerRef}>
      {/* Corner Ornaments */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
            <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
            <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
            <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

      <div className="container">
        {/* Section title */}
        <div className="ingredients-header">
          <Copy type="lines" animateOnScroll>
            <p className="mono">The Magic of Spices</p>
          </Copy>
          <Copy type="lines" animateOnScroll>
            <h2>Our Core Ingredients</h2>
          </Copy>
        </div>

        {/* Row container */}
        <div className="ingredients-row-wrapper">
          <div className="ingredients-row">
            {INGREDIENTS_DATA.map((item, index) => (
              <React.Fragment key={index}>
                {/* Ingredient item */}
                <div className="ingredients-item">
                  <div className="ingredients-img-wrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="150px"
                      className="ingredients-img"
                    />
                  </div>
                  <h6 className="ingredients-label">{item.name}</h6>
                </div>

                {/* Vertical Divider line (if not last item) */}
                {index < INGREDIENTS_DATA.length - 1 && (
                  <div className="ingredients-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
