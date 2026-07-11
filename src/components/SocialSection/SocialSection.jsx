"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";

import "./SocialSection.css";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_CHANNELS = [
  {
    name: "YouTube",
    handle: "Bollywood Bites TV",
    action: "Watch Sanjay's Story",
    url: "https://www.youtube.com/channel/UCtAqDJgfhTo6UrIt9VrQaXg",
    color: "#ff0000",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    handle: "@bollywoodbites_official",
    action: "Follow Our Moments",
    url: "https://www.instagram.com/bollywoodbites_official/",
    color: "#e1306c",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    handle: "Bollywood Bites Inc.",
    action: "Like Our Page",
    url: "https://www.facebook.com/thebollywoodbites.inc/",
    color: "#1877f2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  {
    name: "TikTok",
    handle: "@bollywoodbites_1",
    action: "See Our Vibes",
    url: "https://www.tiktok.com/@bollywoodbites_1",
    color: "#ff0050",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1.08-.12.19-.12.3 0 2.3.01 4.59-.01 6.89-.04 2.1-.82 4.24-2.42 5.61-1.6 1.38-3.9 1.95-5.97 1.58-2.07-.37-4.01-1.79-4.87-3.72-.86-1.93-.82-4.31.2-6.19 1.02-1.88 3.03-3.23 5.18-3.37v4.18c-1.11.08-2.23.68-2.73 1.69-.51 1.01-.41 2.37.31 3.25.72.88 1.98 1.19 3.03.79 1.05-.4 1.7-1.52 1.7-2.65V6.3c-.02-2.1.01-4.19-.02-6.28z"/>
      </svg>
    )
  },
  {
    name: "Twitter",
    handle: "@Bollywood Bites",
    action: "Join the Chat",
    url: "https://x.com/BollywoodBites",
    color: "#1da1f2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
];

export default function SocialSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

      const cards = section.querySelectorAll(".social-card");

      gsap.set(cards, { y: 40, autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="social-section" ref={containerRef}>
      {/* Corner Mandanas */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

      <div className="container">
        <div className="social-section-header">
          <Copy type="lines" animateOnScroll>
            <p className="mono">Join the Community</p>
          </Copy>
          <Copy type="lines" animateOnScroll>
            <h2>Follow the Story</h2>
          </Copy>
        </div>

        <div className="social-cards-grid">
          {SOCIAL_CHANNELS.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              key={index}
              style={{ "--brand-color": item.color }}
            >
              <div className="social-card-bg-glow" />
              <div className="social-card-inner">
                <div className="social-card-icon-wrap">
                  {item.icon}
                </div>
                <div className="social-card-meta">
                  <span className="social-card-platform mono">{item.name}</span>
                  <h4 className="social-card-handle">{item.handle}</h4>
                  <span className="social-card-action mono">
                    {item.action} <span className="arrow">?</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
