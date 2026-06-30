"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Testimonials from "@/components/Testimonials/Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function ChefSanjayPatel() {
  const bioSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chef-bio-image",
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 1, ease: "power4.out" }
      );
    }, bioSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="menu-hero" ref={bioSectionRef}>
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Chef Sanjay Patel</h2>
          </Copy>
        </div>

        <div className="section-footer">
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="sm">Master Culinary Storyteller</p>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="sm">Heirloom Recipes & Modern Fire</p>
          </Copy>
        </div>
      </section>

      <section className="about-info" style={{ backgroundColor: "var(--base-500)", padding: "6rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "4rem", alignItems: "center" }}>
          <div style={{ flex: "1 1 450px" }}>
            <Copy>
              <p className="mono" style={{ color: "var(--base-300)" }}>The Culinary Visionary</p>
              <h3 style={{ marginBottom: "1.5rem" }}>A Career Born in Fire and Spices</h3>
              <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem", lineHeight: "1.5", color: "var(--base-100)" }}>
                Chef Sanjay Patel has spent over two decades mastering the regional cuisines of India. Having trained under legacy chefs in Rajasthan and Delhi, he specializes in combining traditional clay-oven tandoor techniques with the subtle elegance of modern presentation.
              </p>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.5", color: "var(--base-200)" }}>
                &ldquo;Cooking is not just about measuring spices; it is about conveying memories and setting a cinematic stage where each bite tells a story of heritage, love, and community.&rdquo; - Sanjay Patel
              </p>
            </Copy>
          </div>
          <div className="chef-bio-image" style={{ position: "relative", flex: "1 1 400px", maxWidth: "550px", aspectRatio: "4/5", overflow: "hidden", borderRadius: "8px", border: "1px solid rgba(197,168,128,0.3)" }}>
            <Image src="/chefs/avatar1.jpg" alt="Chef Sanjay Patel" fill sizes="(max-width: 768px) 100vw, 550px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <ImageBanner image="/about/sticky-card-5.jpg" />
      <Testimonials />
    </>
  );
}
