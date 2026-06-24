## 1. CSS HOME
## 📘 Introduction
CSS (Cascading Style Sheets) is the language used to style HTML documents. It controls the layout, colors, fonts, spacing, and overall visual presentation of web pages. CSS separates content from design, making websites easier to maintain and more accessible.

## 🧠 Key Concepts
- **What is CSS?** A stylesheet language that describes how HTML elements are displayed on screen, paper, or other media.
- **Why use CSS?** It saves time, provides consistent styling across pages, improves accessibility, and enables responsive design.
- **CSS Versions:** CSS1 (1996), CSS2 (1998), CSS3 (modules from 1999 onwards), and CSS4 (ongoing modular development).
- **How CSS works with HTML:** The browser loads HTML, parses it into the DOM, then applies matched CSS rules to render styled elements.

## 💻 Syntax
```css
selector {
  property: value;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Apply basic styling to a paragraph.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: blue;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <p>This is a styled paragraph.</p>
</body>
</html>
```
**Output:** "This is a styled paragraph." displayed in blue, 18px font.
**Explanation:** The `p` selector targets all `<p>` elements and applies blue color and 18px font size.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use multiple CSS properties to style a heading and a paragraph together.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: #2c3e50;
      text-align: center;
    }
    p {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>Welcome to CSS</h1>
  <p>CSS makes your HTML look great with minimal effort.</p>
</body>
</html>
```
**Output:** Centered dark heading, paragraph with Arial font and comfortable line spacing.
**Explanation:** Two separate selectors apply distinct styles — `h1` gets color and centering, `p` gets font family and line height.

## 🏢 Real World Use Case
A corporate website uses a single external CSS file to style thousands of pages consistently. Changing the brand color in one CSS rule updates the entire site instantly, saving hours of manual work.

## 🎯 Interview Questions (5 with answers)
1. **What does CSS stand for and what is its purpose?** Cascading Style Sheets; it styles HTML elements to control layout, colors, fonts, and responsiveness.
2. **What is the cascade in CSS?** The algorithm that determines which style rules apply when multiple rules match an element, based on importance, specificity, source order, and inheritance.
3. **What are the main versions of CSS?** CSS1, CSS2, CSS3 (modular), and ongoing CSS4 modules.
4. **How does a browser render CSS?** HTML is parsed into DOM, CSS is parsed into the CSSOM, then combined into a render tree, which is painted to the screen.
5. **Why separate CSS from HTML?** For maintainability, reusability, performance (caching), and cleaner code structure.

## ⚠ Common Errors / Mistakes
- Forgetting the closing curly brace or semicolon.
- Misspelling property names or values (e.g., `colour` instead of `color`).
- Not linking the CSS file correctly — wrong path or missing `rel="stylesheet"`.
- Assuming all CSS properties work on all elements (e.g., `width` on inline elements).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Change the background color of all `<h1>` elements to light gray.
2. Set the font size of all `<p>` elements to 16px.
3. Center-align the text inside a `<div>`.
4. Style a navigation menu with hover effects using an external stylesheet.
5. Use a CSS class to style multiple different elements with the same font family.
6. Create a page where all paragraphs have a left border and padding.
7. Build a complete blog post layout using only CSS for styling, with headings, paragraphs, and images.
8. Implement a responsive card layout that adapts from mobile to desktop using CSS with media queries.
