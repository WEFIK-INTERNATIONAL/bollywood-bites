"use client";

import { useState } from "react";
import Copy from "@/components/Copy/Copy";
import "./contact.css";

export default function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <Copy type="words" animateOnScroll={false} delay={0.85}>
            <h2>Contact Us</h2>
          </Copy>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <div className="contact-details">
            <div className="contact-block">
              <h4>Get in Touch</h4>
              <p>For reservation inquiries, private catering, or food truck hires, feel free to send us a message or call our team.</p>
            </div>

            <div className="contact-block">
              <h4>Phone & Email</h4>
              <p>
                Telephone: <a href="tel:+442079460958">+44 (0) 20 7946 0958</a>
                <br />
                Email: <a href="mailto:info@bollywoodbites.co.uk">info@bollywoodbites.co.uk</a>
              </p>
            </div>

            <div className="contact-block">
              <h4>Our Location</h4>
              <p>
                12 Westwood Village High St
                <br />
                London, WC2N 5DU, United Kingdom
              </p>
            </div>

            <div className="contact-block">
              <h4>Operating Hours</h4>
              <p>
                Wednesday - Thursday: 12:00 PM - 10:00 PM
                <br />
                Friday - Saturday: 12:00 PM - 11:30 PM
                <br />
                Sunday: 12:00 PM - 9:30 PM
                <br />
                <em>Closed Mondays & Tuesdays</em>
              </p>
            </div>
          </div>

          <div className="contact-form-container">
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <h3 style={{ color: "var(--base-300)" }}>Dhanyavad!</h3>
                <p>Thank you for contacting Bollywood Bites. A member of our team will reach out to you shortly.</p>
                <button
                  className="contact-submit-btn"
                  style={{ marginTop: "2rem" }}
                  onClick={() => setFormSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3>Send a Message</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sanjay Patel"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. sanjay@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Catering Enquiry"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your event or request..."
                    />
                  </div>
                  <button type="submit" className="contact-submit-btn">
                    Submit Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
