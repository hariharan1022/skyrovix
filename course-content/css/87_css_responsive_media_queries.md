## 87. CSS RWD Media Queries

## 📘 Introduction
Media queries are the cornerstone of responsive design. They allow you to apply CSS rules conditionally based on device characteristics like width, height, resolution, orientation, and user preferences. Introduced in CSS3, media queries enable a single stylesheet to adapt to anything from a small phone to a 4K monitor.

## 🧠 Key Concepts
- **`@media (min-width: ...)`** – applies styles when viewport is AT LEAST that width (mobile-first)
- **`@media (max-width: ...)`** – applies styles when viewport is AT MOST that width (desktop-first)
- **Common breakpoints** – 576px (phone landscape), 768px (tablet), 992px (small desktop), 1200px (large desktop)
- **Mobile-first vs Desktop-first** – approach determines whether you use min-width or max-width
- **`orientation`** – detects portrait vs landscape mode
- **`prefers-color-scheme`** – detects light/dark mode preference
- **`prefers-reduced-motion`** – detects motion sensitivity preference
- **Range syntax** – modern `@media (width >= 768px)` syntax (Chrome 104+, FF 102+)

## 💻 Syntax

```css
/* Mobile-first (min-width) */
@media (min-width: 768px) {
  .container { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 992px) {
  .container { grid-template-columns: 1fr 1fr 1fr; }
}

/* Desktop-first (max-width) */
@media (max-width: 991px) {
  .sidebar { display: none; }
}

/* Range syntax (modern) */
@media (576px <= width < 992px) {
  .card { font-size: 1rem; }
}

/* Orientation */
@media (orientation: landscape) {
  .sidebar { width: 300px; }
}

/* User preferences */
@media (prefers-color-scheme: dark) {
  body { background: #222; color: #eee; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}

/* Combining conditions */
@media (min-width: 768px) and (hover: hover) {
  .card:hover { transform: scale(1.05); }
}
```

## ✅ Example 1 - Basic: Mobile-first responsive navigation

**Problem:** Build a navigation that is vertical on mobile and horizontal on desktop.

**HTML:**
```html
<nav class="nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Contact</a>
</nav>
```

**CSS:**
```css
/* Mobile first — stacked by default */
.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 1rem;
}
.nav a {
  display: block;
  padding: 0.75rem 1rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: center;
  }
  .nav a { flex: 0 1 auto; }
}
```

**Output:**
On mobile (<768px), links are stacked vertically as full-width blocks. On tablet and larger, they sit in a horizontal row centered in the viewport.

**Explanation:**
The base styles (no query) define the mobile layout. The `min-width: 768px` query only fires when the viewport is at least 768px wide, switching to a horizontal layout. This ensures mobile devices don't load the desktop styles.

## 🚀 Example 2 - Intermediate: Dark mode + reduced motion + responsive grid

**Problem:** Create a page that respects both the user's color scheme preference and motion sensitivity, while also being responsive.

**HTML:**
```html
<div class="gallery">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

**CSS:**
```css
:root {
  --bg: #fff;
  --text: #222;
  --card: #f4f4f4;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a2e;
    --text: #eee;
    --card: #16213e;
  }
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.item {
  background: var(--card);
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

@media (min-width: 600px) {
  .gallery { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 900px) {
  .gallery { grid-template-columns: 1fr 1fr 1fr; }
}

/* Only allow hover zoom if user has no motion preference */
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .item:hover {
    transform: scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}
```

**Output:**
A dark-themed gallery on systems with dark mode enabled, light theme otherwise. The grid goes from 1 to 2 to 3 columns at breakpoints. Hover animations only work on devices with hover capability and only when the user hasn't requested reduced motion.

**Explanation:**
This example demonstrates combining multiple media query features. `prefers-color-scheme` controls theming. `prefers-reduced-motion` disables animations for users with vestibular disorders. The `hover: hover` query ensures touch devices don't get stuck with "sticky hover" states.

## 🏢 Real World Use Case
Every production website uses media queries. Accessibility-focused sites combine `prefers-reduced-motion`, `prefers-contrast: more`, and `prefers-color-scheme: dark` with responsive breakpoints to serve all users effectively.

## 🎯 Interview Questions

1. **Q:** What is the difference between mobile-first and desktop-first media queries?
   **A:** Mobile-first uses `min-width`, adding styles as the viewport grows. Desktop-first uses `max-width`, overriding styles as the viewport shrinks. Mobile-first is recommended because it's simpler and performs better on mobile.

2. **Q:** What are the commonly used responsive breakpoints?
   **A:** There are no "standard" breakpoints, but common ranges are: 576px (phones landscape), 768px (tablets), 992px (small desktops), 1200px (large desktops), 1400px (extra large).

3. **Q:** How do you detect dark mode preference in CSS?
   **A:** Using `@media (prefers-color-scheme: dark)`. There's also `prefers-color-scheme: light` and the deprecated `no-preference` value.

4. **Q:** What is `prefers-reduced-motion` and why is it important?
   **A:** It detects if the user has requested reduced motion in their OS accessibility settings. Respecting it prevents discomfort for users with vestibular disorders and is a WCAG requirement.

5. **Q:** What is the newer range syntax for media queries?
   **A:** Instead of `@media (min-width: 768px) and (max-width: 991px)`, you can write `@media (768px <= width <= 991px)`. It's supported in Chrome 104+, Firefox 102+, and Safari 16+.

## ⚠ Common Errors / Mistakes

- Using `max-width` breakpoints in a mobile-first approach, creating unnecessary overrides
- Forgetting the space before `and` in `@media (min-width: 768px) and (max-width: 991px)` — the syntax is strict
- Not including `prefers-reduced-motion` overrides, causing accessibility issues
- Using `hover` queries without considering touch devices (touch devices don't have hover, so hover-only interactions fail)
- Overusing breakpoints — often 2-3 well-chosen breakpoints are better than 7-8

## 📝 Practice Exercises

**Beginner:**
1. Write a media query that changes the background color of the body at 768px viewport width.
2. Create a layout that shows 2 columns on mobile and 4 columns on desktop.
3. Use `prefers-color-scheme` to set different text/background colors for dark mode.

**Intermediate:**
4. Build a responsive card layout that uses `prefers-reduced-motion: reduce` to disable all card animations.
5. Create a "sticky hover" fix — use `@media (hover: hover)` to apply hover effects only on devices that support hover.
6. Combine `min-width` and `max-width` queries to apply styles only between 768px and 1024px (tablet range).

**Advanced:**
7. Build a complete dark/light theme system with CSS custom properties, `prefers-color-scheme`, and a manual toggle that overrides the OS preference.
8. Create a responsive typography scale that uses the range syntax (`<` and `<=` operators) to adjust font sizes at 4 different breakpoints without overlapping.
