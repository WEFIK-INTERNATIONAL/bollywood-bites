"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";

import { blogs } from "@/data/blogs-data";
import Button from "@/components/Button/Button";

import "./blog-page.css";

export default function BlogListingPage() {
  const [selectedTag, setSelectedTag] = useState("All");

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
      {/* Hero Section */}
      <section className="blog-hero">
        {/* Decorative mandala centered in hero */}
        <Image 
          src="/mandana/rounded_mandala/Group 9.svg" 
          className="blog-hero-mandala" 
          width={800} 
          height={800} 
          priority
          loading="eager"
          alt="" 
          aria-hidden="true"
        />
        <div className="container">
          <span className="blog-hero-tagline">Bollywood Bites Chronicles</span>
          <h1 className="blog-hero-title">Culinary Stories, Recipes & News</h1>
          <p className="blog-hero-subtitle">
            Explore behind-the-scenes tales of our kitchen, the history of authentic street food, and masterclasses in spice blending.
          </p>
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
