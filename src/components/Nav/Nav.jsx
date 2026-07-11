"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";

import { useViewTransition } from "@/hooks/useViewTransition";

import "./Nav.css";

const MENU_STRUCTURE = [
  { label: "Home", href: "/", img: "/menu/menu-home.jpg" },
  {
    label: "About",
    img: "/about/about-hero.jpg",
    submenus: [
      { label: "Chef Sanjay Patel", href: "/about/chef-sanjay-patel", img: "/chefs/avatar1.jpg" },
      { label: "Event gallery", href: "/about/event-gallery", img: "/about/sticky-card-3.jpg" },
      { label: "Star gallery", href: "/about/star-gallery", img: "/about/sticky-card-4.jpg" },
    ],
  },
  {
    label: "Menu",
    img: "/dining-menu/dining-menu.jpg",
    submenus: [
      { label: "Restaurant Menu", href: "/menu/restaurant", img: "/dining-menu/dining-menu.jpg" },
      { label: "Lunch Specials", href: "/menu/lunch", img: "/dining-menu/dining-menu-breakfast.jpg" },
      { label: "Cocktail Menu", href: "/menu/cocktails", img: "/dining-menu/dining-menu-drinks.jpg" },
      { label: "Food Truck Menu", href: "/menu/food-truck", img: "/dining-menu/dining-menu-pizza.jpg" },
      { label: "Buffet", href: "/menu/buffet", img: "/dining-menu/dining-menu-foodsharing.jpg" },
      { label: "Catering Trays", href: "/menu/catering-trays", img: "/dining-menu/dining-menu-ice-cream.jpg" },
      { label: "Wedding", href: "/menu/wedding", img: "/menu/menu-book.jpg" },
    ],
  },
  {
    label: "Services",
    img: "/about/sticky-card-1.jpg",
    submenus: [
      { label: "West Wood village", href: "/services/west-wood-village", img: "/about/sticky-card-5.jpg" },
      { label: "Catering", href: "/services/catering", img: "/about/sticky-card-2.jpg" },
      { label: "Food Trucks", href: "/services/food-trucks", img: "/about/sticky-card-6.jpg" },
    ],
  },
  {
    label: "Media",
    img: "/menu/menu-essence.jpg",
    submenus: [
      { label: "Blog", href: "/media/blog", img: "/home/street-bhel-puri.png" },
      { label: "Press", href: "/media/press", img: "/menu/menu-essence.jpg" },
      { label: "Event", href: "/media/event", img: "/home/about-1.jpg" },
      { label: "Specials", href: "/media/specials", img: "/home/about-2.jpg" },
    ],
  },
  { label: "Contact us", href: "/contact", img: "/menu/menu-book.jpg" },
];

const SOCIAL_LINKS = [
  { label: "Youtube", href: "https://www.youtube.com/channel/UCtAqDJgfhTo6UrIt9VrQaXg" },
  { label: "Instagram", href: "https://www.instagram.com/bollywoodbites_official/" },
  { label: "Facebook", href: "https://www.facebook.com/thebollywoodbites.inc/" },
];

const TOP_LEVEL_SELECTORS = ".nav-link-flat, .nav-link-top";
const SOCIAL_AND_FOOTER_SELECTORS = ".nav-social a, .nav-menu-footer p span";
const LINK_TEXT_SELECTORS = [".nav-link-flat", ".nav-link-top", ".nav-social a"];
const FOOTER_TEXT_SELECTORS = [".nav-menu-footer p span"];
const ALL_TEXT_SELECTORS = [...LINK_TEXT_SELECTORS, ...FOOTER_TEXT_SELECTORS];

/* scroll lock utilities defined outside the component to satisfy React 19 immutability checks */
function lockScroll(lenisInstance) {
  if (lenisInstance) lenisInstance.stop();
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.body.classList.add("nav-menu-open");
  }
}

function unlockScroll(lenisInstance) {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
    document.body.classList.remove("nav-menu-open");
  }
  if (lenisInstance) lenisInstance.start();
}

