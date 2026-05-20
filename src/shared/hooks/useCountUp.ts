import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function useCountUp(target: number, durationSec = 0.8, decimals = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: durationSec,
              ease: "power2.out",
              onUpdate: () => setValue(parseFloat(obj.v.toFixed(decimals))),
            });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationSec, decimals]);

  return { value, ref };
}
