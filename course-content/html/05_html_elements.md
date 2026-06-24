# 5. HTML Elements

## 📘 Introduction

HTML elements are the building blocks of every web page. An element typically consists of an opening tag, content, and a closing tag. However, some elements are "empty" (or "void") and have no closing tag or content. Understanding how elements work—how they nest inside each other, how they display (block vs. inline), and the difference between container elements and empty elements—is critical for writing correct and maintainable HTML. This module covers opening and closing tags, nested elements, empty elements like `<br>`, `<hr>`, and `<img>`, and the important distinction between block-level and inline elements. Proper use of elements ensures your web pages are semantically correct, accessible, and well-structured.

## 🧠 Key Concepts

- **Opening and Closing Tags:** Most elements require an opening tag `<tagname>` and a closing tag `</tagname>`. The closing tag includes a forward slash before the tag name.
- **Element Anatomy:** `<tagname attribute="value">Content goes here</tagname>`
- **Nested Elements:** Elements can be placed inside other elements. They must be properly nested—closed in reverse order of opening.
- **Empty (Void) Elements:** Elements with no content and no closing tag. Examples: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`.
- **Block-Level Elements:** Start on a new line and take up the full width available. Examples: `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`, `<article>`.
- **Inline Elements:** Do not start on a new line and only take up as much width as needed. Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` (though img is replaced inline).

| Feature | Block Elements | Inline Elements |
|---------|---------------|-----------------|
| New line | Yes | No |
| Full width | Yes | Only content width |
| Margin top/bottom | Applies | Does not apply |
| Can nest block inside | Yes (usually) | No |
| Examples | `<div>`, `<p>`, `<h1>` | `<span>`, `<a>`, `<strong>` |

## 💻 Syntax

```html
<!-- Container element with nested elements -->
<div>
  <h1>Welcome</h1>
  <p>This is a <strong>paragraph</strong> with inline elements.</p>
</div>

<!-- Empty elements -->
<img src="photo.jpg" alt="A photo">
<br>
<hr>
```

- The `<div>` is a block-level container that contains an `<h1>` and a `<p>`.
- `<strong>` is an inline element nested inside the `<p>`.
- `<img>`, `<br>`, and `<hr>` are empty elements—no closing tag needed.
- `<img>` uses attributes (`src`, `alt`) to define content.

## ✅ Example 1 - Basic

**Problem:** Create a page that demonstrates the difference between block and inline elements.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Block vs Inline</title>
</head>
<body>
  <!-- Block elements -->
  <h1>This is a block heading</h1>
  <p>This is a block paragraph.</p>
  <div>This is a block div.</div>

  <!-- Inline elements -->
  <span>This is inline span.</span>
  <a href="#">This is an inline link.</a>
  <strong>This is inline bold text.</strong>
</body>
</html>
```

**Output:** Block elements appear on separate lines, stacking vertically. Inline elements appear on the same line, side by side.

**Explanation:** Block elements (`<h1>`, `<p>`, `<div>`) each start on a new line and expand to fill the container width. Inline elements (`<span>`, `<a>`, `<strong>`) flow within the same line and only take up as much width as their content requires.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page with nested elements demonstrating proper structure and empty elements.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Nested Elements</title>
</head>
<body>
  <article>
    <h2>Web Technologies</h2>
    <p>
      The three core technologies are:
      <ul>
        <li><strong>HTML</strong> - Structure</li>
        <li><em>CSS</em> - Styling</li>
        <li><a href="#">JavaScript</a> - Behavior</li>
      </ul>
    </p>
    <hr>
    <img src="https://via.placeholder.com/300x100" alt="Placeholder banner">
    <p>Visit our site for more info.<br>Click the link above.</p>
  </article>
</body>
</html>
```

**Output:** An article with nested headings, paragraphs, lists, inline elements, a horizontal rule, and an image.

**Explanation:** The `<article>` element contains a heading, a paragraph that nests an entire `<ul>`, and an `<img>` element. The `<ul>` contains `<li>` elements, each with inline elements (`<strong>`, `<em>`, `<a>`). The `<hr>` and `<br>` are empty elements used for separation and line breaks.

