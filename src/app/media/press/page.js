"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./press.css";

gsap.registerPlugin(ScrollTrigger);

const PRESS_RELEASES = [
  {
    title: "Bollywood Bites Customers Welcome Celebrity Chef Sanjay’s New Vegan Entrées Along with Live Stand-up Comedy and Karaoke at his Sherman Oaks, California Restaurant",
    excerpt: "Customers enjoy great Indian food and a new destination for entertainment on Ventura Boulevard in Sherman Oaks.",
    date: "SEPTEMBER 2018",
    source: "Sherman Oaks Press Release",
    link: "https://www.thebollywoodbites.com/wp-content/uploads/2018/09/Bollywood-Bites-September-2018-Press-Release.pdf",
  },
  {
    title: "Michael Jackson’s Personal Chef, Sanjay Patel, Unveils “Secret” MJ Menu with Michael’s Favorite Dishes at His Sherman Oaks Bollywood Bites Restaurant on MJ’s Birthday",
    excerpt: "MJ Fans to Partake of Michael Jackson’s Favorite Meals Prepared by His Personal Chef.",
    date: "AUGUST 2018",
    source: "UCLA Westwood Press Release",
    link: "https://www.thebollywoodbites.com/wp-content/uploads/2018/09/Chef-Sanjay-MJ-Menu-Day-Press-Release-8-6-18.pdf",
  },
  {
    title: "Celebrity Chef Sanjay Patel Spices Up Indian Cuisine with 20+ Vegan, Gluten-Free and Non-Dairy Entrées PLUS entertainment, at his Sherman Oaks, California Restaurant",
    excerpt: "Chef Sanjay launches new menu with health-conscious specialties, along with cooking classes and entertainment.",
    date: "AUGUST 2018",
    source: "Ventura Blvd Press Release",
    link: "https://www.thebollywoodbites.com/wp-content/uploads/2018/09/Bollywood-Bites-August-2018-Press-Release.pdf",
  },
];

const PUBLICATIONS = [
  {
    title: "Daily Bruin: Flavors of Westwood: Bollywood Bites head chef brings vast experience to table",
    excerpt: "Bollywood Bites head chef Sanjay Patel’s cooking style has drawn from Bombay, Panama, and Michael Jackson’s Neverland Ranch. Patel said he is especially proud of his chicken tikka masala – roasted chicken in a creamy orange sauce – and fresh clay-oven baked naan.",
    source: "Daily Bruin",
    link: "http://dailybruin.com/2014/05/06/flavors-of-westwood-bollywood-bites-chef-owner-brings-vast-experience-to-table/",
  },
  {
    title: "SUNSET Magazine: Sanjay Patel's Article on Indian Street Food",
    excerpt: "The website proclaims that Patel inspires with culinary masterpieces. But the chicken Frankie wrap, awash in a mildly spicy tomato-cream sauce, and the convenient location just down the street from UCLA make this a fine place for a quick snack.",
    source: "Sunset Magazine",
    link: "https://www.sunset.com/food-wine/indian-street-food",
  },
  {
    title: "Introducing Bollywood Bites: Serving Real Indian Street Food With No Fusion",
    excerpt: "Patel's food truck is usually found daily at the office-park-adjacent zone in Santa Monica for lunch and he plans to bring another truck to Camarillo. Here's hoping he starts Twittering more so we can easily track his sumptuous, authentic Indian eats.",
    source: "Grub Street",
    link: "http://www.grubstreet.com/2011/01/introducing_bollywood_bites_se.html",
  },
  {
    title: "Hollywood On His Menu: Wikimapia Profile",
    excerpt: "Chef Sanjay Patel is a former chef for singer Michael Jackson, actors Morgan Freeman and Harrison Ford. Morgan Freeman: 'I can’t get enough of my mooli parathas.' Chef Sanjay Patel also treats stars like George Clooney, Kate Hudson, and Salman Khan.",
    source: "Wikimapia",
    link: "http://wikimapia.org/33521247/Bollywood-Bites",
  },
  {
    title: "Bollywood Bites in Westwood: Coach Potato Cook Profile",
    excerpt: "Chef Patel worked as the sous chef at the Four Seasons Hotel in Beverly Hills and was even approached to become the personal chef to Michael Jackson. There's a wall inside Bollywood Bites filled with photos of the chef and celebrities.",
    source: "Couch Potato Cook",
    link: "http://www.couchpotatocook.com/bollywood-bites-in-westwood-video/",
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

      // Fade in articles columns
      gsap.fromTo(
        ".press-column",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".press-articles-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Fade in snippets cards
      gsap.fromTo(
        ".press-snippet-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".press-snippets-grid",
            start: "top 85%",
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
        <div className="bg-mandala-centered" style={{ opacity: 0.03 }} />
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.35}>
            <h1>Press & Awards</h1>
          </Copy>
          <p className="press-hero-tagline">Critically Acclaimed Indian Dining & Chef Sanjay Patel in LA</p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="press-videos-section">
        <div className="container">
          <div className="press-section-title">
            <h2>As Seen on Television</h2>
            <p>Watch Chef Sanjay Patel share his passion for Indian cuisine on national and international broadcasts.</p>
          </div>
          <div className="press-video-grid">
            <div className="press-video-card">
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
              <h4>As Seen on Asia TV</h4>
            </div>
            <div className="press-video-card">
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
              <h4>Asia TV Interview</h4>
            </div>
            <div className="press-video-card">
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
              <h4>NDTV Zaika India Ka</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="press-articles-section">
        <div className="container">
          <div className="press-articles-grid">
            {/* Press Releases Column */}
            <div className="press-column">
              <h3>Official Press Releases</h3>
              {PRESS_RELEASES.map((article, idx) => (
                <div className="press-card" key={idx}>
                  <h4>
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </Link>
                  </h4>
                  <p>&ldquo;{article.excerpt}&rdquo;</p>
                  <div className="meta">
                    <span className="source">{article.source}</span>
                    <span className="date">{article.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Publications Column */}
            <div className="press-column">
              <h3>Featured Publications</h3>
              {PUBLICATIONS.map((article, idx) => (
                <div className="press-card" key={idx}>
                  <h4>
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </Link>
                  </h4>
                  <p>&ldquo;{article.excerpt}&rdquo;</p>
                  <div className="meta">
                    <span className="source">{article.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Snippets Section */}
      <section className="press-snippets-section">
        <div className="container">
          <div className="press-section-title">
            <h2>Media Accolades</h2>
            <p>What culinary guides and local food critics are saying about Bollywood Bites.</p>
          </div>
          <div className="press-snippets-grid">
            {SNIPPETS.map((snippet, idx) => (
              <div className="press-snippet-card" key={idx}>
                <p>&ldquo;{snippet.quote}&rdquo;</p>
                <span className="author">{snippet.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
