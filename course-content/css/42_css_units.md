## 42. CSS Units

## 📘 Introduction
CSS units define the measurement system for sizing elements, spacing, typography, and layout. Choosing the right unit is critical for building responsive, accessible, and maintainable designs. CSS provides two broad categories: absolute units (fixed physical measurements) and relative units (calculated relative to something else). Mastering when to use each type separates professional layouts from fragile ones.

## 🧠 Key Concepts
- **Absolute units**: Fixed-size units that do not change based on viewport, parent, or user settings
- **Relative units**: Scale based on context — the parent element, root element, viewport, or font metrics
- **`px`** (pixels): Most common absolute unit; 1px = 1/96th of an inch; device-pixel ratio may vary
- **`em`**: Relative to the font-size of the parent element; compounds with nesting
- **`rem`**: Relative to the root (`html`) element font-size; avoids compounding
- **`%`**: Relative to the parent element's same property value
- **`vw`/`vh`**: 1% of viewport width/height; useful for full-screen sections
- **`vmin`/`vmax`**: 1% of the smaller/larger viewport dimension
- **`ch`**: Width of the "0" character in the current font; great for line-length limits
- **`ex`**: Height of the "x" character; rarely used but available
- **`cm`, `mm`, `in`**: Physical print units; rarely used on screens
- **`pt`, `pc`**: Typographic points (1pt = 1/72in) and picas (1pc = 12pt); used in print stylesheets

## 💻 Syntax

```css
/* Absolute units */
.box-px { width: 300px; }
.box-cm { width: 5cm; }
.box-mm { width: 50mm; }
.box-in { width: 2in; }
.box-pt { font-size: 12pt; }
.box-pc { font-size: 1pc; }

/* Relative units */
.box-percent { width: 50%; }
.box-em { font-size: 1.5em; padding: 1em; }
.box-rem { font-size: 1.25rem; margin: 2rem; }
.box-vw { width: 50vw; }
.box-vh { height: 100vh; }
.box-vmin { width: 50vmin; }
.box-vmax { width: 50vmax; }
.box-ch { max-width: 60ch; }
.box-ex { font-size: 2ex; }
```

## ✅ Example 1 - Basic

**Problem:** Create a responsive card component that works on mobile and desktop, using appropriate relative and absolute units.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  html { font-size: 16px; }
  .card {
    width: 90%;
    max-width: 400px;
    margin: 2rem auto;
    padding: 1.5em;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
  }
  .card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5em;
    color: #2c3e50;
  }
  .card p {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 65ch;
    color: #555;
  }
  .card .meta {
    font-size: 0.875rem;
    color: #999;
    margin-top: 1em;
  }
  button {
    font-size: 1rem;
    padding: 0.5em 1.5em;
    border: 2px solid #3498db;
    background: #3498db;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    html { font-size: 14px; }
    .card { width: 95%; }
  }
</style>
</head>
<body>
  <div class="card">
    <h2>CSS Units in Practice</h2>
    <p>This card uses rem for typography, em for padding, % for fluid width, and ch for readable line length. Resize the browser to see how it adapts.</p>
    <div class="meta">Posted 2 hours ago</div>
    <button>Read More</button>
  </div>
</body>
</html>
```

**Output:** A responsive card that scales proportionally. On large screens the card is 400px wide; on small screens it is 95% wide. Text and spacing scale down when `html` font-size changes.

**Explanation:** `%` makes the card fluid relative to its container. `max-width: 400px` prevents excessive stretching on large screens. `rem` units for typography ensure consistent sizing regardless of nesting depth. `em` for padding scales the inner spacing with the element's font-size. `ch` limits paragraph width for comfortable reading.

## 🚀 Example 2 - Intermediate

**Problem:** Build a full-viewport hero section with a fixed sidebar and fluid main content, demonstrating vw, vh, vmin, calc, and ch units together.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { font-size: 16px; }

  .hero {
    height: 100vh;
    min-height: 400px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5vw;
  }
  .hero h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    color: #fff;
    text-align: center;
    max-width: 20ch;
  }
  .container {
    display: flex;
    min-height: calc(100vh - 60px);
  }
  .sidebar {
    width: 250px;
    padding: 1.5rem;
    background: #f8f9fa;
    flex-shrink: 0;
  }
  .main {
    flex: 1;
    padding: 2rem;
    max-width: 70ch;
  }
  .main p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5em;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .card-grid article {
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
  footer {
    height: 60px;
    background: #2c3e50;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
  }
</style>
</head>
<body>
  <section class="hero">
    <h1>Responsive Design with CSS Units</h1>
  </section>
  <div class="container">
    <aside class="sidebar">
      <h3>Sidebar</h3>
      <p>Fixed width sidebar using absolute pixels. Content below may scroll independently.</p>
    </aside>
    <main class="main">
      <p>This main content area uses ch units to cap line length for readability. The typography uses rem for consistent sizing. The layout responds without media queries thanks to min(), max(), and clamp().</p>
      <div class="card-grid">
        <article><h3>Card 1</h3><p>Using min() for responsive grid.</p></article>
        <article><h3>Card 2</h3><p>Flexible sizing with relative units.</p></article>
        <article><h3>Card 3</h3><p>Auto-fill creates new rows as needed.</p></article>
      </div>
    </main>
  </div>
  <footer>&copy; 2026 CSS Units Demo</footer>
</body>
</html>
```

