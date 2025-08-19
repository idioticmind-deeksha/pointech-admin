'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);

      let closestSection: string | null = null;
      let closestDistance = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < closestDistance && rect.top <= window.innerHeight / 2) {
            closestSection = id;
            closestDistance = distance;
          }
        }
      });

      if (closestSection) {
        setActiveId(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  // Optional: don't return any activeId until user scrolls
  return hasScrolled ? activeId : null;
}
