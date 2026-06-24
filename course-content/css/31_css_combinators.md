## 31. CSS Combinators

## 📘 Introduction
CSS combinators allow you to select elements based on their relationship to other elements in the DOM tree. Instead of applying styles with individual classes, combinators let you target elements by ancestry, sibling relationships, and parent-child connections — enabling more efficient and semantic styling.

## 🧠 Key Concepts
- **Descendant combinator (space)** `A B`: Selects all `B` elements that are descendants (children, grandchildren, etc.) of `A`
- **Child combinator (`>`)** `A > B`: Selects only direct children of `A` (not deeper descendants)
- **Adjacent sibling combinator (`+`)** `A + B`: Selects `B` that immediately follows `A` (same parent, next sibling only)
- **General sibling combinator (`~`)** `A ~ B`: Selects all `B` siblings that follow `A` (same parent, any later siblings)
- **Combining selectors**: Combinators can be chained — e.g., `ul > li.active + li` selects a `<li>` directly after an active `<li>` that is a direct child of `<ul>`
- **Specificity**: Combinators don't change specificity — the specificity is calculated from the individual selectors

## 💻 Syntax

```css
/* Descendant: all <p> inside .article */
.article p {
  color: #333;
}

/* Child: direct <li> children of <ul> only */
ul > li {
  list-style: none;
}

/* Adjacent sibling: first <p> after an <h2> */
h2 + p {
  font-weight: bold;
}

/* General sibling: all <p> after an <h2> */
h2 ~ p {
  margin-left: 20px;
}

/* Chained combinators */
nav > ul > li.active + li {
  background: #f0f0f0;
}
```

## ✅ Example 1 - Basic (Combinators for Typography Styling)

