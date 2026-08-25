# 12. HTML Comments

## 📘 Introduction

HTML comments are annotations in the source code that are not displayed in the browser. They are used to explain code, document sections, temporarily disable code during debugging, and provide notes for other developers. Comments are invisible to users but visible to anyone who views the page source. The syntax for HTML comments is `<!-- comment text -->`. Comments can span multiple lines and can contain any text except two consecutive hyphens (`--`) inside the comment. Proper use of comments makes code more maintainable, helps with team collaboration, and is invaluable during debugging. This module covers comment syntax, best practices, conditional comments (legacy IE support), and using comments effectively for debugging and documentation.

## 🧠 Key Concepts

- **Comment Syntax:** `<!-- Your comment here -->`. Comments can be single-line or multi-line.
- **Purpose:** Document code, explain complex sections, mark areas for improvement, temporarily hide code during debugging.
- **Not Rendered:** Comments are stripped from the visual rendering but remain in the HTML source code (View Page Source shows them).
- **No Nesting:** HTML comments cannot be nested. `<!-- <!-- --> -->` will break the page.
- **Conditional Comments:** Legacy feature targeting specific versions of Internet Explorer (e.g., `<!--[if IE 8]>...<![endif]-->`). No longer needed in modern development.
- **Debugging Technique:** Comment out sections of HTML to isolate problems without deleting code.
- **Shortcuts:** In VS Code and most editors, press `Ctrl + /` (Windows/Linux) or `Cmd + /` (Mac) to toggle comments.

