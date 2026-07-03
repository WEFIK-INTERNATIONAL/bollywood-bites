"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./Feast.css";

gsap.registerPlugin(ScrollTrigger);

const Feast = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".feast-card");
    const headerElements = section.querySelectorAll(".feast-header-animate");
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
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feast-grid",
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
  }, []);

  return (
    <section className="feast-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="feast-header"> 
          <h2 className="feast-header-animate feast-title">A Feast of India</h2>
        </div>

        {/* 4-Card Dish Grid Layout */}
        <div className="feast-grid">
          
          {/* Left Column - Large Full Height Card */}
          <div className="feast-left-col">
            <div className="feast-card card-large">
              <div className="feast-card-bg">
                <Image
                  src="/home/feast-butter-chicken.png"
                  alt="Butter Chicken"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="feast-card-image"
                />
              </div>
              <div className="feast-card-overlay">
                <span className="dish-tag">Chef Recommends</span>
                <div className="dish-bottom">
                  <h3 className="dish-title">Butter Chicken</h3>
                  <div className="dish-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="12" cy="12" r="3" fill="none" />
                      <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z" />
                      <path d="M12 22a4 4 0 0 1-4-4v-2h8v2a4 4 0 0 1-4 4z" />
                      <path d="M2 12a4 4 0 0 1 4-4h2v8H6a4 4 0 0 1-4-4z" />
                      <path d="M22 12a4 4 0 0 1-4 4h-2V8h2a4 4 0 0 1 4 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Top Wide and Bottom Split Row */}
          <div className="feast-right-col">
            
            {/* Top Row - Wide Card */}
            <div className="feast-card card-wide">
              <div className="feast-card-bg">
                <Image
                  src="/home/feast-chicken-tikka.png"
                  alt="Chicken Tikka"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="feast-card-image"
                />
              </div>
              <div className="feast-card-overlay">
                <div className="overlay-left-content">
                  <span className="dish-tag">From the Tandoor</span>
                  <h3 className="dish-title">Chicken Tikka</h3>
                  <div className="dish-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Two Square-ish Cards */}
            <div className="feast-bottom-row">
              
              {/* Biryani Card */}
              <div className="feast-card card-square">
                <div className="feast-card-bg">
                  <Image
                    src="/home/feast-biryani.png"
                    alt="Hyderabadi Biryani"
                    fill
                    sizes="(max-width: 991px) 50vw, 25vw"
                    className="feast-card-image"
                  />
                </div>
                <div className="feast-card-overlay">
                  <span className="dish-tag">House Favorite</span>
                  <div className="dish-bottom">
                    <h3 className="dish-title">Hyderabadi Biryani</h3>
                    <div className="dish-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v3" />
                        <path d="M18 6H6a2 2 0 0 0-2 2v2a8 8 0 0 0 16 0V8a2 2 0 0 0-2-2z" />
                        <path d="M4 10h16" />
                        <path d="M7 21h10" />
                        <path d="M9 16v5" />
                        <path d="M15 16v5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pani Puri Card */}
              <div className="feast-card card-square">
                <div className="feast-card-bg">
                  <Image
                    src="/home/feast-pani-puri.png"
                    alt="Pani Puri"
                    fill
                    sizes="(max-width: 991px) 50vw, 25vw"
                    className="feast-card-image"
                  />
                </div>
                <div className="feast-card-overlay">
                  <span className="dish-tag">Street Classic</span>
                  <div className="dish-bottom">
                    <h3 className="dish-title">Pani Puri</h3>
                    <div className="dish-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="12" rx="2" />
                        <circle cx="7" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M10 19h4" />
                        <path d="M14 15v-4" />
                        <path d="M8 11h8" />
                        <path d="M3 9h18" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

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
