## 78. CSS Flexbox Intro
## 📘 Introduction
Flexbox (Flexible Box Layout) is a one-dimensional layout model that distributes space along a single axis—either horizontally (row) or vertically (column). It solves common layout challenges like centering, equal-height columns, and space distribution with minimal, intuitive CSS.

## 🧠 Key Concepts
- **display: flex** – Turns an element into a flex container
- **flex-direction** – Defines the main axis direction (`row` default, `row-reverse`, `column`, `column-reverse`)
- **Main axis** – The primary direction items are laid out (horizontal for `row`, vertical for `column`)
- **Cross axis** – The perpendicular direction to the main axis
- **Flex container** – The parent element with `display: flex`
- **Flex items** – Direct children of the flex container
- **Flex model** – Items stretch, shrink, and align along both axes based on container properties
- **Container properties** – `justify-content` (main axis alignment), `align-items` (cross axis alignment), `flex-wrap`, `gap`

## 💻 Syntax
```css
/* Flex container */
.container {
  display: flex;
  flex-direction: row;       /* default: row */
  flex-wrap: wrap;           /* allow wrapping */
  justify-content: center;   /* main axis alignment */
  align-items: center;       /* cross axis alignment */
  gap: 16px;                 /* spacing between items */
}
```

## ✅ Example 1 - Basic
**Problem:** Create a horizontal navigation bar using flexbox, demonstrating the main axis and basic alignment.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .nav {
    display: flex;
    list-style: none;
    background: #333;
    border-radius: 8px;
    padding: 0 16px;
  }

  .nav li a {
    display: block;
    padding: 14px 20px;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s;
  }

  .nav li a:hover { background: #555; }

  .nav .logo {
    margin-right: auto;
    font-weight: bold;
  }

  .demo-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;
    margin-top: 30px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .demo-box .axis-label {
    font-size: 0.85rem;
    color: #888;
    text-align: center;
  }

  .row-demo {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: #e3f2fd;
    border-radius: 8px;
  }

  .row-demo .item {
    background: #64b5f6;
    color: #fff;
    padding: 12px 24px;
    border-radius: 6px;
    text-align: center;
  }
</style>
</head>
<body>
  <ul class="nav">
    <li class="logo"><a href="#">Logo</a></li>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>

  <div class="demo-box">
    <h3>Main Axis: Horizontal (flex-direction: row)</h3>
    <div class="axis-label">← main axis (justify-content) →</div>
    <div class="row-demo">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
    </div>
    <div class="axis-label">↑ cross axis (align-items) ↑</div>
  </div>
</body>
</html>
```

**Output:** A dark navbar with logo left-aligned and menu items right-aligned using `margin-right: auto`. Below, a visual demonstration of the flex main axis (horizontal) and cross axis (vertical).

**Explanation:** `display: flex` on the `<ul>` makes it a flex container, turning `<li>` elements into flex items. `margin-right: auto` on the logo pushes subsequent items to the right. The row demo shows flex items laid out horizontally (main axis) with cross axis available for vertical alignment.

## 🚀 Example 2 - Intermediate
**Problem:** Show how `flex-direction: column` changes the main axis to vertical, and demonstrate the difference between `row` and `column` layouts.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  .demo { max-width: 800px; margin: 0 auto; }

  h2 { margin-bottom: 8px; margin-top: 30px; }

  .card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    margin-bottom: 24px;
  }

  .card h3 { margin-bottom: 16px; color: var(--color, #333); }

  .flex-row {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: #fce4ec;
    border-radius: 8px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: #e8f5e9;
    border-radius: 8px;
  }

  .box {
    padding: 14px 20px;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }

  .row .box { background: #e57373; }
  .col .box { background: #81c784; }

  .axis-diagram {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 16px 0;
  }

  .axis-card {
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    font-size: 0.85rem;
  }

  .axis-card .main-axis {
    color: #e57373;
    font-weight: bold;
  }

  .axis-card .cross-axis {
    color: #64b5f6;
    font-weight: bold;
  }

  .axis-row {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 10px 0;
    padding: 12px;
    background: #fce4ec;
    border-radius: 6px;
  }

  .axis-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    margin: 10px 0;
    padding: 12px;
    background: #e8f5e9;
    border-radius: 6px;
  }

  .axis-item {
    background: #999;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 4px;
    font-size: 0.8rem;
  }
</style>
</head>
<body>
  <div class="demo">
    <h2>Flexbox Direction</h2>

    <div class="card" style="--color:#e57373;">
      <h3>flex-direction: row (default)</h3>
      <p>Main axis → horizontal | Cross axis ↓ vertical</p>
      <div class="flex-row row">
        <div class="box">Item 1</div>
        <div class="box">Item 2</div>
        <div class="box">Item 3</div>
      </div>
    </div>

    <div class="card" style="--color:#81c784;">
      <h3>flex-direction: column</h3>
      <p>Main axis ↓ vertical | Cross axis → horizontal</p>
      <div class="flex-column col">
        <div class="box">Item A</div>
        <div class="box">Item B</div>
        <div class="box">Item C</div>
      </div>
    </div>

    <div class="card">
      <h3>Axis Reference</h3>
      <div class="axis-diagram">
        <div>
          <p><span class="main-axis">ROW</span> (main: →, cross: ↓)</p>
          <div class="axis-row">
            <div class="axis-item">1</div>
            <div class="axis-item">2</div>
            <div class="axis-item">3</div>
          </div>
        </div>
        <div>
          <p><span class="cross-axis">COLUMN</span> (main: ↓, cross: →)</p>
          <div class="axis-col">
            <div class="axis-item">1</div>
            <div class="axis-item">2</div>
            <div class="axis-item">3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** Two flex containers showing `row` (horizontal layout) and `column` (vertical layout). An axis reference diagram labels main and cross axes for each direction.

**Explanation:** `flex-direction: row` (default) arranges items horizontally—main axis is left-to-right, cross axis is top-to-bottom. `flex-direction: column` arranges items vertically—main axis is top-to-bottom, cross axis is left-to-right. This distinction is critical for understanding `justify-content` (main axis) vs `align-items` (cross axis).

## 🏢 Real World Use Case
Flexbox is the go-to solution for navigation bars, card layouts, form alignment, centering content, equal-height columns, button groups, and any one-dimensional layout need. It is supported in all modern browsers.

## 🎯 Interview Questions
1. **Q:** What is the difference between `flex-direction: row` and `flex-direction: column`?  
   **A:** `row` lays items horizontally (main axis = horizontal); `column` lays items vertically (main axis = vertical).

2. **Q:** What is the main axis in a flex container?  
   **A:** The axis defined by `flex-direction`—horizontal for `row`, vertical for `column`. It is controlled by `justify-content`.

3. **Q:** What is the cross axis?  
   **A:** The axis perpendicular to the main axis. It is controlled by `align-items` and `align-content`.

4. **Q:** How do you make a flex container wrap its items?  
   **A:** Use `flex-wrap: wrap` on the container.

5. **Q:** What is the default value of `flex-direction`?  
   **A:** `row`, which lays out children from left to right.

## ⚠ Common Errors / Mistakes
- Applying flex properties to the wrong element (e.g., `justify-content` on a flex item instead of the container)
- Confusing `justify-content` (main axis) with `align-items` (cross axis)
- Using `flex-direction: column` but still expecting `justify-content` to work horizontally
- Forgetting that `gap` in flexbox is only supported in modern browsers (check browser support)
- Not setting a fixed height for column layouts with `align-items: stretch` (items stretch by default)

## 📝 Practice Exercises
**Beginner:**
1. Create a `<div>` with `display: flex` containing three items (colored boxes) arranged in a row.
2. Change `flex-direction` to `column` and observe the layout change.
3. Add `gap: 20px` between items in the row layout.

**Intermediate:**
4. Create a horizontal navbar with logo on the left and nav links on the right using `margin-left: auto` on the last items.
5. Build a card with an icon, title, and description using `flex-direction: column`.
6. Create a flex layout with two columns where the left column has a fixed width (200px) and the right fills remaining space.

**Advanced:**
7. Build a full-page holy grail layout (header, footer, nav, main, aside) using only flexbox with `flex-direction: column` on the body and `flex: 1` on the main content area.
8. Create a responsive profile card that switches from a horizontal layout (image left, text right) on desktop to a vertical layout (image top, text below) on mobile using `flex-direction` with a media query.
