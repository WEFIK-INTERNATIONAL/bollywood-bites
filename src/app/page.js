"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Preloader from "@/components/Preloader/Preloader";
import Copy from "@/components/Copy/Copy";
import DiningMenu from "@/components/DiningMenu/DiningMenu";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Button from "@/components/Button/Button";
import Experience from "@/components/Experience/Experience";
import Feast from "@/components/Feast/Feast";
import HomeChef from "@/components/HomeChef/HomeChef";
import Moments from "@/components/Moments/Moments";
import StreetFood from "@/components/StreetFood/StreetFood";
import GallerySection from "@/components/GallerySection/GallerySection";
import Ingredients from "@/components/Ingredients/Ingredients";
import PressSection from "@/components/PressSection/PressSection";
import SocialSection from "@/components/SocialSection/SocialSection";
import BlogSection from "@/components/BlogSection/BlogSection";

import "./home.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  /**
   * heroReady — gates ALL hero entry animations.
   *
   * Always starts as false so server and client render the same initial HTML
   * (avoids hydration mismatch). A useEffect immediately flips it to true for
   * return visitors before the browser finishes painting.
   *
   *   - Return visitors  → true  after first effect (animate in right away)
   *   - First-time visitors → stays false until onAnimationComplete fires
   */
  const [heroReady, setHeroReady] = useState(false);

  /* Synchronise heroReady with stored consent/visit status after hydration */
  useEffect(() => {
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="));
    const hasVisited =
      document.cookie.includes("has_visited=true") ||
      cookieConsent != null;
    if (hasVisited) {
      setTimeout(() => {
        setHeroReady(true);
      }, 0);
    }
  }, []);

  /**
   * Called by Preloader after its exit slide animation fully finishes.
   * This is the moment the page becomes fully visible for first-time visitors.
   */
  const handlePreloaderAnimationComplete = () => {
    setHeroReady(true);
  };

  /* Animate hero buttons once heroReady flips true */
  useEffect(() => {
    if (!heroReady) return;

    // Slight delay so the headline Copy animation has a head-start
    gsap.fromTo(
      ".hero-buttons-container",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      }
    );
  }, [heroReady]);


  return (
    <>
      {!heroReady && (
        <Preloader onAnimationComplete={handlePreloaderAnimationComplete} />
      )}

      <section className="hero">
        <Image src="/mandana/rounded_mandala/Group 9.svg" className="bg-mandala-centered" style={{ opacity: 0.08 }} width={800} height={800} loading="eager" alt="" />
        <div className="hero-img" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Image src="/home/hero.jpg" fill priority sizes="100vw" style={{ objectFit: "cover" }} alt="" />
        </div>

        <div className="container">
          <Copy
            type="words"
            animateOnScroll={false}
            delay={0}
            play={heroReady}
          >
            <h1>
              Bollywood <br /> Bites
            </h1>
          </Copy>

          <Copy
            type="lines"
            animateOnScroll={false}
            delay={0.15}
            play={heroReady}
          >
            <p className="hero-tagline-subtitle">
              Finest Indian Taste by Chef Sanjay Patel
            </p>
          </Copy>

          <div className="hero-buttons-container">
            <Button 
            href="javascript:;" 
            className="hero-btn hero-btn-primary"
            data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
            data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>
            <Button 
            href="javascript:;" 
            className="hero-btn hero-btn-secondary"
            data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
            data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            data-glf-reservation="true" 
            >
              Book a Table
            </Button>
          </div>

          <div className="section-footer">
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={0.2}
              play={heroReady}
            >
              <p className="sm">Est. 2009</p>
            </Copy>
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={0.3}
              play={heroReady}
            >
              <p className="sm">Los Angeles, California, USA</p>
            </Copy>
          </div>
        </div>
      </section>

      <Experience />
      <Feast />
      <HomeChef />
      <Moments />
      <StreetFood />
      <Ingredients />
      <GallerySection />

      {/* <DiningMenu /> */}
      <Testimonials />
      <PressSection />
      <SocialSection />
      <BlogSection />
      <CTA />
    </>
  );
}
