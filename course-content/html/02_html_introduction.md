# 2. HTML Introduction

## 📘 Introduction

HTML (HyperText Markup Language) is the backbone of the World Wide Web. It was first developed by Tim Berners-Lee in 1991 while working at CERN. Since then, HTML has evolved through multiple versions—from HTML 2.0 (1995) to HTML 4.01 (1999), XHTML (2000), and finally HTML5 (2014), which is the current standard. HTML is not a programming language; it is a markup language that uses tags to annotate text, images, and other content for display in a web browser. The fundamental building blocks of HTML are tags (which define elements), elements (the complete structure from opening to closing tag), and attributes (which provide additional information about elements). Browsers like Chrome, Firefox, Safari, and Edge parse HTML code and render it into interactive visual pages. Understanding the history and core concepts of HTML gives you a solid foundation for building modern websites.

## 🧠 Key Concepts

- **History of HTML:** Created by Tim Berners-Lee in 1991. HTML 2.0 (1995) was the first standard. HTML 4.01 (1999) added styling and scripting support. HTML5 (2014) introduced semantic elements, audio/video support, canvas, and improved form handling.
- **Tags:** Tags are keywords surrounded by angle brackets, e.g., `<tagname>`. Most tags come in pairs: an opening tag `<tagname>` and a closing tag `</tagname>`.
- **Elements:** An element includes the opening tag, content, and closing tag: `<p>Content</p>`.
- **Attributes:** Attributes provide extra information about an element and are placed inside the opening tag: `<a href="https://example.com">Link</a>`.
- **Browsers:** Web browsers (Chrome, Firefox, Safari, Edge) parse HTML and render it visually. Each browser has a rendering engine (Blink for Chrome, Gecko for Firefox, WebKit for Safari).
- **HTML Versions Comparison:**

| Version | Year | Key Features |
|---------|------|-------------|
| HTML 2.0 | 1995 | First standard specification |
| HTML 4.01 | 1999 | CSS support, scripting, forms |
| XHTML | 2000 | Stricter XML-based syntax |
| HTML5 | 2014 | Semantic tags, audio/video, canvas, local storage |

## 💻 Syntax

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Introduction to HTML</title>
</head>
<body>
  <h1>Learning HTML</h1>
  <p>This is a <strong>simple</strong> paragraph with an inline element.</p>
  <a href="https://www.w3.org" title="W3C Website">Visit W3C</a>
</body>
</html>
```

- `<meta charset="UTF-8">` sets character encoding for proper text display.
- `<meta name="viewport">` makes the page responsive on mobile devices.
- `<strong>` is an inline element that bolds text.
- The `<a>` tag uses `href` (attribute) to link to a URL and `title` for tooltip text.

## ✅ Example 1 - Basic

**Problem:** Create a simple HTML page demonstrating the use of tags, elements, and attributes.

**Code:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML Basics</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p title="This is a tooltip">Hover over this paragraph to see the tooltip.</p>
    <img src="https://via.placeholder.com/150" alt="Placeholder Image" width="150" height="150">
  </body>
</html>
```

**Output:** A page with a heading, a paragraph showing a tooltip on hover, and an image.

**Explanation:** The `<p>` tag includes a `title` attribute that displays a tooltip when hovered. The `<img>` tag is an empty element (no closing tag) with `src`, `alt`, `width`, and `height` attributes.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page that demonstrates nested elements and proper attribute usage.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nested Elements</title>
</head>
<body>
  <article>
    <h2>Web Development</h2>
    <p>HTML is the <strong>foundation</strong> of the web. It works with <em>CSS</em> and <em>JavaScript</em>.</p>
    <ul>
      <li>HTML - Structure</li>
      <li>CSS - Presentation</li>
      <li>JavaScript - Behavior</li>
    </ul>
  </article>
