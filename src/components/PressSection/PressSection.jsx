"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiPlay } from "react-icons/hi";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./PressSection.css";

gsap.registerPlugin(ScrollTrigger);

const PRESS_ITEMS = [
  {
    id: "cbs",
    category: "Video Feature",
    title: "CBS Los Angeles",
    text: "Chef Sanjay on the art of Indian cuisine",
    actionText: "Watch Video",
    link: "/media/press",
    image: "/chefs/avatar1.jpg",
    isVideo: true,
  },
  {
    id: "ktla",
    category: "TV Appearance",
    title: "KTLA 5 Morning News",
    text: "Bollywood Bites takes LA by storm",
    actionText: "Watch Video",
    link: "/media/press",
    image: "/chefs/avatar3.jpg",
    isVideo: true,
  },
  {
    id: "la-times",
    category: "Featured Article",
    title: "Los Angeles Times",
    text: "Chef Sanjay Patel brings India to LA",
    actionText: "Read Article",
    link: "/media/press",
    image: "/chefs/avatar5.jpg",
    isVideo: false,
  },
  {
    id: "eater",
    category: "Featured Article",
    title: "Eater Los Angeles",
    text: "The best new Indian restaurants in LA",
    actionText: "Read Article",
    link: "/media/press",
    image: "/dining-menu/dining-menu-foodsharing.jpg",
    isVideo: false,
  },
  {
    id: "forbes",
    category: "Featured Article",
    title: "Forbes",
    text: "Chef Sanjay: Redefining Indian Dining in America",
    actionText: "Read Article",
    link: "/media/press",
    image: "/chefs/avatar6.jpg",
    isVideo: false,
  },
  {
    id: "yahoo",
    category: "Featured Article",
    title: "Yahoo News",
    text: "How Chef Sanjay built Bollywood Bites",
    actionText: "Read Article",
    link: "/media/press",
    image: "/about/sticky-card-4.jpg",
    isVideo: false,
  },
];

const PressSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".press-card");
    const headerElements = section.querySelectorAll(".press-header-animate");
    const ctaWrapper = section.querySelector(".press-cta-wrapper");

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
          trigger: ".press-header",
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
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".press-slider-container",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ctaWrapper,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".press-cta-wrapper",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="press-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="press-header">
          <div className="press-header-animate header-flourish-top">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
              <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
            </svg>
          </div>

          <span className="press-header-animate press-tagline">In The Media</span>
          
          <h2 className="press-header-animate press-title">Chef Sanjay in the Spotlight</h2>

          <div className="press-header-animate header-flourish-bottom">
            <span className="press-subtitle">Featured in Top Publications & Media Outlets</span>
          </div>
        </div>

        {/* Press Carousel Slider */}
        <div className="press-slider-container">
          
          {/* Circular Navigation Left */}
          <button className="press-slider-control press-btn-left" onClick={handlePrev} aria-label="Previous articles">
            <HiOutlineChevronLeft />
          </button>

          {/* Scroll Track Wrapper */}
          <div className="press-track-wrapper" ref={trackRef}>
            {PRESS_ITEMS.map((item) => (
              <div key={item.id} className="press-card">
                
                {/* Top Image Frame */}
                <div className="press-card-img-wrapper">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="press-card-image"
                  />
                  {item.isVideo && (
                    <div className="press-video-play-btn">
                      <HiPlay className="play-icon" />
                    </div>
                  )}
                </div>

                {/* Bottom Card Content */}
                <div className="press-card-content">
                  <span className="press-card-tag">{item.category}</span>
                  <h3 className="press-card-heading">{item.title}</h3>
                  <p className="press-card-text">{item.text}</p>
                  
                  <a href={item.link} className="press-card-link">
                    <span>{item.actionText}</span>
                    <span className="arrow">&nbsp;→</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Circular Navigation Right */}
          <button className="press-slider-control press-btn-right" onClick={handleNext} aria-label="Next articles">
            <HiOutlineChevronRight />
          </button>

        </div>

        {/* Bottom CTA Button */}
        <div className="press-cta-wrapper">
          <Button href="/media/press" className="press-explore-btn">
            View All Media Coverage
          </Button>
        </div>

      </div>
    </section>
  );
};

export default PressSection;
