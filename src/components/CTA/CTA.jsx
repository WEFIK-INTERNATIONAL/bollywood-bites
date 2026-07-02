"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineMap, HiArrowRight } from "react-icons/hi";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);

const ACTION_CARDS = [
  {
    id: "reserve",
    title: "Reserve a Table",
    link: "/reservation",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18" />
        <path d="M5 20a7 7 0 0 1 14 0" />
        <path d="M12 5V2" />
        <circle cx="12" cy="5" r="1" />
      </svg>
    ),
  },
  {
    id: "order",
    title: "Order Online",
    link: "/menu",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "catering",
    title: "Plan Catering",
    link: "/services/catering",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18 L18 6" />
        <path d="M6 6 Q9 12 6 18 C5 19 4 19 4 19 H20" />
        <path d="M18 18 Q15 12 18 6 C19 5 20 5 20 5 H4" />
        <circle cx="6" cy="6" r="1" />
        <circle cx="18" cy="18" r="1" />
      </svg>
    ),
  },
  {
    id: "food-truck",
    title: "Book The Food Truck",
    link: "/services/food-trucks",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="16" height="12" rx="2" />
        <path d="M18 8h4l2 3v5h-6V8z" />
        <circle cx="6" cy="20" r="2" />
        <circle cx="14" cy="20" r="2" />
        <circle cx="20" cy="20" r="2" />
        <path d="M8 20h4" />
        <path d="M16 20h2" />
      </svg>
    ),
  },
];

const CTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".cta-card");
    const headerElements = section.querySelectorAll(".cta-header-animate");
    const splitLeft = section.querySelector(".cta-split-left");
    const splitRight = section.querySelector(".cta-split-right");

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
          trigger: ".cta-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-cards-grid",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      [splitLeft, splitRight],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-split-container",
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="cta" ref={sectionRef}>
      <div className="container">
        
        {/* Upper Block - Header & Actions */}
        <div className="cta-header">
          <div className="cta-header-animate header-flourish-top">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="25" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
              <path d="M27 10 L30 7 L33 10 L30 13 Z" fill="var(--base-300)"/>
              <line x1="35" y1="10" x2="60" y2="10" stroke="var(--base-300)" strokeWidth="0.8"/>
            </svg>
          </div>

          <span className="cta-header-animate cta-tagline">Ready To Experience</span>
          
          <h2 className="cta-header-animate cta-title">Bollywood Bites?</h2>

          <p className="cta-header-animate cta-subtitle">
            Whether you&rsquo;re joining us for dinner, planning an unforgettable celebration, or bringing our food truck to your next event, we&rsquo;re ready to make it memorable.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="cta-cards-grid">
          {ACTION_CARDS.map((card) => (
            <a href={card.link} key={card.id} className="cta-card">
              <div className="cta-card-icon">{card.icon}</div>
              <h3 className="cta-card-title">{card.title}</h3>
              <div className="cta-card-arrow">
                <HiArrowRight className="arrow-icon" />
              </div>
            </a>
          ))}
        </div>

        {/* Lower Block - splitscreen */}
        <div className="cta-split-container">
          
          {/* Left Column - Framed Photo Card */}
          <div className="cta-split-left">
            <div className="visit-image-frame">
              <Image
                src="/cta/cta-img.jpg"
                alt="Bollywood Bites Sunset Exterior"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
                className="visit-image"
              />
              <div className="visit-image-overlay">
                <span className="visit-tag">Visit</span>
                <h3 className="visit-title">Bollywood Bites</h3>
                <div className="visit-divider" />
                <p className="visit-caption">An unforgettable experience awaits you.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Info Box & Map */}
          <div className="cta-split-right">
            
            <div className="visit-info-details">
              
              {/* Location */}
              <div className="info-detail-item">
                <div className="detail-icon"><HiOutlineLocationMarker /></div>
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>10789 Weyburn Ave, Los Angeles, CA 90024 (Westwood Village)</p>
                </div>
              </div>

              {/* Hours */}
              <div className="info-detail-item">
                <div className="detail-icon"><HiOutlineClock /></div>
                <div className="detail-content">
                  <h4>Hours</h4>
                  <p className="time-row"><span>Mon &ndash; Thu:</span> 11:00 AM &ndash; 10:00 PM</p>
                  <p className="time-row"><span>Fri &ndash; Sun:</span> 11:00 AM &ndash; 11:00 PM</p>
                </div>
              </div>

              {/* Phone */}
              <div className="info-detail-item">
                <div className="detail-icon"><HiOutlinePhone /></div>
                <div className="detail-content">
                  <h4>Phone</h4>
                  <p>(310) 474-0707</p>
                </div>
              </div>

              {/* Parking */}
              <div className="info-detail-item">
                <div className="detail-icon"><HiOutlineMap /></div>
                <div className="detail-content">
                  <h4>Parking</h4>
                  <p>Valet &amp; street parking available</p>
                </div>
              </div>

              {/* Email */}
              <div className="info-detail-item">
                <div className="detail-icon"><HiOutlineMail /></div>
                <div className="detail-content">
                  <h4>Email</h4>
                  <p>hello@bollywoodbites.com</p>
                </div>
              </div>

            </div>

            {/* Custom Styled Map & Directions Button */}
            <div className="visit-map-container">
              <div className="map-mockup-wrapper">
                <svg className="map-vector" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background map area */}
                  <rect width="400" height="200" fill="rgba(9, 30, 23, 0.4)" rx="12" stroke="rgba(197, 168, 128, 0.15)"/>
                  
                  {/* Roads network */}
                  <path d="M40 0 V200 M140 0 V200 M240 0 V200 M340 0 V200" stroke="rgba(197, 168, 128, 0.08)" strokeWidth="10"/>
                  <path d="M0 60 H400 M0 140 H400" stroke="rgba(197, 168, 128, 0.08)" strokeWidth="10"/>
                  
                  <path d="M40 0 V200 M140 0 V200 M240 0 V200 M340 0 V200" stroke="rgba(197, 168, 128, 0.2)" strokeWidth="1"/>
                  <path d="M0 60 H400 M0 140 H400" stroke="rgba(197, 168, 128, 0.2)" strokeWidth="1"/>
                  
                  {/* Map Text Labels */}
                  <text x="50" y="50" fill="var(--base-200)" fontSize="8" fontFamily="var(--font-dm-mono)" opacity="0.6" letterSpacing="0.05em">Weyburn Ave</text>
                  <text x="150" y="130" fill="var(--base-200)" fontSize="8" fontFamily="var(--font-dm-mono)" opacity="0.6" letterSpacing="0.05em">Westwood Blvd</text>
                  <text x="250" y="50" fill="var(--base-300)" fontSize="9" fontWeight="bold" fontFamily="var(--font-host-grotesk)" opacity="0.8">UCLA</text>
                  <text x="45" y="170" fill="var(--base-200)" fontSize="8" fontFamily="var(--font-host-grotesk)" opacity="0.5">Westwood Village</text>
                  
                  {/* Glowing pin marker with BB badge */}
                  <g transform="translate(140, 60)">
                    <circle cx="0" cy="0" r="12" fill="rgba(197, 168, 128, 0.25)"/>
                    <path d="M0 -15 C-6 -15 -6 -8 0 0 C6 -8 6 -15 0 -15 Z" fill="var(--base-300)" stroke="var(--base-600)" strokeWidth="1"/>
                    <circle cx="0" cy="-11" r="3.5" fill="var(--base-600)"/>
                    <text x="9" y="-8" fill="var(--base-300)" fontSize="9" fontWeight="bold" fontFamily="var(--font-dm-mono)">BB</text>
                  </g>
                </svg>
              </div>

              {/* Get Directions Link button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=10789+Weyburn+Ave+Los+Angeles+CA+90024"
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                <svg className="directions-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 22l8-20 8 20-8-5z" />
                </svg>
                <span>Get Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;
