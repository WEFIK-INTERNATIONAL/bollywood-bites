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
    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

      const header = section.querySelector(".ingredients-header");
      const marquee = section.querySelector(".ingredients-marquee");

      gsap.set([header, marquee], { y: 30, autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to([header, marquee], {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderIngredientsGroup = () => (
    <div className="ingredients-group">
      {INGREDIENTS_DATA.map((item, index) => (
        <React.Fragment key={index}>
          <div className="ingredients-item">
            <div className="ingredients-img-wrap">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="120px"
                className="ingredients-img"
                draggable={false}
              />
            </div>
            <h6 className="ingredients-label">{item.name}</h6>
          </div>
          <div className="ingredients-divider" aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="ingredients-section" ref={containerRef}>
      {/* Corner Ornaments */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" draggable={false} />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" draggable={false} />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" draggable={false} />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" draggable={false} />

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
      </div>

      {/* Auto-sliding infinite marquee track */}
      <div className="ingredients-marquee">
        <div className="ingredients-track">
          {renderIngredientsGroup()}
          {renderIngredientsGroup()}
        </div>
      </div>
    </section>
  );
}
