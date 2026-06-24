## 3. CSS Syntax
## 📘 Introduction
CSS syntax defines how style rules are structured. A CSS rule consists of a selector and a declaration block. The selector targets HTML elements, and the declaration block contains one or more declarations separated by semicolons.

## 🧠 Key Concepts
- **Selectors:** Patterns used to select HTML elements for styling (e.g., `h1`, `.class`, `#id`).
- **Properties:** The style attribute you want to change (e.g., `color`, `font-size`).
- **Values:** The assigned setting for a property (e.g., `red`, `16px`).
- **Declaration Blocks:** Enclosed in `{}`, containing one or more declarations.
- **Grouping Selectors:** Apply the same styles to multiple selectors by separating with commas: `h1, h2, h3 { ... }`.
- **Comments:** `/* ... */` for adding notes within CSS.

## 💻 Syntax
```css
/* This is a CSS comment */
selector1, selector2 {
  property: value;
  property: value;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Create a CSS rule that styles all `<h2>` elements with a specific color and font size.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h2 {
      color: navy;
      font-size: 24px;
    }
  </style>
</head>
<body>
  <h2>Section Title</h2>
</body>
</html>
```
**Output:** "Section Title" displayed in navy blue at 24px.
**Explanation:** The selector `h2` targets all `<h2>` elements. Two declarations inside the block set color and font-size.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use grouped selectors and a comment to style multiple elements uniformly.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Grouped selector for headings */
    h1, h2, h3 {
      font-family: "Segoe UI", sans-serif;
      color: #333;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Main Title</h1>
  <h2>Subtitle</h2>
  <h3>Section Head</h3>
</body>
</html>
```
**Output:** All three headings share the same font-family, color, and bottom margin.
**Explanation:** Grouping selectors with commas avoids repeating the same declaration block for each heading selector.

## 🏢 Real World Use Case
A design system uses grouped selectors to define typography tokens. All heading levels (`h1`-`h6`) share base font-family and color, while individual overrides set specific sizes.

## 🎯 Interview Questions (5 with answers)
1. **What are the parts of a CSS rule?** A selector and a declaration block containing property-value pairs.
2. **How do you group selectors in CSS?** Separate selectors with commas: `h1, h2, p { color: red; }`.
3. **What is the purpose of CSS comments?** To document code, explain intent, or temporarily disable styles without deleting them.
4. **What happens if a property value is invalid?** The browser ignores that declaration but still applies other valid declarations in the same block.
5. **Can a CSS rule have multiple selectors and multiple declarations?** Yes, both are allowed and commonly used.

## ⚠ Common Errors / Mistakes
- Missing semicolon after a declaration causes subsequent declarations to fail.
- Spacing errors in shorthand values (e.g., `margin: 10px 5px;` vs `margin: 10px5px;`).
- Forgetting the colon between property and value.
- Using quotes incorrectly around font names with spaces.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Write a CSS rule that changes all `<p>` elements to blue font color.
2. Add a comment inside a CSS file explaining what a rule does.
3. Group `h1`, `h2`, and `h3` selectors and give them bold font-weight.
4. Write a declaration block with three different properties for a `.card` class.
5. Create a CSS rule that only applies to elements with both `class="highlight"` and `id="main"`.
6. Use grouping to apply the same border styling to `table`, `th`, and `td` elements.
7. Build a CSS file that demonstrates valid and invalid syntax, and explain which declarations are ignored.
8. Create a complex selector chain with grouping, descendant combinators, and pseudo-classes all in one rule.
