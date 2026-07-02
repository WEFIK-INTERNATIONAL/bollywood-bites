"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HiOutlineSparkles, HiOutlineStar } from "react-icons/hi";
import Copy from "@/components/Copy/Copy";

import "./chef.css";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_EVENTS = [
  {
    year: "Early Inspiration",
    title: "Raised in Bombay",
    desc: "Sanjay was raised in Bombay, India as the oldest boy of six siblings. The son of a hard-working hotel owner and nephew of a successful Bollywood movie producer, he learned the value of hard work early. Helping his mother prepare large family meals sparked his culinary passion, leading him to declare at age 12: 'I want to be a chef one day!'",
  },
  {
    year: "Age 13",
    title: "Indo-Chinese Kitchens",
    desc: "Sanjay began taking cooking classes and working as a cook at an Indo-Chinese restaurant in Bombay, taking his first steps into professional kitchens.",
  },
  {
    year: "Culinary School",
    title: "Global Training in Panama",
    desc: "Moving to Panama with extended family, Sanjay attended culinary school to expand his culinary horizons, mastering Italian, Spanish, American, and Central/South American cuisines.",
  },
  {
    year: "Beverly Hills",
    title: "Sous-Chef at the Four Seasons",
    desc: "Sanjay moved to the United States and secured a position as a sous-chef at the world-renowned Four Seasons in Beverly Hills, perfecting his fine-dining craft.",
  },
  {
    year: "Celebrity Chef",
    title: "Personal Chef to Michael Jackson",
    desc: "Sanjay served as the personal chef to the King of Pop, Michael Jackson, for five years. Jackson fell in love with Sanjay’s unique culinary style and exotic flavors, which Sanjay prepared daily for the superstar and his children.",
  },
  {
    year: "2009",
    title: "Bollywood Bites Food Truck",
    desc: "Sanjay launched his catering business and introduced his first 'Bollywood Bites' Food Truck in Los Angeles to bring gourmet Indian street food to the masses.",
  },
  {
    year: "2012",
    title: "Westwood Restaurant",
    desc: "To keep up with growing demand, Sanjay opened the first brick-and-mortar Bollywood Bites restaurant in Westwood, adjacent to the UCLA campus in Los Angeles.",
  },
  {
    year: "2018",
    title: "Sherman Oaks Expansion",
    desc: "Bollywood Bites expanded further, opening its second location on Ventura Boulevard in Sherman Oaks, California, cementing Chef Sanjay's place in the LA dining scene.",
  },
];

