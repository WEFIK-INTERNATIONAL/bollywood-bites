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
  HiMinus,
  HiChevronDown
} from "react-icons/hi";
import "./catering-trays.css";

gsap.registerPlugin(ScrollTrigger);

const CATERING_MENU_DATA = [
  {
    category: "Salads & Soups",
    items: [
      { name: "Fresh Green Salad", large: "$95.00", medium: "$49.00", desc: "Crisp garden greens served with premium house dressings." },
      { name: "Lentil Soup", large: "$110.00", medium: "$65.00", desc: "Authentic, delicately spiced yellow lentil broth." },
      { name: "Mix Vegetable Soup", large: "$160.00", medium: "$89.00", desc: "Rich blend of fresh seasonal vegetables slow-simmered with Indian herbs." },
      { name: "Chicken Soup", large: "$170.00", medium: "$95.00", desc: "Comforting Indian style spiced chicken broth." }
    ]
  },
  {
    category: "Chicken Entrées",
    items: [
      { name: "Chicken Tikka Masala", large: "$295.00", medium: "$175.95", desc: "Flame-grilled tandoori chicken simmered in our signature rich creamy tomato-butter sauce." },
      { name: "Butter Chicken", large: "$305.00", medium: "$179.95", desc: "Tender chicken simmered in rich velvety creamy tomato and butter gravy." },
      { name: "Chicken Korma", large: "$305.00", medium: "$179.95", desc: "Boneless chicken simmered in mild cashew paste, yogurt, and aromatic spices." },
      { name: "Tandoori Chicken", large: "$269.00", medium: "$169.95", desc: "Bone-in chicken marinated in yogurt & tandoori spices, charcoal-baked to perfection." },
      { name: "Chicken Curry", large: "$295.00", medium: "$175.95", desc: "Traditional home style chicken curry slow-cooked with fresh ginger, garlic, and onions." },
      { name: "Chicken Saag", large: "$305.00", medium: "$179.95", desc: "Tender chicken chunks cooked with fresh spinach, cream, and ground masalas." },
      { name: "Malai Chicken", large: "$305.00", medium: "$179.95", desc: "Creamy, mild chicken kebabs marinated in cream cheese, yogurt, and green cardamom." },
      { name: "Chicken Tikka", large: "$305.99", medium: "$179.95", desc: "Boneless tandoori chicken chunks marinated in spiced yogurt and grilled." }
    ]
  },
  {
    category: "Lamb Entrées",
    items: [
      { name: "Rogan Josh", large: "$319.99", medium: "$179.95", desc: "Tender lamb cooked in classic Kashmiri curry sauce infused with fennel and ginger." },
      { name: "Lamb Curry", large: "$319.99", medium: "$179.95", desc: "Hearty lamb shoulder cooked slowly in onion-tomato gravy with freshly ground spices." },
      { name: "Lamb Korma", large: "$319.99", medium: "$179.95", desc: "Rich and mild lamb curry simmered in creamy cashew nut gravy." },
      { name: "Lamb Vindaloo", large: "$309.99", medium: "$169.95", desc: "Spicy lamb and potato preparation cooked in vinegar-infused vindaloo paste." },
      { name: "Lamb Saag", large: "$319.99", medium: "$179.95", desc: "Succulent lamb chunks cooked in spiced fresh spinach puree." },
      { name: "Lamb Tikka", large: "$319.99", medium: "$179.95", desc: "Boneless lamb marinated in spices and grilled in clay oven." }
    ]
  },
  {
    category: "Seafood Entrées",
    items: [
      { name: "Grilled Fish", large: "$319.99", medium: "$189.00", desc: "Fresh fish fillets seasoned with herbs and grilled." },
      { name: "Tandoori Shrimp", large: "$319.99", medium: "$189.00", desc: "Jumbo shrimp marinated in tandoori paste and baked in clay oven." },
      { name: "Goa Coconut Fish Curry", large: "$319.99", medium: "$189.00", desc: "Fish fillets simmered in rich coconut milk curry with mustard seeds." },
      { name: "Goa Coconut Shrimp Curry", large: "$319.99", medium: "$189.00", desc: "Plump shrimp cooked in traditional Goan style coconut curry." },
      { name: "Tandoori Fish", large: "$309.99", medium: "$189.00", desc: "Clay oven baked fish marinated in spiced yogurt." },
      { name: "Fish Masala", large: "$309.99", medium: "$189.00", desc: "Fish cooked in spicy onion-tomato gravy with bell peppers." },
      { name: "Shrimp Masala", large: "$309.99", medium: "$189.00", desc: "Shrimp stir-fried in thick, rich masala gravy." }
    ]
  },
  {
    category: "Vegetarian Entrées",
    items: [
      { name: "Aloo Gobhi (Cauliflower Potato)", large: "$179.99", medium: "$105.99", desc: "Fresh cauliflower florets and baby potatoes dry sautéed with turmeric and cumin." },
      { name: "Paneer Masala (Indian Cheese)", large: "$270.99", medium: "$169.99", desc: "Cottage cheese cubes cooked in robust onion-tomato masala." },
      { name: "Mix Vegetable Korma", large: "$215.99", medium: "$130.99", desc: "Seasonal mixed veggies simmered in mild, creamy cashew gravy." },
      { name: "Baigan Bharta (Eggplant)", large: "$270.99", medium: "$165.99", desc: "Smoked eggplant mashed and cooked with green peas, onions, and tomatoes." },
      { name: "Malai Kofta", large: "$305.99", medium: "$180.00", desc: "Cheese and potato dumplings simmered in rich cashew and cream sauce." },
      { name: "Aloo Mattar", large: "$230.00", medium: "$125.99", desc: "Potatoes and green peas cooked in warm spiced gravy." },
      { name: "Saag Paneer (Spinach & Cheese)", large: "$270.00", medium: "$165.00", desc: "Cottage cheese chunks cooked in spiced fresh spinach puree." },
      { name: "Chana Masala (Chickpeas)", large: "$210.00", medium: "$129.99", desc: "Tangy chickpea curry slow-cooked with fresh pomegranate powder." },
      { name: "Dal Makhani (Lentils)", large: "$199.99", medium: "$115.99", desc: "Rich black lentils slow-cooked overnight with cream and butter." },
      { name: "Bhindi Masala", large: "$270.00", medium: "$165.00", desc: "Fresh baby okra stir-fried with onions, tomatoes, and dry masalas." },
      { name: "Kadai Paneer", large: "$280.99", medium: "$180.00", desc: "Cottage cheese stir-fried with bell peppers in spicy kadai sauce." }
    ]
  },
  {
    category: "Rice & Biryani",
    items: [
      { name: "Plain Basmati Rice", large: "$155.00", medium: "$85.00", desc: "Aromatic, long-grain steamed Basmati rice." },
      { name: "Zeera Basmati Rice Pulov", large: "$159.99", medium: "$90.00", desc: "Fragrant Basmati rice tempered with cumin seeds and green peas." },
      { name: "Veggie Biryani", large: "$195.99", medium: "$109.99", desc: "Layered Basmati rice cooked with spiced seasonal vegetables and mint." },
      { name: "Hyderabadi Chicken Biryani", large: "$295.99", medium: "$175.99", desc: "Traditional layered chicken biryani infused with saffron." },
      { name: "Lamb Biryani", large: "$305.99", medium: "$180.00", desc: "Slow-cooked fragrant rice with tender lamb cubes." },
      { name: "Shrimp Biryani", large: "$319.99", medium: "$189.00", desc: "Delicate rice layers baked with seasoned jumbo shrimp." }
    ]
  },
  {
    category: "Indian Breads",
    items: [
      { name: "Plain Naan", large: "$79.99 (25 Pcs)", medium: "$59.49 (18 Pcs)", regular: "$48.99 (12 Pcs)", desc: "Freshly baked classic leavened clay oven flatbread." },
      { name: "Butter Naan", large: "$79.99 (20 Pcs)", medium: "$65.99 (15 Pcs)", regular: "$55.99 (12 Pcs)", desc: "Freshly baked clay oven flatbread glazed with butter." },
      { name: "Garlic Naan", large: "$89.99 (20 Pcs)", medium: "$69.99 (15 Pcs)", regular: "$59.99 (12 Pcs)", desc: "Fresh clay oven flatbread topped with minced garlic and cilantro." },
      { name: "Spinach Naan", large: "$99.99 (20 Pcs)", medium: "$55.99 (10 Pcs)", desc: "Clay oven flatbread stuffed with spiced fresh spinach." },
      { name: "Peshwari Naan", large: "$120.99 (20 Pcs)", medium: "$65.99 (10 Pcs)", desc: "Sweet flatbread stuffed with almonds, cashews, raisins, and coconut." },
      { name: "Plain Paratha", large: "$99.99 (20 Pcs)", medium: "$65.99 (10 Pcs)", desc: "Layered whole wheat pan-fried flatbread." },
      { name: "Gobhi Paratha", large: "$109.99 (20 Pcs)", medium: "$69.99 (10 Pcs)", desc: "Whole wheat flatbread stuffed with spiced shredded cauliflower." },
      { name: "Aloo Paratha", large: "$125.99 (20 Pcs)", medium: "$76.99 (10 Pcs)", desc: "Whole wheat flatbread stuffed with spiced mashed potatoes." },
      { name: "Lacha Delhi Paratha", large: "$125.99 (20 Pcs)", medium: "$79.99 (10 Pcs)", desc: "Classic layered whole wheat flatbread." },
      { name: "Onion Kulcha", large: "$125.99 (20 Pcs)", medium: "$75.99 (10 Pcs)", desc: "Soft flatbread stuffed with spiced minced red onions." },
      { name: "Cheese Naan", large: "$109.99 (20 Pcs)", medium: "$69.99 (10 Pcs)", desc: "Clay oven flatbread stuffed with premium mozzarella cheese." },
      { name: "Keema Naan", large: "$130.99 (20 Pcs)", medium: "$79.99 (10 Pcs)", desc: "Clay oven flatbread stuffed with spiced minced chicken/lamb." },
      { name: "Roti", large: "$109.99 (20 Pcs)", medium: "$69.99 (10 Pcs)", desc: "Whole wheat clay oven flatbread." }
    ]
  },
  {
    category: "Street Food (Price Per Item)",
    items: [
      { name: "Kathi Roll (Veggie)", price: "$15.99", desc: "Spiced vegetable fillings rolled in hot flatbread." },
      { name: "Kathi Roll (Chicken)", price: "$14.99", desc: "Spiced tandoori chicken cubes rolled in flatbread." },
      { name: "Kathi Roll (Lamb)", price: "$16.99", desc: "Spiced tandoori lamb cubes rolled in flatbread." },
      { name: "Frankie Wrap (Veggie)", price: "$15.99", desc: "Indian street wrap filled with potato cutlet and chutney." },
      { name: "Frankie Wrap (Chicken)", price: "$17.99", desc: "Indian street wrap filled with spicy chicken." },
      { name: "Frankie Wrap (Lamb)", price: "$17.99", desc: "Indian street wrap filled with masala lamb." },
      { name: "Naan Wrap (Veggie)", price: "$14.99", desc: "Spiced seasonal vegetables wrapped in fresh clay oven naan." },
      { name: "Naan Wrap (Chicken)", price: "$14.99", desc: "Spiced chicken tikka wrapped in fresh clay oven naan." },
      { name: "Naan Wrap (Lamb)", price: "$15.99", desc: "Spiced lamb cubes wrapped in fresh clay oven naan." },
      { name: "Delhi Pav Bhaji", price: "$17.50", desc: "Spiced mashed vegetable curry served with soft buttered buns." },
      { name: "Delhi Keema Pav (Chicken)", price: "$17.50", desc: "Spiced minced chicken served with soft buttered buns." },
      { name: "Delhi Keema Pav (Lamb)", price: "$18.50", desc: "Spiced minced lamb served with soft buttered buns." },
      { name: "Bhel Puri", price: "$12.50", desc: "Puffed rice, crisp savory wafers, tossed with tamarind chutney." },
      { name: "Sev Puri", price: "$12.50", desc: "Crisp puris topped with potatoes, onions, sev, and chutney." },
      { name: "Pani Puri", price: "$12.50", desc: "Crisp hollow puris served with spiced mint water and potato fill." }
    ]
  },
  {
    category: "Sides, Desserts & Drinks",
    items: [
      { name: "Samosa", large: "$145.99 (50 Pcs)", medium: "$85.99 (25 Pcs)", desc: "Crisp potato-pea filled turnovers." },
      { name: "Veggie Pakoras", large: "$145.99", medium: "$85.99", desc: "Crisp mixed vegetable fritters." },
      { name: "Chicken Tikka Nuggets", large: "$319.99", medium: "$169.99", desc: "Spiced fried chicken breast nuggets." },
      { name: "Shrimp Tikka Nuggets", large: "$319.99", medium: "$169.99", desc: "Spiced fried shrimp nuggets." },
      { name: "Fish Pakora", large: "$319.99", medium: "$185.00", desc: "Crisp, spiced chickpea-battered fish fillets." },
      { name: "Samosa Chaat", large: "$185.99", medium: "$109.99", desc: "Crushed samosas topped with hot chickpeas, yogurt, and sweet chutney." },
      { name: "Aloo Tikki Chaat", large: "$175.99", medium: "$99.99", desc: "Crisp potato patties topped with chickpeas and yogurt." },
      { name: "Raita (Yogurt)", large: "$79.99", medium: "$59.99", desc: "Cool whipped yogurt with grated cucumbers and roasted cumin." },
      { name: "Papadum", large: "$79.99", medium: "$69.99", desc: "Crisp roasted lentil flatbreads." },
      { name: "Pickle", large: "$79.99", medium: "$59.99", desc: "Spicy and tangy Indian pickles." },
      { name: "Gulab Jamun (Dessert)", large: "$149.99 (50 Pcs)", medium: "$89.99 (25 Pcs)", desc: "Golden milk-solid dumplings soaked in warm rose cardamom syrup." },
      { name: "Mango Lassi", price: "$6.75 per glass", desc: "Cool yogurt drink blended with sweet alphonso mango." },
      { name: "Salty Lassi", price: "$5.99 per glass", desc: "Traditional salted yogurt drink tempered with roasted cumin." },
      { name: "Sweet Lassi", price: "$5.99 per glass", desc: "Traditional sweet and frothy yogurt drink." },
      { name: "Masala Chai", price: "$6.50 per glass", desc: "Brewed black tea with aromatic Indian spices and milk." }
    ]
  }
];

