"use client";

import React from "react";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import { SteppedFrame } from "@/components/Steppedframe/SteppedFrame";
import CTA from "@/components/CTA/CTA";

import "./chef.css";

function ChefSanjayPatel() {
  return (
    <div className="chef-page-wrapper">
      {/* Corner Mandalas for background elegance */}
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tl" width={200} height={200} alt="" aria-hidden="true" />
      <Image src="/mandana/corner/Group.svg" className="mandala-corner mandala-corner-tr" width={200} height={200} alt="" aria-hidden="true" />

      {/* Hero Section */}
      <section className="chef-hero">
        <div className="container">
          <Copy animateOnScroll={false} delay={0.6} type="words">
            <span className="chef-hero-subtitle">Taste of Bollywood</span>
          </Copy>
          <Copy animateOnScroll={false} delay={0.8} type="words">
            <h1 className="chef-hero-title">
              Meet Celebrity Chef <br />
              <span>Sanjay Patel</span>
            </h1>
          </Copy>
        </div>
      </section>

      {/* Narrative & Sticky Portrait Section */}
      <section className="chef-story-section">
        <div className="container">
          <div className="chef-story-grid">
            
            {/* Sticky Sidebar on Desktop */}
            <div className="chef-sticky-sidebar">
              <div className="chef-frame-container">
                <SteppedFrame stepSize="md" borderColor="gold" innerRing={true}>
                  <div className="chef-image-box">
                    <Image
                      src="/chefs/chef.png"
                      alt="Celebrity Chef Sanjay Patel"
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </SteppedFrame>
              </div>

              <div className="chef-meta-card">
                <h4 className="chef-meta-title">Chef Profile</h4>
                <ul className="chef-meta-list">
                  <li className="chef-meta-item">
                    <span className="chef-meta-label">Origin</span>
                    <span className="chef-meta-value">Bombay, India</span>
                  </li>
                  <li className="chef-meta-item">
                    <span className="chef-meta-label">Experience</span>
                    <span className="chef-meta-value">20+ Years</span>
                  </li>
                  <li className="chef-meta-item">
                    <span className="chef-meta-label">Signature Style</span>
                    <span className="chef-meta-value">Modern Indo-Chinese Fusion</span>
                  </li>
                  <li className="chef-meta-item">
                    <span className="chef-meta-label">Honors</span>
                    <span className="chef-meta-value">Voted Best Indian Food</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Scrollable Biography Narrative */}
            <div className="chef-narrative">
              
              <div className="narrative-block">
                <Copy>
                  <span className="narrative-tag">Early Beginnings</span>
                  <h3 className="narrative-title">Destined for Hollywood</h3>
                  <p className="narrative-text">
                    Destined for Hollywood, Celebrity Chef Sanjay Patel was raised in Bombay, India. Son of a hard-working hotel owner and the nephew of a successful Bollywood movie producer, Sanjay learned at an early age, the value of hard work. The oldest boy of six siblings, Sanjay relished the time he spent with his mother, helping her prepare large meals for their extended family to enjoy after a long day’s work.
                  </p>
                  <p className="narrative-text">
                    Every meal was crafted with great pride, love, and attention to decadent detail. What Sanjay noticed more than anything was the immense gratitude everyone expressed to his mother for her cherished meals. Because of the joy and the love shared around the table, Sanjay decided at the young age of 12, <strong>“I want to be a chef one day!”</strong>
                  </p>
                </Copy>
              </div>

              <div className="narrative-block">
                <Copy>
                  <span className="narrative-tag">Culinary Education</span>
                  <h3 className="narrative-title">Global Flavor Profiles</h3>
                  <p className="narrative-text">
                    At age 13, Sanjay began taking cooking classes and working as a cook at an Indo-Chinese restaurant in Bombay. With dreams of coming to the United States, after high school, Sanjay moved with extended family in Panama where he attended culinary school—and built his expertise in a variety of cuisines—including Italian, Central American, South American, Spanish and American dishes.
                  </p>
                </Copy>
              </div>

              <div className="narrative-block">
                <Copy>
                  <span className="narrative-tag">A Star is Born</span>
                  <h3 className="narrative-title">Chef to the King of Pop</h3>
                  <p className="narrative-text">
                    Sanjay eventually moved to the United States and landed a job as a sous-chef at the world-renown Four Seasons in Beverly Hills. As fate would have it, THE King of Pop, Michael Jackson himself, fell in love with Sanjay’s unique culinary style and exotic flavors.
                  </p>
                  <div className="narrative-highlight">
                    “For the next five years, Sanjay served as Michael Jackson’s personal chef—preparing meals for Michael Jackson and his children until his unfortunate, premature departure from this earth.”
                  </div>
                </Copy>
              </div>

              <div className="narrative-block">
                <Copy>
                  <span className="narrative-tag">Restaurant Expansion</span>
                  <h3 className="narrative-title">Building Bollywood Bites</h3>
                  <p className="narrative-text">
                    In 2009, Sanjay began building his catering business, and in order to meet his growing demand, he launched his first “Bollywood Bites” Food Truck in 2009. In 2012, Sanjay opened his first Bollywood Bites restaurant in Westwood on the campus of UCLA in Los Angeles. In 2018, Sanjay opened his second Bollywood Bites restaurant on Ventura Boulevard in Sherman Oaks, California.
                  </p>
                  <p className="narrative-text">
                    The success of Sanjay’s businesses is built upon his ability to curate amazing, authentic and creative cuisine that is prepared to perfection and served with love. Voted “Best Indian Food” 5 years in a row, Sanjay’s food speaks for itself. When Sanjay is not greeting customers or cooking up a creative masterpiece, he cherishes the time spent with his lovely wife and two young children.
                  </p>
                </Copy>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Video Interview Showcase */}
      <section className="chef-video-section">
        <div className="container">
          <div className="video-section-header">
            <Copy>
              <h2 className="video-section-title">The Interview</h2>
              <p className="video-section-subtitle">
                Step inside the kitchen with Chef Sanjay Patel and explore the story behind his culinary journey.
              </p>
            </Copy>
          </div>
          
          <div className="video-frame-container">
            <SteppedFrame stepSize="md" borderColor="gold" innerRing={true}>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/lKfreYpUse4"
                  title="Chef Sanjay Patel Interview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </SteppedFrame>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <CTA />
    </div>
  );
}

export default ChefSanjayPatel;