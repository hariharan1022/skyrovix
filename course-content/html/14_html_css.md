# 14. HTML CSS

## 📘 Introduction

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. There are three ways to apply CSS to HTML: inline CSS (using the `style` attribute on individual elements), internal CSS (using a `<style>` tag in the `<head>` section), and external CSS (using a separate `.css` file linked via the `<link>` tag). External CSS is the best practice for maintainable websites because it separates content from presentation, allows reusing styles across multiple pages, and improves page load speed through caching. CSS uses selectors to target HTML elements and applies properties to style them. Classes (`.classname`) and IDs (`#idname`) are the most common ways to select elements. This module covers all three methods of applying CSS, the difference between classes and IDs, and how to link external stylesheets.

## 🧠 Key Concepts

- **Inline CSS:** Applied directly via the `style` attribute. Highest specificity but least reusable. Best for quick tests or one-off styles.
- **Internal CSS:** CSS rules inside a `<style>` tag in the document's `<head>`. Affects only that single page. Useful for single-page sites or when external CSS is not an option.
- **External CSS:** CSS rules in a separate `.css` file. Linked via `<link rel="stylesheet" href="styles.css">`. Best for multi-page sites, team projects, and production.
- **CSS Selectors:** Patterns to select HTML elements. Type (`p`), class (`.class`), ID (`#id`), attribute (`[type="text"]`), descendant (`div p`), pseudo-class (`:hover`).
- **Class vs ID:** Classes (`.classname`) can be reused on multiple elements. IDs (`#idname`) must be unique per page. IDs have higher specificity.
- **Specificity Hierarchy:** Inline styles > ID selectors > Class selectors > Element selectors. Determines which rule wins on conflict.
- **The Cascade:** When multiple rules target the same element, the browser follows the cascade: importance, specificity, then source order.

| CSS Method | Placement | Reusability | Use Case |
|------------|-----------|-------------|----------|
| Inline | `style` attribute | Single element | Quick tests |
| Internal | `<style>` in `<head>` | Single page | Small projects |
| External | `.css` file | Multiple pages | Production sites |

## 💻 Syntax

```html
<!-- Inline CSS -->
<p style="color: blue; font-size: 18px;">This is styled inline.</p>

<!-- Internal CSS (in head) -->
<head>
  <style>
    p { color: red; font-size: 16px; }
    .highlight { background-color: yellow; }
    #main-title { font-size: 32px; color: navy; }
  </style>
</head>

<!-- External CSS -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

- Inline: `style="property: value;"` on the element itself.
- Internal: `<style>` tag in `<head>` with CSS rules.
- External: `<link>` tag pointing to a `.css` file.
- Class selector: `.classname` - reusable across elements.
- ID selector: `#idname` - unique to one element.

## ✅ Example 1 - Basic

**Problem:** Create a page demonstrating all three CSS methods.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>CSS Methods</title>
  <!-- Internal CSS -->
  <style>
    h1 { color: navy; text-align: center; }
    .card { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; margin: 10px 0; }
    #footer { text-align: center; color: gray; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Three Ways to Use CSS</h1>

  <div class="card">
    <h2>Inline CSS Example</h2>
    <p style="color: blue; font-weight: bold;">This paragraph uses inline CSS.</p>
  </div>

  <div class="card">
    <h2>Internal CSS Example</h2>
    <p>This paragraph is styled by the internal CSS rule for p tags.</p>
    <p class="highlight" style="background-color: yellow;">This has both a class and inline style.</p>
  </div>

  <div id="footer">
    <p>This footer uses an ID selector.</p>
  </div>
</body>
</html>
```

**Output:** A page with a centered navy heading, two card sections, and a centered gray footer.

**Explanation:** The `<style>` block in `<head>` defines rules for `h1`, `.card`, and `#footer`. The first card paragraph uses inline CSS. The second card demonstrates class and inline style combination. The footer demonstrates ID-based styling.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page that links an external stylesheet and uses classes/IDs effectively.

**Code:**
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>External CSS Demo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header id="site-header">
    <h1 class="brand">Skyrovix Academy</h1>
    <nav class="main-nav">
      <a href="#" class="nav-link active">Home</a>
      <a href="#" class="nav-link">Courses</a>
      <a href="#" class="nav-link">About</a>
    </nav>
  </header>

  <main class="content">
    <section class="hero">
      <h2>Learn Web Development</h2>
      <p class="hero-text">Master HTML, CSS, and JavaScript with expert-led courses.</p>
      <a href="#" class="btn btn-primary">Get Started</a>
    </section>

    <section class="features">
      <div class="feature-card">
        <h3>Interactive Lessons</h3>
        <p>Learn by doing with hands-on exercises.</p>
      </div>
      <div class="feature-card">
        <h3>Expert Mentors</h3>
        <p>Get guidance from industry professionals.</p>
      </div>
    </section>
  </main>

  <footer id="site-footer">
    <p>&copy; 2026 Skyrovix Academy. All rights reserved.</p>
  </footer>
</body>
</html>
```

```css
/* styles.css */
* { margin: 0; padding: 0; box-sizing: border-box; }

body { font-family: Arial, sans-serif; line-height: 1.6; }

#site-header { background-color: #2c3e50; color: white; padding: 20px; }

.brand { font-size: 28px; }

