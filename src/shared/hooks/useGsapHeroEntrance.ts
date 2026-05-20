import { useEffect, type RefObject } from "react";
import gsap from "gsap";

export function useGsapHeroEntrance(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", { y: 12, opacity: 0, duration: 0.5 })
        .from("[data-hero-name]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.2")
        .from("[data-hero-tagline]", { y: 12, opacity: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero-cta]", { y: 8, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from("[data-hero-meta]", { opacity: 0, duration: 0.4 }, "-=0.2");
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef]);
}
