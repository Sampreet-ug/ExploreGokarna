# Optimization TODO

## Step 1: Create optimization audit checklist
- [ ] Identify top performance bottlenecks (fonts, hero/background images, JS reveal cost)
- [ ] Identify SEO/structure gaps (OG/Twitter consistency, canonical consistency, routing consistency)

## Step 2: Implement Core Web Vitals improvements
- [ ] Reduce font blocking (font-display + weight/family minimization; consider self-host)
- [ ] Replace/optimize remote Unsplash backgrounds (serve local optimized webp or reduce size)
- [ ] Add `loading="lazy"` + `decoding="async"` + ensure width/height across pages
- [ ] Add reduced-motion handling for scroll reveal

## Step 3: Implement JS runtime optimizations
- [ ] Replace long reveal selector with `data-reveal` approach (or page-scoped selectors)
- [ ] Limit transitionDelay work to fewer targets
- [ ] Ensure scripts load efficiently (confirm defer/defer where applicable)

## Step 4: Implement SEO/structure improvements
- [ ] Add consistent OpenGraph + Twitter meta tags across pages
- [ ] Verify canonical + routes start with `/` consistently
- [ ] Ensure JSON-LD not duplicated unnecessarily; validate schema

## Step 5: Validate
- [ ] Lighthouse runs on home + article + experiences
- [ ] Check console errors and layout shifts

