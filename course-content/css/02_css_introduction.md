## 2. CSS Introduction
## 📘 Introduction
CSS (Cascading Style Sheets) is used to control the presentation of HTML documents. With CSS, you can apply styles to elements, define layouts, create animations, and build responsive web pages. CSS follows a simple rule-based syntax.

## 🧠 Key Concepts
- **CSS Syntax Rules:** A selector points to an HTML element, and a declaration block contains one or more property-value pairs.
- **Inline CSS:** Applied directly within an HTML element via the `style` attribute.
- **Internal CSS:** Defined inside a `<style>` tag in the `<head>` section.
- **External CSS:** Written in a separate `.css` file linked via `<link>`.
- **CSS Rules:** Each rule consists of a selector and a declaration block enclosed in `{}`.

## 💻 Syntax
```css
selector {
  property1: value1;
  property2: value2;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Apply red color to a heading using inline CSS.

```html
<!DOCTYPE html>
<html>
<body>
  <h1 style="color: red;">This is a red heading</h1>
  <p>This paragraph has no inline style.</p>
</body>
</html>
```
**Output:** The heading appears red, the paragraph remains default black.
**Explanation:** Inline CSS using the `style` attribute directly on the `<h1>` element overrides any default styling.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Compare inline, internal, and external CSS approaches.

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
  <style>
    p { font-size: 20px; }
  </style>
</head>
<body>
  <h1 style="color: green;">Inline Heading</h1>
  <p>This paragraph uses internal CSS for font-size.</p>
</body>
</html>
```
```css
/* styles.css */
h1 {
  font-family: Arial, sans-serif;
}
```
**Output:** Green heading with Arial font, paragraph with 20px font size.
**Explanation:** External CSS sets font-family, internal CSS sets font-size, and inline CSS sets color. All three methods work together with inline having highest priority.

## 🏢 Real World Use Case
A large e-commerce site uses external CSS for all product pages. Inline styles are occasionally used for A/B testing specific elements, and internal styles for critical above-the-fold CSS to improve perceived loading speed.

## 🎯 Interview Questions (5 with answers)
1. **What are the three ways to include CSS in HTML?** Inline (style attribute), internal (<style> tag), external (<link> to .css file).
2. **Which CSS method has the highest priority?** Inline CSS has the highest specificity, followed by internal, then external (when specificity is equal).
3. **What is a CSS declaration?** A property-value pair like `color: blue;` within a declaration block.
4. **Can you use multiple CSS methods on the same page?** Yes, all three methods can be combined; the cascade determines which rule applies.
5. **What happens if the external CSS file fails to load?** The page renders with browser default styles or any fallback internal/inline styles.

## ⚠ Common Errors / Mistakes
- Forgetting the `type="text/css"` or `rel="stylesheet"` on the `<link>` tag (though type is optional in HTML5).
- Using inline styles excessively, leading to maintenance nightmares.
- Placing `<style>` in the `<body>` instead of `<head>` (works but is invalid practice).
- Mixing internal and external CSS without understanding cascade priority.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Write inline CSS to make an `<h1>` element green.
2. Create an internal stylesheet that makes all `<p>` elements bold.
3. Link an external stylesheet named `style.css` to an HTML page.
4. Use all three CSS methods on one page to style a heading, paragraph, and div differently.
5. Override an external CSS rule using an inline style and explain the result.
6. Create a page where internal CSS sets a background color for the body.
7. Build a multi-page site with shared external CSS for headers and footers, plus page-specific internal styles.
8. Implement a fallback strategy using inline CSS as a backup when external CSS fails to load.
