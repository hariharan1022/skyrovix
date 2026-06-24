## 61. CSS Tooltips
## 📘 Introduction
CSS tooltips are small pop-up boxes that appear when a user hovers over, focuses on, or taps an element. They provide additional context without cluttering the UI. Using pseudo-elements like `::before` and `::after`, you can create fully styled tooltips with arrows, positioning, and animations—all without JavaScript.

## 🧠 Key Concepts
- **::before / ::after** – Pseudo-elements used to generate the tooltip box and arrow
- **content: ""** – Required property to render pseudo-elements
- **Positioning** – `position: relative` on parent, `position: absolute` on tooltip for top/bottom/left/right placement
- **Arrow styling** – A bordered triangle created via `border` trick on `::after`
- **Hover trigger** – Tooltip hidden by default (`display: none` or `opacity: 0`), shown on `:hover` / `:focus`
- **Fade-in animation** – `transition` on `opacity` for smooth appearance
- **white-space: nowrap** – Prevents tooltip text from wrapping

## 💻 Syntax
```css
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 6px 10px;
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
```

## ✅ Example 1 - Basic
**Problem:** Display a tooltip above an element when hovered.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted #333;
    cursor: pointer;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 130px;
    background-color: #222;
    color: #fff;
    text-align: center;
    padding: 6px 10px;
    border-radius: 5px;
    position: absolute;
    z-index: 1;
    bottom: 130%;
    left: 50%;
    margin-left: -65px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #222 transparent transparent transparent;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
</head>
<body>
  <div class="tooltip">Hover over me
    <span class="tooltiptext">Tooltip text</span>
  </div>
  <p>Move your mouse over the underlined text.</p>
</body>
</html>
```

**Output:** A dotted-underlined element that, when hovered, reveals a dark tooltip box above with a small arrow pointing down to the element.

**Explanation:** The parent `.tooltip` is `position: relative`. The tooltip span uses `position: absolute` with `bottom: 130%` to float above. The `::after` pseudo-element draws a downward-pointing triangle using the border trick (`border-color: #222 transparent transparent transparent`). Transition on `opacity` creates a smooth fade-in.

## 🚀 Example 2 - Intermediate
**Problem:** Create a tooltip that can appear on any side (top, bottom, left, right) with a fade animation.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin: 40px;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 6px 10px;
    border-radius: 5px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

  /* Top */
  .tooltip.top .tooltiptext {
    bottom: 130%;
    left: 50%;
    margin-left: -70px;
  }
  .tooltip.top .tooltiptext::after {
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-color: #333 transparent transparent transparent;
  }

  /* Bottom */
  .tooltip.bottom .tooltiptext {
    top: 130%;
    left: 50%;
    margin-left: -70px;
  }
  .tooltip.bottom .tooltiptext::after {
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-color: transparent transparent #333 transparent;
  }

  /* Left */
  .tooltip.left .tooltiptext {
    top: -5px;
    right: 110%;
  }
  .tooltip.left .tooltiptext::after {
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-color: transparent transparent transparent #333;
  }

  /* Right */
  .tooltip.right .tooltiptext {
    top: -5px;
    left: 110%;
  }
  .tooltip.right .tooltiptext::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent #333 transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
</head>
<body>
  <div class="tooltip top">Top
    <span class="tooltiptext">Tooltip on top</span>
  </div>
  <div class="tooltip bottom">Bottom
    <span class="tooltiptext">Tooltip on bottom</span>
  </div>
  <div class="tooltip left">Left
    <span class="tooltiptext">Tooltip on left</span>
  </div>
  <div class="tooltip right">Right
    <span class="tooltiptext">Tooltip on right</span>
  </div>
</body>
</html>
```

**Output:** Four buttons labeled Top, Bottom, Left, Right—each reveals a tooltip on its respective side with a matching arrow.

**Explanation:** By using modifier classes (`.top`, `.bottom`, `.left`, `.right`), the same tooltip structure adapts to four positions. Each position uses a different `border-color` combination on `::after` to orient the arrow correctly. The `::after` border trick uses three transparent sides and one colored side to form a triangle.

## 🏢 Real World Use Case
Tooltips are widely used in dashboards, data tables, and UI frameworks (e.g., Bootstrap, Material UI) to show truncated text, explain icons, display full data values on hover, or provide help text for form fields—all without taking up permanent screen space.

## 🎯 Interview Questions
1. **Q:** How do you create a triangle arrow in CSS using `::after`?  
   **A:** Set `width: 0; height: 0; border: 5px solid transparent; border-top-color: #333;` on a positioned pseudo-element.

2. **Q:** Why must you set `content: ""` on `::before` or `::after`?  
   **A:** Pseudo-elements will not render unless the `content` property is set (even if empty).

3. **Q:** How do you prevent a tooltip from wrapping text?  
   **A:** Use `white-space: nowrap` on the tooltip element.

4. **Q:** What is the difference between `visibility: hidden` and `display: none` for tooltips?  
   **A:** `visibility: hidden` keeps the element in the layout (can transition opacity), while `display: none` removes it entirely and cannot be animated.

5. **Q:** How would you make a tooltip accessible for keyboard users?  
   **A:** Use `:focus` in addition to `:hover`, and set `aria-describedby` on the trigger element pointing to the tooltip.

## ⚠ Common Errors / Mistakes
- Forgetting `position: relative` on parent, so the absolute tooltip positions relative to the viewport
- Using `display: none` / `display: block` on hover—this cannot be animated with `transition`
- Not accounting for tooltip overflow outside the viewport on edges
- Omitting `z-index` causing the tooltip to appear behind other elements
- The `::after` arrow not aligning because `left` / `margin` values are miscalculated

## 📝 Practice Exercises
**Beginner:**
1. Create a simple tooltip that appears above a link when hovered, with a dark background and white text.
2. Add a small downward-pointing arrow to the tooltip from Exercise 1 using `::after`.
3. Change the tooltip to appear below the element instead of above.

**Intermediate:**
4. Build a tooltip that can switch between top, bottom, left, and right using data attributes and a single CSS class.
5. Add a fade-in and slide-up animation (using `translateY`) to the tooltip appearance.
6. Create a tooltip with a gradient background and rounded corners.

**Advanced:**
7. Implement a pure-CSS tooltip that stays visible for 2 seconds after the mouse leaves (using `transition-delay`).
8. Build an interactive data table where each truncated cell reveals its full content via a tooltip on hover.
