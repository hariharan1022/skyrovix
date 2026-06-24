## 85. CSS RWD Viewport & Units

## 📘 Introduction
The viewport is the visible area of a web page on your screen. On mobile devices, without proper viewport configuration, browsers render pages at a typical desktop screen width (980px) and then shrink them — making text tiny and unreadable. The `<meta name="viewport">` tag and CSS viewport units (`vw`, `vh`, `vmin`, `vmax`) are essential tools for controlling how pages scale and adapt.

## 🧠 Key Concepts
- **`<meta name="viewport">`** – HTML tag that controls the viewport dimensions and scaling
- **`width=device-width`** – sets the viewport width to the device's physical width
- **`initial-scale=1`** – sets the initial zoom level to 1:1 between CSS pixels and device pixels
- **`vw`** – 1% of the viewport width
- **`vh`** – 1% of the viewport height
- **`vmin`** – 1% of the smaller dimension (width or height)
- **`vmax`** – 1% of the larger dimension (width or height)
- **`clamp()`** – CSS function that clamps a value between a minimum and maximum
- **Responsive typography** – using viewport units + `clamp()` to create fluid text sizing

## 💻 Syntax

```html
<!-- Essential viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

```css
/* Viewport units */
.hero {
  height: 100vh;              /* full viewport height */
  width: 100vw;               /* full viewport width */
}

.sidebar {
  height: 100vh;              /* full height sidebar */
}

.min-box {
  width: 50vmin;             /* 50% of the smaller dimension */
}

.max-box {
  width: 50vmax;             /* 50% of the larger dimension */
}

/* Responsive typography with clamp() */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Safe area insets for notched devices */
.content {
  padding-left: max(1rem, env(safe-area-inset-left));
}
```

## ✅ Example 1 - Basic: Viewport meta tag comparison

**Problem:** Show the difference between a page with and without the viewport meta tag on a mobile device.

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; font-family: sans-serif; }
    .box {
      width: 400px;
      padding: 1rem;
      background: #3498db;
      color: white;
      margin: 1rem;
    }
  </style>
</head>
<body>
  <div class="box">This box is 400px wide</div>
</body>
</html>
```

**Output:**
With the viewport meta tag, the box appears at actual size (400px) and matches the device width. Without it, mobile browsers assume 980px viewport and shrink everything — the 400px box would look tiny.

**Explanation:**
Without `viewport`, mobile browsers default to a "virtual viewport" of 980px and scale down the page. `width=device-width` sets the viewport to match the device's actual screen width, so CSS pixel values map 1:1 to physical pixels.

## 🚀 Example 2 - Intermediate: Fluid hero section with viewport units and clamp()

**Problem:** Create a hero section that fills the viewport, with text that scales smoothly between screen sizes.

**HTML:**
```html
<section class="hero">
  <h1>Welcome to Our Platform</h1>
  <p>Build responsive experiences that work everywhere.</p>
  <a href="#" class="cta">Get Started</a>
</section>
```

**CSS:**
```css
* { margin: 0; box-sizing: border-box; }

.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* Fluid height */
  min-height: 100vh;
  min-height: 100dvh; /* dynamic viewport height — modern */

  /* Fluid padding using vw */
  padding: 2rem 5vw;

  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.hero h1 {
  /* Smooth scaling: min 2rem, preferred 6vw, max 4rem */
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 0.5em;
}

.hero p {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  max-width: 60ch;
  line-height: 1.6;
}

.cta {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background: white;
  color: #667eea;
  border-radius: 2rem;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}
```

**Output:**
The hero always fills the viewport (using `100dvh` on supporting browsers, falling back to `100vh`). The heading scales smoothly from 2rem (mobile) to 4rem (desktop). The paragraph and button also scale proportionally without any media query.

**Explanation:**
`100vh` fills the full viewport height but doesn't account for mobile browser chrome (address bar). `100dvh` (dynamic viewport height) handles this better in modern browsers. `clamp(MIN, PREFERRED, MAX)` creates fluid typography — the middle value (e.g., `6vw`) scales with the viewport, but never goes below the min or above the max.

## 🏢 Real World Use Case
Landing pages, splash screens, and full-screen experiences use viewport units for consistent sizing across devices. Viewport units combined with `clamp()` are the modern standard for fluid typography, replacing countless media query breakpoints.

## 🎯 Interview Questions

1. **Q:** What does `width=device-width, initial-scale=1` actually do?
   **A:** `width=device-width` sets the viewport width to match the device's CSS pixel width. `initial-scale=1` sets a 1:1 relationship between CSS pixels and device pixels, preventing default zoom.

2. **Q:** What is the difference between `vh`, `svh`, `lvh`, and `dvh`?
   **A:** `vh` is 1% of the initial containing block height. `svh` (small viewport) excludes browser chrome. `lvh` (large viewport) includes the maximum height. `dvh` (dynamic) adjusts dynamically as chrome shows/hides.

3. **Q:** What is the problem with using `100vw` for full-width containers?
   **A:** On some systems, `100vw` includes the scrollbar width, causing horizontal overflow. Use `width: 100%` inside a full-width parent instead, or add `overflow-x: hidden` on the body.

4. **Q:** How does `clamp()` work for responsive font sizing?
   **A:** `clamp(MIN, PREFERRED, MAX)` sets a fluid value. The browser calculates `PREFERRED` (e.g., `4vw`), then constrains it to never go below `MIN` or above `MAX`. This eliminates the need for separate breakpoints for typography.

5. **Q:** What is `env(safe-area-inset-left)` used for?
   **A:** It provides padding values for the "notch" area on devices like iPhones with rounded corners or camera cutouts, ensuring content isn't hidden behind hardware features.

## ⚠ Common Errors / Mistakes

- Forgetting the viewport meta tag entirely — the most common responsive design mistake
- Using `100vh` on mobile without addressing the address bar issue (use `100dvh` with a fallback)
- Setting `user-scalable=no` in the viewport meta tag — harmful for accessibility
- Using `100vw` for a full-width element without accounting for scrollbar width
- Overusing viewport units in typography — without `clamp()`, text can become too tiny on small screens or absurdly large on wide screens

## 📝 Practice Exercises

**Beginner:**
1. Create a full-viewport-height hero section with a centered heading (no media queries).
2. Use `vw` units to create a box that is always 50% of the viewport width.
3. Add the viewport meta tag to an HTML page and observe the difference in mobile rendering.

**Intermediate:**
4. Build a responsive pricing card where `font-size` and `padding` scale fluidly using `clamp()` between mobile (360px) and desktop (1440px).
5. Create a split-screen layout where one side is `60vw` and the other fills the remaining space — ensure it works on mobile without overflow.
6. Use `vmin` to create a square element that remains square regardless of viewport aspect ratio.

**Advanced:**
7. Build a CSS-only full-screen slideshow that uses `100dvh` with an `env(safe-area-inset-*)` fallback for notched devices.
8. Create a utility class system for fluid spacing (margin/padding) using CSS custom properties and `clamp()` that scales from a mobile value to a desktop value based on viewport width.
