# 4. HTML Basic

## 📘 Introduction

This module covers the fundamental tags and structure that form every HTML document. Understanding these basics is essential before moving on to more complex topics. You will learn about the document type declaration (`<!DOCTYPE html>`), the root `<html>` element, the `<head>` and `<body>` sections, and how to view the source code of any webpage in your browser. We will also cover basic content tags like headings (`<h1>`), paragraphs (`<p>`), line breaks (`<br>`), and horizontal rules (`<hr>`). These tags are the building blocks for all web content. By the end of this module, you will be able to create a well-structured HTML document with text content and understand how browsers interpret your code.

## 🧠 Key Concepts

- **Document Type Declaration:** `<!DOCTYPE html>` must be the very first line. It tells the browser to use HTML5 standards mode.
- **The `<html>` Element:** The root element that wraps all content on the page. The `lang` attribute specifies the language.
- **The `<head>` Element:** Contains meta-information about the page: title, character encoding, CSS links, and meta tags. Content in `<head>` is not displayed on the page.
- **The `<body>` Element:** Contains all visible content: text, images, links, tables, forms, etc.
- **View Page Source:** Right-click on any webpage and select "View Page Source" (or press Ctrl+U) to see the underlying HTML code.
- **Basic Text Tags:**
  - `<h1>` to `<h6>` - Headings (h1 is largest, h6 is smallest)
  - `<p>` - Paragraph (adds spacing before and after)
  - `<br>` - Line break (empty element, no closing tag)
  - `<hr>` - Horizontal rule (thematic break, empty element)

| Tag | Purpose | Type |
|-----|---------|------|
| `<h1>` | Main heading | Block |
| `<p>` | Paragraph | Block |
| `<br>` | Line break | Inline (empty) |
| `<hr>` | Thematic break | Block (empty) |

## 💻 Syntax

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic HTML Page</title>
</head>
<body>
  <h1>Main Heading</h1>
  <p>This is a paragraph of text.</p>
  <p>This is another paragraph.<br>This text appears on a new line.</p>
  <hr>
  <p>After the horizontal rule.</p>
</body>
</html>
```

- `<!DOCTYPE html>` declares HTML5.
- `<html lang="en">` sets the document language to English.
- `<meta charset="UTF-8">` ensures proper character encoding.
- `<h1>` to `<h6>` create headings at different levels.
- `<p>` creates paragraphs with automatic spacing.
- `<br>` inserts a line break within a paragraph.
- `<hr>` draws a horizontal line to separate content sections.

## ✅ Example 1 - Basic

**Problem:** Create a webpage with a main heading, a paragraph, a line break, and a horizontal rule.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Tags Demo</title>
</head>
<body>
  <h1>Welcome to HTML Basics</h1>
  <p>This is a paragraph with a line break.<br>This is on a new line.</p>
  <hr>
  <h2>Section Two</h2>
  <p>This paragraph follows a horizontal rule.</p>
</body>
</html>
```

**Output:** A page with a heading, a paragraph split by a line break, a horizontal line, a subheading, and another paragraph.

**Explanation:** The `<hr>` tag creates a visible horizontal line that thematically separates content sections. The `<br>` tag breaks text to a new line without starting a new paragraph, keeping the content within the same `<p>` element.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page that demonstrates all heading levels (h1-h6) and uses view source to inspect the structure.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Heading Levels</title>
</head>
<body>
  <h1>Heading 1 - Main Title</h1>
  <h2>Heading 2 - Section Title</h2>
  <h3>Heading 3 - Subsection Title</h3>
  <h4>Heading 4 - Sub-subsection</h4>
  <h5>Heading 5 - Minor Heading</h5>
  <h6>Heading 6 - Smallest Heading</h6>
  <hr>
  <p>Notice how each heading gets smaller. Use h1 only once per page for SEO.</p>
