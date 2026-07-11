"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button/Button";
import "./CookieConsent.css";


export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invocation
    if (hasRun.current) return;
    hasRun.current = true;

    // Check cookie check
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="));

    if (!cookieConsent) {
      // Show banner after a delay of 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted) => {
    setIsDismissing(true);

    const consentValue = accepted ? "accepted" : "declined";

    // Set a cookie (1 year) for server-side access
    document.cookie = `cookie_consent=${consentValue}; max-age=31536000; path=/; SameSite=Lax`;

    // Set has_visited cookie to prevent preloader showing on refresh
    document.cookie = "has_visited=true; max-age=31536000; path=/; SameSite=Lax";

    // Wait for exit slide animation to finish
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-consent-banner ${isDismissing ? "is-dismissing" : ""}`}>
      <div className="cookie-consent-inner">
        <div className="cookie-consent-content">
          <span className="cookie-consent-tag">Privacy Preference</span>
          <h4 className="cookie-consent-title">We Value Your Experience</h4>
          <p className="cookie-consent-desc">
            We use cookies to personalize content, analyze traffic, and enhance your digital dining journey at Bollywood Bites.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <Button onClick={() => handleChoice(false)} className="cookie-btn-decline">
            Decline
          </Button>
          <Button onClick={() => handleChoice(true)} className="cookie-btn-accept">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
