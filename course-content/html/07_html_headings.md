# 7. HTML Headings

## 📘 Introduction

HTML headings are used to define the hierarchical structure of a web page's content. There are six levels of headings, from `<h1>` (most important) to `<h6>` (least important). Headings not only make content visually organized (with `<h1>` being the largest and `<h6>` the smallest), but they also play a critical role in search engine optimization (SEO) and accessibility. Search engines use headings to understand the main topics and structure of a page. Screen readers use headings to help visually impaired users navigate content. A well-structured heading hierarchy improves readability, user experience, and search rankings. This module covers proper heading usage, SEO best practices, and styling headings.

## 🧠 Key Concepts

- **Heading Hierarchy:** `<h1>` is the main title (one per page). `<h2>` for major sections. `<h3>` for subsections. `<h4>`-`<h6>` for deeper nesting.
- **SEO Importance:** Search engines give more weight to heading content. The `<h1>` tag should contain the page's primary keyword.
- **Proper Structure:** Headings should follow a logical hierarchy without skipping levels. Don't jump from `<h1>` to `<h3>`.
- **Visual Appearance:** By default, `<h1>` is largest, `<h6>` is smallest. Browsers apply bold formatting and varying font sizes.
- **Styling Headings:** Use CSS to customize heading appearance (font, color, size, spacing).
- **Accessibility:** Screen reader users can navigate by headings. Proper structure is essential for WCAG compliance.

| Heading Level | Default Font Size | Usage |
|---------------|-------------------|-------|
| `<h1>` | 2em (32px) | Page title (use once) |
| `<h2>` | 1.5em (24px) | Major sections |
| `<h3>` | 1.17em (18.72px) | Subsections |
| `<h4>` | 1em (16px) | Sub-subsections |
| `<h5>` | 0.83em (13.28px) | Minor headings |
| `<h6>` | 0.67em (10.72px) | Least important |

## 💻 Syntax

```html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Headings</title>
</head>
<body>
  <h1>Main Page Title</h1>
  <h2>Section 1</h2>
  <h3>Subsection 1.1</h3>
  <h4>Sub-subsection</h4>
  <h2>Section 2</h2>
  <h3>Subsection 2.1</h3>
</body>
</html>
```

- `<h1>` is the most important heading. Use only once per page for the main title.
- `<h2>` divides the page into major sections.
- `<h3>` through `<h6>` create deeper levels of hierarchy.
- Headings are block-level elements—they start on a new line.
- Default styling includes bold text and specific font sizes.

## ✅ Example 1 - Basic

**Problem:** Create a page that demonstrates all six heading levels with a proper hierarchy.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Heading Levels</title>
</head>
<body>
  <h1>HTML Tutorial</h1>
  <h2>Introduction</h2>
  <p>What is HTML and why learn it.</p>

  <h2>Basic Tags</h2>
  <h3>Headings</h3>
  <p>How to use h1 to h6 tags.</p>

  <h3>Paragraphs</h3>
  <p>How to use the p tag.</p>

  <h2>Advanced Topics</h2>
  <h3>Forms</h3>
  <h4>Input Types</h4>
  <h4>Validation</h4>
  <h3>Multimedia</h3>
</body>
</html>
```

**Output:** A structured page with a main title, sections, and subsections with decreasing font sizes.

**Explanation:** The hierarchy is logical: `<h1>` (main topic) → `<h2>` (major sections) → `<h3>` (subsections) → `<h4>` (sub-subsections). No levels are skipped. Each heading clearly labels the content that follows.

## 🚀 Example 2 - Intermediate

**Problem:** Create a blog article page with proper heading hierarchy and inline styling.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>How to Learn Web Development</title>
</head>
<body>
  <h1 style="color: #2c3e50; font-family: Arial, sans-serif;">
    How to Learn Web Development in 2026
  </h1>

  <h2 style="color: #34495e;">1. Choose Your Path</h2>
  <p>Decide between front-end, back-end, or full-stack development.</p>

  <h3 style="color: #5d6d7e;">Front-End Development</h3>
  <p>Focus on HTML, CSS, and JavaScript.</p>

  <h3 style="color: #5d6d7e;">Back-End Development</h3>
  <p>Learn server-side languages like Python, Node.js, or PHP.</p>

  <h2 style="color: #34495e;">2. Build Projects</h2>
  <p>Practice by building real-world projects to reinforce your learning.</p>

  <h3 style="color: #5d6d7e;">Beginner Projects</h3>
  <p>Personal website, landing page, to-do app.</p>

  <h2 style="color: #34495e;">3. Join Communities</h2>
  <p>Engage with other developers on GitHub, Stack Overflow, and Discord.</p>
</body>
</html>
```

