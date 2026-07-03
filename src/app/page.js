"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
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
import PressSection from "@/components/PressSection/PressSection";

import "./home.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isInitialPageLoad] = useState(() => isInitialLoad);
  const [preloaderDelay, setPreloaderDelay] = useState(
    isInitialPageLoad ? 9999 : 0,
  );

  const handlePreloaderEnter = () => {
    if (isInitialPageLoad) setPreloaderDelay(0.2);
  };

  useEffect(() => {
    if (isInitialPageLoad && preloaderDelay === 9999) return;

    gsap.fromTo(
      ".hero-buttons-container",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: isInitialPageLoad ? 0.7 : 1.35,
      }
    );
  }, [preloaderDelay, isInitialPageLoad]);

  return (
    <>
      <Preloader onEnter={handlePreloaderEnter} />

      <section className="hero">
        <Image src="/mandana/rounded_mandala/Group 9.svg" className="bg-mandala-centered" style={{ opacity: 0.08 }} width={800} height={800} priority loading="eager" alt="" />
        <div className="hero-img" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Image src="/home/hero.jpg" fill priority sizes="100vw" style={{ objectFit: "cover" }} alt="" />
        </div>

        <div className="container">
          <Copy
            type="words"
            animateOnScroll={false}
            delay={isInitialPageLoad ? preloaderDelay : 0.85}
          >
            <h1>
              Bollywood <br /> Bites
            </h1>
          </Copy>

          <Copy
            type="lines"
            animateOnScroll={false}
            delay={isInitialPageLoad ? preloaderDelay + 0.15 : 1.05}
          >
            <p className="hero-tagline-subtitle">
              The finest flavors of India by Chef Sanjay Patel
            </p>
          </Copy>

          <div className="hero-buttons-container">
            <Button href="/menu" className="hero-btn hero-btn-primary">
              Order Online
            </Button>
            <Button href="/reservation" className="hero-btn hero-btn-secondary">
              Book a Table
            </Button>
          </div>

          <div className="section-footer">
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={isInitialPageLoad ? preloaderDelay + 0.15 : 1.1}
            >
              <p className="sm">Est. 2026</p>
            </Copy>
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={isInitialPageLoad ? preloaderDelay + 0.25 : 1.2}
            >
              <p className="sm">London, UK</p>
            </Copy>
          </div>
        </div>
      </section>

      <Experience />
      <Feast />
      <HomeChef />
      <Moments />
      <StreetFood />
      <GallerySection />

      {/* <DiningMenu /> */}
      <Testimonials />
      <PressSection />
      <CTA />
    </>
  );
}
