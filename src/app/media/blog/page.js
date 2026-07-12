"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";

import { blogs } from "@/data/blogs-data";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

import "./blog-page.css";

export default function BlogListingPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const { navigateWithTransition } = useViewTransition();

  // Extract all unique tags
  const allTags = ["All", ...new Set(blogs.flatMap((blog) => blog.tags))];

  // Filtered blogs
  const filteredBlogs = selectedTag === "All" 
    ? blogs 
    : blogs.filter((blog) => blog.tags.includes(selectedTag));

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="blog-archive-page">
      {/* Rebuilt Premium Hero Section */}
      <section className="blog-hero">
        {/* Parallax Background Image */}
        <div className="hero-bg-image-wrapper">
          <Image
            src="/backgrounds/background2.jpg"
            alt="Bollywood Bites Chronicles Background"
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
            <span className="blog-hero-tagline" style={{ display: "block" }}>Bollywood Bites Chronicles</span>
          </Copy>
          <Copy type="words" animateOnScroll={false} delay={1.0}>
            <h1 className="blog-hero-title">Culinary Stories & News</h1>
          </Copy>
          <Copy type="lines" animateOnScroll={false} delay={1.2}>
            <p className="blog-hero-subtitle">
              Explore behind-the-scenes tales of our kitchen, the history of authentic street food, and masterclasses in spice blending.
            </p>
          </Copy>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="blog-content">
        <div className="container">
          
          {/* Tag Filter Bar */}
          <div className="blog-filter-bar">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter-btn ${selectedTag === tag ? "is-active" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Post Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="blog-grid">
              {filteredBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/media/blog/${blog.slug}`} 
                  className="blog-post-card"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition(`/media/blog/${blog.slug}`);
                  }}
                >
                  <div className="blog-post-img-wrapper">
                    <Image 
                      src={blog.image} 
                      alt={blog.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="blog-post-img"
                    />
                    <span className="blog-post-category">{blog.tags[0]}</span>
                  </div>

                  <div className="blog-post-card-body">
                    <div className="blog-post-meta">
                      <span>{blog.date}</span>
                      <span className="meta-dot">•</span>
                      <span>{blog.readTime}</span>
                      <span className="meta-dot">•</span>
                      <span>By {blog.author}</span>
                    </div>

                    <h2 className="blog-post-card-title">{blog.title}</h2>
                    <p className="blog-post-card-excerpt">{blog.excerpt}</p>
                    
                    <div className="blog-post-card-footer">
                      <span className="read-article-link">
                        Read Article <HiOutlineArrowRight className="arrow" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="blog-empty-state">
              <h3>No articles found in this category.</h3>
              <p>Please select another tag or view all articles.</p>
              <Button onClick={() => setSelectedTag("All")} className="empty-state-btn">
                View All Articles
              </Button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
