## 30. CSS Align

## 📘 Introduction
Aligning elements is one of the most common tasks in CSS. There are many techniques depending on the context: text alignment, block-level centering, absolute positioning with transforms, and the powerful alignment properties of Flexbox and Grid. Choosing the right approach depends on the element type and layout model.

## 🧠 Key Concepts
- **`text-align`**: Aligns inline/inline-block content horizontally within a block container (`left`, `center`, `right`, `justify`)
- **`margin: auto`**: Centers a block-level element horizontally by distributing equal space on both sides; requires a set width
- **`position + transform`**: `top: 50%; left: 50%; transform: translate(-50%, -50%)` centers an element both horizontally and vertically regardless of size
- **Flexbox alignment**:
  - `justify-content`: Main-axis alignment (flex-start, center, flex-end, space-between, space-around, space-evenly)
  - `align-items`: Cross-axis alignment (stretch, center, flex-start, flex-end, baseline)
  - `align-self`: Override alignment for individual flex items
- **Grid alignment**:
  - `justify-items` / `align-items`: Alignment of grid items within their cells
  - `justify-content` / `align-content`: Alignment of the entire grid within the grid container
  - `justify-self` / `align-self`: Per-item override in Grid

## 💻 Syntax

```css
/* Text alignment */
.text-center { text-align: center; }

/* Block centering */
.block-center {
  width: 300px;
  margin: 0 auto;
}

/* Absolute centering with transform */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Flexbox centering */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid centering */
.grid-center {
  display: grid;
  place-items: center;
}
```

## ✅ Example 1 - Basic (Centering with Multiple Methods)

**Problem:** Demonstrate four different ways to center content in CSS using `text-align`, `margin: auto`, `position + transform`, and `flexbox`.

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
    font-family: Arial;
    background: #f0f0f0;
    padding: 30px;
  }
  .demo-section {
    margin-bottom: 30px;
  }
  .demo-section h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }

  /* Method 1: text-align */
  .method-1 {
    text-align: center;
    background: #ecf0f1;
    padding: 20px;
    border-radius: 6px;
  }
  .method-1 span {
    background: #3498db;
    color: white;
    padding: 10px 20px;
    display: inline-block;
    border-radius: 4px;
  }

  /* Method 2: margin auto */
  .method-2 {
    width: 250px;
    margin: 0 auto;
    background: #2ecc71;
    color: white;
    padding: 15px;
    text-align: center;
    border-radius: 6px;
  }

  /* Method 3: position + transform */
  .method-3-wrapper {
    position: relative;
    height: 150px;
    background: #ecf0f1;
    border-radius: 6px;
  }
  .method-3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e74c3c;
    color: white;
    padding: 15px 25px;
    border-radius: 6px;
  }

  /* Method 4: flexbox */
  .method-4 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background: #ecf0f1;
    border-radius: 6px;
  }
  .method-4 span {
    background: #9b59b6;
    color: white;
    padding: 15px 25px;
    border-radius: 6px;
  }
</style>
</head>
<body>
  <div class="demo-section">
    <h3>1. text-align: center (inline-block child)</h3>
    <div class="method-1"><span>Centered inline-block</span></div>
  </div>
  <div class="demo-section">
    <h3>2. margin: auto (block element)</h3>
    <div class="method-2">Centered block</div>
  </div>
  <div class="demo-section">
    <h3>3. position + transform (absolute)</h3>
    <div class="method-3-wrapper">
      <div class="method-3">Absolute Centered</div>
    </div>
  </div>
  <div class="demo-section">
    <h3>4. flexbox (justify-content + align-items)</h3>
    <div class="method-4"><span>Flexbox Centered</span></div>
  </div>
