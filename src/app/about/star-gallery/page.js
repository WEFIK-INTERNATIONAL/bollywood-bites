"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import CTA from "@/components/CTA/CTA";
import "../gallery.css";
import "./star-gallery.css";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_PHOTOS = [
  // Bollywood (17)
  { image: "/star_gallery/bollywood/1519100179b1.jpg", category: "bollywood", title: "Legendary Welcome", description: "Chef Sanjay Patel greeting our elite Bollywood guests with traditional hospitality" },
  { image: "/star_gallery/bollywood/1519100179b2.jpg", category: "bollywood", title: "Celebration Dinner", description: "A festive evening celebrating Indian cinematic heritage and authentic flavours" },
  { image: "/star_gallery/bollywood/1519100180b11.jpg", category: "bollywood", title: "Cinematic Spice", description: "Sharing secrets of our traditional hand-ground garam masala blends" },
  { image: "/star_gallery/bollywood/1519100180b13.jpg", category: "bollywood", title: "Signature Tastings", description: "Custom clay-pot delicacies prepared specifically for our VIP diners" },
  { image: "/star_gallery/bollywood/1519100180b3.jpg", category: "bollywood", title: "Vibrant Gatherings", description: "Vibrant chats and laughter over our legendary Delhi street food platters" },
  { image: "/star_gallery/bollywood/1519100180b4.jpg", category: "bollywood", title: "Star Dining Room", description: "Private family gathering experiencing the Grand Weekend Thali" },
  { image: "/star_gallery/bollywood/1519100180b5.jpg", category: "bollywood", title: "Elite Banquet", description: "Celebrating movie releases with signature royal cardamom-infused mocktails" },
  { image: "/star_gallery/bollywood/1519100180b7.jpg", category: "bollywood", title: "Heritage Stories", description: "Discussing the historic spices that inspired our modern Indian culinary journey" },
  { image: "/star_gallery/bollywood/1519100180b9.jpg", category: "bollywood", title: "Grand Chef's Table", description: "Chef's custom presentation of modern charcoal-grilled kebabs" },
  { image: "/star_gallery/bollywood/1519100181b10.jpg", category: "bollywood", title: "Indian Cinema Lounge", description: "A late-night private lounge gathering with leading actors and creators" },
  { image: "/star_gallery/bollywood/1519100181b14.jpg", category: "bollywood", title: "Traditional Toast", description: "A classic toast to friendship and culinary art with special guests" },
  { image: "/star_gallery/bollywood/1519100181b6.jpg", category: "bollywood", title: "Masterchef Secrets", description: "Explaining the detailed culinary process of cooking our 24-hour slow-cooked Dal" },
  { image: "/star_gallery/bollywood/1519100181b8.jpg", category: "bollywood", title: "Warm Hospitality", description: "Bringing the warmth of Indian culture and luxury to our stellar guests" },
  { image: "/star_gallery/bollywood/1519100182b12.jpg", category: "bollywood", title: "Spice Masterclass", description: "Sharing the aromatic nuances of saffron and cardamom in desserts" },
  { image: "/star_gallery/bollywood/1519100182b16.jpg", category: "bollywood", title: "The Royal Platter", description: "Serving traditional silver-service dishes to visiting artists" },
  { image: "/star_gallery/bollywood/1519100182b17.jpg", category: "bollywood", title: "Bollywood Nights", description: "Enchanting music, warm lighting, and tailored hospitality for cinema icons" },
  { image: "/star_gallery/bollywood/1519100183b15.jpg", category: "bollywood", title: "Flavours of Mumbai", description: "A retrospective tasting of street food favorites elevated for fine dining" },

  // Hollywood (24)
  { image: "/star_gallery/hollywood/1519100009h1.jpg", category: "hollywood", title: "Global Star Reception", description: "Welcoming international icons to experience modern Indian dining" },
  { image: "/star_gallery/hollywood/1519100010h2.jpg", category: "hollywood", title: "East Meets West", description: "Blended culinary stories matching local expectations with authentic Indian heat" },
  { image: "/star_gallery/hollywood/1519100010h5.jpg", category: "hollywood", title: "Exclusive Dining Room", description: "Intimate dinner setting for high-profile Hollywood directors and producers" },
  { image: "/star_gallery/hollywood/1519100011h6.jpg", category: "hollywood", title: "VIP Curry Tasting", description: "Guiding guests through our single-origin spice curries and custom naans" },
  { image: "/star_gallery/hollywood/1519100012h3.jpg", category: "hollywood", title: "Gourmet Cocktail Hours", description: "Artisanal cocktails curated with rose water, ginger, and Indian botanicals" },
  { image: "/star_gallery/hollywood/1519100012h9.jpg", category: "hollywood", title: "Chef Sanjay's Presentation", description: "Chef presenting the custom smoke-infused butter chicken recipe" },
  { image: "/star_gallery/hollywood/1519100013h10.jpg", category: "hollywood", title: "Hollywood Feast", description: "Sharing fine dining memories and the joy of culinary excellence" },
  { image: "/star_gallery/hollywood/1519100013h11.jpg", category: "hollywood", title: "Elegant Table Talk", description: "Sharing stories of spice-hunting across Kerala and Kashmir" },
  { image: "/star_gallery/hollywood/1519100013h13.jpg", category: "hollywood", title: "Premium Tasting Menu", description: "An 8-course curated tasting voyage celebrating royal Indian houses" },
  { image: "/star_gallery/hollywood/1519100014h15.jpg", category: "hollywood", title: "Starry Nights", description: "Enjoying the warm ambiance of our custom heritage brass-ornated dining lounge" },
  { image: "/star_gallery/hollywood/1519100015h16.jpg", category: "hollywood", title: "Gourmet Review", description: "Acclaimed actors appreciating the unique textures of our samosa chat" },
  { image: "/star_gallery/hollywood/1519100015h17.jpg", category: "hollywood", title: "Flavour Synthesis", description: "Blending sweet, sour, tangy, and spicy elements for global tastes" },
  { image: "/star_gallery/hollywood/1519100015h18.jpg", category: "hollywood", title: "Signature Hospitality", description: "Offering unmatched service and discrete private dining experiences" },
  { image: "/star_gallery/hollywood/1519100015h19.jpg", category: "hollywood", title: "Iconic Gatherings", description: "Celebrating international creative achievements with rich desserts" },
  { image: "/star_gallery/hollywood/1519100016h20.jpg", category: "hollywood", title: "The Art of Spice", description: "Tailoring spice levels to create an approachable yet authentic curry voyage" },
  { image: "/star_gallery/hollywood/1519100017h21.jpg", category: "hollywood", title: "Lounge Conversation", description: "Warm moments talking film, art, and the universal language of food" },
  { image: "/star_gallery/hollywood/1519100017h22.jpg", category: "hollywood", title: "Tandoori Showcase", description: "Praising our clay oven-cooked seekh kebabs and mint chutney" },
  { image: "/star_gallery/hollywood/1519100018h23.jpg", category: "hollywood", title: "Elite Banquet Dinner", description: "A majestic dinner arrangement combining luxury and culinary detail" },
  { image: "/star_gallery/hollywood/1519100018h24.jpg", category: "hollywood", title: "Royal Treats", description: "Serving custom gold-leaf kulfi and saffron tea to our special visitors" },
  { image: "/star_gallery/hollywood/1519100018h25.jpg", category: "hollywood", title: "Gourmet Conversation", description: "Chef Sanjay Patel detailing the heritage behind the slow-cooked biryani" },
  { image: "/star_gallery/hollywood/1519100018h26.jpg", category: "hollywood", title: "A Night to Remember", description: "Celebrating collaborations and warm memories at Bollywood Bites" },
  { image: "/star_gallery/hollywood/1519100019h27.jpg", category: "hollywood", title: "Culinary Dialogues", description: "Hollywood stars enjoying modern interpretations of classic regional curries" },
  { image: "/star_gallery/hollywood/151910002629.jpg", category: "hollywood", title: "Grand Celebration Toast", description: "Exquisite dining experience and a hearty toast to global success" },
  { image: "/star_gallery/hollywood/1519100031h28.jpg", category: "hollywood", title: "Culinary Landmark", description: "A special moment capturing our Hollywood guests at the restaurant front" },

  // Trucks (9)
  { image: "/star_gallery/trucks/1519100387b1.jpg", category: "trucks", title: "Street Food Carnival", description: "Our gourmet food trucks serving hot tandoori rolls at a local festival" },
  { image: "/star_gallery/trucks/1519100387b3.jpg", category: "trucks", title: "Mobile Catering Setup", description: "Bringing Bollywood Bites street food directly to private corporate retreats" },
  { image: "/star_gallery/trucks/1519100387b5.jpg", category: "trucks", title: "Bollywood Bites on Wheels", description: "Our custom decorated food truck prepping delicious mango lassis and chaat" },
  { image: "/star_gallery/trucks/1519100388b2.jpg", category: "trucks", title: "Outdoor Dining Vibes", description: "Guests enjoying authentic pani puri and samosas in a casual, lively setting" },
  { image: "/star_gallery/trucks/1519100388b7.jpg", category: "trucks", title: "Street Food Masterclass", description: "Frying fresh vegetable pakoras live for festival attendees" },
  { image: "/star_gallery/trucks/1519100388b8.jpg", category: "trucks", title: "Festival Catering Joy", description: "Smiles and quick bites at a major cultural gathering" },
  { image: "/star_gallery/trucks/1519100389b10.jpg", category: "trucks", title: "Spicy Outdoor Kitchen", description: "Our chefs preparing chicken tikka skewers live at the food truck counter" },
  { image: "/star_gallery/trucks/1519100389b4.jpg", category: "trucks", title: "Corporate Lunch Rush", description: "Serving busy office professionals premium lunch boxes on the go" },
  { image: "/star_gallery/trucks/1519100389b9.jpg", category: "trucks", title: "Sunset Street Bites", description: "A beautiful evening with our truck serving snacks to a happy crowd" },

  // Others (2)
  { image: "/star_gallery/others/1519112527best1.jpg", category: "others", title: "Award Recognition", description: "Chef Sanjay Patel presenting at the elite culinary showcase" },
  { image: "/star_gallery/others/1519112527best2.jpg", category: "others", title: "The Masterclass", description: "Award-winning moments celebrating Bollywood Bites' gastronomic success" }
];

