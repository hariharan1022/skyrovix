## 72. CSS Multiple Columns
## 📘 Introduction
CSS multi-column layout allows content to flow naturally across multiple columns, like a newspaper or magazine. This is ideal for long-form text, lists, or card layouts where you want columns to break automatically. The browser handles column balancing, breaks, and gaps with minimal CSS.

## 🧠 Key Concepts
- **column-count** – Specifies the number of columns
- **column-width** – Sets a minimum column width (browser creates as many columns as fit)
- **column-gap** – Space between columns
- **column-rule** – A line (border) drawn between columns
- **column-span** – Allows an element to span across all columns
- **break-inside** – Controls how content breaks across columns (`avoid` to prevent splitting)
- **Auto-balancing** – Columns are automatically balanced by default

## 💻 Syntax
```css
.multi-column {
  column-count: 3;
  column-gap: 30px;
  column-rule: 2px solid #ddd;
}

.multi-column {
  column-width: 250px;
}

.multi-column h2 {
  column-span: all;
}

.multi-column p {
  break-inside: avoid;
}
```

## ✅ Example 1 - Basic
**Problem:** Create a newspaper-style text layout with three columns, a gap, and a vertical rule between columns.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; padding: 40px; background: #fafafa; }

  .newspaper {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }

  .newspaper h1 {
    text-align: center;
    font-size: 2.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .newspaper .date {
    text-align: center;
    color: #888;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ccc;
    padding: 6px 0;
    margin-bottom: 20px;
    font-size: 0.85rem;
  }

  .newspaper .content {
    column-count: 3;
    column-gap: 30px;
    column-rule: 1px solid #ddd;
    text-align: justify;
  }

  .newspaper .content p {
    margin-bottom: 16px;
    line-height: 1.7;
    font-size: 1rem;
  }

  .newspaper .content p:first-of-type::first-letter {
    font-size: 3rem;
    float: left;
    line-height: 1;
    margin-right: 8px;
    font-weight: bold;
    color: #333;
  }
</style>
</head>
<body>
  <div class="newspaper">
    <h1>The Daily Chronicle</h1>
    <div class="date">Tuesday, June 23, 2026</div>
    <div class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
    </div>
  </div>
</body>
</html>
```

**Output:** A newspaper-style layout with a centered title, date line, and body text automatically flowing into three columns separated by a thin vertical rule.

**Explanation:** `column-count: 3` splits content into 3 columns. `column-gap: 30px` adds space between them. `column-rule: 1px solid #ddd` draws a line in the gap. The `::first-letter` pseudo-element creates a drop cap effect.

## 🚀 Example 2 - Intermediate
**Problem:** Create a multi-column list with a heading that spans all columns, and prevent list items from breaking across columns.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .card {
    max-width: 800px;
    margin: 0 auto 30px;
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }

  .card h2 {
    column-span: all;
    font-size: 1.5rem;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #333;
  }

  .multi-list {
    column-count: 3;
    column-gap: 24px;
    column-rule: 1px dashed #ccc;
  }

  .multi-list p {
    break-inside: avoid;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 3px solid #007bff;
    line-height: 1.5;
  }

  /* Responsive: reduce columns on small screens */
  @media (max-width: 600px) {
    .multi-list { column-count: 1; }
  }
  @media (min-width: 601px) and (max-width: 900px) {
    .multi-list { column-count: 2; }
  }

  /* Width-based columns (auto-count) */
  .auto-columns {
    column-width: 200px;
    column-gap: 20px;
  }

  .auto-columns .item {
    break-inside: avoid;
    padding: 10px;
    margin-bottom: 10px;
    background: #e9ecef;
    border-radius: 6px;
  }
</style>
</head>
<body>
  <div class="card">
    <h2>Features (column-span: all)</h2>
    <div class="multi-list">
      <p>Responsive layout with auto-balancing columns</p>
      <p>Custom gap and rule styling between columns</p>
      <p>Column-span for headings that cross all columns</p>
      <p>Break-inside: avoid prevents items from splitting</p>
      <p>Media queries adjust column count for screen size</p>
      <p>Width-based columns adapt to available space</p>
      <p>Perfect for feature lists and FAQ sections</p>
      <p>No extra markup needed for column layout</p>
      <p>Browser handles content balancing automatically</p>
    </div>
  </div>

  <div class="card">
    <h2>Auto Columns (column-width)</h2>
    <div class="auto-columns">
      <div class="item">Item 1 - Column width 200px creates as many columns as fit</div>
      <div class="item">Item 2 - Try resizing the browser to see columns adjust</div>
      <div class="item">Item 3 - Responsive without media queries</div>
      <div class="item">Item 4 - Ideal for card-like content grids</div>
      <div class="item">Item 5 - Content flows top-to-bottom, left-to-right</div>
    </div>
  </div>
</body>
</html>
```

**Output:** A card with a spanning heading and 3-column list where each item is a styled card that does not break across columns. Below, a second card uses `column-width` for responsive auto-count columns.

**Explanation:** `column-span: all` on the heading forces it to span the full width. `break-inside: avoid` prevents individual items from being split across columns. `column-width: 200px` creates a responsive number of columns based on container width, removing the need for media queries.

## 🏢 Real World Use Case
Blog and news layouts, FAQ sections, feature lists, recipe cards, product specifications, and any long-form content that benefits from a magazine-like reading experience.

## 🎯 Interview Questions
1. **Q:** What is the difference between `column-count` and `column-width`?  
   **A:** `column-count` sets a fixed number of columns; `column-width` sets a minimum width, and the browser creates as many columns as fit.

2. **Q:** What does `column-span: all` do?  
   **A:** It makes an element span across all columns, useful for headings or section breaks.

3. **Q:** How do you prevent an element from breaking across columns?  
   **A:** Use `break-inside: avoid` on the element.

4. **Q:** What is `column-rule` shorthand for?  
   **A:** It is shorthand for `column-rule-width`, `column-rule-style`, and `column-rule-color`—similar to `border`.

5. **Q:** How does the browser balance columns by default?  
   **A:** The browser automatically balances content so columns have roughly equal height. Use `column-fill: auto` to fill sequentially (column-by-column).

## ⚠ Common Errors / Mistakes
- Using `column-span: all` on a child that is not a direct descendant of the multi-column container
- Expecting `column-count` alone to create responsive layouts—use `column-width` for responsiveness
- Forgetting that `break-inside: avoid` only applies to block-level elements inside the multi-column container
- Applying `height: 100%` inside columns, which can break the auto-balancing behavior
- Not testing with long words—use `overflow-wrap: break-word` to prevent overflow

## 📝 Practice Exercises
**Beginner:**
1. Create a 3-column layout for a paragraph of text using `column-count`.
2. Add a 20px gap between columns and a solid gray column rule.
3. Change to `column-width: 300px` and observe how the number of columns changes with viewport size.

**Intermediate:**
4. Add a heading that spans all columns using `column-span: all`.
5. Create a list of items inside columns and prevent them from breaking across columns with `break-inside: avoid`.
6. Use media queries to change `column-count` from 1 (mobile) to 2 (tablet) to 3 (desktop).

**Advanced:**
7. Build a magazine-style article with a drop cap, pull quote spanning 2 columns, and images that break across columns with `break-inside` handling.
8. Create a responsive card grid that uses `column-width` to automatically adjust columns, with each card having a fixed aspect ratio and consistent spacing.
