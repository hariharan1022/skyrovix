## 82. CSS Grid 12-column Layout

## 📘 Introduction
The 12-column grid is the most widely used layout system in responsive web design. Its popularity comes from the fact that 12 is divisible by 2, 3, 4, and 6, offering enormous flexibility. CSS Grid makes implementing a 12-column system simpler than ever — no external frameworks needed. You can create a robust, responsive grid with `repeat(12, 1fr)`, the `gap` property, and `grid-column: span N`.

## 🧠 Key Concepts
- **repeat(12, 1fr)** – generates 12 equal-width flexible columns
- **grid-column: span N** – makes an item span N columns out of 12
- **grid-template-areas** – maps named layout regions across the columns
- **Media queries** – change column counts on different viewports (12 → 6 → 4 → 2)
- **gap** – gutter spacing between rows and columns
- **Fractional units (fr)** – distributes available space proportionally
- **Nested grids** – a grid item can itself be a grid container

## 💻 Syntax

```css
/* 12-column grid container */
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

/* Span a specific number of columns */
.item-3  { grid-column: span 3; }
.item-6  { grid-column: span 6; }
.item-12 { grid-column: 1 / -1; } /* full width */

/* Named template layout */
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    "h h h h h h h h h h h h"
    "s s s m m m m m m m m m"
    "f f f f f f f f f f f f";
}
```

## ✅ Example 1 - Basic: 12-column responsive grid

**Problem:** Build a content grid where cards span different column widths and stack at smaller sizes.

**HTML:**
```html
<div class="grid-12">
  <div class="card full">Full Width Banner</div>
  <div class="card half">Half Width</div>
  <div class="card half">Half Width</div>
  <div class="card third">One Third</div>
  <div class="card third">One Third</div>
  <div class="card third">One Third</div>
  <div class="card quarter">Quarter</div>
  <div class="card quarter">Quarter</div>
  <div class="card quarter">Quarter</div>
  <div class="card quarter">Quarter</div>
</div>
```

**CSS:**
```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  padding: 16px;
}
.card {
  background: #e0f7fa;
  padding: 1.5rem;
  text-align: center;
  border-radius: 6px;
}
.full    { grid-column: 1 / -1; }
.half    { grid-column: span 6; }
.third   { grid-column: span 4; }
.quarter { grid-column: span 3; }

@media (max-width: 768px) {
  .half    { grid-column: 1 / -1; }
  .third   { grid-column: span 6; }
  .quarter { grid-column: span 6; }
}
```

**Output:**
A responsive 12-column grid. At desktop, cards display in their designated fractions. At 768px and below, halves become full-width, thirds pair into two per row, and quarters stack into two per row.

**Explanation:**
`repeat(12, 1fr)` creates 12 equal columns. `span 6` means the item occupies 6 out of 12 columns (50%). The media query overrides the span values on smaller screens, causing cards to stack into fewer columns.

## 🚀 Example 2 - Intermediate: Named template layout with responsive breakpoints

**Problem:** Design a blog page layout using `grid-template-areas` on a 12-column grid that reflows at tablet and mobile sizes.

**HTML:**
```html
<div class="blog-layout">
  <header class="header">Header</header>
  <nav class="nav">Navigation</nav>
  <main class="main">Main Content</main>
  <aside class="sidebar">Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>
```

**CSS:**
```css
.blog-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
}

.header {
  grid-column: 1 / -1;
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
}
.nav {
  grid-column: span 3;
  background: #34495e;
  color: white;
  padding: 1rem;
}
.main {
  grid-column: span 6;
  background: #ecf0f1;
  padding: 1rem;
}
.sidebar {
  grid-column: span 3;
  background: #bdc3c7;
  padding: 1rem;
}
.footer {
  grid-column: 1 / -1;
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

/* Tablet: 768px */
@media (max-width: 992px) {
  .nav  { grid-column: 1 / -1; }
  .main { grid-column: span 8; }
  .sidebar { grid-column: span 4; }
}

/* Mobile: 576px */
@media (max-width: 576px) {
  .main    { grid-column: 1 / -1; }
  .sidebar { grid-column: 1 / -1; }
}
```

**Output:**
A blog layout with header spanning full width, 3-column nav, 6-column main, 3-column sidebar, and full-width footer. On tablet the nav becomes full-width and content shifts. On mobile everything stacks vertically.

**Explanation:**
This pattern uses `grid-column: span N` without `grid-template-areas` for simplicity. By changing the `span` values at each breakpoint, the layout reflows smoothly. The `max-width: 1200px` with `margin: 0 auto` centers the grid and prevents it from becoming too wide on large screens.

## 🏢 Real World Use Case
SaaS dashboards, e-commerce product grids, news portals, and CMS backends all use 12-column layouts. Frameworks like Bootstrap and Foundation popularized this system, but CSS Grid now lets you build the same thing with native, lighter code.

## 🎯 Interview Questions

1. **Q:** Why is 12 the most common column count for grid systems?
   **A:** 12 divides evenly by 2, 3, 4, and 6, giving maximum flexibility for layouts (halves, thirds, quarters, sixths).

2. **Q:** How does `gap` interact with `repeat(12, 1fr)`?
   **A:** The `gap` value is subtracted from the container width before the `fr` values are calculated, so the columns share the remaining space equally.

3. **Q:** Can you nest a 12-column grid inside a grid item that spans 6 columns?
   **A:** Yes. The nested grid's `1fr` refers to the available width of its parent grid item, not the outer container.

4. **Q:** What is the difference between `grid-column: span 6` and `grid-column: auto / span 6`?
   **A:** `span 6` on its own uses the default `auto` for start, so the browser places the item where it naturally falls. `auto / span 6` is equivalent but more explicit.

5. **Q:** How would you create a 12-column grid with a fixed max-width and centered container?
   **A:** Set `max-width: 1200px; margin: 0 auto;` on the grid container. The grid columns will fill the available space within that max-width.

## ⚠ Common Errors / Mistakes

- Forgetting that `span N` counts columns, not grid lines (span 12 covers all 12 columns in a 12-column grid)
- Not setting `gap` leading to cramped content — always define gutters for readability
- Using fixed pixel columns with `fr` columns together without accounting for total width overflow
- Over-nesting grids when a simpler flex or span approach would work
- Missing max-width, causing the grid to stretch across the entire viewport on ultra-wide screens

## 📝 Practice Exercises

**Beginner:**
1. Create a 12-column grid with three items, each spanning 4 columns.
2. Add a full-width banner (span 12) above a row of four cards (each span 3).
3. Build a simple page: header spanning 12, main content spanning 8, sidebar spanning 4.

**Intermediate:**
4. Convert a traditional Bootstrap-style row/col HTML structure into a CSS Grid 12-column layout without any framework classes.
5. Build a responsive 12-column grid that shows 6 columns on tablet and 4 columns on mobile by adjusting the template, not the span values.
6. Create a magazine-style layout with a featured article spanning 8 columns and 2 rows, alongside smaller items in the remaining 4 columns.

**Advanced:**
7. Build a full homepage layout using `grid-template-areas` on a 12-column grid with header, hero, featured, content, sidebar, and footer — each with different area mappings at 3 breakpoints.
8. Implement a 12-column grid system using CSS custom properties so that component authors can set `--col-span: 4;` and have items respond accordingly.
