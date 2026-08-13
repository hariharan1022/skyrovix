## 10. CSS Borders
## 📘 Introduction
CSS borders allow you to draw lines around elements. You can control the width, style, color, and radius of borders. Borders are fundamental for creating visual separation, highlighting content, and defining element boundaries.

## 🧠 Key Concepts
- **border-width:** Thickness of the border (px, em, thin, medium, thick).
- **border-style:** Visual style — `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`, `hidden`.
- **border-color:** Color of the border.
- **Shorthand:** `border: width style color;` (e.g., `border: 2px solid red;`).
- **Individual Sides:** `border-top`, `border-right`, `border-bottom`, `border-left`.
- **border-radius:** Rounds the corners (px, %, `50%` for circle).
- **border-image:** Uses an image for the border (slice, repeat, stretch).
- **outline:** Similar to border but does not affect box model dimensions.

## 💻 Syntax
```css
.element {
  border-width: 2px;
  border-style: solid;
  border-color: #333;

  /* Shorthand */
  border: 2px solid #333;

  /* Individual sides */
  border-top: 1px dashed blue;
  border-bottom: 3px dotted green;

  /* Rounded corners */
  border-radius: 8px;
  border-radius: 50%; /* circle */

  /* Border image */
  border-image: url("border.png") 30 round;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Create a card with a solid border and rounded corners.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .card {
      border: 2px solid #2c3e50;
      border-radius: 10px;
      padding: 20px;
      width: 200px;
    }
  </style>
</head>
<body>
  <div class="card">This is a card with a border</div>
</body>
</html>
```
**Output:** A card with a 2px solid dark border and 10px rounded corners.
**Explanation:** The `border` shorthand sets all three properties. `border-radius: 10px` rounds each corner by 10px radius.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a notification box with different styles on each side and a circular avatar.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .notification {
      border-left: 5px solid #e74c3c;
      border-right: 2px dashed #ccc;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 15px;
      margin: 20px;
    }
    .avatar {
      border: 3px solid #3498db;
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
  </style>
</head>
<body>
  <div class="notification">
    <div class="avatar"></div>
    <p>Notification with varied borders</p>
  </div>
</body>
</html>
```
**Output:** Left side has a thick red accent border, right has dashed, top/bottom are thin solid. Avatar is a circle with a blue border.
**Explanation:** `border-left`, `border-right`, etc. allow per-side customization. `border-radius: 50%` on a square creates a perfect circle.

## 🏢 Real World Use Case
A UI component library uses border utilities for cards, alerts (colored left border for severity), form inputs (focus border), and avatars (circular with border). Consistent `border-radius` values are defined as CSS custom properties for theming.

## 🎯 Interview Questions (5 with answers)
1. **What is the difference between `border` and `outline`?** Border is part of the box model and affects layout; outline is drawn outside the border and does not affect dimensions.
2. **How do you make a circle with CSS borders?** Use `border-radius: 50%` on a square element (equal width and height).
3. **What values can `border-style` take?** `none`, `hidden`, `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`.
4. **What does `border-radius: 10px 20px;` mean?** Top-left and bottom-right get 10px; top-right and bottom-left get 20px.
5. **How does `border-image` work?** It uses an image sliced into 9 parts (corners, edges, center) and applies them as the border. Requires `border-style` to be set.

## ⚠ Common Errors / Mistakes
- Forgetting `border-style` — without it, no border appears (default is `none`).
- Using `border` shorthand but not specifying `border-style` is most common.
- Applying `border-radius` to an element that has no visible border or background.
- Using `border-image` without setting `border-style: solid` (or another visible style).
- Confusing `border-collapse` with `border` — `border-collapse` is only for tables.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Add a 1px solid black border to a div.
2. Create a dashed red border around a paragraph.
3. Use `border-radius` to make a button with rounded corners.
4. Create a box with different border colors on each side.
5. Make a perfect circle using `border-radius: 50%` on a square.
6. Use the `border` shorthand to set a thick blue border.
7. Build a card component with a left accent border (thick colored left, thin others) similar to a status indicator.
8. Create a custom checkbox using only borders and border-radius for the checkmark indicator.