.main-nav { margin-top: 10px; }

.nav-link { color: white; text-decoration: none; margin-right: 15px; }

.nav-link.active { text-decoration: underline; font-weight: bold; }

.content { padding: 30px; }

.hero { text-align: center; padding: 50px 0; background-color: #ecf0f1; }

.hero-text { font-size: 18px; margin: 20px 0; }

.btn { display: inline-block; padding: 10px 20px; text-decoration: none; border-radius: 5px; }

.btn-primary { background-color: #3498db; color: white; }

.features { display: flex; gap: 20px; margin-top: 30px; }

.feature-card { flex: 1; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }

#site-footer { text-align: center; padding: 20px; background-color: #34495e; color: white; }
```

**Output:** A professionally styled landing page with header, navigation, hero section, feature cards, and footer.

**Explanation:** The HTML uses classes for reusable components (`.nav-link`, `.feature-card`, `.btn`) and IDs for unique sections (`#site-header`, `#site-footer`). The external `styles.css` contains all styling rules, keeping HTML clean and content-focused.

## 🏢 Real World Use Case

- **Bootstrap Framework:** The most popular CSS framework, used by millions of websites (including Twitter, LinkedIn). Developers add classes like `class="btn btn-primary"`, `class="container"`, and `class="row"` to HTML elements, with styles defined in external CSS.
- **Tailwind CSS (Used by Shopify, Netflix):** A utility-first CSS framework where developers use hundreds of pre-built classes directly in HTML (e.g., `class="text-lg font-bold bg-blue-500 p-4 rounded"`). External CSS file is the compiled framework.
- **Enterprise Websites (Microsoft, Apple):** Use external CSS extensively with well-organized stylesheets. IDs for layout sections (`.header`, `.footer`) and classes for reusable components (`.button`, `.card`, `.nav-item`).

## 🎯 Interview Questions

**1. What are the three ways to apply CSS to an HTML document?**
Inline (style attribute), Internal (style tag in head), External (link to .css file). External is recommended for production due to reusability, maintainability, and caching benefits.

**2. What is the difference between a class and an ID in CSS?**
A class (`.classname`) can be used on multiple elements; an ID (`#idname`) must be unique. IDs have higher specificity (0,1,0,0) than classes (0,0,1,0). Use classes for reusable components, IDs for unique page sections.

**3. How do you link an external CSS file to an HTML document?**
Use the `<link>` tag in the `<head>` section: `<link rel="stylesheet" href="styles.css">`. The `rel="stylesheet"` attribute is required.

**4. What is CSS specificity and how does it work?**
Specificity determines which CSS rule is applied when multiple rules target the same element. It's calculated as: inline styles (1,0,0,0), IDs (0,1,0,0), classes (0,0,1,0), elements (0,0,0,1). Higher specificity wins.

**5. What does "cascade" mean in Cascading Style Sheets?**
The cascade is the algorithm browsers use to resolve conflicting CSS declarations. It considers importance (`!important`), specificity, and source order. When two rules have equal specificity, the one declared last wins.

## ⚠ Common Errors / Mistakes

**Error 1: Missing `rel="stylesheet"` in Link Tag**
```html
<link href="styles.css">
```
- **Reason:** Without `rel="stylesheet"`, the browser doesn't know it's a stylesheet.
- **Fix:** `<link rel="stylesheet" href="styles.css">`

**Error 2: Using Class Selector with Dot in HTML**
```html
<div class=".card">Content</div>
```
- **Reason:** The dot is part of CSS syntax, not HTML.
- **Fix:** `class="card"` in HTML, `.card {}` in CSS.

**Error 3: Overusing IDs for Styling Instead of Classes**
```html
<div id="main-content">...</div>
<div id="sidebar">...</div>
<div id="footer">...</div>
```
- **Reason:** IDs have high specificity, making overrides difficult. They cannot be reused.
- **Fix:** Use classes for styling: `class="content"`, `class="sidebar"`, `class="footer"`. Reserve IDs for JavaScript or anchor links.

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page with internal CSS that styles all `h1` tags blue, all `p` tags with font-size 16px, and adds a yellow background to a `.highlight` class.
2. Create a simple HTML page and use inline CSS to style one paragraph with red color and bold text.
3. Create an external CSS file and link it to an HTML page. The CSS should set the body background to light gray and all headings to navy.

**Intermediate:**
4. Build a page with internal CSS that uses element selectors (for body, h1, p), class selectors (for .card, .btn), and an ID selector (for #header).
5. Create a navigation bar component using external CSS. Use classes for nav items, a `.active` class for the current page, and an ID for the nav container.
6. Design a blog post page with external CSS. The page should include: a header (ID), multiple blog post cards (class), a sidebar (ID), and a footer (ID).

**Advanced:**
7. Create a complete 3-page mini-website (Home, About, Contact) with a shared external CSS file. Each page should use the same header, navigation, and footer styles. The navigation should highlight the current page using an `.active` class.
8. Build a CSS component library with external CSS that includes styled buttons (`.btn`, `.btn-primary`, `.btn-danger`, `.btn-large`), cards (`.card`, `.card-header`, `.card-body`), alerts (`.alert`, `.alert-success`, `.alert-error`), and a grid system (`.row`, `.col-*`). Create an HTML page that demonstrates all components.
