"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import Copy from "@/components/Copy/Copy";
import DiningMenu from "@/components/DiningMenu/DiningMenu";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Button from "@/components/Button/Button";

import "./home.css";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE_COUNT = 6;

export default function Home() {
  const aboutSectionRef = useRef(null);
  const [isInitialPageLoad] = useState(() => isInitialLoad);
  const [preloaderDelay, setPreloaderDelay] = useState(
    isInitialPageLoad ? 9999 : 0,
  );

  const handlePreloaderEnter = () => {
    if (isInitialPageLoad) setPreloaderDelay(0.2);
  };

  useEffect(() => {
    if (isInitialPageLoad && preloaderDelay === 9999) return;

    gsap.fromTo(
      ".hero-buttons-container",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: isInitialPageLoad ? 0.7 : 1.35,
      }
    );
  }, [preloaderDelay, isInitialPageLoad]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const aboutImages = gsap.utils.toArray(".about-img");

      /* scale each about image in and out as it scrolls through the viewport */
      aboutImages.forEach((image) => {
        const imageScaleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        imageScaleTimeline
          .fromTo(image, { scale: 0.5 }, { scale: 1.25, ease: "none" })
          .to(image, { scale: 0.5, ease: "none" });
      });

      /* fade out the about header as the image gallery scrolls away */
      gsap.to(".about-header h3", {
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".about-imgs",
          start: "bottom bottom",
          end: "bottom 30%",
          scrub: true,
        },
      });

      /* fade and slide up the chef framed photo and button on scroll */
      gsap.fromTo(
        ".chef-photo-frame",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-chef",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".home-chef-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-chef",
            start: "top 75%",
            once: true,
          },
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Preloader onEnter={handlePreloaderEnter} />

      <section className="hero">
        <div className="leaf-border-bottom" />
        <Image src="/mandana/rounded_mandala/Group 9.svg" className="bg-mandala-centered" style={{ opacity: 0.08 }} width={800} height={800} priority loading="eager" alt="" />
        <div className="hero-img" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Image src="/home/hero.jpg" fill priority sizes="100vw" style={{ objectFit: "cover" }} alt="" />
        </div>

        <div className="container">
          <Copy
            type="words"
            animateOnScroll={false}
            delay={isInitialPageLoad ? preloaderDelay : 0.85}
          >
            <h1>
              Bollywood <br /> Bites
            </h1>
          </Copy>

          <div className="hero-buttons-container">
            <Button href="/menu" className="hero-btn hero-btn-primary">
              Order Online
            </Button>
            <Button href="/reservation" className="hero-btn hero-btn-secondary">
              Book a Table
            </Button>
          </div>

          <div className="section-footer">
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={isInitialPageLoad ? preloaderDelay + 0.15 : 1.1}
            >
              <p className="sm">Est. 2026</p>
            </Copy>
            <Copy
              type="lines"
              animateOnScroll={false}
              delay={isInitialPageLoad ? preloaderDelay + 0.25 : 1.2}
            >
              <p className="sm">London, UK</p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="about" ref={aboutSectionRef}>
        <div className="about-header">
          <div className="container">
            <Copy type="lines">
              <h3>
                A space built on rich spices and luxury, where heritage, warmth,
                and cinematic Indian flair create an unforgettable journey.
              </h3>
            </Copy>

            <div className="section-footer">
              <Copy type="lines" trigger=".about" start="top 50%" delay={0.5}>
                <p className="sm">Royal Indian</p>
              </Copy>
              <Copy type="lines" trigger=".about" start="top 50%" delay={0.6}>
                <p className="sm">Heritage Lounge</p>
              </Copy>
            </div>
          </div>
        </div>

        <div className="about-imgs">
          <div className="container">
            {Array.from({ length: ABOUT_IMAGE_COUNT }, (_, index) => (
              <div
                key={index + 1}
                className="about-img"
                id={`about-img-${index + 1}`}
                style={{ position: "absolute" }}
              >
                <Image src={`/home/about-${index + 1}.jpg`} fill sizes="(max-width: 768px) 30vw, 15vw" style={{ objectFit: "cover" }} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="home-chef">
        {/* background rotating watermark mandala */}
        <Image src="/mandana/rounded_mandala/Group 9.svg" className="bg-mandala-centered" style={{ opacity: 0.05 }} width={1000} height={1000} alt="" />

        <div className="container">
          <div className="home-chef-wrapper">
            <div className="home-chef-image-container">
              <div className="chef-photo-frame">
                {/* Oxford Crossover Border lines */}
                <div className="oxford-line line-top" />
                <div className="oxford-line line-bottom" />
                <div className="oxford-line line-left" />
                <div className="oxford-line line-right" />

                <div className="home-chef-image">
                  <Image
                    src="/chefs/avatar1.jpg"
                    alt="Chef Sanjay Patel"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            <div className="home-chef-content">
              <Copy type="lines" trigger=".home-chef" start="top 75%">
                <p className="mono home-chef-tag">Hollywood&rsquo;s Prince of the Palate</p>
                <h3 className="home-chef-title">Chef Sanjay Patel</h3>
                <p className="home-chef-text">
                  Dubbed &ldquo;Hollywood&rsquo;s Prince of the Palate,&rdquo; Chef Sanjay is an award-winning chef who captivates his clients with his amazing, authentic and creative cuisine&mdash;prepared to perfection and served with love. Former sous chef at the Four Seasons Beverly Hills Hotel, personal chef to the &ldquo;King of Pop,&rdquo; Michael Jackson, and a private chef for numerous A-list celebrities, Chef Sanjay is a global culinary genius professionally trained in traditional Indian, Indo-Chinese, Italian and Latin American cuisines.
                </p>
              </Copy>

              <div className="home-chef-cta">
                <Button href="/about/chef-sanjay-patel" className="hero-btn-secondary">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DiningMenu />
      <Testimonials />
      <CTA />
      <ImageBanner />
    </>
  );
}
