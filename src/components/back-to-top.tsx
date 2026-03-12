"use client";

import { useLayoutEffect, useEffect, useState, useRef } from "react";

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRingRef = useRef<SVGCircleElement>(null);
  const isScrollingRef = useRef(false);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  useLayoutEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clampedProgress = Math.min(100, Math.max(0, scrollPercent));

      setShow(scrollTop > 0);
      setProgress(clampedProgress);
    };

    updateProgress();

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      updateProgress();

      clearTimeout(scrollTimeout);
      isScrollingRef.current = true;

      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (progressRingRef.current) {
      const offset = circumference - (progress / 100) * circumference;
      progressRingRef.current.setAttribute("stroke-dashoffset", offset.toString());
    }
  }, [progress, circumference]);

  const scrollToTop = () => {
    isScrollingRef.current = true;

    setShow(false);
    setProgress(0);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button type="button" onClick={scrollToTop} className="back-to-top" data-visible={show}>
      <svg className="back-to-top__progress" width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle ref={progressRingRef} cx="22" cy="22" r={radius} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 22 22)" className="back-to-top__progress-ring" />
      </svg>
      <div className="back-to-top__icon">
        <ArrowUpIcon />
      </div>
    </button>
  );
}
