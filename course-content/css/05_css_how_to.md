## 5. CSS How To
## 📘 Introduction
CSS can be added to HTML documents in multiple ways. Understanding how to apply CSS correctly is essential for controlling styles, managing priorities, and building maintainable web projects. The three primary methods are external, internal, and inline CSS.

## 🧠 Key Concepts
- **External Stylesheet:** A `.css` file linked via `<link rel="stylesheet" href="styles.css">`.
- **Internal CSS:** CSS written inside a `<style>` tag within the `<head>` section.
- **Inline CSS:** CSS written directly in the `style` attribute of an HTML element.
- **@import Rule:** Used within CSS to import another stylesheet: `@import url("other.css");`.
- **Cascading Order:** Inline > Internal > External (when specificity is equal). Later rules override earlier ones.
- **Priority/Specificity:** Inline styles have highest priority, then IDs, then classes, then elements.

## 💻 Syntax
```html
<!-- External -->
<link rel="stylesheet" href="style.css">

<!-- Internal -->
<style>
  body { background: #f0f0f0; }
</style>

<!-- Inline -->
<div style="color: red;">Hello</div>
```

```css
/* Inside style.css */
@import url("reset.css");
body { font-family: Arial; }
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Link an external stylesheet to an HTML document.

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="theme.css">
</head>
<body>
  <h1>Styled Page</h1>
</body>
</html>
```
```css
/* theme.css */
h1 { color: teal; text-align: center; }
```
**Output:** "Styled Page" centered and teal-colored.
**Explanation:** The `<link>` tag in `<head>` loads `theme.css`, which applies styles to all matching elements on the page.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Demonstrate cascading order when all three methods are used.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: blue; font-size: 18px; }
  </style>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p style="color: red;">What color am I?</p>
</body>
</html>
```
```css
/* style.css */
p { color: green; }
```
**Output:** The paragraph is red (inline) with 18px font-size (internal). Color cascade: inline red > internal blue > external green.
**Explanation:** Inline style wins for color. For font-size, only internal CSS provides it. The cascade resolves conflicts by source order and specificity.

## 🏢 Real World Use Case
A production site uses external CSS for all styles (cached by the browser for performance), `@import` for third-party libraries, internal CSS for critical above-the-fold styles in the `<head>`, and very rarely uses inline styles for dynamic JavaScript-driven changes.

## 🎯 Interview Questions (5 with answers)
1. **What is the difference between `<link>` and `@import`?** `<link>` is an HTML tag; `@import` is a CSS directive. `<link>` loads in parallel; `@import` blocks rendering until loaded.
2. **What is the cascading order of CSS?** Importance (!important) > Inline > Internal > External, then specificity, then source order.
3. **Can `@import` be used inside inline CSS?** No, `@import` is only valid within a `<style>` tag or external CSS file.
4. **What happens if two external stylesheets define the same property?** The one linked later in the HTML overrides the earlier one (if specificity is equal).
5. **How does browser caching affect external CSS?** External CSS is cached after first load, improving performance on subsequent page visits.

## ⚠ Common Errors / Mistakes
- Incorrect file path in `href` attribute causing 404 and no styles applied.
- Forgetting `rel="stylesheet"` on the `<link>` tag.
- Mixing `@import` inside inline styles (invalid syntax).
- Overusing `!important` which breaks the natural cascade and makes debugging difficult.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Create an external CSS file and link it to an HTML page.
2. Add internal CSS that sets the page background to light blue.
3. Use inline CSS to make a single word red inside a paragraph.
4. Create two external CSS files (`base.css` and `theme.css`) and link both to one HTML page.
5. Use `@import` inside a CSS file to load a reset stylesheet.
6. Demonstrate the cascading order by writing conflicting styles in inline, internal, and external CSS.
7. Build a component library with base styles in one CSS file and theme overrides in another, loaded in the correct order.
8. Implement a strategy that loads critical CSS inline and non-critical CSS asynchronously using JavaScript.