</body>
</html>
```

**Output:** Six headings displayed from largest (h1) to smallest (h6), separated from a paragraph by a horizontal rule.

**Explanation:** Headings create a visual and hierarchical structure. Search engines use headings to understand page content. There should be only one `<h1>` per page (the main title). Subheadings follow a logical hierarchy (h2 under h1, h3 under h2, etc.).

## 🏢 Real World Use Case

- **Blog Articles (Medium, WordPress):** Blog posts use `<h1>` for the article title, `<h2>` for section headers, `<h3>` for subsections, and `<p>` for body text. The `<hr>` tag separates sections or marks the end of an article.
- **Documentation Sites (MDN, W3Schools):** Technical documentation uses heading hierarchy for navigation and structure. Each page has a single `<h1>` for the topic, with `<h2>` and `<h3>` for subtopics.
- **E-commerce Product Pages (Amazon, Flipkart):** Product titles use `<h1>`, feature sections use `<h2>`, and product descriptions use `<p>` tags with `<br>` for formatting addresses or specifications.

## 🎯 Interview Questions

**1. What is the purpose of `<!DOCTYPE html>` in an HTML document?**
It declares the document type and version (HTML5). It ensures the browser renders the page in standards mode rather than quirks mode, providing consistent rendering across browsers.

**2. What is the difference between `<head>` and `<body>` in an HTML document?**
`<head>` contains metadata, title, links to CSS files, and scripts that are not displayed on the page. `<body>` contains all visible content that users see in the browser.

**3. Can you have multiple `<h1>` tags on a single page?**
Technically yes, but it is not recommended for SEO and accessibility. Search engines use `<h1>` as the primary topic of the page. Having one `<h1>` per page is a best practice.

**4. What is the difference between `<br>` and `<hr>`?**
`<br>` (line break) inserts a single line break within text content. `<hr>` (horizontal rule) creates a thematic break, displayed as a horizontal line, separating sections of content.

**5. How can you view the HTML source code of a webpage?**
Right-click on the page and select "View Page Source" or press Ctrl+U (Windows/Linux) or Cmd+Option+U (Mac). The browser opens a new tab showing the raw HTML code.

## ⚠ Common Errors / Mistakes

**Error 1: Putting Content Inside `<head>` Instead of `<body>`**
```html
<head>
  <h1>Title</h1>
</head>
```
- **Reason:** The `<head>` section is for metadata only. Content inside it is not displayed.
- **Fix:** Move content tags to `<body>`.

**Error 2: Using `<br>` to Create Spacing Between Paragraphs**
```html
<p>First paragraph</p>
<br><br><br>
<p>Second paragraph</p>
```
- **Reason:** `<br>` is for line breaks within content, not for spacing between elements.
- **Fix:** Use CSS `margin` or a single `<p>` tag for each paragraph.

**Error 3: Forgetting to Close `<p>` Tags**
```html
<p>This is a paragraph
<p>This is another paragraph
```
- **Reason:** While browsers may auto-close unclosed `<p>` tags, this can cause layout inconsistencies.
- **Fix:** Always close `<p>` tags: `<p>Content</p>`.

## 📝 Practice Exercises

**Beginner:**
1. Create a webpage with exactly one `<h1>`, two `<h2>` elements, and three `<p>` elements containing lorem ipsum text.
2. Write HTML code that displays your address using `<p>` tags and `<br>` tags for line breaks.
3. Create a page with a title "My First HTML Page" in the browser tab and a horizontal rule separating two sections.

**Intermediate:**
4. Build a webpage that uses all six heading levels (h1-h6) in a proper hierarchy, with paragraphs under each heading.
5. Create an article page with an `<h1>` title, an introductory paragraph, an `<hr>`, two `<h2>` sections each with two paragraphs, and line breaks within one paragraph to format a poem or address.
6. Design a page that could serve as a personal profile: name in `<h1>`, tagline in `<h2>`, bio in `<p>`, and contact details with `<br>` for line breaks.

**Advanced:**
7. Create a complete HTML document that mimics a news article page: headline (h1), byline (p with br for date/author), multiple sections (h2 + p), and horizontal rules between sections—without using any CSS.
8. Build a multi-section landing page for a fictional product using only basic HTML tags (h1-h6, p, br, hr) that includes a hero section, features section, about section, and footer—all properly structured.
