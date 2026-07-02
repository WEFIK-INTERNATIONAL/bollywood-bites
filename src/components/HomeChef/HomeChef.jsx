"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./HomeChef.css";

gsap.registerPlugin(ScrollTrigger);

const MOMENTS = [
  { name: "Ranbir Kapoor", image: "/home/moment-ranbir.png" },
  { name: "Shah Rukh Khan", image: "/home/moment-srk.png" },
  { name: "Virat Kohli", image: "/home/moment-kohli.png" },
  { name: "Deepika Padukone", image: "/home/moment-deepika.png" },
  { name: "A. R. Rahman", image: "/home/moment-rahman.png" },
  { name: "Amitabh Bachchan", image: "/home/moment-bachchan.png" },
];

const HomeChef = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftCol = section.querySelector(".home-chef-left");
    const rightCol = section.querySelector(".home-chef-right");
    const momentsTitle = section.querySelector(".moments-header");
    const momentCards = section.querySelectorAll(".moment-card");

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

    // Moments header animation
    gsap.fromTo(
      momentsTitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".home-chef-moments-section",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Stagger moments cards entrance
    gsap.fromTo(
      momentCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".moments-track-wrapper",
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="home-chef-section" ref={sectionRef}>
      <div className="container">
        
        {/* Top Row - Two Column Layout */}
        <div className="home-chef-top-row">
          
          {/* Left Column - Text Details */}
          <div className="home-chef-left">
            <div className="chef-tagline-wrapper">
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="6" x2="15" y2="6" stroke="var(--base-300)" strokeWidth="1" />
                <path d="M17 6 L20 3 L23 6 L20 9 Z" fill="var(--base-300)" />
                <line x1="25" y1="6" x2="40" y2="6" stroke="var(--base-300)" strokeWidth="1" />
              </svg>
              <span className="chef-tagline">The Chef Behind The Experience</span>
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="6" x2="15" y2="6" stroke="var(--base-300)" strokeWidth="1" />
                <path d="M17 6 L20 3 L23 6 L20 9 Z" fill="var(--base-300)" />
                <line x1="25" y1="6" x2="40" y2="6" stroke="var(--base-300)" strokeWidth="1" />
              </svg>
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
                Meet Chef Sanjay Patel
              </Button>
            </div>
          </div>

          {/* Right Column - Landscape Image */}
          <div className="home-chef-right">
            <div className="chef-image-frame">
              {/* Outer ornamental border */}
              <div className="frame-border-outer" />
              <div className="frame-border-inner" />
              
              <div className="chef-image-container">
                <Image
                  src="/home/chef-cooking.png"
                  alt="Chef Sanjay Patel Cooking"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="chef-cooking-image"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section - Moments Through the Years Carousel */}
        <div className="home-chef-moments-section">
          
          <div className="moments-header">
            <div className="moments-title-wrapper">
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
                <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
                <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              </svg>
              <h3>Moments Through The Years</h3>
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
                <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
                <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              </svg>
            </div>
          </div>

          <div className="moments-slider-container">
            {/* Control Left */}
            <button className="slider-control btn-left" onClick={handlePrev} aria-label="Previous moments">
              <HiOutlineChevronLeft />
            </button>

            {/* Viewport & Track */}
            <div className="moments-track-wrapper" ref={trackRef}>
              {MOMENTS.map((moment, idx) => (
                <div key={idx} className="moment-card">
                  <div className="moment-img-container">
                    <Image
                      src={moment.image}
                      alt={`Chef Sanjay Patel with ${moment.name}`}
                      fill
                      sizes="220px"
                      className="moment-image"
                    />
                  </div>
                  <span className="moment-name">{moment.name}</span>
                </div>
              ))}
            </div>

            {/* Control Right */}
            <button className="slider-control btn-right" onClick={handleNext} aria-label="Next moments">
              <HiOutlineChevronRight />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeChef;
