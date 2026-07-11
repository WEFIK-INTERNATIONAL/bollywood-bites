"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { SteppedFrame } from "../Steppedframe/SteppedFrame";

import "./Feast.css";

gsap.registerPlugin(ScrollTrigger);

const FEAST_IMAGES = [
  {
    src: "/home/feast-butter-chicken.png",
    alt: "Butter Chicken",
    tag: "Chef Recommends",
    title: "Butter Chicken",
  },
  {
    src: "/home/feast-chicken-tikka.png",
    alt: "Chicken Tikka",
    tag: "From the Tandoor",
    title: "Chicken Tikka",
  },
  {
    src: "/home/feast-biryani.png",
    alt: "Hyderabadi Biryani",
    tag: "House Favorite",
    title: "Hyderabadi Biryani",
  },
  {
    src: "/home/feast-pani-puri.png",
    alt: "Pani Puri",
    tag: "Street Classic",
    title: "Pani Puri",
  },
];

const Feast = () => {
  const sectionRef = useRef(null);
  const slideContainerRef = useRef(null);
  const prevIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" | "prev"

  /* Entrance animations on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const headerElements = section.querySelectorAll(".feast-header-animate");
      const navButtons = section.querySelectorAll(".feast-frame-nav-button");
      const frameWrapper = section.querySelector(".feast-stepped-frame-wrapper");
      const buttonWrapper = section.querySelector(".feast-cta-wrapper");

      gsap.fromTo(
        headerElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feast-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        [frameWrapper, navButtons],
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frameWrapper,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        buttonWrapper,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".feast-cta-wrapper",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % FEAST_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + FEAST_IMAGES.length) % FEAST_IMAGES.length);
  }, []);

  /* Auto-slide mechanism */
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  /* Physical image-pushing sliding animations via GSAP */
  useEffect(() => {
    const container = slideContainerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll(".feast-slide");
    const incomingSlide = slides[currentIndex];
    const outgoingSlide = slides[prevIndexRef.current];

    if (currentIndex !== prevIndexRef.current) {
      const isNext = direction === "next";
      const incomingStart = isNext ? 100 : -100;
      const outgoingEnd = isNext ? -100 : 100;

      // Animate outgoing slide pushing out (no opacity fade during slide)
      gsap.killTweensOf(outgoingSlide);
      gsap.fromTo(outgoingSlide,
        { xPercent: 0, opacity: 1 },
        { 
          xPercent: outgoingEnd, 
          duration: 1.2, 
          ease: "power2.inOut",
          onComplete: () => {
            // Hide after the animation finishes
            gsap.set(outgoingSlide, { opacity: 0 });
          }
        }
      );

      // Animate incoming slide pushing in
      gsap.killTweensOf(incomingSlide);
      gsap.fromTo(incomingSlide,
        { xPercent: incomingStart, opacity: 1 },
        { xPercent: 0, duration: 1.2, ease: "power2.inOut" }
      );

      // Animate text elements on the incoming slide
      const textElements = incomingSlide.querySelectorAll(".slide-animate");
      gsap.killTweensOf(textElements);
      gsap.fromTo(textElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );
    } else {
      // Set initial layout
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          gsap.set(slide, { xPercent: 0, opacity: 1 });
        } else {
          gsap.set(slide, { xPercent: 100, opacity: 0 });
        }
      });
    }

    prevIndexRef.current = currentIndex;
  }, [currentIndex, direction]);

  return (
    <section className="feast-section" ref={sectionRef}>
      {/* Spinning mandala halo — atmospheric background watermark */}
      <Image
        src="/mandana/rounded_mandala/Group 9.svg"
        className="feast-mandala-halo"
        width={900}
        height={900}
        alt=""
        aria-hidden="true"
      />
      {/* Corner mandanas — frame all four corners of the section */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />
      <div className="container">
        
        {/* Centered Section Header */}
        <div className="feast-header"> 
          <h2 className="feast-header-animate feast-title">A Feast of India</h2>
        </div>

        {/* Carousel Stepped Frame Wrapper with Flourish Navigation Buttons */}
        <div className="feast-stepped-frame-wrapper">
          <button className="feast-frame-nav-button prev-btn" onClick={handlePrev} aria-label="Previous slide">
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 24 L48 30 L42 36 L36 30 Z" fill="var(--base-300)" />
              <path className="feast-nav-chevron" d="M34 24 L28 30 L34 36" stroke="var(--base-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <SteppedFrame stepSize="md" borderColor="gold" innerRing={true} className="feast-stepped-frame">
            <div className="feast-slides-container" ref={slideContainerRef}>
              {FEAST_IMAGES.map((img, index) => (
                <div 
                  className="feast-slide" 
                  key={index}
                  style={{ 
                    zIndex: index === currentIndex ? 1 : 0,
                    opacity: index === 0 ? 1 : 0
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1200px) calc(100vw - 3rem), 1152px"
                    className="feast-slide-image"
                    priority={index === 0}
                  />
                  <div className="feast-slide-overlay">
                    <span className="slide-animate dish-tag">{img.tag}</span>
                    <h3 className="slide-animate dish-title">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </SteppedFrame>

          <button className="feast-frame-nav-button next-btn" onClick={handleNext} aria-label="Next slide">
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 24 L12 30 L6 36 L0 30 Z" fill="var(--base-300)" />
              <path className="feast-nav-chevron" d="M14 24 L20 30 L14 36" stroke="var(--base-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Bottom CTA Button */}
        <div className="feast-cta-wrapper">
          <Button href="/menu" className="feast-explore-btn">
            Explore Our Menu
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Feast;