export default function Nav({ pageRef }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const { navigateWithTransition } = useViewTransition();

  const lenisInstanceRef = useRef(null);
  const isMenuOpenRef = useRef(false);
  const isMenuAnimatingRef = useRef(false);
  const previewImageRef = useRef(null);

  const [expandedMenu, setExpandedMenu] = useState(null);
  const submenuRefs = useRef({});

  function toggleSubmenu(label) {
    const isOpening = expandedMenu !== label;
    const prevLabel = expandedMenu;

    setExpandedMenu(isOpening ? label : null);

    if (prevLabel && submenuRefs.current[prevLabel]) {
      gsap.to(submenuRefs.current[prevLabel], {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (isOpening && submenuRefs.current[label]) {
      gsap.set(submenuRefs.current[label], { height: "auto", opacity: 1 });
      const targetHeight = submenuRefs.current[label].scrollHeight;
      gsap.set(submenuRefs.current[label], { height: 0, opacity: 0 });

      gsap.to(submenuRefs.current[label], {
        height: targetHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      const subItems = submenuRefs.current[label].querySelectorAll(".nav-submenu-item a");
      gsap.set(subItems, { y: "50%", opacity: 0 });
      gsap.to(subItems, {
        y: "0%",
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  }

  function prunePreviewImages() {
    const container = previewImageRef.current;
    if (!container) return;
    const images = container.querySelectorAll("img");
    if (images.length > 3) {
      for (let i = 0; i < images.length - 3; i++) {
        container.removeChild(images[i]);
      }
    }
  }

  function resetPreviewImage() {
    const container = previewImageRef.current;
    if (!container) return;
    container.innerHTML = "";
    const defaultImg = document.createElement("img");
    defaultImg.src = MENU_STRUCTURE[0].img;
    container.appendChild(defaultImg);
  }

  function killMenuTextTweens() {
    gsap.killTweensOf([...ALL_TEXT_SELECTORS, ".nav-submenu-item a"]);
  }

  function resetMenuTextToHidden() {
    gsap.set(LINK_TEXT_SELECTORS, { y: "140%", opacity: 0.25 });
    gsap.set(FOOTER_TEXT_SELECTORS, { y: "120%", opacity: 0.25 });
    gsap.set(".nav-submenu-item a", { y: "50%", opacity: 0 });
  }

  function animateToggleLabel(isOpening) {
    const openLabel = document.querySelector("#nav-toggle-open");
    const closeLabel = document.querySelector("#nav-toggle-close");

    gsap.to(isOpening ? openLabel : closeLabel, {
      x: -5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(isOpening ? closeLabel : openLabel, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function forceCloseMenu() {
    const page = pageRef?.current;
    if (page) {
      gsap.set(page, { clearProps: "all" });
      gsap.set(page, { transformOrigin: "" });
    }

    killMenuTextTweens();

    gsap.set(".nav-menu-overlay", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(".nav-menu-content", {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
    });

    resetMenuTextToHidden();

    gsap.set("#nav-toggle-open", { x: 0, y: 0, rotation: 0, opacity: 1 });
    gsap.set("#nav-toggle-close", { x: -5, y: 10, rotation: 5, opacity: 0 });

    isMenuOpenRef.current = false;
    isMenuAnimatingRef.current = false;
    setExpandedMenu(null);
    Object.values(submenuRefs.current).forEach((el) => {
      if (el) gsap.set(el, { height: 0, opacity: 0 });
    });
    resetPreviewImage();
    unlockScroll(lenisInstanceRef.current);
    if (typeof document !== "undefined") {
      document.body.classList.remove("nav-menu-transitioning");
    }
  }

  function openMenu() {
    if (isMenuAnimatingRef.current || isMenuOpenRef.current) return;
    isMenuAnimatingRef.current = true;

    const page = pageRef?.current;
    const scrollY = window.scrollY;

    lockScroll(lenisInstanceRef.current);
    if (typeof document !== "undefined") {
      document.body.classList.add("nav-menu-transitioning");
    }

    if (page) {
      gsap.set(page, { transformOrigin: `right ${scrollY}px` });

      gsap.to(page, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
        ease: "power4.inOut",
      });
    }

    animateToggleLabel(true);
    killMenuTextTweens();
    resetMenuTextToHidden();

    gsap.to(".nav-menu-content", {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    // Reveal top-level menu links in perfect DOM order
    gsap.to(TOP_LEVEL_SELECTORS, {
      y: "0%",
      opacity: 1,
      delay: 0.5,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
    });

    // Reveal social links and footer shortly after
    gsap.to(SOCIAL_AND_FOOTER_SELECTORS, {
      y: "0%",
      opacity: 1,
      delay: 0.8,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05,
    });

    gsap.to(".nav-menu-overlay", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isMenuOpenRef.current = true;
        isMenuAnimatingRef.current = false;
        if (typeof document !== "undefined") {
          document.body.classList.remove("nav-menu-transitioning");
        }
      },
    });
  }

  function closeMenu() {
    if (isMenuAnimatingRef.current || !isMenuOpenRef.current) return;
    isMenuAnimatingRef.current = true;

    const page = pageRef?.current;
    if (typeof document !== "undefined") {
      document.body.classList.add("nav-menu-transitioning");
    }

    if (page) {
      gsap.to(page, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(page, { clearProps: "all" });
          gsap.set(page, { transformOrigin: "" });
        },
      });
    }

    animateToggleLabel(false);
    killMenuTextTweens();

    gsap.to(".nav-menu-content", {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(".nav-menu-overlay", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isMenuOpenRef.current = false;
        isMenuAnimatingRef.current = false;
        setExpandedMenu(null);
        Object.values(submenuRefs.current).forEach((el) => {
          if (el) gsap.set(el, { height: 0, opacity: 0 });
        });
        resetMenuTextToHidden();
        resetPreviewImage();
        unlockScroll(lenisInstanceRef.current);
        if (typeof document !== "undefined") {
          document.body.classList.remove("nav-menu-transitioning");
        }
      },
    });
  }

  function handleToggle() {
    if (!isMenuOpenRef.current) openMenu();
    else closeMenu();
  }

  useEffect(() => {
    // Pre-load all preview images to avoid hover lag
    if (typeof window !== "undefined") {
      const imagesToPreload = [];
      MENU_STRUCTURE.forEach((item) => {
        if (item.img) imagesToPreload.push(item.img);
        if (item.submenus) {
          item.submenus.forEach((sub) => {
            if (sub.img) imagesToPreload.push(sub.img);
          });
        }
      });
      imagesToPreload.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  useEffect(() => {
    lenisInstanceRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    if (isMenuOpenRef.current) forceCloseMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function handleLinkHover(imageSrc) {
    if (!isMenuOpenRef.current || isMenuAnimatingRef.current) return;
    const container = previewImageRef.current;
    if (!container || !imageSrc) return;

    const currentImages = container.querySelectorAll("img");
    if (
      currentImages.length > 0 &&
      currentImages[currentImages.length - 1].src.endsWith(imageSrc)
    )
      return;

    const newImg = document.createElement("img");
    newImg.src = imageSrc;
    newImg.style.opacity = "0";
    newImg.style.transform = "scale(1.25) rotate(10deg)";
    container.appendChild(newImg);
    prunePreviewImages();

    const animateImg = () => {
      gsap.to(newImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    };

    if (newImg.complete) {
      animateImg();
    } else {
      newImg.onload = animateImg;
    }
  }

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition("/");
            }}
          >
            <Image
              src="/screenshot.png"
              alt="Bollywood Bites Logo"
              width={160}
              height={70}
              priority
            />
          </Link>
        </div>

        <div className="nav-toggle" onClick={handleToggle}>
          <p id="nav-toggle-open">Menu</p>
          <p id="nav-toggle-close">Close</p>
        </div>
      </nav>

      <div className="nav-menu-overlay">
        <div className="leaf-border-top" />
        <div className="leaf-border-bottom" />
        <div className="nav-menu-content">
          <div className="nav-menu-items">
            <div className="nav-col-lg">
              <div className="nav-preview-img" ref={previewImageRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MENU_STRUCTURE[0].img} alt="" />
              </div>
            </div>

            <div className="nav-col-sm" data-lenis-prevent>
              <div className="nav-menu-links">
                {MENU_STRUCTURE.map((link) => (
                  <div
                    className={`nav-link ${link.submenus ? "nav-has-submenu" : ""}`}
                    key={link.label}
                  >
                    {link.submenus ? (
                      <>
                        <div
                          className="nav-link-top"
                          onMouseOver={() => handleLinkHover(link.img)}
                          onClick={() => toggleSubmenu(link.label)}
                        >
                          {link.label}
                          <span className={`nav-arrow ${expandedMenu === link.label ? "expanded" : ""}`}>
                            {expandedMenu === link.label ? "−" : "+"}
                          </span>
                        </div>
                        <div
                          className="nav-submenu-container"
                          ref={(el) => (submenuRefs.current[link.label] = el)}
                          style={{ height: 0, overflow: "hidden", opacity: 0 }}
                        >
                          <div className="nav-submenu-list">
                            {link.submenus.map((sub) => (
                              <div className="nav-submenu-item" key={sub.label}>
                                <Link
                                  href={sub.href}
                                  data-img={sub.img}
                                  onMouseOver={() => handleLinkHover(sub.img)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigateWithTransition(sub.href);
                                  }}
                                >
                                  {sub.label}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        className="nav-link-flat"
                        href={link.href}
                        data-img={link.img}
                        onMouseOver={() => handleLinkHover(link.img)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateWithTransition(link.href);
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="nav-menu-socials">
                {SOCIAL_LINKS.map((social) => (
                  <div className="nav-social" key={social.label}>
                    <a href={social.href}>{social.label}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nav-menu-footer">
            <p className="sm">
              <span>Est. 2009</span>
            </p>
            <p className="sm">
              <span>Los Angeles, California, USA</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
