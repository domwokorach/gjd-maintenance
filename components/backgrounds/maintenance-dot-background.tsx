'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import DotField from '@/components/ui/dot-field';

type Density = 'mobile' | 'tablet' | 'desktop';

const DENSITY_CONFIG: Record<
  Density,
  {
    dotRadius: number;
    dotSpacing: number;
    cursorRadius: number;
    cursorForce: number;
    bulgeStrength: number;
    glowRadius: number;
  }
> = {
  desktop: {
    dotRadius: 1.3,
    dotSpacing: 26,
    cursorRadius: 220,
    cursorForce: 0.05,
    bulgeStrength: 26,
    glowRadius: 120,
  },
  tablet: {
    dotRadius: 1.2,
    dotSpacing: 32,
    cursorRadius: 140,
    cursorForce: 0.04,
    bulgeStrength: 18,
    glowRadius: 90,
  },
  mobile: {
    dotRadius: 1,
    dotSpacing: 44,
    // Pointer effects are effectively unused on touch devices (no mousemove),
    // kept at 0 to explicitly disable the expensive interaction path.
    cursorRadius: 0,
    cursorForce: 0,
    bulgeStrength: 0,
    glowRadius: 0,
  },
};

// Base background #F7F4ED, near-black dots at low opacity, accent blue used
// sparingly — blended diagonally so the accent never dominates the field.
const DOT_OPACITY = { default: 0.16, subtle: 0.11 };
const ACCENT_OPACITY = { default: 0.1, subtle: 0.07 };
// Dark mode: white dots at reduced opacity, accent blue lightened to stay visible.
const DOT_OPACITY_DARK = { default: 0.14, subtle: 0.09 };
const ACCENT_OPACITY_DARK = { default: 0.08, subtle: 0.06 };
const GLOW_COLOR = '#5B7CFF';
const GLOW_COLOR_DARK = '#6E8BFF';

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function useInViewport<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

export interface MaintenanceDotBackgroundProps {
  className?: string;
  /** Use "subtle" for secondary sections where the field should recede further. */
  variant?: 'default' | 'subtle';
  /** Fade dots toward the section edges so there are no harsh boundaries. */
  fadeEdges?: boolean;
}

export function MaintenanceDotBackground({
  className,
  variant = 'default',
  fadeEdges = true,
}: MaintenanceDotBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isInViewport = useInViewport(containerRef);
  const { resolvedTheme } = useTheme();
  // Guard against a hydration mismatch: next-themes can resolve the persisted
  // theme synchronously on the client before the server-rendered markup
  // (always computed without theme knowledge) has been hydrated.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const markMounted = () => setMounted(true);
    markMounted();
  }, []);
  const isDark = mounted && resolvedTheme === 'dark';

  const density: Density = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  const config = useMemo(() => {
    const base = DENSITY_CONFIG[density];
    const dotOpacity = isDark ? DOT_OPACITY_DARK[variant] : DOT_OPACITY[variant];
    const accentOpacity = isDark ? ACCENT_OPACITY_DARK[variant] : ACCENT_OPACITY[variant];
    return {
      ...base,
      gradientFrom: isDark ? rgba(255, 255, 255, dotOpacity) : rgba(17, 17, 17, dotOpacity),
      gradientTo: rgba(91, 124, 255, accentOpacity),
      glowColor: isDark ? GLOW_COLOR_DARK : GLOW_COLOR,
      bulgeOnly: true,
      sparkle: false,
      waveAmplitude: 0,
    };
  }, [density, variant, isDark]);

  // Mounted, in view, and not asked to reduce motion: run the animated field.
  // Otherwise render a static dot texture so the background never disappears.
  const shouldAnimate = isInViewport && !prefersReducedMotion;

  // Edge fade so the field never ends in a harsh visible boundary; also
  // trims density toward the left (headline/CTAs) versus the right
  // (engineer illustration) as specified by the hero readability treatment.
  const maskImage = fadeEdges
    ? 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, black 55%, black 70%, transparent 92%)'
    : undefined;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className ?? ''}`}
      style={
        maskImage
          ? { maskImage, WebkitMaskImage: maskImage, maskComposite: 'intersect' }
          : undefined
      }
    >
      {shouldAnimate ? (
        <DotField
          dotRadius={config.dotRadius}
          dotSpacing={config.dotSpacing}
          cursorRadius={config.cursorRadius}
          cursorForce={config.cursorForce}
          bulgeOnly={config.bulgeOnly}
          bulgeStrength={config.bulgeStrength}
          glowRadius={config.glowRadius}
          sparkle={config.sparkle}
          waveAmplitude={config.waveAmplitude}
          gradientFrom={config.gradientFrom}
          gradientTo={config.gradientTo}
          glowColor={config.glowColor}
        />
      ) : (
        <div
          className="h-full w-full opacity-60"
          style={{
            backgroundImage: `radial-gradient(${
              isDark
                ? rgba(255, 255, 255, DOT_OPACITY_DARK[variant])
                : rgba(17, 17, 17, DOT_OPACITY[variant])
            } 1px, transparent 1px)`,
            backgroundSize: `${DENSITY_CONFIG[density].dotSpacing}px ${DENSITY_CONFIG[density].dotSpacing}px`,
          }}
        />
      )}
    </div>
  );
}