export default function CateringTrays() {
  const pageRef = useRef(null);
  const contentSectionRef = useRef(null);
  const [activeAccordion, setActiveAccordion] = useState(1); // Set Chicken Entrees open by default
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

  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? -1 : index));
  };

  // Scroll animations for content blocks
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".catering-accordion-item, .corporate-info-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
    <div ref={pageRef} className="catering-trays-page">
      {/* Hero Section */}
      <section className="catering-hero">
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
            <h1>Catering Trays</h1>
          </Copy>
          
          <Copy type="lines" animateOnScroll={false} delay={0.15}>
            <p className="catering-hero-tagline">Quality Indian Food In The Spotlight</p>
          </Copy>

          <p className="catering-hero-desc">
            Define class and elegance at your next event. We offer professional grade catering trays featuring authentic Indian curries, street food chaats, and tandoori breads.
          </p>

          {/* Action CTAs */}
          <div className="catering-ctas-row">
            <Button 
              href="javascript:;" 
              className="catering-cta-btn catering-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="catering-cta-btn catering-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="catering-cta-btn catering-btn-tertiary"
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
      <section className="catering-content-section" ref={contentSectionRef}>
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />

        <div className="container">
          <div className="catering-two-col-layout">
            
            {/* Left Column: Menu Display */}
            <div className="catering-menu-display">
              <div className="catering-menu-section-header">
                <h2>Catering Tray Menu</h2>
                <p className="section-desc">
                  Our Catering Trays define class and elegance. Salads, soups, and traditional favorites are prepared with quality ingredients and authentic spices. Quality is our watchword—we would never go below your expectations. You can also order online!
                </p>
              </div>

              {/* Sizing Guides */}
              <div className="catering-sizes-banner">
                <div className="size-info-block">
                  <h4>Medium Trays</h4>
                  <p>Perfect for intimate gatherings, serving approximately <strong>10–12 guests</strong>.</p>
                </div>
                <div className="size-info-block">
                  <h4>Large Trays</h4>
                  <p>Ideal for corporate events and parties, serving approximately <strong>20–25 guests</strong>.</p>
                </div>
              </div>

              {/* Accordion List */}
              <div className="catering-accordions-wrapper">
                {CATERING_MENU_DATA.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className={`catering-accordion-item ${activeAccordion === idx ? "active" : ""}`}
                  >
                    <button 
                      className="catering-accordion-trigger"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={activeAccordion === idx}
                    >
                      <h3>{cat.category}</h3>
                      <HiChevronDown className="accordion-arrow" />
                    </button>

                    <div className="catering-accordion-content">
                      <div className="accordion-inner-content">
                        <div className="catering-items-list">
                          {cat.items.map((item, itemIdx) => (
                            <div className="catering-tray-item" key={itemIdx}>
                              <div className="tray-item-top">
                                <span className="tray-item-name">{item.name}</span>
                                <span className="tray-item-pricing">
                                  {item.large && (
                                    <>
                                      {item.large}<span>Large</span>
                                    </>
                                  )}
                                  {item.medium && (
                                    <>
                                      {item.large && <span style={{ margin: "0 0.5rem" }}>|</span>}
                                      {item.medium}<span>Med</span>
                                    </>
                                  )}
                                  {item.price && (
                                    <span>{item.price}</span>
                                  )}
                                </span>
                              </div>
                              {item.desc && <p className="tray-item-description">{item.desc}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Corporate details and pop-ups */}
              <div className="catering-corporate-blocks">
                <div className="corporate-info-card">
                  <h4>Catering Individual Combos & Pop-Ups</h4>
                  <p>
                    Reserve Bollywood Bites restaurant for your corporate lunch or dinner meetings. Capacity of 65+ guests. Enjoy full beer, wine, and exotic cocktails paired with Bollywood music and movies.
                  </p>
                  <p>
                    Pop-Ups let employees purchase their own lunches (we accept cash and all major credit cards). Pop-Up to be booked 24 hours in advance to check availability.
                  </p>
                  <div className="corporate-contact-details">
                    Call: (818) 235-3291 | Email: info@thebollywoodbites.com
                  </div>
                </div>

                <div className="corporate-info-card">
                  <h4>Additional Information</h4>
                  <ul className="additional-bullet-list">
                    <li>Our corporate delivery minimum is $50 with free delivery within 2 miles from the restaurant.</li>
                    <li>Corporate Dine-In reservations must be made in advance (Call: 818-235-3291 / 310-824-1046).</li>
                    <li>Invite the BOLLYWOOD BITES Food Truck to your company to serve lunch/dinner events (can serve small & big crowds up to 3000+ guests; minimum for truck booking is $850).</li>
                    <li>Weekend All-You-Can-Eat Buffet at Bollywood Bites Restaurant: Saturdays & Sundays 12:00 PM – 3:00 PM.</li>
                    <li>For Special Events, Chef’s Specials, Coupons, Deals, and Recipes, subscribe at info@thebollywoodbites.com or follow us on Facebook (@Bollywood Bites Restaurant Westwood Village).</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Flyer Image */}
            <div className="catering-sticky-sidebar">
              <div 
                className="catering-menu-frame"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full screen"
              >
                <div className="frame-overlay">
                  <span className="expand-text">Click to View Full Screen</span>
                </div>
                <Image
                  src="/menu/menu/catering.jpg"
                  alt="Bollywood Bites Catering Trays Menu Flyer"
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
        <div className="catering-lightbox">
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <button className="close-btn" onClick={closeLightbox} title="Close Menu (Esc)">
            <HiX />
          </button>

          <div className="lightbox-nav-top">
            <span className="lightbox-title">
              Bollywood Bites Catering Trays
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
                src="/menu/menu/catering.jpg"
                alt="Catering Trays Menu Card"
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
      <section className="catering-footer-ctas">
        <div className="container">
          <h3 className="section-title">Ready to Plan Your Catering?</h3>
          <p className="section-subtitle">Order trays online directly, reserve space for corporate meetings, or hire our famous food truck.</p>
          <div className="catering-ctas-row">
            <Button 
              href="javascript:;" 
              className="catering-cta-btn catering-btn-primary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
            >
              Order Online
            </Button>

            <Button 
              href="javascript:;" 
              className="catering-cta-btn catering-btn-secondary"
              data-glf-cuid="a7270cd0-483e-4bb9-9097-6c78af888686" 
              data-glf-ruid="4e577927-f19b-48d5-bae9-918577bd4a09" 
              data-glf-reservation="true"
            >
              Make Reservation
            </Button>

            <Button 
              href="/services/catering" 
              className="catering-cta-btn catering-btn-tertiary"
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