**Output:** A full-viewport hero section, fixed-width sidebar, fluid main content with readable line lengths, and a responsive card grid that adjusts column count automatically.

**Explanation:** `100vh` gives the hero full viewport height. `5vw` padding scales with viewport width. `clamp()` makes the heading responsive between min and max sizes. `calc()` subtracts the fixed footer height from the container. `ch` keeps paragraphs readable. `min()` in the grid ensures cards never overflow their container.

## 🏢 Real World Use Case
**Design systems and component libraries** (e.g., Material UI, Bootstrap) define spacing and typography scales exclusively in `rem` units to respect user browser font-size preferences for accessibility. Fluid typography using `vw` and `clamp()` is used in marketing sites to create seamless scaling across devices. Print stylesheets use `cm`, `mm`, `in`, `pt`, and `pc` for precise physical output dimensions. Production CSS often prohibits `px` for font sizes and uses `rem` or `em` exclusively to support browser zoom.

## 🎯 Interview Questions

**1. What is the difference between `em` and `rem`?**
`em` is relative to the font-size of the **parent** element and compounds with nesting. `rem` is relative to the font-size of the **root** (`html`) element and does not compound.

**2. When would you use `ch` units?**
`ch` is ideal for setting `max-width` on text containers (paragraphs, articles) to achieve optimal line length (typically 60-75ch) for readability.

**3. What is the difference between `vw` and `%`?**
`vw` is relative to the **viewport width** regardless of parent size. `%` is relative to the **parent element's** same property value.

**4. Why is `px` considered problematic for font sizes in accessibility contexts?**
`px` does not scale when users change their browser's default font-size setting. Relative units like `rem` respect user preferences and are required for WCAG compliance.

**5. What does `vmin` and `vmax` represent?**
`vmin` is 1% of the **smaller** viewport dimension (width or height). `vmax` is 1% of the **larger** dimension. `vmin` is useful for ensuring elements fit within the viewport regardless of orientation.

## ⚠ Common Errors / Mistakes
- Using `px` for typography, which breaks user font-size preferences and fails accessibility audits
- Nesting `em` units deeply — each level compounds the size, quickly producing unexpectedly large or small values
- Assuming `100vw` equals the full viewport width — on some browsers, scrollbars cause `100vw` to exceed the visible width; use `width: 100%` instead
- Mixing incompatible units in `calc()` without proper syntax — operators must have spaces: `calc(100% - 20px)` not `calc(100%-20px)`
- Using `vh` for mobile layouts without accounting for dynamic toolbars — `100vh` may extend past the visible area on mobile browsers

## 📝 Practice Exercises

**Beginner:**
1. Create a page where the `<html>` font-size is 20px, and all heading sizes are defined in `rem`. Verify they scale when you change the root size.
2. Build a box that is exactly 50% of its parent's width with 2em of padding on all sides.
3. Create a full-viewport background section using `100vh` and `100vw` with a centered heading using `vw`-based font-size.

**Intermediate:**
4. Design a responsive pricing card component where font sizes use `rem`, spacing uses `em`, widths use `%`, and max-width uses `ch`. Include a CTA button that scales proportionally.
5. Build a two-column layout where the left sidebar is 250px and the right content area fills the remaining space using `calc(100% - 250px)`. Add `2rem` of padding to the content area.
6. Create a magazine-style article layout where the body text has `max-width: 65ch`, headings use `clamp(1.5rem, 3vw, 3rem)`, and pull quotes use larger `vw`-based sizing.

**Advanced:**
7. Build a complete design system typography scale using only `rem` units. Include 6 heading levels, body text, small text, and captions. The scale must be controllable by changing one root font-size value.
8. Implement a dashboard layout with a sticky header (using `vh`), a resizable sidebar (using `%`), a main content grid using `minmax()` with `ch`-based column widths, and responsive cards using `clamp()` and `vmin` for consistent sizing across orientations.
