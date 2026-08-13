## 13. CSS Height and Width
## 📘 Introduction
The `height` and `width` properties define the dimensions of elements. CSS offers fixed values, percentage-based sizing, min/max constraints, and viewport-relative units. Mastering sizing is key to creating responsive layouts.

## 🧠 Key Concepts
- **height / width:** Fixed values (px, em, rem) or relative values (%).
- **max-width / min-width:** Constraints on width — `max-width` is essential for responsive design.
- **max-height / min-height:** Constraints on height — useful for dynamic content containers.
- **auto Values:** Default; block elements expand to fill their container width, height auto-calculates to fit content.
- **Percentage Units:** Relative to the containing block's width (for width) or height (for height, if parent has explicit height).
- **Viewport Units:** `vw` (viewport width), `vh` (viewport height), `vmin`, `vmax` — relative to the browser viewport.

## 💻 Syntax
```css
.element {
  width: 300px;
  height: 200px;
  max-width: 100%;
  min-width: 100px;
  max-height: 500px;
  min-height: 50px;

  /* Viewport units */
  width: 50vw;   /* 50% of viewport width */
  height: 100vh; /* 100% of viewport height */

  /* Auto */
  width: auto;
  height: auto;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Create a fixed-size box and a responsive box with max-width.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .fixed {
      width: 400px;
      height: 100px;
      background: #3498db;
      color: white;
    }
    .responsive {
      max-width: 400px;
      height: 100px;
      background: #2ecc71;
      color: white;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="fixed">Fixed 400px wide</div>
  <div class="responsive">Max 400px wide (shrinks on small screens)</div>
</body>
</html>
```
**Output:** Fixed box is always 400px. Responsive box is at most 400px but shrinks if the viewport is narrower.
**Explanation:** `width: 400px` forces the size. `max-width: 400px` allows the box to be smaller when the parent is narrower, which is better for responsive design.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a full-viewport hero section using viewport units.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .hero {
      height: 100vh;
      width: 100vw;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2em;
    }
    .content {
      min-height: 200px;
      background: #f5f5f5;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="hero">Full Viewport Hero</div>
  <div class="content">Content section with min-height</div>
</body>
</html>
```
**Output:** Hero section fills the entire viewport. Content section has at least 200px height but grows with content.
**Explanation:** `100vh` equals the full viewport height. `min-height: 200px` ensures the content section is never shorter than 200px but expands if needed.

## 🏢 Real World Use Case
A product landing page uses `100vh` for hero sections, `max-width: 1200px` with `margin: 0 auto` for content containers, `min-height` for equal-height card columns, and viewport units for responsive font sizes and spacing.

## 🎯 Interview Questions (5 with answers)
1. **What is the difference between `width: 100%` and `width: 100vw`?** `100%` is relative to the containing block; `100vw` is relative to the viewport (includes the scrollbar width).
2. **How does `max-width` help with responsive design?** It allows elements to scale down on smaller screens while capping their maximum size on larger screens.
3. **When does `height: 100%` work?** Only when the parent element has an explicit height defined.
4. **What do `vh`, `vw`, `vmin`, `vmax` mean?** Viewport height percentage, viewport width percentage, the smaller of vw/vh, the larger of vw/vh.
5. **What does `width: auto` do?** It lets the browser calculate the width, typically making block elements fill their container width.

## ⚠ Common Errors / Mistakes
- Using `height: 100%` without parent having an explicit height — the child collapses to content height.
- Setting fixed `height` on containers that need to grow with dynamic content (use `min-height` instead).
- Using `vw` without accounting for scrollbar width (may cause horizontal scroll).
- Assuming `width: 100%` includes padding (it doesn't; use `box-sizing: border-box`).
- Thinking `height: 100vh` accounts for mobile browser chrome (it does, but `100dvh` is newer and more accurate on mobile).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Set a div to 300px wide and 150px tall.
2. Create a div with `max-width: 600px` that shrinks on smaller screens.
3. Make a section span the full viewport height using `100vh`.
4. Create two side-by-side boxes, each `width: 50%`, that fill their container.
5. Use `min-height` to create equal-height columns.
6. Build a responsive card with `max-width` and content that determines its height.
7. Create a full-page layout where header is `10vh`, main content fills remaining space, and footer is `5vh`.
8. Build a responsive grid using percentage widths and `max-width` constraints that adapts from mobile to desktop.
