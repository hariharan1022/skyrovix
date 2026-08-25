## 24. CSS Position

## 📘 Introduction
The `position` property controls how an element is placed in the document. It unlocks advanced layouts like fixed headers, absolute overlays, sticky sidebars, and layered UI components. Understanding positioning is essential for controlling element overlap and creating complex visual hierarchies.

## 🧠 Key Concepts
- **`static`**: Default positioning — element follows normal document flow; `top`/`right`/`bottom`/`left`/`z-index` have no effect
- **`relative`**: Element stays in flow but can be offset relative to its normal position using `top`/`right`/`bottom`/`left`; also creates a positioning context for absolute children
- **`absolute`**: Element is removed from normal flow and positioned relative to its nearest positioned ancestor (non-static); if none, relative to `<html>`
- **`fixed`**: Element is removed from flow and positioned relative to the viewport; stays in place during scrolling
- **`sticky`**: Hybrid of relative and fixed — element scrolls normally until it reaches a threshold, then "sticks" in place
- **`z-index`**: Controls stacking order of positioned elements (higher value = closer to viewer)
- **Positioning contexts**: A parent with `position: relative`, `absolute`, `fixed`, or `sticky` becomes the reference for absolutely positioned children
- **Stacking context**: A group of elements rendered together; created by `position` + `z-index`, `opacity < 1`, `transform`, `filter`, etc.

## 💻 Syntax

```css
/* Relative positioning */
.relative-box {
  position: relative;
  top: 20px;
  left: 20px;
}

/* Absolute positioning */
.absolute-box {
  position: absolute;
  top: 0;
  right: 0;
}

/* Fixed positioning */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Sticky positioning */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

## ✅ Example 1 - Basic (Relative vs Absolute Positioning)

**Problem:** Demonstrate how `relative` and `absolute` positioning work together to place a badge over a card.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    padding: 40px;
    font-family: Arial;
    background: #f0f0f0;
  }
  .card {
    position: relative;
    width: 300px;
    padding: 30px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  .badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #e74c3c;
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: bold;
  }
  .card h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }
  .card p {
    color: #666;
    line-height: 1.6;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">NEW</div>
    <h3>Product Card</h3>
    <p>This card has an absolutely positioned badge in the top-right corner. The card itself is position: relative, creating the positioning context for the badge.</p>
  </div>
</body>
</html>
```

**Output:** A white card with a red "NEW" badge overlapping the top-right corner, extending slightly outside the card boundary.

**Explanation:** The `.card` has `position: relative` (no offset — stays in normal flow). The `.badge` has `position: absolute` and is positioned relative to the card because the card is the nearest positioned ancestor. The negative `top`/`right` values pull the badge outside the card.

## 🚀 Example 2 - Intermediate (Sticky Header with Fixed Footer)

**Problem:** Create a page layout with a fixed top navigation bar, a sticky section header, and a fixed footer — showcasing different position values.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    padding-top: 60px;  /* space for fixed header */
    padding-bottom: 50px; /* space for fixed footer */
  }

  /* Fixed header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #2c3e50;
    color: white;
    padding: 15px 30px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  .header h2 {
    display: inline;
    font-size: 1.2em;
  }

  /* Sticky section header */
  .section-header {
    position: sticky;
    top: 60px; /* below fixed header */
    background: #3498db;
    color: white;
    padding: 10px 20px;
    z-index: 500;
    margin: 0;
  }

  .content {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
  .content p {
    margin-bottom: 20px;
    color: #444;
  }

  /* Fixed footer */
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 12px;
    font-size: 0.9em;
  }
</style>
</head>
<body>
  <div class="header"><h2>My Website</h2></div>

  <div class="content">
    <p>Lorem ipsum dolor sit amet...</p>
    <p>Scroll down to see stickiness in action...</p>
    <p>[Repeated for scroll effect]</p>
    <p>...</p>
  </div>

  <h2 class="section-header">Section A: Introduction</h2>
  <div class="content">
    <p>Content for Section A...</p>
    <p>[Scroll further]</p>
  </div>

  <h2 class="section-header">Section B: Details</h2>
  <div class="content">
    <p>Content for Section B...</p>
    <p>[More content]</p>
  </div>

  <div class="footer">© 2026 My Company</div>
