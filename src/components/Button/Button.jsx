"use client";

import { forwardRef, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

import { useViewTransition } from "@/hooks/useViewTransition";

import "./Button.css";

const MOBILE_BREAKPOINT = 1000;

const Button = forwardRef(
  ({ href, children, className = "", onClick, ...props }, ref) => {
    const buttonRef = useRef(null);
    const hoverTimelineRef = useRef(null);
    const { navigateWithTransition } = useViewTransition();

    const isButton = !href || href === "#" || href.startsWith("javascript:");
    const Tag = isButton ? "button" : "a";

    const buttonText = typeof children === "string" ? children.trim().replace(/\s+/g, " ") : "";
    const characters = buttonText.split("");

    /* merge forwarded ref with internal ref */
    const mergeRefs = useCallback(
      (node) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    /* character hover animation (desktop only) */
    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const defaultChars = button.querySelectorAll(".char-default");
      const hoverChars = button.querySelectorAll(".char-hover");

      gsap.set(defaultChars, { yPercent: 0 });
      gsap.set(hoverChars, { yPercent: -100 });

      const handleMouseEnter = () => {
        if (hoverTimelineRef.current) hoverTimelineRef.current.kill();

        const tl = gsap.timeline();
        tl.to(
          defaultChars,
          {
            yPercent: 100,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.01,
          },
          0,
        );
        tl.to(
          hoverChars,
          {
            yPercent: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.01,
          },
          0.1,
        );

        hoverTimelineRef.current = tl;
      };

      const handleMouseLeave = () => {
        if (hoverTimelineRef.current) hoverTimelineRef.current.kill();

        const tl = gsap.timeline();
        tl.to(
          hoverChars,
          {
            yPercent: -100,
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.01,
          },
          0,
        );
        tl.to(
          defaultChars,
          {
            yPercent: 0,
            duration: 0.4,
            ease: "power3.inOut",
            stagger: 0.01,
          },
          0.15,
        );

        hoverTimelineRef.current = tl;
      };

      let isHoverActive = false;

      const enableHover = () => {
        if (isHoverActive) return;
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
        isHoverActive = true;
      };

      const disableHover = () => {
        if (!isHoverActive) return;
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        gsap.set(defaultChars, { yPercent: 0 });
        hoverChars.forEach(char => gsap.set(char, { yPercent: -100 }));
        if (hoverTimelineRef.current) hoverTimelineRef.current.kill();
        isHoverActive = false;
      };

      const handleResize = () => {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
          disableHover();
        } else {
          enableHover();
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        disableHover();
        window.removeEventListener("resize", handleResize);
        if (hoverTimelineRef.current) hoverTimelineRef.current.kill();
      };
    }, []);

    const handleClick = (e) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      if (!isButton && href && href.startsWith("/")) {
        e.preventDefault();
        navigateWithTransition(href);
      }
    };

    return (
      <Tag
        {...(isButton ? { type: "button", ...props } : { href, ...props })}
        className={`slide-button ${className}`}
        ref={mergeRefs}
        onClick={handleClick}
      >
        <div className="slide-button-bg" />
        <span className="slide-button-text">
          {characters.map((char, index) => (
            <span key={index} className="slide-char">
              <span className="char-default">
                {char === " " ? "\u00A0" : char}
              </span>
              <span className="char-hover">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    );
  },
);

Button.displayName = "Button";

export default Button;
