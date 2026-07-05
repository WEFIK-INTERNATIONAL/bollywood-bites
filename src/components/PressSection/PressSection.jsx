"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";
import Button from "@/components/Button/Button";

import "./PressSection.css";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1000;
const CARD_GAP = 24;
const LERP_FACTOR = 0.075;
const VELOCITY_DAMPING = 0.95;
const VELOCITY_THRESHOLD = 0.05;

const PRESS_ITEMS = [
  {
    id: "cbs",
    category: "Video feature - CBS Los Angeles",
    title: "Chef Sanjay on the art of Indian cuisine",
    videoId: "T4g7awJAwGo",
    isVideo: true,
  },
  {
    id: "ktla",
    category: "TV appearance - KTLA 5 morning news",
    title: "Bollywood Bites takes LA by storm",
    videoId: "1cgFkAZCUsc",
    isVideo: true,
  },
  {
    id: "daily-bruin",
    category: "Daily Bruin",
    title: "Flavors of Westwood: Bollywood Bites chef-owner brings vast experience to table",
    link: "https://dailybruin.com/2014/05/06/flavors-of-westwood-bollywood-bites-chef-owner-brings-vast-experience-to-table",
    image: "/news/DailyBruin.jpg",
    isVideo: false,
  },
  {
    id: "hooplablog",
    category: "Hoopla Blog",
    title: "Bollywood Bites Food Truck Food Review",
    link: "https://hooplablog.com/2013/04/bollywood-bites/",
    image: "/news/hoopsla.png",
    isVideo: false,
  },
  {
    id: "sunset",
    category: "Sunset Magazine",
    title: "Where to find the best Indian street food in LA",
    link: "https://sunset.com/food-wine/indian-street-food",
    image: "/news/sunset.png",
    isVideo: false,
  },
];

const PressSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const slideByRef = useRef(null);

  /* Entrance animations on scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".press-card");
    const headerElements = section.querySelectorAll(".press-header-animate");
    const ctaWrapper = section.querySelector(".press-cta-wrapper");
    const navButtons = section.querySelectorAll(".press-nav-button-wrapper");

    gsap.set(navButtons, { scale: 0 });
    gsap.set(cards, { opacity: 0, y: 50 });

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

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(navButtons, {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.4,
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        });
      },
    });

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

    return () => scrollTrigger.kill();
  }, []);

  /* GSAP Infinite Carousel Logic */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = gsap.utils.toArray(
      track.querySelectorAll(".press-card"),
    );
    const cardCount = cards.length;
    if (!cardCount) return;

    const cardWidth = cards[0].offsetWidth;
    const itemWidth = cardWidth + CARD_GAP;
    const totalWidth = cardCount * itemWidth;

    gsap.set(cards, {
      position: "absolute",
      left: 0,
      top: 0,
      x: (index) => index * itemWidth,
    });

    gsap.set(track, { height: cards[0].offsetHeight });

    const wrapPosition = gsap.utils.wrap(-itemWidth + 50, totalWidth - itemWidth + 50);

    let targetX = 0;
    let currentX = 0;

    let isDragging = false;
    let dragStartPointerX = 0;
    let dragStartTargetX = 0;

    let velocityX = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;

    slideByRef.current = (direction) => {
      velocityX = 0;
      targetX += direction * itemWidth;
    };

    const updateCardPositions = () => {
      if (!isDragging) {
        targetX += velocityX;
        velocityX *= VELOCITY_DAMPING;
        if (Math.abs(velocityX) < VELOCITY_THRESHOLD) velocityX = 0;
      }

      currentX += (targetX - currentX) * LERP_FACTOR;

      cards.forEach((card, index) => {
        gsap.set(card, { x: wrapPosition(index * itemWidth + currentX) });
      });
    };

    gsap.ticker.add(updateCardPositions);

    const handlePointerDown = (e) => {
      isDragging = true;
      dragStartPointerX = e.clientX;
      dragStartTargetX = targetX;
      velocityX = 0;
      lastPointerX = e.clientX;
      lastPointerTime = Date.now();
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const dragDelta = e.clientX - dragStartPointerX;
      targetX = dragStartTargetX + dragDelta;

      const now = Date.now();
      const timeDelta = now - lastPointerTime;
      if (timeDelta > 0) {
        velocityX = ((e.clientX - lastPointerX) / timeDelta) * 16;
        lastPointerX = e.clientX;
        lastPointerTime = now;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      track.style.cursor = "grab";
    };

    let isDragEnabled = false;

    const enableDrag = () => {
      if (isDragEnabled) return;
      track.addEventListener("pointerdown", handlePointerDown);
      track.addEventListener("pointermove", handlePointerMove);
      track.addEventListener("pointerup", handlePointerUp);
      track.addEventListener("pointercancel", handlePointerUp);
      track.style.cursor = "grab";
      track.style.touchAction = "none";
      isDragEnabled = true;
    };

    const disableDrag = () => {
      if (!isDragEnabled) return;
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("pointermove", handlePointerMove);
      track.removeEventListener("pointerup", handlePointerUp);
      track.removeEventListener("pointercancel", handlePointerUp);
      track.style.cursor = "default";
      track.style.touchAction = "auto";
      isDragging = false;
      isDragEnabled = false;
    };

    const handleResize = () => {
      window.innerWidth < MOBILE_BREAKPOINT ? disableDrag() : enableDrag();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(updateCardPositions);
      disableDrag();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = useCallback(() => {
    slideByRef.current?.(1);
  }, []);

  const handleNext = useCallback(() => {
    slideByRef.current?.(-1);
  }, []);

  return (
    <section className="press-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="press-header">
          <div className="press-header-left">
            <span className="press-header-animate press-tagline">In The Media</span>
            <h2 className="press-header-animate press-title">Chef Sanjay in the Spotlight</h2>
            <div className="press-header-animate header-flourish-bottom">
              <span className="press-subtitle">Featured in Top Publications & Media Outlets</span>
            </div>
          </div>

          <div className="press-nav press-nav-desktop">
            <div className="press-nav-button-wrapper">
              <button className="press-nav-button" onClick={handlePrev} aria-label="Previous slides">
                <HiOutlineArrowLeft />
              </button>
            </div>
            <div className="press-nav-button-wrapper">
              <button className="press-nav-button" onClick={handleNext} aria-label="Next slides">
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Press Carousel */}
      <div className="press-carousel">
        <div className="press-track" ref={trackRef}>
          {PRESS_ITEMS.map((item) => {
            if (item.isVideo) {
              return (
                <div key={item.id} className="press-card video-card">
                  <div className="press-card-inner">
                    <div className="press-video-preview">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="press-video-iframe"
                      ></iframe>
                    </div>
                    <div className="press-video-info">
                      <span className="press-info-category">{item.category}</span>
                      <h3 className="press-info-title">{item.title}</h3>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-card article-card"
                >
                  <div className="press-card-inner">
                    <div className="press-article-preview">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="400px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="press-article-info">
                      <span className="press-info-category">{item.category}</span>
                      <h3 className="press-info-title">{item.title}</h3>
                      <span className="press-card-action mono">
                        Read Article <span className="arrow">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>

      <div className="container">
        {/* Mobile Navigation Arrows */}
        <div className="press-nav press-nav-mobile">
          <div className="press-nav-button-wrapper">
            <button className="press-nav-button" onClick={handlePrev} aria-label="Previous slides">
              <HiOutlineArrowLeft />
            </button>
          </div>
          <div className="press-nav-button-wrapper">
            <button className="press-nav-button" onClick={handleNext} aria-label="Next slides">
              <HiOutlineArrowRight />
            </button>
          </div>
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

