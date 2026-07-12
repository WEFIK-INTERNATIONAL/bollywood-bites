"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import CTA from "@/components/CTA/CTA";
import { SteppedFrame } from "@/components/Steppedframe/SteppedFrame";
import "./press.css";

gsap.registerPlugin(ScrollTrigger);

const PRESS_ARTICLES = [
  {
    title: "Hollywood On His Menu",
    excerpt: "Chef Sanjay Patel is a former chef for singer Michael Jackson, actors Morgan Freeman and Harrison Ford. Morgan Freeman \"I can't get enough of my mooli parathas\". Chef Sanjay Patel also treats stars like George Clooney, Amitabh Bachchan, Elizabeth Taylor, Kate Hudson and Salman Khan.",
    source: "Wikimapia",
    link: "https://wikimapia.org/33521247/Bollywood-Bites",
    image: "/press/press1.jpeg",
  },
  {
    title: "SUNSET Magazine — Sanjay Patel's Article",
    excerpt: "It's more than a little over-the-top—the entry is plastered with photos of owner Sanjay Patel and the various stars he's catered for. But the chicken Frankie wrap, awash in a mildly spicy tomato-cream sauce, and the convenient location just down the street from UCLA make this a fine place for a quick snack.",
    source: "Sunset Magazine",
    link: "https://sunset.com/food-wine/indian-street-food",
    image: "/press/press2.png",
  },
  {
    title: "Daily Bruin — Flavors of Westwood: Bollywood Bites chef, owner brings vast experience to table",
    excerpt: "Bollywood Bites specializes in Indian cuisine, but its owner and head chef Sanjay Patel's cooking style has drawn from and reached places as disparate as Panama, Bombay and Michael Jackson's Neverland Ranch. Patel said he is especially proud of his chicken tikka masala — roasted chicken in a spicy, creamy orange sauce — and freshly baked naan bread.",
    source: "Daily Bruin",
    link: "https://dailybruin.com/2014/05/06/flavors-of-westwood-bollywood-bites-chef-owner-brings-vast-experience-to-table",
    image: "/press/press3.jpg",
  },
  {
    title: "Introducing Bollywood Bites, Serving Real Indian Street Food With No Fusion",
    excerpt: "Patel's truck is usually found daily at the office-park-adjacent food truck zone in Santa Monica for lunch and he plans to bring another truck to Camarillo. Here's hoping he starts Twittering a little more in the coming weeks so we can more easily track his sumptuous, authentic Indian eats as they cut a path through L.A.",
    source: "Grub Street",
    link: "https://www.grubstreet.com/2011/01/introducing_bollywood_bites_se.html",
    image: "/press/press4.jpg",
  },
  {
    title: "Bollywood Bites in Westwood — Couch Potato Cook",
    excerpt: "Chef Patel worked as the sous chef at the Four Seasons Hotel in Beverly Hills and was even approached to become the personal chef to Michael Jackson — yes, the Michael Jackson. There's a wall inside of Bollywood Bites filled with photos the chef and the celebrities he has cooked for — so cool!",
    source: "Couch Potato Cook",
    link: "http://www.couchpotatocook.com/bollywood-bites-in-westwood-video/",
    video: "https://www.youtube.com/embed/M0q9gciMVww",
  },
  {
    title: "HoopsLA — Bollywood Bites",
    excerpt: "Bollywood Bites (1051 Gayley Ave., Westwood; 310.403.1661) is a new Indian restaurant from the Jackson's former personal chef, Sanjay Patel.",
    source: "HoopsLA",
    link: "https://hooplablog.com/2013/04/bollywood-bites/",
    image: "/press/press6.png",
  },
];

const SNIPPETS = [
  {
    quote: "Over 20 years experience catering to the stars all over the world, Sanjay Patel inspires masterpieces.",
    source: "Street Gourmet",
  },
  {
    quote: "Featured online for the top Indian restaurants. Locations in Los Angeles and Sherman Oaks Highlight the Best India Has to Offer For Dining.",
    source: "Get News",
  },
  {
    quote: "Some of the best Indian food in LA and a great motto: 'cooked from the heart and served with love.'",
    source: "The Culture Trip",
  },
  {
    quote: "First generation ethnic foods dotted the lane from Chef Kimmy Tang's Bistro Mon Cheri and Bollywood Bites to Lusy's Mediterranean.",
    source: "Local Food Eater",
  },
];

export default function PressPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in video cards
      gsap.fromTo(
        ".press-video-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".press-video-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Fade in articles
      gsap.fromTo(
        ".press-card-editorial",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".press-articles-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="press-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Press Background"
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
            <span className="press-hero-tagline" style={{ display: "block" }}>Critically Acclaimed Indian Dining & Chef Sanjay Patel in LA</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="hero-title">Press & Awards</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="hero-desc">
              Explore media coverage, features, and awards celebrating our culinary 
              excellence and history of serving the stars.
            </p>
          </Copy>
        </div>
      </section>

      {/* Videos Section */}
      <section className="press-videos-section">
        <div className="container">
          <div className="press-video-grid">
            <div className="press-video-card">
              <SteppedFrame stepSize="sm" borderColor="gold" innerRing={true} className="press-video-stepped-frame">
                <div className="press-video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/1cgFkAZCUsc"
                    title="As Seen on Asia TV"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              </SteppedFrame>
              <h4>As Seen on Asia TV</h4>
            </div>
            <div className="press-video-card">
              <SteppedFrame stepSize="sm" borderColor="gold" innerRing={true} className="press-video-stepped-frame">
                <div className="press-video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/T4g7awJAwGo"
                    title="Sanjay Patel on Asia TV Segment"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              </SteppedFrame>
              <h4>Asia TV Interview</h4>
            </div>
            <div className="press-video-card">
              <SteppedFrame stepSize="sm" borderColor="gold" innerRing={true} className="press-video-stepped-frame">
                <div className="press-video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/lKfreYpUse4"
                    title="Sanjay Patel NDTV Zaika India Ka"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              </SteppedFrame>
              <h4>NDTV Zaika India Ka</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="press-articles-section">
        {/* Corner Mandanas */}
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-bl" width={200} height={200} alt="" aria-hidden="true" />
        <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-br" width={200} height={200} alt="" aria-hidden="true" />
        <div className="container">
          <div className="press-articles-grid">
            {PRESS_ARTICLES.map((article, idx) => (
              <article className="press-card-editorial" key={idx}>

                {/* Left: Media panel */}
                <div className="pce-media">
                  {article.image ? (
                    <div className="pce-img-wrapper">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                      <div className="pce-img-overlay" />
                    </div>
                  ) : article.video ? (
                    <div className="pce-video-fill">
                      <iframe
                        src={article.video}
                        title={article.title}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>

                {/* Right: Text panel */}
                <div className="pce-body">
                  <span className="pce-source-pill">{article.source}</span>
                  <h3 className="pce-title">{article.title}</h3>
                  <p className="pce-excerpt">&ldquo;{article.excerpt}&rdquo;</p>
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pce-read-link"
                  >
                    Read Full Article
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