export default function ChefSanjayPatel() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animations
      gsap.fromTo(
        ".chef-luxury-frame",
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".chef-intro-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      // Timeline cards staggered fade-in
      const cards = gsap.utils.toArray(".timeline-item");
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector(".timeline-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          card.querySelector(".timeline-node"),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Philosophy animations
      gsap.fromTo(
        ".chef-philosophy-image",
        { opacity: 0, scale: 0.8, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".chef-philosophy-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      // Video animations
      gsap.fromTo(
        ".video-wrapper",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".chef-video-section",
            start: "top 75%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="chef-page-wrapper" ref={containerRef}>
      {/* Hero Section */}
      <section className="chef-hero-section">
        {/* Rotating mandala watermark background */}
        <Image
          src="/mandana/rounded_mandala/Group 9.svg"
          className="bg-mandala-centered"
          style={{ opacity: 0.08 }}
          width={800}
          height={800}
          priority
          loading="eager"
          alt=""
        />
        <div className="container">
          <span className="chef-hero-tag">MEET CELEBRITY CHEF</span>
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h1 className="chef-hero-title">Sanjay Patel</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.1}>
            <p className="chef-hero-subtitle">
              Hollywood&rsquo;s Prince of the Palate &bull; Master Culinary Storyteller
            </p>
          </Copy>
        </div>
      </section>

      {/* Intro Narrative Section */}
      <section className="chef-intro-section">
        <div className="container">
          <div className="chef-intro-grid">
            <div className="chef-intro-text">
              <span className="chef-section-tag">THE INSPIRATION</span>
              <h2 className="chef-section-title">Destined for Hollywood, Raised in Bombay</h2>
              <p className="chef-bio-p">
                raised in Bombay, India. Son of a hard-working hotel owner and the nephew of a successful Bollywood movie producer, Sanjay learned at an early age, the value of hard work. The oldest boy of six siblings, Sanjay relished the time he spent with his mother, helping her prepare large meals for their extended family to enjoy after a long day&rsquo;s work.
              </p>
              <div className="chef-bio-quote">
                <p>&ldquo;I want to be a chef one day!&rdquo;</p>
                <cite>Sanjay Patel, Age 12</cite>
              </div>
              <p className="chef-bio-p">
                Every meal prepared by his mother was crafted with great pride, love, and decadent detail. Sanjay noticed the immense gratitude and joy shared around the table, leading him to declare his life&rsquo;s dream before he had even entered a professional kitchen.
              </p>
            </div>

            <div className="chef-intro-image-wrapper">
              <div className="chef-luxury-frame">
                <Image
                  src="/home/chef-cooking.png"
                  alt="Chef Sanjay Patel Cooking"
                  fill
                  sizes="(max-width: 991px) 100vw, 480px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Timeline Section */}
      <section className="chef-timeline-section">
        {/* Repeating mandana leaf border */}
        <div className="leaf-border-top" />
        <div className="leaf-border-bottom" />
        
        <div className="container">
          <div className="timeline-header">
            <span className="chef-section-tag">THE CHRONICLES</span>
            <h2 className="chef-section-title">A Journey of Flavors</h2>
            <p className="chef-bio-p" style={{ fontSize: "1.1rem" }}>
              From the bustling food streets of Bombay to personal dining rooms of global icons and award-winning restaurant expansions.
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />

            {TIMELINE_EVENTS.map((event, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-node" />
                <div className="timeline-card">
                  <span className="timeline-year">{event.year}</span>
                  <h3 className="timeline-card-title">{event.title}</h3>
                  <p className="timeline-card-desc">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Spotlight Section */}
      <section className="chef-video-section">
        <div className="container">
          <div className="timeline-header">
            <span className="chef-section-tag">FEATURE SPOTLIGHT</span>
            <h2 className="chef-section-title">Chef Sanjay In Action</h2>
            <p className="chef-bio-p" style={{ fontSize: "1.1rem" }}>
              Watch Chef Sanjay prepare masterpieces and share his culinary journey.
            </p>
          </div>

          <div className="video-wrapper">
            <Image
              src="/home/chef-cooking.png"
              alt="Chef Sanjay Patel Video Poster"
              fill
              sizes="(max-width: 991px) 100vw, 860px"
              style={{ objectFit: "cover", zIndex: 0 }}
              priority
            />
            <iframe
              src="https://www.youtube.com/embed/lKfreYpUse4"
              title="Chef Sanjay Patel - Bollywood Bites"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ zIndex: 1 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Philosophy & Family Section */}
      <section className="chef-philosophy-section">
        <div className="container">
          <div className="chef-philosophy-grid">
            <div className="chef-philosophy-image">
              <div className="chef-philosophy-image-inner">
                <Image
                  src="/chefs/avatar1.jpg"
                  alt="Chef Sanjay Patel portrait"
                  fill
                  sizes="(max-width: 991px) 100vw, 440px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="chef-philosophy-content">
              <div className="chef-philosophy-header">
                <span className="chef-section-tag">CULINARY PHILOSOPHY</span>
                <h3>Prepared to Perfection, Served with Love</h3>
              </div>

              <p className="chef-philosophy-body">
                The success of Chef Sanjay&rsquo;s businesses is built upon his ability to curate amazing, authentic, and creative cuisine. His menus capture the essence of traditional techniques updated with high-end, contemporary presentation.
              </p>

              <div className="chef-awards-badge">
                <div className="chef-award-icon">
                  <HiOutlineStar />
                </div>
                <div className="chef-award-text">
                  <h4>VOTED BEST INDIAN FOOD</h4>
                  <p>Voted &ldquo;Best Indian Food&rdquo; 5 years in a row. Sanjay&rsquo;s food speaks for itself.</p>
                </div>
              </div>

              <p className="chef-philosophy-body">
                When Chef Sanjay is not greeting customers in the dining room or cooking up a creative masterpiece in the kitchen, he cherishes the time spent with his lovely wife and two young children.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
