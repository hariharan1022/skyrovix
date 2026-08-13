## 21. HTML Block & Inline
## 📘 Introduction
Every HTML element has a default display behavior: block or inline. Block elements start on a new line and take full width. Inline elements flow within text and take only as much width as needed. Understanding this is foundational for CSS layout.

## 🧠 Key Concepts
- **Block-level elements:** `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>`, `<header>`, `<footer>`, `<section>`, `<article>`
  - Start on a new line
  - Take up the full available width
  - Can contain inline and other block elements
- **Inline elements:** `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<input>`, `<label>`, `<code>`, `<br>`
  - Do not start on a new line
  - Only take as much width as needed
  - Cannot contain block-level elements
- `display: block`, `display: inline`, `display: inline-block` in CSS can override default behavior

## 💻 Syntax
```html
<!-- Block elements -->
<div>Block container</div>
<p>Paragraph block</p>

<!-- Inline elements -->
<span>Inline text</span>
<a href="#">Inline link</a>
<strong>Bold inline text</strong>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Show the visual difference between block and inline elements.

**Code:**
```html
<div style="border: 1px solid red;">This is a block div</div>
<div style="border: 1px solid red;">Another block div</div>
<span style="border: 1px solid blue;">This is inline span</span>
<span style="border: 1px solid blue;">Another inline span</span>
```

**Output:** The two divs appear on separate lines, each taking full width. The two spans appear side-by-side on the same line.

**Explanation:** Block elements stack vertically. Inline elements sit next to each other horizontally until the line wraps.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Style inline elements within a paragraph and compare `inline` vs `inline-block`.

**Code:**
```html
<p>
  This is a paragraph with <strong>strong</strong> and <em>emphasized</em> text.
  Also a <a href="#">link</a> inside the paragraph.
</p>
<span style="display: inline-block; width: 100px; background: yellow;">inline-block</span>
<span style="display: inline; width: 100px; background: lightblue;">inline (width ignored)</span>
```

**Output:** Strong and em blend in the paragraph flow. The inline-block span respects width and padding; the inline span ignores width.

**Explanation:** Inline elements ignore width/height but respect padding. `inline-block` allows setting dimensions while staying inline flow.

## 🏢 Real World Use Case
Layouts use block elements (`<div>`, `<section>`) as structural containers. Inline elements (`<span>`, `<a>`) style text fragments inside paragraphs. Buttons, navigation links, and icons commonly use `inline-block`.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between block and inline elements?**
Block elements start on a new line and take full width. Inline elements flow in text and take only needed width. Block elements can contain inline elements, but not vice versa.

**2. Can you change the display type of an element?**
Yes, using CSS `display: block`, `display: inline`, or `display: inline-block`.

**3. What is `inline-block`?**
It's a display value that combines inline flow (sits next to other elements) with block-level formatting (respects width, height, margins).

**4. Name three inline elements and three block elements.**
Block: `<div>`, `<p>`, `<h1>`. Inline: `<span>`, `<a>`, `<strong>`.

**5. Can you put a `<div>` inside a `<span>`?**
No. Block elements cannot be nested inside inline elements. It is invalid HTML and causes unpredictable rendering.

## ⚠ Common Errors / Mistakes
- Nesting block elements inside inline elements (e.g., `<span><div>...</div></span>`)
- Applying width/height to inline elements and wondering why it doesn't work
- Using `<br>` excessively instead of proper block elements
- Assuming `<img>` is block-level (it is inline by default)
- Forgetting that `<li>` is block-level

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a page with two `<div>` elements and two `<span>` elements. Observe their layout.
2. Change a `<span>` to display as a block element using CSS.
3. Put an `<a>` link inside a `<p>` paragraph and verify it renders inline.

**Intermediate:**
4. Create a horizontal navigation bar using `<li>` elements with `display: inline-block`.
5. Use inline elements (`<strong>`, `<em>`, `<span>`) inside a paragraph to style specific words with different colors.
6. Compare `display: inline`, `display: block`, and `display: inline-block` by creating three styled boxes.

**Advanced:**
7. Build a two-column layout using only block and inline-block elements (no flexbox/grid).
8. Analyze and fix a broken HTML page where block elements are incorrectly nested inside inline elements, causing rendering issues.