**Output:** A blog-style article with styled headings at different levels forming a clear content hierarchy.

**Explanation:** The `style` attribute customizes each heading's color and font. The hierarchy follows a logical outline: h1 (article title) → h2 (numbered steps) → h3 (sub-points). This structure helps both readers and search engines understand the content organization.

## 🏢 Real World Use Case

- **Wikipedia Articles:** Every article uses a single `<h1>` for the title, `<h2>` for each major section (History, Features, Reception), and `<h3>` for subsections. This heading structure powers the table of contents automatically.
- **Documentation (MDN Web Docs):** MDN uses `<h1>` for the page title, `<h2>` for main topics, and `<h3>`/`<h4>` for syntax, parameters, examples, and browser compatibility sections.
- **Blog Platforms (Medium, WordPress):** Blog posts use `<h1>` for the post title, `<h2>` for section headers, and `<h3>` for subsections. SEO plugins analyze heading structure to suggest improvements.

## 🎯 Interview Questions

**1. How many `<h1>` tags should you use on a page and why?**
Only one `<h1>` per page. It represents the main topic or title. Multiple `<h1>` tags dilute SEO value and confuse screen readers about the page's primary content.

**2. Why is heading hierarchy important for SEO?**
Search engines use headings to understand the structure and topic of a page. A clear hierarchy helps search engines index content correctly and improves ranking for target keywords.

**3. Can you skip heading levels (e.g., go from `<h2>` to `<h4>`)?**
Technically yes, but it is not recommended. Skipping levels breaks the logical outline structure and can confuse screen reader users. Always maintain hierarchy.

**4. How do screen readers use headings?**
Screen readers (like JAWS, NVDA) allow users to navigate by heading level. Users can jump from heading to heading (e.g., press H to move to the next heading). Proper hierarchy creates a navigable outline.

**5. What is the default styling of headings in browsers?**
All headings are bold. `<h1>` is the largest (2em / 32px), decreasing incrementally to `<h6>` (0.67em / 10.72px). Margins are added above and below.

## ⚠ Common Errors / Mistakes

**Error 1: Using Headings for Styling Instead of Semantics**
```html
<h3 style="font-size: 12px;">Small text that looks like a caption</h3>
```
- **Reason:** Headings should describe content structure, not just make text bold or large.
- **Fix:** Use CSS (`font-weight: bold`) or appropriate semantic elements.

**Error 2: Skipping Heading Levels**
```html
<h1>Title</h1>
<h3>Subsection</h3>  <!-- h2 skipped -->
```
- **Reason:** Breaks the logical document outline.
- **Fix:** Use `<h1>` → `<h2>` → `<h3>` in sequence.

**Error 3: Multiple `<h1>` Tags on One Page**
```html
<h1>Site Title</h1>
<h1>Article Title</h1>
```
- **Reason:** Confuses search engines and accessibility tools.
- **Fix:** Use one `<h1>` (page title) and `<h2>` for sections.

## 📝 Practice Exercises

**Beginner:**
1. Create a page with one `<h1>`, two `<h2>`, and three `<h3>` elements in a proper hierarchy.
2. Write HTML for a recipe page with a main title (h1), two sections (h2): "Ingredients" and "Instructions," and h3 subsections under Instructions.
3. Create a page that uses all six heading levels (h1-h6) in the correct order.

**Intermediate:**
4. Build an outline for a 2000-word article with h1 as the article title, h2 for three major sections, h3 for subsections under each h2, and h4 for sub-subsections where needed.
5. Create a course curriculum page with h1 as the course name, h2 for each module, h3 for lessons within each module, and h4 for topics within lessons.
6. Style five headings (h1-h5) using the `style` attribute with different colors and font families to create a visual hierarchy.

**Advanced:**
7. Create a complete HTML page for a technical documentation site with a table of contents that matches the heading structure. Use h1 for the title, h2 for five major sections, h3 for subsections with code examples, and h4 for edge cases—all in a logical hierarchy.
8. Build an HTML page that replicates the heading structure of a real Wikipedia article. Research any article (e.g., "JavaScript"), identify its heading levels, and recreate the outline with proper nesting.