</body>
</html>
```

**Output:** A fixed top bar stays visible, section headers stick below it when scrolling, and a fixed footer stays at the bottom.

**Explanation:** `.header` uses `position: fixed` to stay at the top. `.section-header` uses `position: sticky` with `top: 60px` — it scrolls normally until reaching 60px from the viewport top, then sticks. `.footer` is `position: fixed` at the bottom. Note the `padding-top`/`padding-bottom` on `body` prevents content from hiding behind fixed elements.

## 🏢 Real World Use Case
Fixed navigation bars are ubiquitous on modern websites. Sticky table headers help users keep column context while scrolling through long data tables. Absolutely positioned tooltips, modals, dropdowns, and badge overlays all rely on positioning contexts.

## 🎯 Interview Questions

1. **What is the difference between `position: relative` and `position: absolute`?**
   *`relative` keeps the element in normal document flow but offsets it visually; its original space is preserved. `absolute` removes the element from flow entirely and positions it relative to the nearest positioned ancestor.*

2. **When does `position: sticky` become "stuck"?**
   *A sticky element acts as `relative` until scrolling reaches a specified threshold (`top`, `bottom`, etc.), at which point it becomes `fixed`-like within its parent container. It only sticks while its parent is in view.*

3. **What creates a new positioning context?**
   *Any element with `position` set to a value other than `static` (i.e., `relative`, `absolute`, `fixed`, or `sticky`). Absolute children will be positioned relative to this element.*

4. **How do you prevent a fixed header from covering page content?**
   *Add `padding-top` or `margin-top` to the `<body>` or main content wrapper equal to the fixed header's height.*

5. **What is a stacking context, and how is it created?**
   *A stacking context is a group of elements rendered together on the Z-axis. It is created by positioning + `z-index` (other than `auto`), `opacity < 1`, `transform`, `filter`, `will-change`, etc. Children inside a stacking context are layered within that context only.*

## ⚠ Common Errors / Mistakes

- **Forgetting a positioning context for absolute elements**: If no ancestor is positioned, absolute elements position relative to `<html>`, often causing unexpected placement
- **Not reserving space for fixed elements**: Fixed elements are removed from flow — content behind them is hidden unless padding/margin is added
- **Using `sticky` without a `top`/`bottom` threshold**: Sticky won't work unless at least one offset value is set
- **Confusing `fixed` with `sticky`**: Fixed is always relative to the viewport; sticky is relative to its parent and only activates after scrolling
- **Applying `z-index` to `static` elements**: `z-index` has no effect on non-positioned (`static`) elements

## 📝 Practice Exercises

### Beginner
1. Create a `div` with `position: relative` and offset it 30px down and 30px right. Confirm the original space is preserved.
2. Create a parent `div` (relative) containing a child `div` (absolute) placed at the top-left corner of the parent.
3. Create a fixed "back to top" button at the bottom-right of the viewport using `position: fixed`.

### Intermediate
4. Build a card grid where each card has a relative container and an absolutely positioned "Sale" badge at the top-left corner.
5. Create a page with `position: sticky` section headers that remain visible when scrolling through long content sections.
6. Build an image overlay using an absolutely positioned `<div>` over a `<img>` inside a `position: relative` container, with a semi-transparent background.

### Advanced
7. Create a modal dialog centered both vertically and horizontally using `position: fixed` with `top: 50%; left: 50%; transform: translate(-50%, -50%)`. Include a semi-transparent overlay behind it.
8. Build a multi-level dropdown navigation where each submenu uses `position: absolute` inside a `position: relative` parent, and ensure submenus don't overflow the viewport boundary using JavaScript-free CSS adjustments.