## 🏢 Real World Use Case

- **News Websites (The Guardian, NY Times):** Articles use nested elements extensively: `<article>` contains `<header>` (with `<h1>`), multiple `<section>` elements, `<p>` tags with nested `<a>` links, `<img>` elements for photos, and `<blockquote>` for quotes.
- **E-commerce (Amazon, eBay):** Product pages nest `<div>` containers for layout, `<ul>` for feature lists, `<span>` for prices (inline styling), and `<img>` elements for product images. Empty elements like `<br>` format address and shipping details.
- **Social Media (Twitter/X, LinkedIn):** Each post is a nested structure: an `<article>` or `<div>` containing the user avatar (`<img>`), username (`<span>`), post text (`<p>` with nested `<a>` for hashtags), and action buttons.

## 🎯 Interview Questions

**1. What is the difference between an opening tag, a closing tag, and an element?**
An opening tag is `<tagname>`. A closing tag is `</tagname>`. An element includes the opening tag, content, and closing tag (e.g., `<p>Content</p>`).

**2. What are empty elements in HTML? Give three examples.**
Empty elements (void elements) have no content and no closing tag. Examples: `<br>` (line break), `<hr>` (horizontal rule), `<img>` (image), `<input>` (form input), `<meta>` (metadata).

**3. Explain block-level vs inline elements with examples.**
Block-level elements start on a new line and take full width (e.g., `<div>`, `<p>`, `<h1>`). Inline elements stay on the same line and take only content width (e.g., `<span>`, `<a>`, `<strong>`).

**4. What does proper nesting mean in HTML?**
Proper nesting means closing tags in reverse order of opening. Correct: `<div><p><strong>Text</strong></p></div>`. Incorrect: `<div><p><strong>Text</p></strong></div>`.

**5. Can an inline element contain a block-level element?**
No. Inline elements should only contain other inline elements or text. Wrapping a block-level element inside an inline element is invalid HTML and can cause rendering issues.

## ⚠ Common Errors / Mistakes

**Error 1: Improper Nesting of Tags**
```html
<ul>
  <li>Item 1
  <li>Item 2
</ul>
```
- **Reason:** While browsers may parse this, it is invalid HTML. The `<li>` tags are not closed.
- **Fix:** `<ul><li>Item 1</li><li>Item 2</li></ul>`

**Error 2: Putting Block Elements Inside Inline Elements**
```html
<a href="#">
  <h1>Click Here</h1>
</a>
```
- **Reason:** In HTML5, `<a>` can wrap block-level elements, but generally inline elements should not contain block elements.
- **Fix:** Use `<a href="#">Click Here</a>` or use a `<div>` with an onclick handler.

**Error 3: Closing Empty Elements**
```html
<img src="photo.jpg" alt="Photo"></img>
```
- **Reason:** Empty elements do not have closing tags.
- **Fix:** `<img src="photo.jpg" alt="Photo">` (or the XHTML style `<img />`).

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page with a `<div>` containing an `<h1>` and two `<p>` elements. Add a `<span>` inside one paragraph with colored text.
2. Write HTML that uses three empty elements (`<br>`, `<hr>`, `<img>`) on a single page.
3. Create a nested structure: a `<section>` containing an `<article>` containing an `<h2>`, a `<p>`, and a nested `<ul>` with three `<li>` items.

**Intermediate:**
4. Build a page that demonstrates at least 5 different block-level elements and 5 different inline elements, correctly nested.
5. Create a product card using nested elements: an `<article>` containing an `<img>`, an `<h3>` product name, a `<p>` description with `<strong>` for the price, and a `<a>` link.
6. Design a webpage that uses empty elements strategically: `<br>` for formatting an address, `<hr>` between two articles, and `<img>` for a profile photo.

**Advanced:**
7. Create a blog post layout that uses semantic block elements (`<article>`, `<header>`, `<section>`, `<footer>`) with nested inline elements (`<a>`, `<strong>`, `<em>`, `<span>`, `<abbr>`) throughout the content.
8. Build a complete HTML page that intentionally demonstrates proper nesting of at least 4 levels deep, includes both block and inline elements, and uses empty elements appropriately.
