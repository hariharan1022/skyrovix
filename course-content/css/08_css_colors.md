## 8. CSS Colors
## 📘 Introduction
CSS offers multiple ways to specify colors — from simple named colors to advanced functions like `rgb()`, `rgba()`, `hsl()`, and `hsla()`. Understanding color formats is essential for web design, accessibility, and theming.

## 🧠 Key Concepts
- **Named Colors:** 140+ predefined color names (e.g., `red`, `coral`, `rebeccapurple`).
- **HEX (#RRGGBB):** Hexadecimal notation; each pair represents red, green, blue (00-FF).
- **HEX Short (#RGB):** Shorthand for hex when each pair has identical digits (e.g., `#f00` = `#ff0000`).
- **rgb(r, g, b):** Functional notation with values 0-255 or percentages.
- **rgba(r, g, b, a):** RGB with alpha channel for opacity (0-1).
- **hsl(h, s%, l%):** Hue (0-360), saturation (0-100%), lightness (0-100%).
- **hsla(h, s%, l%, a):** HSL with alpha channel.
- **Opacity:** The `opacity` property makes an entire element transparent.
- **currentColor:** A keyword that represents the current value of `color`.
- **Color Contrast:** Ensuring sufficient contrast between foreground and background for accessibility (WCAG guidelines).

## 💻 Syntax
```css
.element {
  color: red;                    /* Named color */
  color: #ff0000;                /* Hex */
  color: #f00;                   /* Short hex */
  color: rgb(255, 0, 0);         /* RGB */
  color: rgba(255, 0, 0, 0.5);   /* RGBA */
  color: hsl(0, 100%, 50%);      /* HSL */
  color: hsla(0, 100%, 50%, 0.5);/* HSLA */
  background-color: currentColor;/* Uses element's text color */
  opacity: 0.8;                  /* Element opacity */
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Display a box with different color formats.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .hex { color: #2ecc71; }
    .rgb { color: rgb(52, 152, 219); }
    .named { color: orangered; }
  </style>
</head>
<body>
  <p class="hex">Hex color</p>
  <p class="rgb">RGB color</p>
  <p class="named">Named color</p>
</body>
</html>
```
**Output:** Three lines showing green, blue, and orangered text.
**Explanation:** Each paragraph uses a different color format. All produce valid colors the browser can render.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a semi-transparent overlay using rgba() and demonstrate currentColor.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .overlay {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 20px;
    }
    .border-box {
      color: #e74c3c;
      border: 2px solid currentColor;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="overlay">Semi-transparent overlay</div>
  <div class="border-box">Border matches text color</div>
</body>
</html>
```
**Output:** First div has black background at 50% opacity with white text. Second div has a red border matching its text color.
**Explanation:** `rgba(0,0,0,0.5)` creates a translucent black. `currentColor` dynamically uses the element's `color` property value for the border.

## 🏢 Real World Use Case
A design system defines its color palette using CSS custom properties with hex values. Components use `rgba()` for shadows and overlays, `currentColor` for consistent icon coloring, and HSL for programmatic color manipulation in themes.

## 🎯 Interview Questions (5 with answers)
1. **What are the ways to represent colors in CSS?** Named colors, HEX, RGB/RGBA, HSL/HSLA.
2. **What is the difference between `opacity` and `rgba()`?** `opacity` makes the entire element (including child elements) transparent; `rgba()` only affects the background/text color it's applied to.
3. **What does `currentColor` do?** It inherits the current `color` value, useful for borders, shadows, and SVGs that should match text color.
4. **How do you ensure color accessibility?** Maintain a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (WCAG AA).
5. **What is the HSL color model?** Hue (color wheel position 0-360), Saturation (intensity 0-100%), Lightness (brightness 0-100%).

## ⚠ Common Errors / Mistakes
- Forgetting the `#` prefix in hex colors (e.g., `ff0000` instead of `#ff0000`).
- Using `rgba()` or `hsla()` forgetting the alpha parameter is the fourth value, 0-1.
- Confusing HSL lightness with brightness; 100% lightness is always white.
- Using hex shorthand incorrectly — `#abc` is `#aabbcc`, not `#a0b0c0`.
- Not considering color contrast for accessibility, especially on light backgrounds.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Set a paragraph's text color using a hex value.
2. Change a div's background using a named color.
3. Use `rgb()` to set the color of an `h1` element.
4. Create a div with a semi-transparent black background using `rgba()`.
5. Use `currentColor` to make a box-shadow the same color as the text.
6. Write a rule that uses `hsl()` to create a light blue background.
7. Build a color theme switcher using HSL where only the hue value changes for different color schemes.
8. Implement a gradient overlay using two `rgba()` colors that respects the background image underneath.
