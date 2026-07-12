"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_COLUMNS = [
  {
    heading: "About",
    links: [
      { label: "Chef Sanjay Patel", href: "/about/chef-sanjay-patel" },
      { label: "Event Gallery", href: "/about/event-gallery" },
      { label: "Star Gallery", href: "/about/star-gallery" },
    ],
  },
  {
    heading: "Menu",
    links: [
      { label: "Restaurant Menu", href: "/menu/restaurant" },
      { label: "Lunch Specials", href: "/menu/lunch" },
      { label: "Cocktail Menu", href: "/menu/cocktails" },
      { label: "Food Truck Menu", href: "/menu/food-truck" },
      { label: "Buffet", href: "/menu/buffet" },
      { label: "Catering Trays", href: "/menu/catering-trays" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Westwood Village", href: "/services/west-wood-village" },
      { label: "Catering", href: "/menu/catering-trays" },
      { label: "Food Trucks", href: "/menu/food-truck" },
    ],
  },
  {
    heading: "Media",
    links: [
      { label: "Blog", href: "/media/blog" },
      { label: "Press", href: "/media/press" },
      { label: "Events", href: "/media/event" },
      { label: "Specials", href: "/media/specials" },
    ],
  },
];

const Footer = () => {
  const pathname = usePathname();
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openCols, setOpenCols] = useState(new Set());
  const [contactOpen, setContactOpen] = useState(false);

  const toggleCol = (heading) => {
    setOpenCols((prev) => {
      const next = new Set(prev);
      next.has(heading) ? next.delete(heading) : next.add(heading);
      return next;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footer = footerRef.current;
      if (!footer) return;

      const columns = footer.querySelectorAll(".footer-column");
      const bottomBar = footer.querySelector(".footer-bottom");
      const wordmark = footer.querySelector(".footer-wordmark");

      gsap.fromTo(
        columns,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".footer-grid", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        wordmark,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-wordmark", start: "top 95%", once: true },
        }
      );

      gsap.fromTo(
        bottomBar,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out",
          scrollTrigger: { trigger: ".footer-bottom", start: "top 95%", once: true },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [pathname]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Send email input securely in the background via FormSubmit AJAX to info@thebollywoodbites.com
    try {
      fetch("https://formsubmit.co/ajax/info@thebollywoodbites.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          _subject: "New Newsletter Subscriber - Bollywood Bites",
          message: `Add to newsletter: ${email}`
        })
      });
    } catch (err) {
      console.error("Subscription submission failed", err);
    }

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <footer className="footer" ref={footerRef}>

      {/* ── Main Grid ── */}
      <div className="container">
        <div className="footer-grid">

          {/* Col 1 – Brand + newsletter */}
          <div className="footer-column brand-column">
            <Link href="/" className="footer-logo">Bollywood Bites</Link>
            <p className="brand-description">
              Award-winning Indian cuisine prepared to perfection and served with
              cinema-inspired hospitality in the heart of Westwood Village.
            </p>

            {/* Social links */}
            <div className="social-links-row">
              <a href="https://www.youtube.com/channel/UCtAqDJgfhTo6UrIt9VrQaXg" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/bollywoodbites_official/" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/thebollywoodbites.inc/" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h4 className="newsletter-label">Stay in the loop</h4>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  aria-label="Email Address"
                />
                <button type="submit" className="newsletter-submit-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => {
            const isOpen = openCols.has(col.heading);
            return (
              <div key={col.heading} className="footer-column links-column">
                <button
                  className={`column-heading column-heading--toggle ${isOpen ? "is-open" : ""}`}
                  onClick={() => toggleCol(col.heading)}
                  aria-expanded={isOpen}
                >
                  {col.heading}
                  <svg
                    className="col-toggle-icon"
                    width="12" height="12"
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <ul className={`footer-links-list ${isOpen ? "footer-links-list--open" : ""}`}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="footer-link">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact column */}
          <div className="footer-column links-column contact-column">
            <button
              className={`column-heading column-heading--toggle ${contactOpen ? "is-open" : ""}`}
              onClick={() => setContactOpen((v) => !v)}
              aria-expanded={contactOpen}
            >
              Contact
              <svg
                className="col-toggle-icon"
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`contact-info-list ${contactOpen ? "contact-info-list--open" : ""}`}>
              <p className="contact-item">
                1051 Gayley Avenue<br />Los Angeles, California, USA - 90024
              </p>
              <p className="contact-item">
                <a href="tel:3108241046">310-824-1046</a> / <a href="tel:3104031661">310-403-1661</a>
              </p>
              <p className="contact-item">
                <a href="mailto:info@thebollywoodbites.com">info@thebollywoodbites.com</a>
              </p>
              <div className="hours-block">
                <p className="hours-row"><span>Mon &ndash; Sun:</span> 11am &ndash; 10pm</p>
                <p className="hours-row" style={{ opacity: 0.7 }}>7 Days a week open</p>
              </div>
            </div>
          </div>

        </div>
      </div>{/* end .container */}

      {/* ── Full-width wordmark ── */}
      <div className="footer-wordmark" aria-hidden="true">
        <span>Bollywood</span>
        <span>Bites</span>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom-wrap">
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Bollywood Bites. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ── Subscribe toast popup ── */}
      <div className={`subscribe-toast ${subscribed ? "subscribe-toast--visible" : ""}`} role="status" aria-live="polite">
        <div className="toast-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="toast-text">
          <span className="toast-title">Thank You!</span>
          <span className="toast-sub">You are subscribed to deliciousness</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
