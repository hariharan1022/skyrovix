## 15. CSS Outline
## 📘 Introduction
CSS outline is a line drawn outside the element's border, typically used for focus indicators and visual emphasis. Unlike borders, outlines do not take up space in the box model and cannot be styled per side.

## 🧠 Key Concepts
- **outline-width:** Thickness of the outline (thin, medium, thick, or specific units).
- **outline-style:** Visual style — `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`.
- **outline-color:** Color of the outline.
- **outline-offset:** Space between the border and the outline (can be negative).
- **Shorthand:** `outline: width style color;` (e.g., `outline: 2px solid blue;`).
- **Outline vs Border:** Outline does not affect box model dimensions; outline is not per-side; outline can be offset.
- **Accessibility:** Outline is critical for keyboard focus indicators — never remove it without providing an alternative.

## 💻 Syntax
```css
.element {
  outline-width: 2px;
  outline-style: solid;
  outline-color: #3498db;
  outline-offset: 3px;

  /* Shorthand */
  outline: 2px solid #3498db;

  /* With offset */
  outline: 3px dashed red;
  outline-offset: 5px;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Add an outline to a button without affecting its layout.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    button {
      padding: 10px 20px;
      border: 2px solid #333;
      background: #fff;
      cursor: pointer;
    }
    button:focus {
      outline: 3px solid #3498db;
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <button>Focus me (tab to see outline)</button>
  <p>The outline does not shift the button position.</p>
</body>
</html>
```
**Output:** On focus, a blue outline appears 2px outside the border. The button's layout position does not change.
**Explanation:** Unlike `border`, `outline` does not affect the box model. The `outline-offset: 2px` adds a gap between border and outline.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Compare outline and border behavior on layout.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 150px;
      height: 80px;
      display: inline-block;
      margin: 10px;
      text-align: center;
      line-height: 80px;
    }
    .border-box {
      border: 5px solid #e74c3c;
    }
    .outline-box {
      outline: 5px solid #2ecc71;
      outline-offset: 5px;
    }
  </style>
</head>
<body>
  <div class="box border-box">Border</div>
  <div class="box outline-box">Outline</div>
  <div class="box" style="background:#eee;">Reference</div>
</body>
</html>
```
**Output:** The border box is pushed wider by 10px (5+5). The outline box and reference box are identical in size — outline draws outside.
**Explanation:** Border adds to total width. Outline is drawn outside the element without affecting its dimensions or adjacent elements.

## 🏢 Real World Use Case
A design system uses `outline` for focus indicators on interactive elements (buttons, links, inputs). The outline-offset creates a visually distinct focus ring. Custom focus styles replace browser defaults to maintain brand consistency while preserving accessibility.

## 🎯 Interview Questions (5 with answers)
1. **What is the main difference between outline and border?** Outline does not affect the box model (no layout impact); border is part of the box model and affects dimensions.
2. **Can outline be styled per side (like border-top)?** No, outline applies to all sides uniformly — there are no `outline-top` properties.
3. **What is `outline-offset`?** It sets the space between the element's border and the outline. Can be negative to draw inside.
4. **Why is outline important for accessibility?** It provides a visible focus indicator for keyboard users. Removing `outline: none` without a replacement violates WCAG guidelines.
5. **Does outline work with border-radius?** Yes, outline follows the border-radius curve in modern browsers.

## ⚠ Common Errors / Mistakes
- Using `outline: none` on `:focus` without providing an alternative focus style (accessibility violation).
- Confusing outline with border — expecting outline to affect element dimensions.
- Expecting outline to be rounded in older browsers (support was inconsistent before Firefox 88 / Chrome 2021).
- Using outline on only one side (not possible — outline is uniform).
- Setting `outline-color` without setting `outline-style` (outline won't appear).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Add a 2px solid red outline to a div.
2. Set `outline-offset: 10px` on a button and observe the gap.
3. Create a focus style for input fields using outline.
4. Compare two side-by-side divs — one with border, one with outline — and measure their total widths.
5. Use a negative outline-offset to draw the outline inside the element.
6. Style a card so it uses outline on hover without shifting layout.
7. Build a keyboard-navigable navigation where each link has a custom focus outline with offset.
8. Implement a custom focus ring that uses both a box-shadow and an outline for a layered focus indicator effect.
