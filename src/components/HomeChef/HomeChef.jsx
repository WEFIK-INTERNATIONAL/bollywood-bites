"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { SteppedFrame } from "../Steppedframe/SteppedFrame";

import "./HomeChef.css";

gsap.registerPlugin(ScrollTrigger);

const HomeChef = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftCol = section.querySelector(".home-chef-left");
    const rightCol = section.querySelector(".home-chef-right");

    // Fade and slide left col content
    gsap.fromTo(
      leftCol.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".home-chef-top-row",
          start: "top 75%",
          once: true,
        },
      }
    );

    // Fade and slide right col image
    gsap.fromTo(
      rightCol,
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".home-chef-top-row",
          start: "top 75%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="home-chef-section" ref={sectionRef}>
      {/* Corner mandanas — all four corners */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

      <div className="container">
        
        {/* Top Row - Two Column Layout */}
        <div className="home-chef-top-row">
          
          {/* Left Column - Text Details */}
          <div className="home-chef-left">
            <div className="chef-tagline-wrapper">
              <span className="chef-tagline">The Chef Behind The Experience</span>
            </div>

            <h2 className="chef-title">
              Meet Chef <br />
              <span className="highlight-text">Sanjay Patel</span>
            </h2>

            <p className="chef-desc">
              For nearly two decades, Chef Sanjay Patel has brought the authentic flavors of India to distinguished guests, celebrated personalities, and thousands of food lovers. His passion for timeless recipes and refined presentation has made Bollywood Bites a destination for memorable dining and extraordinary celebrations.
            </p>

            <div className="chef-action">
              <Button href="/about/chef-sanjay-patel" className="chef-explore-btn">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Landscape Image */}
          <div className="home-chef-right">
            <div className="chef-stepped-frame-wrapper">
              <SteppedFrame stepSize="md" borderColor="gold" innerRing={true} className="chef-stepped-frame">
                <div className="chef-stepped-image-container">
                  <Image
                    src="/chefs/chef.png"
                    alt="Chef Sanjay Patel Cooking"
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    className="chef-cooking-image"
                    priority
                  />
                </div>
              </SteppedFrame>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeChef;

