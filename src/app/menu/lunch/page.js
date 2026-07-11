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
import { FaFacebookF } from "react-icons/fa";
import "./lunch.css";

gsap.registerPlugin(ScrollTrigger);

const LUNCH_CONTENT = [
  {
    title: "Enjoy Authentic Indian Flavors at Lunchtime",
    paragraphs: [
      "Indian cuisine is known for its rich spices, aromatic sauces, and comforting dishes that bring people together. From creamy curries and fragrant rice dishes to freshly baked naan and vegetarian specialties, lunch becomes more enjoyable when made with authentic recipes.",
      "Those seeking Lunch specials Los Angeles often want a combination of quality and convenience. Freshly prepared meals with balanced flavors provide the perfect option for busy professionals, students, families, and anyone looking for a delicious midday break."
    ]
  },
  {
    title: "Fresh Ingredients and Traditional Recipes",
    paragraphs: [
      "Great meals begin with quality ingredients. Authentic herbs and spices, premium meats, and fresh vegetables are carefully selected to create dishes full of flavor and character. Traditional cooking techniques preserve the rich taste and aroma that make Indian cuisine loved around the world.",
      "At Bollywood Bites, every dish is prepared with care to ensure consistency and freshness. From savory appetizers to hearty entrées, each meal reflects the authenticity and passion behind Indian cooking."
    ]
  },
  {
    title: "Lunch Options for Every Taste",
    paragraphs: [
      "One of the reasons guests love Indian cuisine is the incredible variety available. Whether you prefer vegetarian specialties, flavorful chicken dishes, or rich curries, there is something to satisfy every craving.",
      "People looking for Lunch specials Los Angeles appreciate menus that offer diverse options without compromising on quality. From classic favorites like butter chicken and chicken tikka masala to vegetarian delights and aromatic biryanis, every meal is crafted to deliver exceptional taste."
    ]
  },
  {
    title: "Perfect for Workdays and Casual Gatherings",
    paragraphs: [
      "Lunch is more than just a meal – it is an opportunity to relax and recharge. Whether you’re enjoying a quick bite during a busy day or sharing a meal with friends and colleagues, authentic Indian cuisine provides warmth and comfort.",
      "Guests who visit an Indian restaurant Westwood often appreciate a welcoming atmosphere paired with exceptional food and service. Comfortable surroundings and flavorful dishes create an experience that keeps diners coming back."
    ]
  },
  {
    title: "Affordable Meals Without Compromising Quality",
    paragraphs: [
      "A satisfying lunch should be both delicious and affordable. Fresh ingredients, generous portions, and carefully prepared recipes make every meal a great value. Whether dining in, ordering takeout, or enjoying delivery, quality and convenience should always go hand in hand.",
      "Many food lovers searching for Lunch specials Los Angeles want meals that provide variety and freshness while fitting into a busy schedule. Authentic Indian dishes offer the perfect balance of flavor, nutrition, and satisfaction."
    ]
  },
  {
    title: "A Dining Experience Worth Returning To",
    paragraphs: [
      "Food has a special way of bringing people together and creating lasting memories. Sharing authentic meals with friends, coworkers, or family members adds joy to every occasion. Rich spices, comforting dishes, and attentive service make every visit enjoyable, making our Lunch specials Los Angeles a favorite choice for those seeking authentic Indian flavors and exceptional value.",
      "Bollywood Bites continues to serve flavorful Indian cuisine inspired by traditional recipes and modern tastes. Guests appreciate the dedication to quality and the commitment to creating memorable dining experiences."
    ]
  },
  {
    title: "Discover the Best Lunch Specials in Los Angeles",
    paragraphs: [
      "Whether you’re craving creamy curries, freshly prepared naan, flavorful rice dishes, or vegetarian favorites, authentic Indian cuisine offers something for everyone. Those looking for Lunch specials Los Angeles can enjoy delicious meals prepared with fresh ingredients and traditional spices.",
      "With generous portions, exceptional flavors, and a commitment to quality, Bollywood Bites provides a lunch experience that satisfies every appetite. Enjoy a midday meal that combines authenticity, convenience, and unforgettable taste."
    ]
  }
];

export default function LunchMenu() {
  const pageRef = useRef(null);
  const contentSectionRef = useRef(null);
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

  // Scroll animations for content blocks
  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(".lunch-info-block, .lunch-facebook-block");
      gsap.fromTo(blocks,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
    <div ref={pageRef} className="lunch-menu-page">
      {/* Hero Section */}
      <section className="lunch-hero">
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
            <h1>Lunch Specials</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="lunch-hero-tagline">Affordable Lunch Specials Los Angeles | Authentic Indian Cuisine Daily</p>
          </Copy>

          <p className="lunch-hero-desc">
            Enjoy delicious, freshly prepared midday meals combining traditional flavors, generous portions, and exceptional value. Available daily in Los Angeles.
          </p>

          {/* Action CTAs */}
          <div className="lunch-ctas-row">
            <Button 
              href="javascript:;" 
              className="lunch-cta-btn lunch-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="lunch-cta-btn lunch-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="lunch-cta-btn lunch-btn-tertiary"
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
      <section className="lunch-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="lunch-two-col-layout">
            
            {/* Left Column: Editorial Copy */}
            <div className="lunch-editorial-content">
              <div className="lunch-article-header">
                <h2>Lunch Specials Los Angeles</h2>
                <p className="lead-p">
                  Finding a delicious and satisfying lunch in Los Angeles shouldn’t mean compromising on quality or flavor. Whether you’re taking a break from work, meeting friends, or simply craving authentic Indian cuisine, enjoying a freshly prepared meal can make your day even better. At Bollywood Bites, every lunch is prepared with authentic spices and fresh ingredients, creating a dining experience that is both flavorful and satisfying.
                </p>
              </div>

              <div className="lunch-editorial-blocks">
                {LUNCH_CONTENT.map((block, idx) => (
                  <div key={idx} className="lunch-info-block">
                    <h4>{block.title}</h4>
                    {block.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                ))}

                {/* Facebook block */}
                <div className="lunch-facebook-block">
                  <h5>Connect With Us on Facebook</h5>
                  <p>Follow our Facebook page to stay updated on our latest lunch specials, delicious dishes, special offers, and everything happening at Bollywood Bites.</p>
                  <a 
                    href="https://www.facebook.com/BollywoodBites" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fb-link-btn"
                  >
                    <FaFacebookF style={{ marginRight: "0.25rem" }} /> Follow Us on Facebook &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Flyer Card */}
            <div className="lunch-sticky-sidebar">
              <div 
                className="lunch-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/menu/luncspecial.jpg"
                  alt="Bollywood Bites Lunch Specials Menu Card"
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
        <div className="lunch-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Lunch Specials
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
                src="/menu/menu/luncspecial.jpg"
                alt="Lunch Specials Menu"
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
      <section className="lunch-footer-ctas">
        <div className="container">
          <h3 className="section-title">Ready to Taste Authentic Indian Flavors?</h3>
          <p className="section-subtitle">Order your lunch online, book a table for dining with us in Westwood, or hire us to cater your next event.</p>
          <div className="lunch-ctas-row">
            <Button 
              href="javascript:;" 
              className="lunch-cta-btn lunch-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="lunch-cta-btn lunch-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="lunch-cta-btn lunch-btn-tertiary"
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
