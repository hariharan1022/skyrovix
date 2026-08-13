## 19. HTML Tables
## 📘 Introduction
HTML tables allow you to organize data in rows and columns. They are essential for displaying tabular information like schedules, pricing plans, comparison charts, and data grids.

## 🧠 Key Concepts
- `<table>` - container for the table
- `<tr>` - table row
- `<th>` - table header cell (bold, centered by default)
- `<td>` - table data cell
- `colspan` - merges cells horizontally
- `rowspan` - merges cells vertically
- `<caption>` - table title/summary
- `<thead>`, `<tbody>`, `<tfoot>` - structural grouping for headers, body, footer
- CSS can style borders, spacing, colors, and hover effects

## 💻 Syntax
```html
<table>
  <caption>Monthly Savings</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$100</td>
    </tr>
  </tfoot>
</table>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a simple timetable for school subjects.

**Code:**
```html
<table border="1">
  <tr>
    <th>Time</th>
    <th>Monday</th>
    <th>Tuesday</th>
  </tr>
  <tr>
    <td>9:00-10:00</td>
    <td>Math</td>
    <td>Science</td>
  </tr>
  <tr>
    <td>10:00-11:00</td>
    <td>English</td>
    <td>History</td>
  </tr>
</table>
```

**Output:** A grid with time slots and subjects for each day.

**Explanation:** `<th>` creates bold header cells. `<td>` holds data. The `border` attribute adds borders (though CSS is preferred).

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a billing table with merged cells.

**Code:**
```html
<table border="1">
  <caption>Invoice</caption>
  <tr>
    <th>Item</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Total</th>
  </tr>
  <tr>
    <td>Laptop</td>
    <td>2</td>
    <td>$800</td>
    <td>$1600</td>
  </tr>
  <tr>
    <td>Mouse</td>
    <td>5</td>
    <td>$20</td>
    <td>$100</td>
  </tr>
  <tr>
    <td colspan="3">Subtotal</td>
    <td>$1700</td>
  </tr>
  <tr>
    <td colspan="3">Tax (10%)</td>
    <td>$170</td>
  </tr>
  <tr>
    <td colspan="3"><strong>Grand Total</strong></td>
    <td><strong>$1870</strong></td>
  </tr>
</table>
```

**Output:** A formatted invoice where "Subtotal", "Tax", and "Grand Total" labels span 3 columns using `colspan`.

**Explanation:** `colspan="3"` makes a cell stretch across three columns. This is useful for summary rows.

## 🏢 Real World Use Case
E-commerce order summaries, comparison tables (product features), employee directories, financial reports, and sports league standings all use HTML tables for structured data presentation.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between `<th>` and `<td>`?**
`<th>` defines a header cell (bold, centered, semantic for accessibility). `<td>` defines a standard data cell.

**2. How do you merge cells in a table?**
Use `colspan` to merge horizontally and `rowspan` to merge vertically. Example: `<td colspan="2">` spans two columns.

**3. What is the purpose of `<thead>`, `<tbody>`, `<tfoot>`?**
They group table rows semantically: `<thead>` for headers, `<tbody>` for body content, `<tfoot>` for footer/summary. Helps with styling, printing, and accessibility.

**4. How do you add a title or summary to a table?**
Use the `<caption>` element as the first child of `<table>`. Alternatively, use `aria-label` or `summary` attribute (deprecated in HTML5).

**5. What is the difference between `cellpadding` and `cellspacing`?**
`cellpadding` adds space inside cells (between content and border). `cellspacing` adds space between cells. Both are deprecated; use CSS `padding` and `border-spacing` instead.

## ⚠ Common Errors / Mistakes
- Using tables for page layout (use CSS Grid/Flexbox instead)
- Not using `<thead>`/`<tbody>`/`<tfoot>` for complex tables
- Mismatched colspan/rowspan values that break alignment
- Forgetting the `<caption>` for accessibility
- Applying inline `border` attribute instead of CSS

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a 3x3 table with names and ages.
2. Add a caption "Employee Details" to your table.
3. Style your table with a border using CSS.

**Intermediate:**
4. Build a school timetable with colspan for lunch breaks and rowspan for weekly activities.
5. Create a product comparison table with features, prices, and ratings across 3 products.
6. Use `<thead>`, `<tbody>`, and `<tfoot>` in a financial report table with totals.

**Advanced:**
7. Build a responsive table that displays as a card layout on mobile devices using CSS media queries.
8. Create a sortable table using JavaScript that sorts rows by clicking column headers.
