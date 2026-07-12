"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

import { blogs } from "@/data/blogs-data";
import Button from "@/components/Button/Button";
import { useViewTransition } from "@/hooks/useViewTransition";

import "./blog-single.css";

export default function SingleBlogPage({ params }) {
  const router = useRouter();
  const { navigateWithTransition } = useViewTransition();
  
  // Unwrap params using React.use() as required in React 19/Next.js 15+
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // Find current blog
  const blog = blogs.find((b) => b.slug === slug);

  // Scroll to top on load/slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-not-found">
        <div className="container">
          <h2>Article Not Found</h2>
          <p>The story you are looking for does not exist or has been moved.</p>
          <Button href="/media/blog">Back to Blog</Button>
        </div>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <main className="single-blog-page">
      {/* Back Button floating bar */}
      <div className="blog-back-bar">
        <div className="container">
          <Link 
            href="/media/blog" 
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition("/media/blog");
            }}
          >
            <HiOutlineArrowLeft /> Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="blog-article-header">
        <div className="container">
          {/* Tags */}
          <div className="blog-article-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>

          <h1 className="blog-article-title">{blog.title}</h1>

          {/* Author/Date Meta */}
          <div className="blog-article-meta">
            <span className="meta-author">By {blog.author}</span>
            <span className="meta-sep">•</span>
            <span className="meta-date">{blog.date}</span>
            <span className="meta-sep">•</span>
            <span className="meta-readtime">{blog.readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="blog-article-hero-img">
        <div className="container">
          <div className="hero-img-wrapper">
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="article-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="blog-article-content">  
        <div className="container">
          <div 
            className="rich-text-body"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      {/* Footer Share & Tags */}
      <footer className="blog-article-footer">
        <div className="container">
          <div className="footer-line">
            <span className="footer-tagline">Thanks for reading!</span>
            <Link href="/media/blog" className="explore-more-link">
              Explore More Chronicles <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </footer>

      {/* Related Articles Section */}
      <section className="related-articles-section">
        <div className="container">
          <h2 className="related-title">More Stories</h2>
          
          <div className="related-grid">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/media/blog/${post.slug}`} 
                className="related-post-card"
              >
                <div className="related-img-wrapper">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="related-img"
                  />
                </div>
                <div className="related-meta">
                  <span>{post.date}</span>
                  <span className="related-meta-dot">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="related-card-title">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
