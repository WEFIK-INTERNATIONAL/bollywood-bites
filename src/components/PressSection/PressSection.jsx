"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button/Button";

import "./PressSection.css";

gsap.registerPlugin(ScrollTrigger);

const PRESS_ITEMS = [
  {
    id: "cbs",
    category: "Video feature — CBS Los Angeles",
    title: "Chef Sanjay on the art of Indian cuisine",
    videoId: "T4g7awJAwGo",
    isVideo: true,
  },
  {
    id: "ktla",
    category: "TV appearance — KTLA 5 morning news",
    title: "Bollywood Bites takes LA by storm",
    videoId: "1cgFkAZCUsc",
    isVideo: true,
  },
  {
    id: "daily-bruin",
    category: "Daily Bruin",
    title: "Flavors of Westwood: Bollywood Bites chef-owner brings vast experience to table",
    link: "https://dailybruin.com/2014/05/06/flavors-of-westwood-bollywood-bites-chef-owner-brings-vast-experience-to-table",
    isVideo: false,
    isQuote: true,
  },
];

const PressSection = () => {
  const sectionRef = useRef(null);

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
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".press-grid",
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

  return (
    <section className="press-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="press-header">
          <span className="press-header-animate press-tagline">In The Media</span>
          
          <h2 className="press-header-animate press-title">Chef Sanjay in the Spotlight</h2>

          <div className="press-header-animate header-flourish-bottom">
            <span className="press-subtitle">Featured in Top Publications & Media Outlets</span>
          </div>
        </div>

        {/* Press 3-Card Grid */}
        <div className="press-grid">
          {PRESS_ITEMS.map((item) => {
            if (item.isQuote) {
              return (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="press-card quote-card"
                >
                  <div className="press-quote-container">
                    {/* Quote icon at top */}
                    <div className="press-quote-icon">
                      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0v10H6c0 4.4 3.6 8 8 8v6C6.3 24 0 17.7 0 10V0h12zm18 0v10h-6c0 4.4 3.6 8 8 8v6c-7.7 0-14-6.3-14-10V0h12z" fill="currentColor" />
                      </svg>
                    </div>
                    
                    {/* Quote content */}
                    <h3 className="press-quote-text">{item.title}</h3>
                    
                    {/* Source paper at bottom */}
                    <span className="press-quote-source">{item.category}</span>
                  </div>
                </a>
              );
            } else {
              return (
                <div key={item.id} className="press-card video-card">
                  {/* Top half: embedded YouTube player */}
                  <div className="press-video-preview">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="press-video-iframe"
                    ></iframe>
                  </div>
                  
                  {/* Bottom half: video metadata */}
                  <div className="press-video-info">
                    <span className="press-info-category">{item.category}</span>
                    <h3 className="press-info-title">{item.title}</h3>
                  </div>
                </div>
              );
            }
          })}
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
