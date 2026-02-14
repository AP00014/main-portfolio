"use client";

import Link from "next/link";
import { Mic } from "lucide-react";

export default function Hero() {
  const openAssistant = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("assistant:open"));
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient" />
        <svg
          className="hero-waves"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 C240,40 480,40 720,110 C960,180 1200,180 1440,90 L1440,0 L0,0 Z"
            fill="#2a3b7a"
            opacity="0.7"
            className="hero-wave wave-1"
          />
          <path
            d="M0,210 C260,140 520,140 780,200 C1040,260 1300,260 1440,190 L1440,0 L0,0 Z"
            fill="#223166"
            opacity="0.72"
            className="hero-wave wave-2"
          />
          <path
            d="M0,320 C280,260 560,260 840,310 C1120,360 1320,360 1440,300 L1440,0 L0,0 Z"
            fill="#192650"
            opacity="0.75"
            className="hero-wave wave-3"
          />
        </svg>
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <h1 className="hero-title">
            Welcome to My
            <span>Digital Space</span>
          </h1>

          <p className="hero-subtitle">
            I’m a software engineer and freelance builder crafting standout
            front‑end experiences and rock‑solid back‑end systems.
          </p>

          <div className="hero-actions">
            <button
              onClick={openAssistant}
              className="hero-btn hero-btn-primary"
            >
              <Mic className="h-5 w-5" />
              Talk to Assistant
            </button>
            <Link
              href="/projects"
              className="hero-btn hero-btn-outline"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
