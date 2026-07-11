"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowRight } from "react-icons/hi";

import { blogs } from "@/data/blogs-data";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

import "./BlogSection.css";

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".home-blog-card");
    const headerElements = section.querySelectorAll(".blog-header-animate");
    const ctaWrapper = section.querySelector(".blog-cta-wrapper");

    // Fade-in header
    gsap.fromTo(
      headerElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".home-blog-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Fade-in cards
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".home-blog-grid",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Fade-in bottom CTA button
    gsap.fromTo(
      ctaWrapper,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-cta-wrapper",
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  // Display only the first 3 blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="home-blog-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="home-blog-header">
          <span className="blog-header-animate blog-tagline">Culinary Stories & News</span>
          <h2 className="blog-header-animate blog-title">
            Stories From <br />
            <span className="highlight-text">Our Kitchen</span>
          </h2>
          <p className="blog-header-animate blog-subtitle">
            Delve deeper into our culinary heritage, secret spice blend techniques, and tales of cooking for the stars.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="home-blog-grid">
          {latestBlogs.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/media/blog/${blog.slug}`} 
              className="home-blog-card"
            >
              {/* Image Container */}
              <div className="home-blog-img-container">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="home-blog-img"
                />
                <span className="home-blog-card-tag">{blog.tags[0]}</span>
              </div>

              {/* Meta */}
              <div className="home-blog-card-meta">
                <span className="blog-date">{blog.date}</span>
                <span className="blog-meta-divider">•</span>
                <span className="blog-read-time">{blog.readTime}</span>
              </div>

              {/* Title & Excerpt */}
              <div className="home-blog-card-content">
                <h3 className="home-blog-card-title">{blog.title}</h3>
                <p className="home-blog-card-excerpt">{blog.excerpt}</p>
              </div>

              {/* Read More link */}
              <div className="home-blog-card-footer">
                <span className="read-more-btn">
                  Read Article <HiOutlineArrowRight className="arrow-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="blog-cta-wrapper">
          <Button href="/media/blog" className="blog-explore-btn">
            Explore All Articles
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
