"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./Copy.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

const REQUIRED_FONTS = ["Host Grotesk", "DM Mono", "Roslindale Variable"];

async function waitForFonts() {
  try {
    await document.fonts.ready;
    // Bypasses the setTimeout delay if the required fonts are already loaded.
    const allLoaded = REQUIRED_FONTS.every((font) =>
      document.fonts.check(`16px "${font}"`)
    );
    if (!allLoaded) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

function resolveTriggerElement(selector, fallback) {
  if (typeof selector === "string" && selector.trim().length > 0) {
    return (
      fallback.closest(selector) || document.querySelector(selector) || fallback
    );
  }
  return fallback;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  type = "lines",
  trigger = null,
  triggerPoint = null,
  start = null,
  play = true,
}) {
  const containerRef = useRef(null);
  const splitInstanceRefs = useRef([]);
  const scrollTriggerRefs = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let isActive = true;

      const cleanupInstances = () => {
        scrollTriggerRefs.current.forEach((st) => st?.kill());
        scrollTriggerRefs.current = [];

        splitInstanceRefs.current.forEach((split) => split?.revert());
        splitInstanceRefs.current = [];
      };

      const buildAnimations = async () => {
        // If play is false, keep the container hidden and do not run animations
        if (!play) {
          if (containerRef.current) {
            containerRef.current.classList.add("copy-pending");
          }
          return;
        }

        // Hide container while waiting for fonts and splitting
        if (containerRef.current) {
          containerRef.current.classList.add("copy-pending");
        }
        await waitForFonts();
        if (!isActive || !containerRef.current) return;

        cleanupInstances();

        const targetElements = containerRef.current.hasAttribute(
          "data-copy-wrapper",
        )
          ? Array.from(containerRef.current.children)
          : [containerRef.current];

        const resolvedType = type === "words" ? "words" : "lines";
        const resolvedStart = start ?? "top 80%";

        const triggerElement = resolveTriggerElement(
          triggerPoint ?? trigger,
          containerRef.current,
        );

        /* split and animate lines or words */
        const splitUnits = [];

        targetElements.forEach((element) => {
          const isWordSplit = resolvedType === "words";

          const split = SplitText.create(element, {
            type: isWordSplit ? "words" : "lines",
            mask: isWordSplit ? "words" : "lines",
            ...(isWordSplit
              ? { wordsClass: "word" }
              : { linesClass: "line", lineThreshold: 0.1 }),
          });

          splitInstanceRefs.current.push(split);

          const units = isWordSplit ? split.words : split.lines;

          /* preserve text-indent on first split unit */
          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;
          if (textIndent && textIndent !== "0px" && units.length > 0) {
            units[0].style.paddingLeft = textIndent;
            element.style.textIndent = "0";
          }

          splitUnits.push(...units);
        });

        gsap.set(splitUnits, { y: "110%" });

        // Show container now that units are off-screen and ready to animate
        if (containerRef.current) {
          containerRef.current.classList.remove("copy-pending");
          gsap.set(containerRef.current, { clearProps: "opacity,visibility" });
        }

        const revealAnimation = gsap.to(splitUnits, {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          delay,
          paused: animateOnScroll,
        });

        if (animateOnScroll) {
          const scrollTrigger = ScrollTrigger.create({
            trigger: triggerElement,
            start: resolvedStart,
            animation: revealAnimation,
            once: true,
            refreshPriority: -1,
          });
          scrollTriggerRefs.current.push(scrollTrigger);
        }
      };

      buildAnimations();

      return () => {
        isActive = false;
        cleanupInstances();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        type,
        trigger,
        triggerPoint,
        start,
        play,
      ],
    },
  );

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    const child = React.Children.only(children);
    const newClassName = `${child.props.className || ""} copy-pending`.trim();
    return React.cloneElement(child, {
      ref: containerRef,
      className: newClassName,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true" className="copy-pending">
      {children}
    </div>
  );
}
