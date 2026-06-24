## 21. CSS Tables

## 📘 Introduction
CSS provides powerful properties to style HTML tables, moving beyond the default browser rendering. You can control borders, spacing, alignment, and create visually appealing striped or responsive tables without altering the HTML structure.

## 🧠 Key Concepts
- **`border-collapse`**: Controls whether adjacent table cells share borders (`collapse`) or have separate borders (`separate`)
- **`border-spacing`**: Sets the distance between borders of adjacent cells (only works with `border-collapse: separate`)
- **`width` / `height`**: Define table and cell dimensions
- **`text-align`**: Horizontally aligns content within cells (left, center, right)
- **`vertical-align`**: Vertically aligns content within cells (top, middle, bottom)
- **Striped tables**: Alternate row colors using `:nth-child(even/odd)` for readability
- **Responsive tables**: Horizontal scroll on small screens using `overflow-x: auto`

## 💻 Syntax

```css
/* Basic table styling */
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

/* Striped rows */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover effect */
tr:hover {
  background-color: #ddd;
}

/* Responsive wrapper */
.table-container {
  overflow-x: auto;
}
```

## ✅ Example 1 - Basic (Styled Student Grade Table)

**Problem:** Create a simple styled table to display student names and grades with collapsed borders, padding, and alternating row colors.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  table {
    border-collapse: collapse;
    width: 80%;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 10px 15px;
    text-align: left;
  }
  th {
    background-color: #4CAF50;
    color: white;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
</style>
</head>
<body>
<table>
  <tr>
    <th>Name</th>
    <th>Subject</th>
    <th>Grade</th>
  </tr>
  <tr><td>Alice</td><td>Math</td><td>A</td></tr>
  <tr><td>Bob</td><td>Science</td><td>B</td></tr>
  <tr><td>Charlie</td><td>History</td><td>A</td></tr>
  <tr><td>Diana</td><td>Art</td><td>C</td></tr>
</table>
</body>
</html>
```

**Output:** A clean, readable table with green headers, light gray alternating rows, and a hover effect that highlights rows.

**Explanation:** `border-collapse: collapse` merges adjacent borders into one. `:nth-child(even)` targets every even row for alternating styling. The `:hover` pseudo-class adds interactivity for better UX.

## 🚀 Example 2 - Intermediate (Responsive Pricing Table)

**Problem:** Build a three-column pricing comparison table that is responsive on mobile devices.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  .table-wrapper {
    overflow-x: auto;
    margin: 20px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 600px;
    font-family: 'Segoe UI', Tahoma, sans-serif;
  }
  th {
    background-color: #333;
    color: #fff;
    padding: 15px;
    text-align: center;
    font-size: 1.2em;
  }
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  .featured {
    background-color: #ffd700;
    font-weight: bold;
  }
  .price {
    font-size: 1.5em;
    color: #2c3e50;
    font-weight: bold;
  }
  /* Responsive: stack on very small screens */
  @media screen and (max-width: 480px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    thead tr {
      display: none;
    }
    td {
      border: none;
      position: relative;
      padding-left: 50%;
    }
    td::before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      font-weight: bold;
    }
  }
</style>
</head>
<body>
<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Basic</th>
      <th>Pro</th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Storage</td>
      <td>5 GB</td>
      <td>50 GB</td>
      <td>Unlimited</td>
    </tr>
    <tr>
      <td>Users</td>
      <td>1</td>
      <td>10</td>
      <td>Unlimited</td>
    </tr>
    <tr>
      <td>Support</td>
      <td>Email</td>
      <td>Chat</td>
      <td>24/7 Phone</td>
    </tr>
    <tr>
      <td>Price</td>
      <td class="price">$9</td>
      <td class="price">$29</td>
      <td class="price">$99</td>
    </tr>
  </tbody>
</table>
</div>
</body>
</html>
```

**Output:** A side-by-side pricing table that scrolls horizontally on narrow screens or transforms into a card-like stacked layout on very small screens.

**Explanation:** The `.table-wrapper` with `overflow-x: auto` enables horizontal scrolling on small screens. The `@media` query completely reflows the table into a block layout for very small screens, using `::before` pseudo-elements with `data-label` attributes to show header labels on each cell.

## 🏢 Real World Use Case
E-commerce order history dashboards, school grade portals, financial transaction reports, and SaaS admin panels all rely on styled tables to present structured data clearly. Responsive table design ensures usability on both desktop and mobile devices.

## 🎯 Interview Questions

1. **What is the difference between `border-collapse: collapse` and `border-collapse: separate`?**
   *`collapse` merges adjacent cell borders into a single border, removing gaps. `separate` keeps borders distinct, and `border-spacing` controls the gap between them.*

2. **How can you create a responsive table that scrolls horizontally on mobile?**
   *Wrap the `<table>` in a `<div>` and apply `overflow-x: auto` to the div. Optionally set a `min-width` on the table to trigger scrolling when the viewport shrinks.*

3. **How do you alternate row colors without adding a class to each `<tr>`?**
   *Use the `:nth-child(even)` or `:nth-child(odd)` pseudo-class on `<tr>` elements to apply different background colors.*

4. **What does `vertical-align` do in a table cell?**
   *It controls the vertical positioning of content inside `<th>` or `<td>` elements. Values are `top`, `middle` (default), `bottom`, or `baseline`.*

5. **How can you hide table columns without removing them from the DOM?**
   *Apply `visibility: collapse` to `<col>` or `<colgroup>` elements. This hides the column while preserving the table layout — unlike `display: none`, which can break column alignment.*

## ⚠ Common Errors / Mistakes

- **Forgetting `border-collapse`**: Default `separate` mode causes double borders and gaps between cells
- **Applying `overflow: auto` to `<table>` directly**: The container div should get the overflow, not the table itself
- **Using `display: none` on table rows for responsive stacking**: This can break accessibility — use `visibility: collapse` for columns
- **Missing `<thead>`, `<tbody>`, `<tfoot>` for complex responsive tables**: Screen readers depend on these for navigation
- **Overusing fixed widths**: Tables with fixed widths can overflow or compress content awkwardly on different screens

## 📝 Practice Exercises

### Beginner
1. Create a table with 3 columns (Product, Price, Quantity) using `border-collapse: collapse` and 10px padding on all cells.
2. Style a table with a dark header row (background `#2c3e50`, white text) and light gray alternating rows.
3. Add a hover effect that changes the background color of a row to `#e0f7fa` when the mouse is over it.

### Intermediate
4. Build a 4-column schedule table with `colspan` headers and merge cells where appropriate. Add responsive horizontal scrolling.
5. Create a table with `border-spacing: 5px` and separate borders. Style it with rounded corners on the table itself.
6. Design a table that highlights the top row and first column in bold using `:first-child` and `:nth-child`.

### Advanced
7. Build a fully responsive data table that collapses to a stacked card layout on screens under 600px using CSS only (no JavaScript), where each row becomes a card with labels from `data-*` attributes.
8. Create a sortable table indicator — use CSS arrows (▲/▼) on table headers to indicate sort direction, styling active sort columns differently without JavaScript.
