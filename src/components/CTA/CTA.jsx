"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineMap,
  HiArrowRight,
  HiOutlineExternalLink,
} from "react-icons/hi";

import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);

const ACTION_LINKS = [
  {
    id: "reserve",
    title: "Reserve a Table",
    link: "/reservation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18" /><path d="M5 20a7 7 0 0 1 14 0" /><path d="M12 5V2" /><circle cx="12" cy="5" r="1" />
      </svg>
    ),
  },
  {
    id: "order",
    title: "Order Online",
    link: "/menu",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "catering",
    title: "Plan Catering",
    link: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    id: "food-truck",
    title: "Book The Food Truck",
    link: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="16" height="12" rx="2" /><path d="M18 8h4l2 3v5h-6V8z" />
        <circle cx="6" cy="20" r="2" /><circle cx="14" cy="20" r="2" /><circle cx="20" cy="20" r="2" />
        <path d="M8 20h4" />
      </svg>
    ),
  },
];

const CTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animEls = section.querySelectorAll(".cta-animate");

    gsap.fromTo(
      animEls,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );

    const mapWrapper = section.querySelector(".cta-map-wrapper");
    gsap.fromTo(
      mapWrapper,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1,
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: { trigger: mapWrapper, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <section className="cta" ref={sectionRef}>

      {/* ── Hero background image ── */}
      <div className="cta-bg-image">
        <Image
          src="/cta/cta-img.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cta-bg-img"
          loading="eager"
        />
        <div className="cta-bg-overlay" />
      </div>

      {/* Spinning mandala halo — layered above dark overlay for depth */}
      <Image
        src="/mandana/rounded_mandala/Group 9.svg"
        className="cta-mandala-halo"
        width={800}
        height={800}
        alt=""
        aria-hidden="true"
      />

      {/* Corner mandanas — TL and TR to frame the headline */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

      <div className="cta-inner container">

        {/* ─────────────────────────── */}
        {/* TOP: Centred headline block  */}
        {/* ─────────────────────────── */}
        <div className="cta-headline-block">
          <span className="cta-animate cta-tagline">Ready to Experience</span>
          <h2 className="cta-animate cta-title">Bollywood Bites?</h2>
          <p className="cta-animate cta-subtitle">
            Whether you&rsquo;re joining us for dinner, planning an unforgettable celebration,
            or bringing our food truck to your next event — we&rsquo;re ready to make it memorable.
          </p>
        </div>

        {/* ─────────────────────────────────── */}
        {/* MIDDLE: 3-column info + action strip */}
        {/* ─────────────────────────────────── */}
        <div className="cta-info-strip">

          {/* Col 1: Restaurant details */}
          <div className="cta-animate cta-details-col">
            <h3 className="cta-col-label">Find Us</h3>

            <div className="cta-detail-row">
              <HiOutlineLocationMarker className="cta-detail-icon" />
              <div>
                <span className="cta-detail-title">Location</span>
                <p>1051 Gayley Avenue<br />Los Angeles, California, USA - 90024<br /><span className="cta-detail-sub">Westwood Village</span></p>
              </div>
            </div>

            <div className="cta-detail-row">
              <HiOutlineClock className="cta-detail-icon" />
              <div>
                <span className="cta-detail-title">Hours</span>
                <p className="cta-time-row"><span>Mon – Thu</span>11 AM – 10 PM</p>
                <p className="cta-time-row"><span>Fri – Sun</span>11 AM – 11 PM</p>
              </div>
            </div>

            <div className="cta-detail-row">
              <HiOutlinePhone className="cta-detail-icon" />
              <div>
                <span className="cta-detail-title">Phone</span>
                <p>
                  <a href="tel:3108241046" style={{ color: "inherit", textDecoration: "none" }}>310-824-1046</a>
                  {" / "}
                  <a href="tel:3104031661" style={{ color: "inherit", textDecoration: "none" }}>310-403-1661</a>
                </p>
              </div>
            </div>

            <div className="cta-detail-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="cta-detail-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <span className="cta-detail-title">Email</span>
                <p><a href="mailto:info@thebollywoodbites.com" style={{ color: "inherit", textDecoration: "none" }}>info@thebollywoodbites.com</a></p>
              </div>
            </div>
          </div>

          {/* Col 2: Central CTA pillar */}
          <div className="cta-animate cta-pillar-col">
            <div className="cta-pillar-ornament">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4 L44 24 L24 44 L4 24 Z" stroke="var(--base-300)" strokeWidth="1" fill="none" opacity="0.4"/>
                <path d="M24 12 L36 24 L24 36 L12 24 Z" stroke="var(--base-300)" strokeWidth="1" fill="none" opacity="0.6"/>
                <circle cx="24" cy="24" r="4" fill="var(--base-300)"/>
              </svg>
            </div>
            <p className="cta-pillar-quote">&ldquo;Come for the food.<br/>Stay for the experience.&rdquo;</p>
            <a 
              href="/reservation" 
              className="cta-pillar-btn"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
              onClick={(e) => e.preventDefault()}
            >
              Reserve a Table
              <HiArrowRight />
            </a>
            <a
              href="https://maps.app.goo.gl/SE5nVw5Ahf5vF4ZY8"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-directions-link"
            >
              <HiOutlineExternalLink />
              Get Directions
            </a>
          </div>
 
          {/* Col 3: Action links */}
          <div className="cta-animate cta-actions-col">
            <h3 className="cta-col-label">Quick Links</h3>
            <div className="cta-action-list">
              {ACTION_LINKS.map((item) => {
                const isReserve = item.id === "reserve";
                const isOrder = item.id === "order";
                return (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    className="cta-action-item"
                    {...((isReserve || isOrder) ? {
                      "data-glf-cuid": "a7270cd0-483e-4bb9-9097-6c78af888686",
                      "data-glf-ruid": "4e577927-f19b-48d5-bae9-918577bd4a09",
                      onClick: (e) => e.preventDefault()
                    } : {})}
                    {...(isReserve ? { "data-glf-reservation": "true" } : {})}
                  >
                    <div className="cta-action-icon">{item.icon}</div>
                    <span className="cta-action-title">{item.title}</span>
                    <HiArrowRight className="cta-action-arrow" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────── */}
        {/* BOTTOM: full-width embedded map */}
        {/* ─────────────────────────────── */}
        <div className="cta-map-wrapper">
          <iframe
            src="https://maps.google.com/maps?q=Bollywood+Bites+1051+Gayley+Avenue+Los+Angeles+CA+90024&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bollywood Bites on Google Maps"
            className="cta-map-iframe"
          />
          <div className="cta-map-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Bollywood Bites — Westwood Village, LA
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
