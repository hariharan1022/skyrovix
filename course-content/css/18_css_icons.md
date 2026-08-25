## 18. CSS Icons
## 📘 Introduction
Icons are essential for modern web interfaces. CSS can style icons from popular icon libraries (Font Awesome, Bootstrap Icons, Google Material Icons) and inline SVGs. Icons can be sized, colored, and animated using CSS properties.

## 🧠 Key Concepts
- **Font Awesome:** Icon library using `<i>` or `<span>` with classes like `fa fa-home`. Rendered as text — controllable with CSS font properties.
- **Bootstrap Icons:** Open-source icon library. Use `<i class="bi bi-alarm"></i>` or inline SVGs.
- **Google Material Icons:** Icon font or SVG. Use `<span class="material-icons">home</span>`.
- **SVG Icons:** Scalable vector graphics. Can be inlined directly or used as `background-image`. Full CSS control over `fill`, `stroke`, `size`.
- **Icon Sizing:** Use `font-size` for icon fonts; `width`/`height` for SVGs.
- **Icon Colors:** Use `color` for icon fonts; `fill` and `stroke` for SVGs.

## 💻 Syntax
```css
/* Font Awesome */
.fa-home {
  font-size: 24px;
  color: #3498db;
}

/* Bootstrap Icons */
.bi-alarm {
  font-size: 2rem;
  color: #e74c3c;
}

/* Material Icons */
.material-icons {
  font-size: 32px;
  color: #2ecc71;
}

/* SVG inline */
svg.icon {
  width: 24px;
  height: 24px;
  fill: #333;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Display icons from Font Awesome with custom size and color.

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    .icon {
      font-size: 32px;
      color: #e74c3c;
      margin: 10px;
    }
    .icon-blue { color: #3498db; }
    .icon-large { font-size: 48px; }
  </style>
</head>
<body>
  <i class="fas fa-home icon"></i>
  <i class="fas fa-user icon icon-blue"></i>
  <i class="fas fa-cog icon icon-large"></i>
</body>
</html>
```
**Output:** Three icons displayed — red home, blue user, large gray gear.
**Explanation:** Font Awesome icons are controlled like text. `font-size` sets the size, `color` sets the icon color. Multiple classes allow composition.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Style inline SVG icons with CSS for a consistent design system.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      background: #f0f0f0;
      border-radius: 6px;
    }
    .icon-wrapper svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
      transition: fill 0.3s;
    }
    .icon-wrapper:hover {
      background: #3498db;
      color: #fff;
    }
    .icon-wrapper:hover svg {
      fill: currentColor;
    }
  </style>
</head>
<body>
  <div class="icon-wrapper">
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
    </svg>
    <span>SVG Icon with hover</span>
  </div>
</body>
</html>
```
**Output:** A button-like element with an SVG check icon that changes to white on hover.
**Explanation:** `fill: currentColor` makes the SVG inherit the parent's color. On hover, both text and icon turn white. The `transition` smooths the color change.

## 🏢 Real World Use Case
A SaaS dashboard uses Material Icons for navigation, Bootstrap Icons for action buttons, and custom SVG icons for the product logo. All icons are sized using CSS custom properties and respond to the theme's color scheme (light/dark mode).

## 🎯 Interview Questions (5 with answers)
1. **What are the benefits of using icon fonts over image icons?** Icon fonts are scalable (vector), colorable with CSS, accessible, and load faster with fewer HTTP requests.
2. **How do you change the color of a Font Awesome icon?** Using the `color` CSS property, just like text.
3. **How do you style inline SVG icons?** Use CSS properties `fill` for fill color, `stroke` for outline, `width` and `height` for size.
4. **What does `currentColor` do in SVG icons?** It makes the SVG fill/stroke inherit the element's `color` property, enabling dynamic theming.
5. **Are icon fonts accessible?** Yes, but use `aria-hidden="true"` for decorative icons and `aria-label` for informative icons.

## ⚠ Common Errors / Mistakes
- Forgetting to include the icon library CSS/JS before using icon classes.
- Using `<i>` for icons without `aria-hidden="true"` causing accessibility issues.
- Setting `color` on SVG icons instead of `fill` (for non-currentColor SVGs).
- Overriding icon font-size with container font-size unexpectedly.
- Loading an entire icon library when only a few icons are needed (performance impact).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Display a Font Awesome home icon at 24px size.
2. Change the color of a Bootstrap icon to green.
3. Display a Material Icon named "star" with size 40px.
4. Create a social media icon row using Font Awesome with uniform sizing and hover color changes.
5. Style an inline SVG icon to have a blue fill on hover.
6. Use `currentColor` to make an SVG icon match the text color of its parent button.
7. Build an icon button component with SVG icons where the icon color transitions on hover and focus.
8. Implement a theme switcher that toggles all icons between filled and outlined styles using CSS variables.
