"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import "./GallerySection.css";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { 
    src: "/restaurant/homegallery1.jpg", 
    alt: "Dinning Area", 
    isVideo: true,
    videoUrl: "https://youtu.be/_mrbCif-oJM?is=cYKG61kco-8iewr2",
    embedId: "_mrbCif-oJM"
  },
  { src: "/restaurant/homegallery2.jpg", alt: "Customer Serving" },
  { src: "/restaurant/homegallery3.jpeg", alt: "Food Track" },
  { src: "/restaurant/homegallery4.jpg", alt: "Food Buffet" },
  { src: "/restaurant/homegallery5.jpg", alt: "Catering" },
  { src: "/restaurant/homegallery6.jpeg", alt: "Spirit of india" },
];

const GallerySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".gallery-item");
    const headerElements = section.querySelectorAll(".gallery-header-animate");
    const ctaWrapper = section.querySelector(".gallery-cta-wrapper");

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
          trigger: ".gallery-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
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
          trigger: ".gallery-cta-wrapper",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="gallery-header">
          <span className="gallery-header-animate gallery-tagline">The Bollywood Bites Experience</span>
          <h2 className="gallery-header-animate gallery-title">
            Where Every Meal <br />
            <span className="highlight-text">Becomes a Memory.</span>
          </h2>
        </div>

        {/* 4x2 Photo Collage Grid */}
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img, idx) => {
            const isVideo = img.isVideo;
            return (
              <div 
                key={idx} 
                className="gallery-item"
                onClick={isVideo ? () => window.open(img.videoUrl, "_blank") : undefined}
                style={isVideo ? { cursor: "pointer" } : undefined}
              >
                {isVideo ? (
                  <div className="gallery-video-wrapper" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${img.embedId}?autoplay=1&mute=1&loop=1&playlist=${img.embedId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "180%",
                        height: "180%",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                        border: 0
                      }}
                      allow="autoplay; encrypted-media"
                      title="Dinning Area Video"
                    />
                  </div>
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="gallery-image"
                  />
                )}
                <div className="gallery-item-overlay">
                  <span className="gallery-hover-text">{isVideo ? "Play Video" : img.alt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="gallery-cta-wrapper">
          <Button href="/media/press" className="gallery-explore-btn">
            View Our Gallery
          </Button>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