</body>
</html>
```

**Output:** Four sections, each demonstrating a different centering technique with distinct styling.

**Explanation:** Each method has a specific use case. `text-align` is best for inline content. `margin: auto` centers block elements with a defined width. `position + transform` centers absolutely positioned elements. Flexbox is the most versatile for centering within a container of any size.

## 🚀 Example 2 - Intermediate (Flexbox and Grid Alignment Comparison)

**Problem:** Build a dashboard widget layout that uses both Flexbox and Grid alignment properties to position content, showing the differences between the two models.

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
    font-family: Arial;
    background: #ecf0f1;
    padding: 30px;
  }
  .container {
    max-width: 960px;
    margin: 0 auto;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 15px;
  }

  /* --- Flexbox Widget --- */
  .flex-widget {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 15px;
    margin-bottom: 40px;
  }
  .flex-card {
    flex: 1;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 180px;
  }
  .flex-card .icon {
    font-size: 2em;
    margin-bottom: 10px;
  }
  .flex-card .value {
    font-size: 1.8em;
    font-weight: bold;
    color: #2c3e50;
  }
  .flex-card .label {
    color: #888;
    font-size: 0.85em;
    margin-top: 5px;
  }
  .flex-card.highlight {
    align-self: center; /* override */
    background: #3498db;
    color: white;
    flex: 1.5;
  }
  .flex-card.highlight .value,
  .flex-card.highlight .label {
    color: white;
  }

  /* --- Grid Widget --- */
  .grid-widget {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    justify-items: center;
    align-items: center;
    margin-bottom: 40px;
  }
  .grid-card {
    background: white;
    border-radius: 10px;
    width: 100%;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    text-align: center;
  }
  .grid-card .icon {
    font-size: 2em;
    margin-bottom: 10px;
  }
  .grid-card .value {
    font-size: 1.8em;
    font-weight: bold;
    color: #2c3e50;
  }
  .grid-card .label {
    color: #888;
    font-size: 0.85em;
    margin-top: 5px;
  }
  .grid-card.featured {
    background: #2ecc71;
    color: white;
  }
  .grid-card.featured .value,
  .grid-card.featured .label {
    color: white;
  }
  .grid-card.featured {
    justify-self: stretch; /* override default */
    align-self: stretch;
  }
</style>
</head>
<body>
  <div class="container">
    <h2>Flexbox Alignment</h2>
    <div class="flex-widget">
      <div class="flex-card">
        <div class="icon">📦</div>
        <div class="value">245</div>
        <div class="label">Total Orders</div>
      </div>
      <div class="flex-card highlight">
        <div class="icon">⭐</div>
        <div class="value">4.8</div>
        <div class="label">Avg Rating</div>
      </div>
      <div class="flex-card">
        <div class="icon">👥</div>
        <div class="value">1,280</div>
        <div class="label">Users</div>
      </div>
    </div>

    <h2>Grid Alignment</h2>
    <div class="grid-widget">
      <div class="grid-card">
        <div class="icon">💰</div>
        <div class="value">$12.4k</div>
        <div class="label">Revenue</div>
      </div>
      <div class="grid-card featured">
        <div class="icon">🔥</div>
        <div class="value">+23%</div>
        <div class="label">Growth</div>
      </div>
      <div class="grid-card">
        <div class="icon">📊</div>
        <div class="value">89</div>
        <div class="label">Active Now</div>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** Two widget dashboards. The Flexbox section has cards with `justify-content: space-between` and one card has a custom `align-self`. The Grid section shows `justify-items: center` and `align-items: center`, with one card overriding via `justify-self: stretch`.

**Explanation:** Flexbox aligns items along a single axis (main/cross). Grid offers two-dimensional alignment with `justify-items`/`align-items` for all items, and `justify-self`/`align-self` for individual items. `place-items: center` is shorthand for both `justify-items` and `align-items: center`.

## 🏢 Real World Use Case
Dashboard metrics cards, hero sections with centered text/buttons, modal dialogs, navigation toolbars, responsive form layouts, and landing page call-to-action sections all require robust alignment techniques.

## 🎯 Interview Questions

1. **What is the difference between `justify-content` and `align-items` in Flexbox?**
   *`justify-content` aligns items along the main axis (horizontal by default). `align-items` aligns items along the cross axis (vertical by default).*

2. **How do you center an element both horizontally and vertically with CSS Grid?**
   *Use `place-items: center` on the grid container, which is shorthand for `align-items: center; justify-items: center`.*

3. **When would you use `position: absolute + transform` for centering instead of Flexbox?**
   *When you need to center an element within a positioned container without affecting the layout of sibling elements, or when building overlays/modals that need to float above other content.*

4. **Why does `margin: auto` only work horizontally by default?**
   *Block elements naturally fill the full width of their parent, so `auto` margins distribute extra space left/right. Vertical centering with `margin: auto` only works when the element has explicit positioning or in flex/grid contexts.*

5. **What is the difference between `align-content` and `align-items` in Flexbox?**
   *`align-items` aligns individual items within the cross axis of each row. `align-content` distributes space between multiple rows of wrapped flex items (only works with `flex-wrap: wrap`).*

## ⚠ Common Errors / Mistakes

- **Using `text-align: center` on block elements**: Only centers inline/inline-block children, not block children
- **Expecting `margin: auto` to work without a set width**: Block elements without width are 100% wide, leaving no room for centering
- **Forgetting `transform: translate` offsets**: `top: 50%; left: 50%` alone centers the element's top-left corner, not its center
- **Mixing up `justify-content` and `align-items`**: Swapping them is a common mistake since their behavior depends on `flex-direction`
- **Using `place-items` in a context that doesn't support it**: `place-items` is a Grid shorthand and may not work as expected in Flexbox

## 📝 Practice Exercises

### Beginner
1. Use `text-align: center` to center a heading and a paragraph inside a `<div>`.
2. Create a `<div>` with `width: 200px` and `margin: 0 auto` — observe it centered horizontally.
3. Use flexbox with `justify-content: center` and `align-items: center` to center a single `<span>` inside a 300px-tall container.

### Intermediate
4. Build a row of 3 buttons using flexbox with `justify-content: space-between` so the first button is left, the second centered, and the third right-aligned.
5. Create a grid of 4 cards using `display: grid` with `grid-template-columns: repeat(2, 1fr)` and `place-items: center`. Give each card a different height and observe how they align.
6. Build a hero section with centered text (horizontally and vertically) using both `position: absolute + transform` and flexbox. Use a background image for the hero.

### Advanced
7. Build a responsive dashboard layout with flexbox: a sidebar (250px), main content area (flex: 1), and a right panel (200px). Use different alignment strategies for nested content: `space-between` for the toolbar, `center` for a status indicator, and `stretch` for card containers.
8. Create a complex Grid layout with `grid-template-areas` for a page layout (header, nav, main, aside, footer). Align the nav items using `justify-content: space-around` inside the grid cell, and center the footer text both horizontally and vertically.
