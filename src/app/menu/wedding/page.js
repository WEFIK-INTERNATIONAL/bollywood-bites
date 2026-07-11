"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import Testimonials from "@/components/Testimonials/Testimonials";
import { 
  HiX,
  HiPlus,
  HiMinus
} from "react-icons/hi";
import "./wedding.css";

gsap.registerPlugin(ScrollTrigger);

export default function WeddingMenu() {
  const pageRef = useRef(null);
  const contentSectionRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    eventDate: "",
    guestsCount: "",
    servicesNeeded: [],
    itemSelections: "",
    budgetPerPerson: "",
    budgetTotal: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Manage body scroll lock via useEffect side-effects
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox]);

  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const nextZoom = prev + direction * 0.5;
      return Math.min(Math.max(1, nextZoom), 3.0);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(serviceName);
      if (exists) {
        return {
          ...prev,
          servicesNeeded: prev.servicesNeeded.filter((item) => item !== serviceName)
        };
      } else {
        return {
          ...prev,
          servicesNeeded: [...prev.servicesNeeded, serviceName]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real application, submit the data to the API here
  };

  // Scroll animations for content blocks
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".wedding-form, .wedding-intro-copy > *");
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="wedding-menu-page">
      {/* Hero Section */}
      <section className="wedding-hero">
        <div className="hero-img">
          <Image 
            src="/restaurant/homegallery2.jpg" 
            fill 
            priority 
            sizes="100vw" 
            style={{ objectFit: "cover" }} 
            alt="" 
          />
        </div>
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0}>
            <h1>Wedding Catering</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="wedding-hero-tagline">Making Your Ceremony Unforgettable</p>
          </Copy>

          <p className="wedding-hero-desc">
            Trust us to make your wedding ceremony an unforgettable experience. Bollywood Bites ensures that quality food is always in the spotlight.
          </p>

          {/* Action CTAs */}
          <div className="wedding-ctas-row">
            <Button 
              href="javascript:;" 
              className="wedding-cta-btn wedding-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="wedding-cta-btn wedding-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="wedding-cta-btn wedding-btn-tertiary"
            >
              Request Catering
            </Button>
          </div>

          <div className="section-footer">
            <Copy type="lines" animateOnScroll={false} delay={0.2}>
              <p className="sm">Est. 2009</p>
            </Copy>
            <Copy type="lines" animateOnScroll={false} delay={0.3}>
              <p className="sm">Los Angeles, California, USA</p>
            </Copy>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="wedding-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="wedding-two-col-layout">
            
            {/* Left Column: Form & Copy */}
            <div className="wedding-left-content">
              <div className="wedding-intro-copy">
                <h2>Plan Your Royal Feast</h2>
                <p>
                  Trust us to make your wedding ceremony an unforgettable experience. Bollywood Bites will ensure quality food is always in the spotlight. We will fit your needs, exactly the way you want it.
                </p>
                <p className="form-lead">Kindly fill-in the form below to get started.</p>
              </div>

              {!isSubmitted ? (
                <form className="wedding-form" onSubmit={handleSubmit}>
                  
                  {/* Name field */}
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required
                      placeholder="Your Full Name"
                      className="form-input" 
                    />
                  </div>

                  {/* Date & Guests Row */}
                  <div className="form-group-row">
                    <div className="form-field">
                      <label htmlFor="eventDate">Event Date</label>
                      <input 
                        type="date" 
                        id="eventDate" 
                        name="eventDate" 
                        value={formData.eventDate} 
                        onChange={handleInputChange} 
                        required
                        className="form-input" 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="guestsCount">Number of Guests</label>
                      <input 
                        type="number" 
                        id="guestsCount" 
                        name="guestsCount" 
                        value={formData.guestsCount} 
                        onChange={handleInputChange} 
                        required
                        placeholder="Estimated Guest Count"
                        className="form-input" 
                      />
                    </div>
                  </div>

                  {/* Services Needed checkboxes */}
                  <div className="form-field">
                    <label>Services Needed</label>
                    <div className="services-checkbox-grid">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formData.servicesNeeded.includes("Full Service")} 
                          onChange={() => handleCheckboxChange("Full Service")} 
                        />
                        <span className="custom-checkbox"></span>
                        Full Service
                      </label>

                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formData.servicesNeeded.includes("Buffet Style")} 
                          onChange={() => handleCheckboxChange("Buffet Style")} 
                        />
                        <span className="custom-checkbox"></span>
                        Buffet Style
                      </label>

                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formData.servicesNeeded.includes("Tandoor on Site")} 
                          onChange={() => handleCheckboxChange("Tandoor on Site")} 
                        />
                        <span className="custom-checkbox"></span>
                        Tandoor-on-site
                      </label>

                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formData.servicesNeeded.includes("Street Fair Style")} 
                          onChange={() => handleCheckboxChange("Street Fair Style")} 
                        />
                        <span className="custom-checkbox"></span>
                        Street Fair Style
                      </label>
                    </div>
                  </div>

                  {/* Item Selections */}
                  <div className="form-field">
                    <label htmlFor="itemSelections">Item Selections & Special Requests</label>
                    <textarea 
                      id="itemSelections" 
                      name="itemSelections" 
                      value={formData.itemSelections} 
                      onChange={handleInputChange} 
                      rows={5}
                      placeholder="Specify your preferred items (appetizers, mains, breads, street foods, desserts, etc.)"
                      className="form-input"
                    />
                  </div>

                  {/* Budgets Row */}
                  <div className="form-field">
                    <label>Budget Details</label>
                    <div className="budget-grid-inputs">
                      <div className="form-field">
                        <label htmlFor="budgetPerPerson" style={{ fontSize: "0.75rem", color: "var(--base-200)" }}>Per Person Budget ($)</label>
                        <div className="budget-input-wrapper">
                          <span className="budget-currency-symbol">$</span>
                          <input 
                            type="number" 
                            id="budgetPerPerson" 
                            name="budgetPerPerson" 
                            value={formData.budgetPerPerson} 
                            onChange={handleInputChange} 
                            placeholder="Price Per Person"
                            className="form-input" 
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label htmlFor="budgetTotal" style={{ fontSize: "0.75rem", color: "var(--base-200)" }}>Total Budget ($)</label>
                        <div className="budget-input-wrapper">
                          <span className="budget-currency-symbol">$</span>
                          <input 
                            type="number" 
                            id="budgetTotal" 
                            name="budgetTotal" 
                            value={formData.budgetTotal} 
                            onChange={handleInputChange} 
                            placeholder="Max Total Budget"
                            className="form-input" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="wedding-cta-btn wedding-btn-primary"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    Send Wedding Request
                  </Button>

                </form>
              ) : (
                <div className="form-success-alert">
                  <h4>Thank You, {formData.name}!</h4>
                  <p>Your wedding catering consultation request has been submitted successfully.</p>
                  <p style={{ marginTop: "0.5rem", color: "var(--base-300)" }}>
                    Our event planning specialist will reach out to you within 24 hours to design your custom wedding feast.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="wedding-cta-btn wedding-btn-tertiary"
                    style={{ marginTop: "1.5rem" }}
                  >
                    Submit New Request
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Flyer Image */}
            <div className="wedding-sticky-sidebar">
              <div 
                className="wedding-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/menu/wedding.jpg"
                  alt="Bollywood Bites Wedding Catering Service Presentation"
                  width={900}
                  height={1200}
                  className="menu-flyer-image"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="wedding-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Wedding Catering
            </span>
            <div className="lightbox-controls">
              <button className="zoom-btn" onClick={() => handleZoom(1)} title="Zoom In">
                <HiPlus />
              </button>
              <button className="zoom-btn" onClick={() => handleZoom(-1)} title="Zoom Out">
                <HiMinus />
              </button>
            </div>
          </div>

          <div className="lightbox-image-wrapper" onClick={closeLightbox}>
            <div 
              className="lightbox-image-container"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.25s ease-out",
                cursor: zoomLevel > 1 ? "grab" : "default"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/menu/menu/wedding.jpg"
                alt="Wedding Menu Card"
                width={1200}
                height={1600}
                className="lightbox-flyer-image"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick CTAs Footer section */}
      <section className="wedding-footer-ctas">
        <div className="container">
          <h3 className="section-title">Ready to Design Your Dream Menu?</h3>
          <p className="section-subtitle">Reserve dates for your upcoming celebrations, order dining deliveries, or submit catering requests today.</p>
          <div className="wedding-ctas-row">
            <Button 
              href="javascript:;" 
              className="wedding-cta-btn wedding-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="wedding-cta-btn wedding-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="wedding-cta-btn wedding-btn-tertiary"
            >
              Request Catering
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
