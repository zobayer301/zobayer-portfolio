# Mobile Optimization Spec

## Overview

Comprehensive mobile optimization for zobayer-portfolio. The site already has responsive Tailwind layouts but lacks JS-side mobile detection for performance-heavy features and needs touch target improvements.

## Approach

Tailwind-first with existing useIsMobile hook for JS decisions. No new dependencies.

## Changes

### 1. Use Existing useIsMobile Hook

**File:** src/hooks/use-mobile.tsx (already exists)

- Already uses matchMedia listener with 768px breakpoint
- SSR-safe via undefined initial state
- Import from @/hooks/use-mobile in components that need it

### 2. GrainOverlay — Disable on mobile

**File:** src/components/GrainOverlay.tsx

GrainOverlay runs nimation: grain 8s steps(10) infinite on a large SVG texture — GPU-intensive on mobile.

Changes:
- Import useIsMobile
- Return 
ull when isMobile is true
- Zero CSS animation overhead on mobile

### 3. Navigation — Improved dropdown + touch targets

**File:** src/components/Navigation.tsx

Current issues: menu items too small, no backdrop, abrupt disappear.

Changes:
- Import useIsMobile (for backdrop behavior)
- Add min-h-[44px] to all nav buttons (both mobile and desktop)
- Add semi-transparent backdrop overlay when mobile menu is open (z-40, between header z-50 and page content)
- Increase dropdown padding/gaps (gap-3 to gap-4, add py-2 to items)
- Add ramer-motion AnimatePresence + motion.div for smooth menu open/close

### 4. Animation optimization — viewport margins + reduced-motion

**Files:** About.tsx, Skills.tsx, Work.tsx, Education.tsx, GithubStats.tsx, Contact.tsx

Each component has a adeInUp constant with iewport: { margin: '-100px' }.

Changes:
- Create useReducedMotion() hook in src/hooks/useReducedMotion.ts that returns a boolean from prefers-reduced-motion: reduce
- In each component, conditionally return immediate-visible variants when reduced motion is on:
  `	s
  const prefersReduced = useReducedMotion()
  const fadeInUp = {
    initial: prefersReduced ? false : { opacity: 0, y: 40 },
    whileInView: prefersReduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: prefersReduced ? 0 : 0.8, ease: 'easeOut' }
  }
  `
- Reduce iewport.margin from -100px to -20px on mobile (shorter screens need earlier trigger — less negative = triggers when element is closer to viewport edge)

### 5. Touch target sizing — all interactive elements

Audit and add min-h-[44px] to:
- Nav dropdown buttons (Navigation.tsx)
- Social links in mobile header (Navigation.tsx:71-83)
- Contact links (Contact.tsx)
- Work project rows (Work.tsx)

Most already have adequate padding via py-5/py-6/py-8; mainly tightening nav and social links.

## Files Modified

1. src/hooks/useReducedMotion.ts — new hook
2. src/components/GrainOverlay.tsx — disable on mobile
3. src/components/Navigation.tsx — improved dropdown + touch targets
4. src/components/About.tsx — animation viewport margin + reduced-motion
5. src/components/Skills.tsx — animation viewport margin + reduced-motion
6. src/components/Work.tsx — animation viewport margin + reduced-motion
7. src/components/Education.tsx — animation viewport margin + reduced-motion
8. src/components/GithubStats.tsx — animation viewport margin + reduced-motion
9. src/components/Contact.tsx — animation viewport margin + reduced-motion

## Verification

- 
npm run lint passes
- 
npm run build passes
- Manual check: resize browser below 768px, verify:
  - GrainOverlay disappears
  - Nav dropdown has larger touch targets + backdrop
  - Animations still fire (unless OS reduced-motion is on)
  - All touch targets are at least 44px tall
