"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";
import Testimonials from "@/components/Testimonials/Testimonials";
import "./westwood.css";

gsap.registerPlugin(ScrollTrigger);

export default function WestWoodVillage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in info cards
      gsap.fromTo(
        ".westwood-info-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".westwood-info-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Staggered narrative rows fade in
      gsap.utils.toArray(".westwood-narrative-row").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".westwood-narrative-content, .westwood-intro-image-wrapper"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Gallery grid items fade in
      gsap.fromTo(
        ".westwood-gallery-item",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".westwood-gallery-grid",
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
      <section className="westwood-hero">
        {/* Repeating background mandalas for luxury theme */}
        <div className="bg-mandala-centered" style={{ opacity: 0.03 }} />
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.35}>
            <h1>Westwood Village</h1>
          </Copy>
          <p className="westwood-hero-tagline">Flagship Los Angeles Restaurant</p>
        </div>
      </section>

      {/* Editorial Intro Section */}
      <section className="westwood-intro">
        <div className="container">
          <div className="westwood-intro-grid">
            <div className="westwood-intro-text">
              <span className="accent-label">Authentic & Vibrant</span>
              <h3>Experience Authentic Indian Cuisine in Westwood</h3>
              <p>
                Westwood Village is known for its lively atmosphere, diverse culture, and incredible dining experiences. 
                Among the many culinary options available, Indian cuisine continues to be a favorite for those who appreciate 
                rich flavors, aromatic spices, and comforting meals. If you are searching for the Best Indian food Westwood Village, 
                enjoying authentic dishes prepared with fresh ingredients can make every meal memorable.
              </p>
              <p>
                Indian food is loved for its unique blend of spices and regional recipes that have been passed down through generations. 
                From creamy curries and fragrant biryanis to sizzling tandoori specialties and freshly baked naan, every dish reflects 
                a tradition of exceptional taste. Finding an Indian restaurant Westwood that combines authenticity with quality ingredients 
                allows guests to enjoy a genuine culinary experience. Whether you are dining with family, meeting friends, or looking for 
                a satisfying lunch, Indian cuisine offers something for everyone.
              </p>
            </div>
            <div className="westwood-intro-image-wrapper">
              <div className="westwood-luxury-frame">
                <Image
                  src="/home/services-restaurant.png"
                  alt="Bollywood Bites Westwood Village Dining Room"
                  fill
                  sizes="(max-width: 991px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details Grid */}
      <section className="westwood-info">
        <div className="container">
          <div className="westwood-info-grid">
            {/* Address Card */}
            <div className="westwood-info-card">
              <span className="highlight-badge">UCLA Campus Flagship</span>
              <h4>Find Us</h4>
              <p>
                <strong>Bollywood Bites Restaurant LA</strong><br />
                1051 Gayley Avenue<br />
                Los Angeles, California - 90024
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Voted & Awarded Best Indian Restaurant in Los Angeles
              </p>
            </div>

            {/* Hours Card */}
            <div className="westwood-info-card">
              <span className="highlight-badge">Open Daily</span>
              <h4>Hours of Operation</h4>
              <p>
                <strong>Monday - Sunday</strong><br />
                11:00 AM - 10:00 PM
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Dine-in, Takeout, & Delivery Available
              </p>
            </div>

            {/* Contact Card */}
            <div className="westwood-info-card">
              <span className="highlight-badge">Get In Touch</span>
              <h4>Contact Details</h4>
              <p>
                <strong>Reservations & Orders</strong><br />
                Phone: <Link href="tel:3108241046" style={{ color: 'var(--base-300)', textDecoration: 'none' }}>(310) 824-1046</Link><br />
                Email: <Link href="mailto:info@thebollywoodbites.com" style={{ color: 'var(--base-300)', textDecoration: 'none' }}>info@thebollywoodbites.com</Link>
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Contact us today for group bookings & catering events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Staggered Sections */}
      <section className="westwood-narrative">
        <div className="container">
          <div className="westwood-narrative-title">
            <h2>Bringing Communities Together Through Food</h2>
            <p>Our commitment to preserving traditional Indian flavors while providing guests with a warm, welcoming experience.</p>
          </div>

          {/* Row 1 */}
          <div className="westwood-narrative-row">
            <div className="westwood-narrative-content">
              <span className="accent-label">Crafted with Pride</span>
              <h3>Fresh Ingredients & Traditional Recipes</h3>
              <p>
                Great food begins with carefully selected ingredients and time-honored cooking techniques. Authentic herbs and spices 
                create flavors that are both comforting and unforgettable. Every dish is crafted to deliver the perfect balance of 
                taste and aroma, ensuring a delightful experience from the first bite to the last.
              </p>
              <p>
                At Bollywood Bites, the focus is on preserving traditional flavors while providing guests with a welcoming atmosphere. 
                The combination of quality ingredients and authentic recipes makes every visit enjoyable and satisfying.
              </p>
            </div>
            <div className="westwood-intro-image-wrapper">
              <div className="westwood-luxury-frame">
                <Image
                  src="/about/sticky-card-3.jpg"
                  alt="Fresh Indian Herbs and Spices"
                  fill
                  sizes="(max-width: 991px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="westwood-narrative-row">
            <div className="westwood-intro-image-wrapper">
              <div className="westwood-luxury-frame">
                <Image
                  src="/about/sticky-card-5.jpg"
                  alt="Bollywood Bites Indian Cuisine Menu"
                  fill
                  sizes="(max-width: 991px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="westwood-narrative-content">
              <span className="accent-label">Endless Variety</span>
              <h3>A Menu Designed for Every Taste</h3>
              <p>
                Indian cuisine offers an incredible variety of dishes suitable for every preference. Whether you enjoy vegetarian 
                specialties, flavorful chicken curries, grilled kebabs, or aromatic rice dishes, there is always something delicious 
                to explore.
              </p>
              <p>
                People searching for the Best Indian food Westwood Village often look for a menu that provides both classic favorites 
                and exciting options. From appetizers and street food-inspired dishes to hearty entrees and delicious desserts, every 
                meal becomes a celebration of authentic Indian flavors.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="westwood-narrative-row">
            <div className="westwood-narrative-content">
              <span className="accent-label">Memorable Occasions</span>
              <h3>Perfect for Lunch, Dinner, & Gatherings</h3>
              <p>
                Sharing food brings people together, and Indian cuisine is perfect for creating memorable moments. Whether you are 
                planning a casual lunch, family dinner, date night, or celebration with friends, flavorful dishes add warmth and joy 
                to every occasion.
              </p>
              <p>
                As a trusted Indian restaurant Westwood, providing exceptional service and a comfortable dining environment is just 
                as important as serving delicious food. Guests appreciate a place where quality and hospitality come together to 
                create an unforgettable experience.
              </p>
            </div>
            <div className="westwood-intro-image-wrapper">
              <div className="westwood-luxury-frame">
                <Image
                  src="/about/sticky-card-6.jpg"
                  alt="Group Gathering at Bollywood Bites"
                  fill
                  sizes="(max-width: 991px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Action Panel */}
      <section className="westwood-actions-section">
        <div className="container">
          <div className="westwood-actions-container">
            <div className="westwood-actions-title">
              <h3>Discover Authentic Indian Flavors Today</h3>
              <p>Experience rich spices, exceptional service, and unforgettable meals. Choose from our fast shortcuts below.</p>
            </div>
            <div className="westwood-btn-group">
              <Link href="/menu" className="westwood-btn westwood-btn-primary">
                Order Online
              </Link>
              <Link href="/reservation" className="westwood-btn westwood-btn-secondary">
                Book Table
              </Link>
              <Link href="/menu/lunch" className="westwood-btn westwood-btn-outline">
                Lunch Specials
              </Link>
              <Link href="/menu/buffet" className="westwood-btn westwood-btn-outline">
                Indian Buffet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="westwood-gallery">
        <div className="container">
          <div className="westwood-narrative-title" style={{ marginBottom: '4rem' }}>
            <h2>Westwood Scenes & Specialties</h2>
            <p>Catch a glimpse of the delicious specialties and details waiting for you.</p>
          </div>
          <div className="westwood-gallery-grid">
            <div className="westwood-gallery-item">
              <Image
                src="/home/about-1.jpg"
                alt="Bollywood Bites Specialties 1"
                fill
                sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 250px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="westwood-gallery-item">
              <Image
                src="/home/about-2.jpg"
                alt="Bollywood Bites Specialties 2"
                fill
                sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 250px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="westwood-gallery-item">
              <Image
                src="/home/about-3.jpg"
                alt="Bollywood Bites Specialties 3"
                fill
                sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 250px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="westwood-gallery-item">
              <Image
                src="/home/about-4.jpg"
                alt="Bollywood Bites Specialties 4"
                fill
                sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 250px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