const FILTERS = [
  { id: "all", label: "All Visits" },
  { id: "bollywood", label: "Bollywood Icons" },
  { id: "hollywood", label: "Hollywood Stars" },
  { id: "trucks", label: "Food Trucks" },
  { id: "others", label: "Special Moments" }
];

export default function StarGallery() {
  const galleryRef = useRef(null);
  const filtersRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  // Drag-to-scroll Filter State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Scroll Filter Bar Left/Right
  const scrollFiltersLeft = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollFiltersRight = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  // Drag-to-scroll handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - filtersRef.current.offsetLeft);
    setScrollLeft(filtersRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - filtersRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    filtersRef.current.scrollLeft = scrollLeft - walk;
  };

  // Get active image collection based on filter
  const filteredPhotos = activeFilter === "all" 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(photo => photo.category === activeFilter);

  // Stagger animate gallery items on filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".gallery-item");
      if (items.length === 0) return;

      gsap.killTweensOf(items);
      gsap.set(items, { opacity: 0, y: 30, scale: 0.96 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: "auto"
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [activeFilter]);

  // Sync body overflow with lightbox state
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLightboxOpen]);

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setSlideDirection("left");
    setIsLightboxOpen(true);
  };

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Navigate prev
  const prevPhoto = useCallback(() => {
    setSlideDirection("right");
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
    );
  }, [filteredPhotos.length]);

  // Navigate next
  const nextPhoto = useCallback(() => {
    setSlideDirection("left");
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentPhotoIndex, filteredPhotos, nextPhoto, prevPhoto, closeLightbox]);

  const activePhoto = filteredPhotos[currentPhotoIndex];

  return (
    <>
      <section className="star-gallery-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-bg-overlay" />

        {/* Traditional Mandana Borders */}
        <div className="leaf-border-top" />

        {/* Central Content */}
        <div className="hero-content-wrapper">
          <Copy type="words" animateOnScroll={false} delay={0.8}>
            <span className="hero-tagline" style={{ display: "block" }}>Celebrity Visits & Milestones</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="hero-title">Star Gallery</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="hero-desc">
              A curated chronicle of cinema icons, cultural legends, and memorable 
              moments captured at Bollywood Bites.
            </p>
          </Copy>
        </div>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div className="gallery-filters-container">
            <button className="filter-arrow prev" onClick={scrollFiltersLeft} aria-label="Scroll left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div 
              className="gallery-filters" 
              ref={filtersRef}
              onMouseDown={handleDragStart}
              onMouseLeave={handleDragEnd}
              onMouseUp={handleDragEnd}
              onMouseMove={handleDragMove}
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-tab ${activeFilter === filter.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button className="filter-arrow next" onClick={scrollFiltersRight} aria-label="Scroll right">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="gallery-grid">
            {filteredPhotos.map((item, idx) => (
              <div 
                className="gallery-item" 
                key={`${activeFilter}-${idx}`}
                onClick={() => openLightbox(idx)}
                style={{ cursor: "pointer" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading={idx < 6 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <div className={`lightbox-overlay ${isLightboxOpen ? "active" : ""}`}>
        {/* Close Button */}
        <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isLightboxOpen && activePhoto && (
          <>
            {/* Nav Arrows */}
            <button className="lightbox-nav-btn prev" onClick={prevPhoto} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button className="lightbox-nav-btn next" onClick={nextPhoto} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Main Lightbox Content */}
            <div className="lightbox-main">
              <div className="lightbox-img-wrapper">
                <div key={currentPhotoIndex} className={`lightbox-img-container lightbox-slide-${slideDirection}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="lightbox-img"
                    style={{
                      maxHeight: "70vh",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Photo Info / Caption */}
            <div className="lightbox-info">
              <div className="lightbox-counter">
                {currentPhotoIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </>
        )}
      </div>

      <CTA />
    </>
  );
}