</body>
</html>
```

**Output:** An article with a heading, a paragraph containing nested inline elements, and an unordered list.

**Explanation:** The `<article>` element contains a heading, paragraph, and list. Inside the paragraph, `<strong>` and `<em>` are inline elements nested within the block-level `<p>`. The `<ul>` and `<li>` tags create a bulleted list.

## 🏢 Real World Use Case

- **Wikipedia:** Uses HTML extensively to structure encyclopedia articles with headings, paragraphs, tables, links, and images. Attributes like `class` and `id` are used for CSS styling and JavaScript functionality.
- **Google Search:** The search results page is built with HTML. Each result is an `<article>` or `<div>` containing links (`<a>` tags), headings (`<h3>`), and descriptive paragraphs. Attributes like `href` and `class` are critical for functionality and styling.
- **YouTube:** Video pages use HTML5 `<video>` elements, nested `<div>` structures for comments, and `<a>` tags for related videos. Attributes like `src`, `controls`, and `data-*` attributes drive interactivity.

## 🎯 Interview Questions

**1. What is the difference between HTML tags and HTML elements?**
HTML tags are the keywords between angle brackets (e.g., `<p>`, `</p>`). An HTML element includes the opening tag, the content, and the closing tag (e.g., `<p>Hello</p>`). Some elements (like `<br>`) are empty and have no closing tag.

**2. What are attributes in HTML? Give an example.**
Attributes provide additional information about an element. They are specified in the opening tag as name-value pairs. Example: `<a href="https://example.com" target="_blank">Click</a>` — `href` and `target` are attributes.

**3. What is the role of a web browser in rendering HTML?**
The browser's rendering engine downloads HTML from a server, parses it to build the DOM (Document Object Model) tree, applies CSS styles, executes JavaScript, and paints the visual output on the screen.

**4. What are the key differences between HTML4 and HTML5?**
HTML5 introduced semantic elements (`<header>`, `<footer>`, `<article>`, `<nav>`), native audio/video support (`<audio>`, `<video>`), the `<canvas>` element for graphics, form input types (email, date, range), and APIs like local storage and geolocation.

**5. Explain what an empty element is in HTML.**
An empty element (also called a self-closing or void element) has no content and no closing tag. Examples include `<br>` (line break), `<hr>` (horizontal rule), `<img>` (image), `<input>`, and `<meta>`.

## ⚠ Common Errors / Mistakes

**Error 1: Using Deprecated Tags from Older HTML Versions**
```html
<font color="red">Text</font>
<b>Bold text</b>
```
- **Reason:** `<font>` is deprecated in HTML5. CSS should be used instead.
- **Fix:** Use `<span style="color: red;">Text</span>` or CSS classes.

**Error 2: Not Using the `lang` Attribute**
```html
<html>
```
- **Reason:** Accessibility tools and search engines need the language to properly interpret content.
- **Fix:** `<html lang="en">` for English pages.

**Error 3: Incorrect Nesting**
```html
<p>This is <strong>bold text</p></strong>
```
- **Reason:** Tags must be closed in the reverse order they were opened (LIFO).
- **Fix:** `<p>This is <strong>bold text</strong></p>`

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page that includes one `<h1>`, two `<p>` elements, and one `<img>` with proper `src` and `alt` attributes.
2. Write HTML code to display a hyperlink using the `<a>` tag with `href` and `target="_blank"` attributes.
3. Create a page with an unordered list (`<ul>`) containing three list items (`<li>`).

**Intermediate:**
4. Build an HTML document that includes a `<section>` containing an `<h2>`, a paragraph with nested `<strong>` and `<em>` elements, and a link.
5. Create a page with an article that uses at least 5 different HTML tags, including one empty element and one element with multiple attributes.
6. Design an HTML page that demonstrates proper `<head>` section with charset, viewport, title, and description meta tags.

**Advanced:**
7. Create an HTML page that mimics a blog post layout using semantic tags (`<article>`, `<header>`, `<footer>`), including nested elements like `<blockquote>` and `<figure>`.
8. Build a complete HTML document that correctly uses all three types of lists (ordered, unordered, definition) and includes comments explaining the purpose of each section.
