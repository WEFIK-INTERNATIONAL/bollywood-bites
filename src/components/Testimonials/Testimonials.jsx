"use client";

import { useEffect } from "react";
import Copy from "@/components/Copy/Copy";
import "./Testimonials.css";

const Testimonials = () => {
  /* Dynamically load the Elfsight platform script on mount */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="testimonials">
      <div className="leaf-border-top" aria-hidden="true" />
      <div className="leaf-border-bottom" aria-hidden="true" />

      <div className="container">
        <div className="testimonials-header" style={{ justifyContent: "center", textAlign: "center", marginBottom: "3rem" }}>
          <Copy type="lines" animateOnScroll>
            <h3>What our guests say on Google</h3>
          </Copy>
        </div>

        <div className="testimonials-widget-container">
          <div 
            className="elfsight-app-a04d76ec-6c61-425d-9c71-512063eace73" 
            data-elfsight-app-lazy 
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
