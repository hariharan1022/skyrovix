## 22. CSS Display

## 📘 Introduction
The `display` property is one of the most fundamental CSS properties. It controls how an element is rendered in the document flow — whether it takes the full width, sits inline with text, disappears entirely, or activates modern layout modes like Flexbox or Grid.

## 🧠 Key Concepts
- **`block`**: Element starts on a new line and takes full available width (e.g., `<div>`, `<p>`, `<h1>`)
- **`inline`**: Element sits within text flow; width/height/margin-top/bottom ignored (e.g., `<span>`, `<a>`, `<strong>`)
- **`inline-block`**: Like inline but respects width, height, margins, and padding (e.g., buttons, nav items)
- **`none`**: Element is completely removed from the layout — not rendered, not accessible to screen readers
- **`flex`**: Activates Flexbox layout on the container; children become flex items
- **`grid`**: Activates CSS Grid layout on the container; children become grid items
- **Table values** (`table`, `table-row`, `table-cell`): Make elements behave like table elements without HTML `<table>` markup
- **`visibility: hidden` vs `display: none`**: `visibility: hidden` hides the element but preserves its space; `display: none` removes both the element and its space

## 💻 Syntax

```css
/* Block-level */
.block-element {
  display: block;
}

/* Inline-level */
.inline-element {
  display: inline;
}

/* Inline-block */
.button {
  display: inline-block;
  width: 120px;
  height: 40px;
}

/* Hidden */
.hidden {
  display: none;
}

/* Visually hidden but space preserved */
.invisible {
  visibility: hidden;
}
```

## ✅ Example 1 - Basic (Understanding Display Values)

**Problem:** Demonstrate how `block`, `inline`, and `inline-block` affect element positioning and sizing.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial; padding: 20px; }
  .block-demo {
    display: block;
    background: #e74c3c;
    color: white;
    padding: 10px;
    margin: 5px 0;
  }
  .inline-demo {
    display: inline;
    background: #3498db;
    color: white;
    padding: 5px;
    margin: 10px; /* only horizontal works */
  }
  .inline-block-demo {
    display: inline-block;
    background: #2ecc71;
    color: white;
    padding: 10px;
    margin: 5px;
    width: 150px;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="block-demo">Block 1 (full width)</div>
  <div class="block-demo">Block 2 (new line)</div>
  <hr>
  <span class="inline-demo">Inline 1</span>
  <span class="inline-demo">Inline 2</span>
  <span class="inline-demo">Inline 3</span>
  <hr>
  <div class="inline-block-demo">Inline-Block A</div>
  <div class="inline-block-demo">Inline-Block B</div>
  <div class="inline-block-demo">Inline-Block C</div>
</body>
</html>
```

**Output:** Block elements stack vertically, inline elements flow horizontally within text (ignoring width), inline-block elements sit side-by-side but respect dimensions.

**Explanation:** Block elements create line breaks. Inline elements ignore explicit width/height. Inline-block combines the flow behavior of inline with the box model of block.

## 🚀 Example 2 - Intermediate (CSS Table Layout for Forms)

**Problem:** Build a two-column form layout without using HTML `<table>`, using `display: table` and `table-cell`.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  .form-table {
    display: table;
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    font-family: Arial;
  }
  .form-row {
    display: table-row;
  }
  .form-label, .form-input {
    display: table-cell;
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  .form-label {
    font-weight: bold;
    width: 120px;
    vertical-align: middle;
  }
  .form-input input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .form-input input:focus {
    border-color: #3498db;
    outline: none;
  }
</style>
</head>
<body>
  <div class="form-table">
    <div class="form-row">
      <div class="form-label">Name</div>
      <div class="form-input"><input type="text" placeholder="Full name"></div>
    </div>
    <div class="form-row">
      <div class="form-label">Email</div>
      <div class="form-input"><input type="email" placeholder="Email address"></div>
    </div>
    <div class="form-row">
      <div class="form-label">Phone</div>
      <div class="form-input"><input type="tel" placeholder="Phone number"></div>
    </div>
  </div>
</body>
</html>
```

**Output:** A neatly aligned two-column form where labels and inputs align vertically like an HTML table, using pure CSS.

**Explanation:** `display: table`, `table-row`, and `table-cell` create an identical layout to `<table>` markup. This is useful for aligning form labels and inputs without rigid HTML table semantics.

## 🏢 Real World Use Case
Navigation bars use `display: inline-block` or `flex` for horizontal links. Modal overlays use `display: none` to hide and `display: block` (or `flex`) to show. CSS table display values help align legacy form layouts without changing HTML structure.

## 🎯 Interview Questions

1. **What is the difference between `display: none` and `visibility: hidden`?**
   *`display: none` removes the element from the document flow entirely — no space is reserved. `visibility: hidden` hides the element visually but preserves its layout space.*

2. **What values does `display` support for table-like layouts?**
   *`table`, `inline-table`, `table-row`, `table-cell`, `table-caption`, `table-column`, `table-column-group`, `table-header-group`, `table-footer-group`, and `table-row-group`.*

3. **Why can't you set width and height on an `inline` element?**
   *Inline elements flow within text content and only take up as much space as needed. Width and height are ignored unless you change `display` to `inline-block` or `block`.*

4. **What happens when you set `display: flex` on a container?**
   *The container becomes a flex container, and its direct children become flex items. They align along the main axis (default horizontal) and can grow, shrink, and wrap based on flex properties.*

5. **How do `display: contents` work?**
   *The element itself is removed from the accessibility tree and layout — only its children are rendered as if they were direct children of the parent. Useful for semantic wrappers that shouldn't affect layout.*

## ⚠ Common Errors / Mistakes

- **Confusing `visibility: hidden` with `display: none`**: Hidden elements still take up space, which can cause unexpected gaps
- **Applying `display: flex` without understanding axis**: The default `flex-direction: row` can surprise developers expecting a column layout
- **Using `inline-block` without handling whitespace**: Inline-block elements render HTML whitespace between them as a 4px gap
- **Setting `display: none` on focusable elements**: This can break keyboard navigation and accessibility
- **Nesting `display: grid` inside `display: flex` incorrectly**: Grid and flex contexts are independent; children of a grid container become grid items, not flex items

## 📝 Practice Exercises

### Beginner
1. Create three `<div>` elements with `display: inline-block`, each 100px wide and 100px tall with different background colors. Observe how they sit side by side.
2. Change the display of a `<span>` to `block` and give it width and padding. Notice how it starts on a new line.
3. Use `display: none` on a `<p>` element and verify it disappears completely. Then replace it with `visibility: hidden` and note the difference.

### Intermediate
4. Build a horizontal navigation bar using `display: inline-block` on `<li>` elements. Style the links and handle the whitespace gap between items.
5. Create a three-column layout using `display: table` / `table-cell` without any `<table>` HTML. Make each column have equal width.
6. Use `display: flex` to create a centered card with an icon on the left and text content on the right. Vertically align both sections.

### Advanced
7. Build a responsive grid of product cards using `display: grid` with `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`. Ensure items reflow without media queries.
8. Create a tabbed interface where `display: none` / `display: block` toggles between content panels using only CSS (using `:target` or checkbox hack — no JavaScript).