**Problem:** Style a blog article using different combinators to target paragraphs, lists, and headings based on their relationships.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Georgia, serif;
    background: #fafafa;
    padding: 40px;
  }
  .article {
    max-width: 700px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  /* Descendant combinator */
  .article h2 {
    color: #2c3e50;
    margin: 25px 0 10px;
    font-size: 1.5em;
  }

  /* Adjacent sibling: style the first paragraph after each h2 */
  h2 + p {
    font-weight: bold;
    color: #555;
  }

  /* General sibling: style all paragraphs after an h2 with indent */
  h2 ~ p {
    margin-left: 5px;
  }

  /* Child combinator: direct list items only */
  .article > ul {
    background: #f8f9fa;
    padding: 15px 30px;
    border-radius: 6px;
    margin: 15px 0;
  }
  .article > ul > li {
    margin: 8px 0;
    color: #444;
  }

  /* Adjacent sibling: paragraph after a list gets extra margin */
  ul + p {
    margin-top: 20px;
    font-style: italic;
    color: #777;
  }
</style>
</head>
<body>
  <div class="article">
    <h1>CSS Combinators in Action</h1>

    <h2>Understanding Relationships</h2>
    <p>This paragraph comes right after an h2 — it's bold thanks to the adjacent sibling combinator.</p>
    <p>This paragraph is a later sibling — it has left indent from the general sibling combinator.</p>
    <p>Another paragraph with the same left indent.</p>

    <h2>Working with Lists</h2>
    <p>This bold paragraph follows an h2 directly.</p>
    <ul>
      <li>Direct child of .article</li>
      <li>Styled with the child combinator</li>
      <li>Background only on this top-level list</li>
    </ul>
    <p>This paragraph comes after a list — styled with italic via the ul + p combinator.</p>

    <h2>Nested Lists</h2>
    <ul>
      <li>Item one
        <ul>
          <li>This nested list is NOT a direct child of .article</li>
          <li>Styled by descendant but NOT the child combinator style</li>
        </ul>
      </li>
      <li>Item two</li>
    </ul>
  </div>
</body>
</html>
```

**Output:** A styled article where the first paragraph after each `h2` is bold, subsequent paragraphs have left indent, direct `ul` children have a background but nested `ul` elements do not.

**Explanation:** Each combinator targets a specific relationship. `h2 + p` matches only the immediate sibling paragraph. `h2 ~ p` matches all subsequent paragraphs. `.article > ul` matches only direct child `<ul>` elements, not nested ones.

## 🚀 Example 2 - Intermediate (Dropdown Navigation with Combinators)

**Problem:** Build a multi-level navigation menu where child and sibling combinators control visibility and styling of dropdown submenus.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    background: #ecf0f1;
    padding: 40px;
  }

  /* Direct children of first-level list */
  .nav > ul {
    list-style: none;
    background: #2c3e50;
    border-radius: 8px;
    display: flex;
  }

  /* Direct child list items */
  .nav > ul > li {
    position: relative;
  }

  /* Direct child links */
  .nav > ul > li > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 15px 25px;
    transition: background 0.3s;
  }

  /* Hover on direct child list items */
  .nav > ul > li:hover > a {
    background: #3498db;
  }

  /* Dropdown: adjacent to a list item that has ul inside */
  .nav > ul > li > ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: #34495e;
    list-style: none;
    min-width: 180px;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
  }

  /* Adjacent sibling combinator: show dropdown on hover of parent */
  .nav > ul > li:hover > ul {
    display: block;
  }

  /* Sublinks inside dropdown */
  .nav > ul > li > ul > li > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    transition: background 0.3s;
  }

  /* General sibling: all sublinks except first on hover */
  .nav > ul > li > ul > li:hover + li a,
  .nav > ul > li > ul > li:hover ~ li a {
    background: rgba(255,255,255,0.1);
  }

  /* Last child styling with adjacent sibling */
  .nav ul li:last-child a {
    border-bottom: none;
  }

  /* Nested dropdowns (second level) */
  .nav > ul > li > ul > li {
    position: relative;
  }

  .nav > ul > li > ul > li > ul {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    background: #3b5998;
    list-style: none;
    min-width: 160px;
    border-radius: 0 6px 6px 0;
    overflow: hidden;
  }

  .nav > ul > li > ul > li:hover > ul {
    display: block;
  }
</style>
</head>
<body>
  <nav class="nav">
    <ul>
      <li><a href="#">Home</a></li>
      <li>
        <a href="#">Services</a>
        <ul>
          <li><a href="#">Web Design</a></li>
          <li><a href="#">SEO</a>
            <ul>
              <li><a href="#">On-Page</a></li>
              <li><a href="#">Off-Page</a></li>
              <li><a href="#">Technical</a></li>
            </ul>
          </li>
          <li><a href="#">Marketing</a></li>
        </ul>
      </li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  <p style="margin-top: 40px; color: #555;">Multi-level dropdown using child (>) and sibling combinators. Hover over Services to see submenus.</p>
</body>
</html>
```

**Output:** A horizontal navigation bar with a dropdown menu on hover. The "Services" link reveals nested submenus. Child combinator `>` ensures only direct children are styled, preventing nested submenus from inheriting wrong styles.

**Explanation:** `>` combinator targets only direct children at each level. `li:hover > ul` uses the child combinator to show only the immediate child dropdown of the hovered `<li>`, enabling two-level nesting without interference.

## 🏢 Real World Use Case
Complex navigation menus, styled article content (first paragraph after a heading), form layouts (styling the first invalid input after a label), and component libraries all use combinators for precise targeting without adding extra classes.

## 🎯 Interview Questions

1. **What is the difference between the descendant combinator (space) and the child combinator (`>`)?**
   *The descendant combinator matches any nested element at any depth. The child combinator matches only direct children — one level deep.*

2. **How does the adjacent sibling combinator (`+`) differ from the general sibling combinator (`~`)?**
   *`+` matches only the single next sibling. `~` matches all subsequent siblings that follow the specified element, not just the immediate one.*

3. **What happens to specificity when you use combinators?**
   *Specificity is calculated only from the selectors themselves (IDs, classes, elements). Combinators do not add or subtract specificity — they only add precision to the target.*

4. **Can you combine multiple combinators in one selector? Give an example.**
   *Yes. For example, `div > p + span` selects `<span>` that immediately follows a `<p>` which is a direct child of a `<div>`.*

5. **How would you select an element only if it has a specific preceding sibling?**
   *Use the adjacent sibling combinator `+`. For example, `h2 + p` selects a `<p>` only if it is immediately preceded by an `<h2>`.*

## ⚠ Common Errors / Mistakes

- **Overusing the descendant combinator when child is sufficient**: This can match unintended nested elements; use `>` when only direct children should be styled
- **Forgetting that combinators are read right-to-left**: `div p` matches `<p>` elements inside `<div>`, not the other way around — the last element is the target
- **Confusing `+` with `~`**: `+` matches one sibling; `~` matches all following siblings — they are not interchangeable
- **Using combinators with poorly structured HTML**: Combinators rely on DOM structure — if the HTML changes, the styles may break
- **Neglecting specificity when chaining combinators**: Long chains can create high specificity that is hard to override later

## 📝 Practice Exercises

### Beginner
1. Use the descendant combinator to style all `<a>` tags inside a `<nav>` element with a specific color.
2. Use the child combinator to style only direct `<li>` children of a `<ul class="menu">` — not nested `<li>` elements.
3. Use the adjacent sibling combinator to add a top border to a `<p>` that immediately follows an `<h2>`.

### Intermediate
4. Create a styled FAQ section where each `<details>` element's first `<summary>` sibling is styled differently from subsequent summaries.
5. Build a styled article where `h3 + p` has a larger font size, `h3 ~ p` has text indent, and `p + ul` has reduced margin-top.
6. Use combinators to create a "breadcrumb" style where `li + li::before` adds a separator (like `›`) between list items.

### Advanced
7. Create an interactive card component where hovering over a parent card affects its direct children using combinators, but does NOT affect nested child components — demonstrate the difference between descendant (` `) and child (`>`).
8. Build a complex form styling system using combinators: style `label + input`, `input:invalid ~ .error`, `fieldset > legend + p`, and `input[type="checkbox"]:checked + label` — all without adding custom classes to each element.