| Feature | Detail |
|---------|--------|
| Syntax | `<!-- text -->` |
| Visible in browser? | No |
| Visible in page source? | Yes |
| Can span multiple lines? | Yes |
| Can contain HTML tags? | Yes (but they won't render) |
| Keyboard shortcut | Ctrl + / (VS Code) |

## 💻 Syntax

```html
<!-- This is a single-line comment -->

<!--
  This is a
  multi-line comment
-->

<!-- TODO: Update this section with new content -->
<p>Some visible content</p>

<!-- Temporarily hiding this section
<div>
  <p>This content is hidden during debugging</p>
</div>
-->

<p>Another visible paragraph</p>
```

- Comments start with `<!--` and end with `-->`.
- Any text, HTML tags, or code inside comments will not render.
- Use comments for documentation, TODOs, and debugging.
- Do not place `--` inside comments (except for the closing `-->`).

## ✅ Example 1 - Basic

**Problem:** Create a page that uses comments to document the structure and temporarily hide content.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Comments Demo</title>
</head>
<body>
  <!-- Main header section -->
  <header>
    <h1>Welcome to My Site</h1>
    <!-- Navigation will be added here later -->
  </header>

  <!-- Main content area -->
  <main>
    <p>This paragraph is visible.</p>

    <!-- Temporarily hiding the promotional banner
    <div class="promo">
      <p>Special offer! 50% off!</p>
    </div>
    -->

    <p>This paragraph is also visible.</p>
  </main>

  <!-- TODO: Add footer with copyright and links -->
</body>
</html>
```

**Output:** A page showing only the header and two paragraphs. The comment-blocked promotional banner and TODO notes are invisible.

**Explanation:** This demonstrates using comments for documentation (section labels), placeholders (TODO), and debugging (temporarily hiding the promo div). The hidden content remains accessible via "View Page Source" for easy restoration.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page that uses comments for collaboration notes, version info, and conditional comments.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Collaborative Development</title>
  <!--
    Project: Skyrovix Academy Website
    Author: Development Team
    Version: 2.1.0
    Last Updated: June 2026
  -->
</head>
<body>
  <header>
    <h1>Skyrovix Academy</h1>
    <!-- Team Note: Update navigation links before deployment -->
    <nav>
      <a href="#">Home</a>
      <a href="#">Courses</a>
      <!-- <a href="#">Blog</a> --> <!-- Blog link hidden until launch -->
      <a href="#">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Our Courses</h2>
      <!-- TODO: Add course cards with images and descriptions -->
      <p>Course catalog coming soon.</p>
    </section>

    <!-- [DEBUG] Commented out to test layout without hero section
    <section class="hero">
      <h2>Learn from the Best</h2>
      <p>Join thousands of students worldwide.</p>
    </section>
    -->
  </main>

  <!-- Conditional comment for Internet Explorer (legacy support) -->
  <!--[if IE]>
    <p style="color: red;">You are using an outdated browser. Please upgrade.</p>
  <![endif]-->
</body>
</html>
```

**Output:** A page with a header, navigation (without Blog link), main content, and no hero section. IE conditional content only shows in Internet Explorer.

**Explanation:** The file header comment documents project metadata. The navigation comment hides a pending link. The TODO marks a section needing work. The debug comment hides the hero section for testing. The conditional comment targets Internet Explorer specifically (legacy use).

## 🏢 Real World Use Case

- **Large-Scale Web Applications (Google, Facebook):** Development teams use comments for code reviews, marking areas for refactoring (`// TODO`), version history in templates, and temporarily disabling features during deployment testing.
- **Enterprise CMS Templates (WordPress, Drupal):** Comments are used to document template structure, mark where dynamic content is injected, and provide instructions for other developers who may modify the templates later.
- **Agency Projects:** When multiple developers work on the same HTML files, comments help communicate responsibilities: `<!-- Sarah: Update pricing section -->` or `<!-- Start of header component -->`.

## 🎯 Interview Questions

**1. What is the syntax for an HTML comment?**
`<!-- comment text -->`. Comments can span multiple lines. Everything between `<!--` and `-->` is ignored by the browser.

**2. Are HTML comments visible to website users?**
Comments are not visible in the rendered page, but they are visible in the page source. Users can view comments by right-clicking and selecting "View Page Source" or pressing Ctrl+U.

**3. How can comments be used for debugging?**
By wrapping HTML code in comments (`<!-- <div>...</div> -->`), you can temporarily hide sections from rendering without deleting them. This helps isolate layout issues by selectively disabling parts of the page.

**4. Can HTML comments be nested?**
No. Nesting comments is not allowed. The first `-->` encountered will close the comment, potentially breaking the page layout. Avoid using `--` inside comment text.

**5. What were conditional comments in HTML?**
Conditional comments were a Microsoft proprietary feature that allowed targeting specific versions of Internet Explorer, e.g., `<!--[if IE 8]>...<![endif]-->`. They are deprecated and no longer supported in IE11+ or modern browsers.

## ⚠ Common Errors / Mistakes

**Error 1: Nesting Comments**
```html
<!-- Outer comment <!-- Inner comment --> Still inside outer -->
```
- **Reason:** The `-->` after "Inner comment" closes the entire comment, leaving "Still inside outer -->" exposed as visible text.
- **Fix:** Do not nest comments. Use separate comments instead.

**Error 2: Using `--` Inside Comment Text**
```html
<!-- This -- is a note about the code -->
```
- **Reason:** The sequence `--` inside a comment is not allowed in HTML (it conflicts with the closing `-->`).
- **Fix:** Avoid consecutive hyphens inside comments.

**Error 3: Commenting Out Large Sections That Contain Other Comments**
```html
<!--
  <section>
    <!-- Inner comment -->
  </section>
-->
```
- **Reason:** The inner `-->` closes the outer comment prematurely.
- **Fix:** Remove inner comments before commenting out the outer section.

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page with a single-line comment above a heading that says "This is the main heading."
2. Write a multi-line comment that contains a TODO list with three items. Below it, add a paragraph of visible content.
3. Create a page and use a comment to hide a paragraph from rendering, then verify it's not visible but appears in page source.

**Intermediate:**
4. Build a page with a navigation bar. Use comments to document each link's purpose and temporarily hide one link using a comment.
5. Create a page with three sections. Use comments to label each section. Comment out the second section entirely for debugging purposes.
6. Design a page footer and use a comment block at the top of the file (in `<head>`) to document the author, date, and version of the page.

**Advanced:**
7. Create a complete multi-section landing page. Use comments to: (a) document the file header, (b) label each section, (c) mark TODOs for three unfinished features, (d) hide one entire section for A/B testing, and (e) add a debug comment around a problematic element.
8. Build a page that simulates a team collaboration scenario. Use comments to: assign tasks to different team members (e.g., `<!-- John: add hero image -->`), note bugs (`<!-- BUG: menu not showing on mobile -->`), version history, and include a comment-blocked experimental feature that can be easily uncommented.
