## 22. HTML Div
## 📘 Introduction
The `<div>` (division) element is a generic block-level container used to group and structure HTML elements. It has no semantic meaning by itself but is essential for applying CSS styles and JavaScript functionality to groups of content.

## 🧠 Key Concepts
- `<div>` is a block-level container with no default styling
- Used to group elements for CSS styling and layout
- Commonly used with CSS classes and IDs
- Essential for creating page layouts (columns, sections, wrappers)
- Can contain any HTML elements including other divs
- Paired with CSS Grid, Flexbox, or Bootstrap for advanced layouts

## 💻 Syntax
```html
<div class="container">
  <h2>Section Title</h2>
  <p>Content inside the div.</p>
</div>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Group a heading and paragraph inside a styled box.

**Code:**
```html
<style>
  .card {
    background: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
</style>

<div class="card">
  <h2>Welcome</h2>
  <p>This content is grouped inside a styled div.</p>
</div>
```

**Output:** A gray box with rounded corners containing the heading and paragraph.

**Explanation:** The `<div>` acts as a container. The CSS class `.card` styles the div with background, border, padding, and rounded corners.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a two-column layout using divs with CSS.

**Code:**
```html
<style>
  .row {
    display: flex;
    gap: 20px;
  }
  .column {
    flex: 1;
    padding: 20px;
    background: #e0f7fa;
    border-radius: 8px;
  }
</style>

<div class="row">
  <div class="column">
    <h3>Column 1</h3>
    <p>Content for left column.</p>
  </div>
  <div class="column">
    <h3>Column 2</h3>
    <p>Content for right column.</p>
  </div>
</div>
```

**Output:** Two equal-width columns displayed side by side with a gap between them.

**Explanation:** The outer div (`row`) uses Flexbox. Inner divs (`column`) use `flex: 1` to share space equally.

## 🏢 Real World Use Case
Entire web page layouts are built using nested divs: wrapper divs, header divs, content divs, sidebar divs, footer divs. Frameworks like Bootstrap use div-based grid systems for responsive design.

## 🎯 Interview Questions (5 with answers)
**1. What is a `<div>` in HTML?**
A `<div>` is a block-level container element that groups other elements for styling or scripting purposes. It has no semantic meaning on its own.

**2. Why is the `<div>` element important for web layouts?**
It allows developers to group content, apply CSS styles to sections, create layouts, and attach JavaScript event handlers to specific page regions.

**3. What is the difference between `<div>` and `<span>`?**
`<div>` is a block-level element (starts on a new line, takes full width). `<span>` is an inline element (flows within text). `<div>` is for grouping larger sections; `<span>` is for inline text styling.

**4. Is it okay to have a `<div>` inside a `<p>`?**
No. A `<p>` cannot contain block elements like `<div>`. This is invalid HTML and browsers will auto-close the `<p>` before the `<div>`.

**5. What is "divitis"?**
Divitis is the overuse of `<div>` elements when semantic HTML elements (like `<section>`, `<article>`, `<header>`, `<nav>`) would be more appropriate.

## ⚠ Common Errors / Mistakes
- Using too many nested divs instead of semantic elements
- Forgetting to close div tags
- Using divs for inline grouping (use `<span>` instead)
- Relying on divs without proper CSS classes for styling
- Putting block elements inside inline parents that wrap divs

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a div with a blue background and white text containing a heading and paragraph.
2. Add padding and margin to a div using CSS and observe the spacing.
3. Place two divs side by side using `display: inline-block`.

**Intermediate:**
4. Build a page layout using divs: header, navigation, main content, sidebar, and footer sections.
5. Create a 3-column equal-width layout using Flexbox with divs.
6. Use nested divs to create a card layout with an image, title, description, and button.

**Advanced:**
7. Build a responsive grid layout using divs and CSS Grid that changes from 4 columns to 2 columns to 1 column at different breakpoints.
8. Create a modal overlay using a div with absolute positioning, a semi-transparent background, and centered content.
