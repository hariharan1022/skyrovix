## 4. CSS Selectors
## 📘 Introduction
CSS selectors are patterns used to select HTML elements for styling. Understanding selectors is fundamental to writing efficient, maintainable CSS. CSS offers a wide range of selectors from simple element selectors to complex combinators and attribute selectors.

## 🧠 Key Concepts
- **Element Selector:** Targets all instances of an HTML tag, e.g., `p { }`.
- **Class Selector:** Targets elements with a specific class attribute, e.g., `.box { }`.
- **ID Selector:** Targets a single element by its ID, e.g., `#header { }`.
- **Universal Selector (`*`):** Targets every element on the page.
- **Grouping Selector:** Multiple selectors separated by commas.
- **Descendant Selector:** `div p { }` targets `p` inside any `div`.
- **Child Selector:** `div > p { }` targets `p` that is a direct child of `div`.
- **Adjacent Sibling Selector:** `h1 + p { }` targets `p` immediately after `h1`.
- **Attribute Selectors:** `[type="text"] { }` targets elements with specific attributes.

## 💻 Syntax
```css
element { }         /* element selector */
.classname { }      /* class selector */
#idname { }         /* id selector */
* { }               /* universal selector */
sel1, sel2 { }      /* grouping selector */
parent child { }    /* descendant selector */
parent > child { }  /* child selector */
el1 + el2 { }       /* adjacent sibling selector */
[attr="value"] { }  /* attribute selector */
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Use element, class, and id selectors to style different elements.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: gray; }
    .highlight { background: yellow; }
    #main { font-size: 20px; }
  </style>
</head>
<body>
  <p>Gray paragraph.</p>
  <p class="highlight">Yellow background.</p>
  <p id="main">Larger text with id.</p>
</body>
</html>
```
**Output:** Three paragraphs with different styles applied based on selector type.
**Explanation:** Element selector styles all `<p>` tags, class selector styles only elements with `class="highlight"`, id selector styles the element with `id="main"`.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use descendant, child, and adjacent sibling selectors in one layout.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    article p { color: blue; }
    article > p { font-weight: bold; }
    h2 + p { color: red; }
    a[target="_blank"] { color: green; }
  </style>
</head>
<body>
  <article>
    <h2>Title</h2>
    <p>Bold and blue (article > p and article p).</p>
    <div><p>Blue only (article p only, not direct child).</p></div>
  </article>
  <a href="#" target="_blank">Green link</a>
</body>
</html>
```
**Output:** First paragraph is bold and blue, nested paragraph is only blue, heading-adjacent paragraph is red, target=_blank link is green.
**Explanation:** Combinators refine selection. `article > p` selects direct children, `article p` selects all descendants, `h2 + p` selects the paragraph right after h2, `[target="_blank"]` selects links that open in new tab.

## 🏢 Real World Use Case
A news website uses attribute selectors to style external links differently (`a[href^="http://"]`), descendant selectors for article content styling, and child selectors for navigation menus to only style top-level items.

## 🎯 Interview Questions (5 with answers)
1. **What is the difference between `div p` and `div > p`?** `div p` targets all `<p>` descendants of `<div>`; `div > p` targets only direct child `<p>` elements.
2. **What does the universal selector `*` do?** It selects every single element in the document.
3. **How do attribute selectors work?** `[attr]` selects elements with that attribute; `[attr="value"]` selects exact matches; `[attr^="val"]` matches prefixes.
4. **What is specificity of selectors?** Inline > ID (0,1,0) > Class (0,0,1) > Element (0,0,0,1). Universal selector has no specificity.
5. **Can you combine multiple selectors?** Yes, grouping (`h1, h2`), chaining (`div.class#id`), and combinators (`ul > li`) can be combined.

## ⚠ Common Errors / Mistakes
- Overusing ID selectors (high specificity makes maintenance difficult).
- Forgetting the space in descendant selectors (`divp` instead of `div p` — selects `<divp>` element).
- Using class selectors when an element selector would suffice.
- Not understanding how specificity conflicts cause unexpected styling.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Use an element selector to make all `<a>` tags orange.
2. Create a class `.card` and apply it to three `<div>` elements.
3. Use an id selector to center the text of a single `<p>` element.
4. Style all `<li>` items that are direct children of a `<ul class="nav">`.
5. Use an attribute selector to style all `<input>` elements with `type="text"`.
6. Use a descendant selector to style all `<span>` elements inside a `<footer>`.
7. Build a nested menu using child and descendant combinators where sub-items have different styles.
8. Create a complex selector chain that targets every third `<li>` in a `<ul>` with a specific class using `nth-child`.
