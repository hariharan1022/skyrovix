## 33. HTML Semantics
## 📘 Introduction
Semantic HTML means using HTML elements according to their meaning rather than their appearance. Semantic elements clearly describe their purpose to both the browser and the developer, improving accessibility, SEO, and code maintainability.

## 🧠 Key Concepts
- **Semantic elements:** `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`, `<figure>`, `<figcaption>`, `<mark>`, `<time>`, `<details>`, `<summary>`
- **Non-semantic elements:** `<div>`, `<span>` (meaningless on their own)
- Benefits:
  - Accessibility: screen readers navigate by semantic landmarks
  - SEO: search engines understand content structure
  - Readability: code is self-documenting
  - Consistency: standard structure across projects
- ARIA roles can supplement semantics but native HTML is preferred
- `<figure>` and `<figcaption>` group media with captions

## 💻 Syntax
```html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2026-06-23">June 23, 2026</time>
  </header>
  <section>
    <p>Article content here...</p>
  </section>
  <figure>
    <img src="chart.png" alt="Data chart">
    <figcaption>Figure 1: Monthly sales data</figcaption>
  </figure>
  <footer>
    <p>Written by Author</p>
  </footer>
</article>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Build a semantic blog post structure.

**Code:**
```html
<main>
  <article>
    <header>
      <h1>Understanding HTML Semantics</h1>
      <p>Published on <time datetime="2026-06-20">June 20, 2026</time></p>
    </header>

    <section>
      <h2>What is Semantic HTML?</h2>
      <p>Semantic HTML uses meaningful tags that describe their content...</p>
    </section>

    <section>
      <h2>Why Use Semantic Elements?</h2>
      <p>Accessibility, SEO, and maintainability...</p>
    </section>

    <footer>
      <p>Category: Web Development</p>
    </footer>
  </article>

  <aside>
    <h3>Related Articles</h3>
    <ul>
      <li><a href="#">CSS Basics</a></li>
      <li><a href="#">JavaScript Intro</a></li>
    </ul>
  </aside>
</main>
```

**Output:** A well-structured blog post with a main content area, clearly defined sections, publication date, and a sidebar with related links.

**Explanation:** Each semantic element tells screen readers and search engines what role that content plays in the page structure.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a semantic FAQ section using `<details>` and `<summary>`.

**Code:**
```html
<section>
  <h2>Frequently Asked Questions</h2>

  <details>
    <summary>What is HTML?</summary>
    <p>HTML (HyperText Markup Language) is the standard language for creating web pages.</p>
  </details>

  <details>
    <summary>What are semantic elements?</summary>
    <p>Semantic elements clearly describe their meaning in a human- and machine-readable way.</p>
  </details>

  <details>
    <summary>Why is semantic HTML important?</summary>
    <p>It improves accessibility, SEO, and code readability.</p>
  </details>
</section>
```

**Output:** Three collapsible FAQ items. Clicking a summary expands the answer below it.

**Explanation:** `<details>` creates a disclosure widget. `<summary>` provides the visible heading. The content after `<summary>` is hidden until expanded.

## 🏢 Real World Use Case
News websites (articles with headers, sections, dates), documentation pages (structured with nav, main, article), product pages on e-commerce, and blog platforms all rely on semantic HTML for SEO and accessibility.

## 🎯 Interview Questions (5 with answers)
**1. What is semantic HTML?**
Semantic HTML uses tags that convey meaning about the content they contain, such as `<article>`, `<nav>`, `<header>`, rather than generic `<div>` or `<span>`.

**2. What is the difference between `<article>` and `<section>`?**
`<article>` is for self-contained, independently distributable content (like a blog post or news story). `<section>` groups related content thematically. An article can contain multiple sections.

**3. Why is semantic HTML important for SEO?**
Search engines use semantic tags to understand page structure and content hierarchy, which helps them index content more accurately and provide rich snippets in search results.

**4. What is the purpose of the `<figure>` element?**
`<figure>` wraps self-contained content like images, diagrams, or code snippets, often with a `<figcaption>` caption. It semantically associates the caption with the media.

**5. Can you use ARIA roles instead of semantic HTML?**
ARIA roles should supplement, not replace, semantic HTML. Native semantic elements have built-in accessibility features. Using `<nav>` is better than `<div role="navigation">`.

## ⚠ Common Errors / Mistakes
- Using `<div>` for everything instead of semantic elements
- Using `<article>` for content that isn't self-contained
- Nesting `<main>` inside `<article>` or `<aside>` (invalid)
- Using `<section>` without a heading (reduces accessibility)
- Forgetting `<figcaption>` for image descriptions

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create an article page with `<article>`, `<header>`, and `<footer>`.
2. Add a `<nav>` containing three navigation links to your page.
3. Wrap a set of images with captions using `<figure>` and `<figcaption>`.

**Intermediate:**
4. Build a complete blog post page using `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, and `<footer>`.
5. Create a collapsible FAQ section using `<details>` and `<summary>` with at least 4 questions.
6. Use the `<time>` element to mark up dates in an article with both `datetime` and human-readable text.

**Advanced:**
7. Analyze a non-semantic HTML page (full of divs) and refactor it to use proper semantic elements, explaining the improvements for accessibility and SEO.
8. Build an accessible navigation system using `<nav>`, nested `<ul>`, and ARIA landmarks that works with keyboard navigation.
