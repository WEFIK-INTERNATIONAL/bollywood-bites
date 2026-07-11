"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";

import { moments } from "./moments-data";
import Copy from "@/components/Copy/Copy";
import { SteppedFrame } from "../Steppedframe/SteppedFrame";

import "./Moments.css";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1000;
const CARD_GAP = 20;
const LERP_FACTOR = 0.075;
const VELOCITY_DAMPING = 0.95;
const VELOCITY_THRESHOLD = 0.05;

const Moments = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const slideByRef = useRef(null);

  // Duplicate moments to ensure a long infinite scrolling row
  const doubleMoments = [...moments, ...moments];

  /* entrance animations on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const navButtons = section.querySelectorAll(
        ".moments-nav-button-wrapper",
      );
      const cards = section.querySelectorAll(".moment-card");

      gsap.set(navButtons, { scale: 0 });
      gsap.set(cards, { scale: 0.85, autoAlpha: 0 });

      ScrollTrigger.create({
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
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.3,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* infinite carousel with drag, momentum, and auto-scroll */
  useEffect(() => {
    const track = trackRef.current;
    const cards = gsap.utils.toArray(
      track.querySelectorAll(".moment-card"),
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

    let lastInteractionTime = 0;

    slideByRef.current = (direction) => {
      velocityX = 0;
      targetX += direction * itemWidth;
      lastInteractionTime = Date.now();
    };

    const updateCardPositions = () => {
      const now = Date.now();
      const isInteractionCooldown = now - lastInteractionTime < 2500;

      if (!isDragging) {
        if (!isInteractionCooldown) {
          // Slow, continuous smooth scroll when not interacting
          targetX -= 0.75;
        }
        
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
      lastInteractionTime = Date.now();
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
      lastInteractionTime = Date.now();
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
      lastInteractionTime = Date.now();
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
    <section className="moments" ref={sectionRef}>
      {/* Mandana leaf borders top and bottom */}
      <div className="leaf-border-top" aria-hidden="true" />
      <div className="leaf-border-bottom" aria-hidden="true" />
      <div className="container">
        <div className="moments-header">
          <div className="moments-header-left">
            <Copy type="lines" animateOnScroll>
              <h3 className="moments-title">Timeless Moments</h3>
            </Copy>
            <Copy type="lines" animateOnScroll delay={0.15}>
              <p className="moments-subtitle">Hollywood & Bollywood Celebrities</p>
            </Copy>
          </div>

          <div className="moments-nav">
            <div className="moments-nav-button-wrapper">
              <button className="moments-nav-button" onClick={handlePrev} aria-label="Previous slide">
                <HiOutlineArrowLeft />
              </button>
            </div>
            <div className="moments-nav-button-wrapper">
              <button className="moments-nav-button" onClick={handleNext} aria-label="Next slide">
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="moments-carousel">
        <div className="moments-track" ref={trackRef}>
          {doubleMoments.map((moment, index) => (
            <div className="moment-card" key={index}>
              <SteppedFrame stepSize="sm" borderColor="cream" innerRing={true} className="moment-stepped-frame">
                <div className="moment-image-wrapper">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="260px"
                    style={{ objectFit: "cover" }}
                    priority={index < 4}
                  />
                  <div className="moment-overlay">
                    <h4 className="moment-celebrity-name">{moment.name}</h4>
                  </div>
                </div>
              </SteppedFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Moments;
