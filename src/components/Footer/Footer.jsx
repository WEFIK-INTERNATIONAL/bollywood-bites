"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const pathname = usePathname();
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const columns = footer.querySelectorAll(".footer-column");
    const bottomBar = footer.querySelector(".footer-bottom");

    gsap.fromTo(
      columns,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 90%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      bottomBar,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, [pathname]);

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" ref={footerRef}>
      
      {/* Main Footer Content Grid */}
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="footer-column brand-column">
            <Link href="/" className="footer-logo">
              Bollywood Bites
            </Link>
            <p className="brand-description">
              Award-winning Indian cuisine prepared to perfection and served with cinema-inspired hospitality in the heart of Westwood Village.
            </p>
            <div className="social-links-row">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Yelp */}
              <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Yelp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 11.22l2.67-1.54c.78-.45 1.05-1.44.6-2.22l-1-1.73c-.45-.78-1.44-1.05-2.22-.6L9.38 6.67c-.78.45-1.05 1.44-.6 2.22l1 1.73c.45.78 1.44 1.05 2.22.6zM22.5 13.5l-3.08-1c-.87-.28-1.8.2-2.08 1.07l-.65 2c-.28.87.2 1.8 1.07 2.08l3.08 1c.87.28 1.8-.2 2.08-1.07l.65-2c.28-.88-.2-1.8-1.07-2.08zM9.75 14.5l-3.08 1c-.87.28-1.8-.2-2.08-1.07l-.65-2c-.28-.87.2-1.8 1.07-2.08l3.08-1c.87-.28 1.8.2 2.08 1.07l.65 2c.28.87-.2 1.8-1.07 2.08zM15.5 22.5l.65-3.08c.18-.89-.39-1.77-1.28-1.95l-2-.42c-.89-.18-1.77.39-1.95 1.28l-.65 3.08c-.18.89.39 1.77 1.28 1.95l2 .42c.89.19 1.77-.38 1.95-1.28z"/>
                </svg>
              </a>
              {/* Tripadvisor */}
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label="Tripadvisor">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="8" cy="12" r="2.5"/>
                  <circle cx="16" cy="12" r="2.5"/>
                  <path d="M12 2a10.3 10.3 0 0 0-4 1.5M12 22a10.3 10.3 0 0 0 4-1.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-column links-column">
            <h3 className="column-heading">Navigation</h3>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/menu" className="footer-link">Menu</Link></li>
              <li><Link href="/services/catering" className="footer-link">Catering</Link></li>
              <li><Link href="/services/food-trucks" className="footer-link">Food Truck</Link></li>
              <li><Link href="/media/press" className="footer-link">Media Spotlight</Link></li>
              <li><Link href="/reservation" className="footer-link">Reservations</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="footer-column contact-column">
            <h3 className="column-heading">Contact</h3>
            <div className="contact-info-list">
              <p className="contact-item address">
                10789 Weyburn Ave<br />
                Los Angeles, CA 90024
              </p>
              <p className="contact-item phone">
                <a href="tel:3104740707">(310) 474-0707</a>
              </p>
              <p className="contact-item email">
                <a href="mailto:hello@bollywoodbites.com">hello@bollywoodbites.com</a>
              </p>
              <div className="hours-block">
                <p className="hours-row"><span>Mon &ndash; Thu:</span> 11am &ndash; 10pm</p>
                <p className="hours-row"><span>Fri &ndash; Sun:</span> 11am &ndash; 11pm</p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column newsletter-column">
            <h3 className="column-heading">Join The Circle</h3>
            <p className="newsletter-text">
              Subscribe to receive exclusive recipes, culinary updates, and priority invitations to Bollywood Bites events.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="newsletter-input"
                aria-label="Email Address"
              />
              <button type="submit" className="newsletter-submit-btn">
                <span>Subscribe</span>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Bollywood Bites. All Rights Reserved.</p>
          </div>
          
          <div className="footer-legal-links">
            <Link href="/privacy-policy" className="legal-link">Privacy Policy</Link>
            <span className="dot-separator">&bull;</span>
            <Link href="/terms-of-service" className="legal-link">Terms of Service</Link>
          </div>

          <div className="footer-credits">
            <p>Built by Wefik</p>
            <span className="dot-separator">&bull;</span>
            <a href="#" onClick={handleBackToTop} className="back-to-top-link">
              <span>Back to Top</span>
              <svg className="up-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
