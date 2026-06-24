## 30. HTML Layout
## 📘 Introduction
HTML layout refers to the way content is structured and arranged on a webpage. Modern HTML uses semantic layout elements and CSS (Flexbox, Grid) to create organized, accessible, and responsive page structures.

## 🧠 Key Concepts
- **Semantic layout elements:**
  - `<header>` - introductory content, logo, navigation
  - `<nav>` - navigation links
  - `<main>` - primary content (unique to the page)
  - `<section>` - thematic grouping of content
  - `<article>` - self-contained content (blog post, news item)
  - `<aside>` - sidebar, tangential content
  - `<footer>` - footer, copyright, contact info
- CSS Grid for two-dimensional layouts
- CSS Flexbox for one-dimensional layouts
- Nested layouts combine semantic elements with CSS

## 💻 Syntax
```html
<body>
  <header>Site Header / Logo</header>
  <nav>Navigation Links</nav>
  <main>
    <article>Main Content</article>
    <aside>Sidebar</aside>
  </main>
  <footer>Footer Content</footer>
</body>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a simple blog layout with semantic HTML elements.

**Code:**
```html
<body>
  <header>
    <h1>My Blog</h1>
  </header>
  <nav>
    <a href="#">Home</a> | <a href="#">About</a> | <a href="#">Contact</a>
  </nav>
  <main>
    <article>
      <h2>Blog Post Title</h2>
      <p>This is the blog post content.</p>
    </article>
    <aside>
      <h3>About Me</h3>
      <p>Short bio here.</p>
    </aside>
  </main>
  <footer>
    <p>&copy; 2026 My Blog</p>
  </footer>
</body>
```

**Output:** A well-structured blog page with header, navigation, main content area with sidebar, and footer.

**Explanation:** Semantic elements improve readability, accessibility, and SEO. Screen readers can navigate the structure easily.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Build a layout using CSS Grid for the overall page structure.

**Code:**
```html
<style>
  .grid-layout {
    display: grid;
    grid-template-areas:
      "header header"
      "nav    nav"
      "main   aside"
      "footer footer";
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
  header { grid-area: header; background: #333; color: white; padding: 20px; }
  nav    { grid-area: nav; background: #f4f4f4; padding: 10px; }
  main   { grid-area: main; padding: 20px; }
  aside  { grid-area: aside; background: #f9f9f9; padding: 20px; }
  footer { grid-area: footer; background: #333; color: white; padding: 20px; }
</style>

<div class="grid-layout">
  <header>My Site</header>
  <nav><a href="#">Home</a> <a href="#">Blog</a></nav>
  <main><h2>Main Content</h2><p>Content here...</p></main>
  <aside><h3>Sidebar</h3><p>Widgets...</p></aside>
  <footer>&copy; 2026 My Site</footer>
</div>
```

**Output:** A grid layout with header spanning full width, nav below, main content and sidebar side by side, and footer at the bottom.

**Explanation:** CSS Grid's `grid-template-areas` provides a visual way to define layout regions. The `2fr 1fr` creates a main-aside ratio.

## 🏢 Real World Use Case
News websites (header, nav, main articles, sidebar, footer), e-commerce product pages, dashboards (sidebar + main content area), landing pages, and documentation sites.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between `<section>` and `<article>`?**
`<article>` is for self-contained, reusable content (blog posts, comments). `<section>` groups related content thematically. An `<article>` can contain multiple `<section>` elements.

**2. What are the benefits of semantic layout elements?**
Improved accessibility (screen readers navigate by landmarks), better SEO (search engines understand structure), clearer code readability, and consistent styling.

**3. What is the difference between CSS Grid and Flexbox?**
Grid is two-dimensional (rows and columns simultaneously). Flexbox is one-dimensional (either row or column). Use Grid for overall page layout, Flexbox for component-level alignment.

**4. Can you use `<header>` multiple times on a page?**
Yes. You can have a `<header>` for the page and additional `<header>` elements inside `<article>` or `<section>` elements.

**5. What does the `<main>` element represent?**
The dominant content of the `<body>`. It should be unique on the page and not used inside `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`.

## ⚠ Common Errors / Mistakes
- Using `<div>` for everything instead of semantic layout elements
- Placing `<main>` inside `<article>` or `<aside>` (invalid)
- Using `<header>` and `<footer>` as page-only when they can be section-level
- Forgetting that `<nav>` should only contain major navigation, not all links
- Not wrapping the layout in a container for consistent spacing

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a page with semantic `<header>`, `<nav>`, `<main>`, and `<footer>` elements.
2. Add an `<aside>` sidebar next to the main content.
3. Style each semantic region with different background colors to visualize the layout.

**Intermediate:**
4. Build a full blog layout using CSS Grid with header, nav, main (with two articles), aside, and footer.
5. Create a product listing page using Flexbox to display a row of product cards.
6. Build a holy grail layout (header, footer, three columns) using CSS Grid.

**Advanced:**
7. Create a responsive layout that switches from a 3-column grid on desktop to a single column on mobile using media queries.
8. Build a magazine-style layout with overlapping elements, mixed grid placements, and multiple `<section>` and `<article>` regions.
