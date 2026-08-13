## 80. CSS Grid Intro
## 📘 Introduction
CSS Grid Layout is a two-dimensional layout system that controls both columns and rows simultaneously. Unlike Flexbox (one-dimensional), Grid allows you to create complex layouts with rows and columns that interact. It is the most powerful layout tool in CSS, ideal for page-level layouts and structured components.

## 🧠 Key Concepts
- **display: grid** – Turns an element into a grid container
- **grid-template-columns** – Defines the number and size of columns
- **grid-template-rows** – Defines the number and size of rows
- **fr unit** – Fractional unit that distributes available space (e.g., `1fr 2fr`)
- **gap** – Shorthand for `row-gap` and `column-gap`
- **Grid lines** – The numbered lines between grid cells (used for placement)
- **Explicit vs implicit grid** – Explicit: defined by `grid-template-*`; Implicit: auto-generated for items beyond explicit grid
- **grid-auto-rows** – Sizing for implicit rows
- **grid-auto-columns** – Sizing for implicit columns

## 💻 Syntax
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px auto 100px;
  gap: 16px;
}

/* Auto rows for implicit items */
.grid-auto {
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 120px;
}

/* Grid lines reference */
.grid-lines {
  grid-template-columns: [col-start] 1fr [col-middle] 2fr [col-end];
}
```

## ✅ Example 1 - Basic
**Problem:** Create a 3-column grid layout with explicit rows and a gap, demonstrating the `fr` unit and basic grid structure.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .demo { max-width: 800px; margin: 0 auto; }

  h2 { margin-bottom: 16px; }

  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 80px 200px 80px;
    gap: 12px;
    background: #e3f2fd;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .grid .item {
    background: #64b5f6;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
    padding: 10px;
  }

  .grid .item:nth-child(1) { background: #e57373; }
  .grid .item:nth-child(2) { background: #81c784; }
  .grid .item:nth-child(3) { background: #64b5f6; }
  .grid .item:nth-child(4) { background: #ffb74d; }
  .grid .item:nth-child(5) { background: #ba68c8; }
  .grid .item:nth-child(6) { background: #4dd0e1; }

  .legend {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
  }

  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .note {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #64b5f6;
    line-height: 1.6;
    font-size: 0.9rem;
  }

  .note code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 4px;
  }
</style>
</head>
<body>
  <div class="demo">
    <h2>Basic CSS Grid: 3 Columns + 3 Rows</h2>

    <div class="legend">
      <div class="legend-item"><div class="legend-color" style="background:#e57373;"></div> Column 1 (1fr)</div>
      <div class="legend-item"><div class="legend-color" style="background:#81c784;"></div> Column 2 (2fr)</div>
      <div class="legend-item"><div class="legend-color" style="background:#64b5f6;"></div> Column 3 (1fr)</div>
    </div>

    <div class="grid">
      <div class="item">Header (1fr)</div>
      <div class="item">Nav (2fr)</div>
      <div class="item">Logo (1fr)</div>
      <div class="item">Sidebar (1fr)</div>
      <div class="item">Main Content (2fr)</div>
      <div class="item">Aside (1fr)</div>
    </div>

    <div class="note">
      <strong>Grid structure:</strong> <code>grid-template-columns: 1fr 2fr 1fr</code> creates three columns where the middle is twice as wide as the edges. <code>grid-template-rows: 80px 200px 80px</code> sets fixed row heights. <code>gap: 12px</code> adds spacing between cells. The 6 items fill the 3x2 grid implicitly (6 items = 3 cols x 2 rows), but we defined 3 rows—the third row remains empty.
    </div>
  </div>
</body>
</html>
```

**Output:** A 3-column, 2-row grid (6 items) with colored cells. The middle column is twice the width of the side columns due to `1fr 2fr 1fr`. The grid has visible gaps and fixed row heights.

**Explanation:** `grid-template-columns: 1fr 2fr 1fr` divides available space into 4 equal parts—first column gets 1 part, second gets 2 parts, third gets 1 part. `fr` is a fraction unit unique to Grid. `gap: 12px` creates consistent spacing. The explicit grid has 3 rows defined but only 6 items fill 2 rows—Grid handles this gracefully.

## 🚀 Example 2 - Intermediate
**Problem:** Create a page layout with explicit grid areas, implicit grid rows, and `grid-auto-rows` for auto-generated content.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; }

  .page {
    display: grid;
    grid-template-columns: 220px 1fr;
    grid-template-rows: 70px 1fr 50px;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    min-height: 100vh;
    gap: 0;
  }

  .page > * {
    padding: 16px;
    display: flex;
    align-items: center;
  }

  header {
    grid-area: header;
    background: #1a1a2e;
    color: #fff;
    justify-content: space-between;
  }

  header nav { display: flex; gap: 20px; }
  header nav a { color: #aaa; text-decoration: none; }
  header nav a:hover { color: #fff; }

  aside {
    grid-area: sidebar;
    background: #16213e;
    color: #e0e0e0;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-top: 30px;
  }

  aside a { color: #aaa; text-decoration: none; }
  aside a:hover { color: #fff; }

  main {
    grid-area: main;
    background: #f8f9fa;
    flex-direction: column;
    align-items: stretch;
    padding: 24px;
  }

  main h1 { margin-bottom: 16px; color: #1a1a2e; }

  /* Card grid inside main (nested grid) */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    grid-auto-rows: 150px;
  }

  .card-grid .card {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #e9ecef;
  }

  .card-grid .card h3 { font-size: 1rem; margin-bottom: 4px; }
  .card-grid .card p { font-size: 0.85rem; color: #777; }

  footer {
    grid-area: footer;
    background: #1a1a2e;
    color: #888;
    justify-content: center;
    font-size: 0.85rem;
  }

  /* Grid lines reference */
  .grid-lines-info {
    margin-top: 20px;
    padding: 16px;
    background: #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .grid-lines-info code {
    background: #dee2e6;
    padding: 2px 6px;
    border-radius: 4px;
  }
</style>
</head>
<body>
  <div class="page">
    <header>
      <span style="font-weight:bold; font-size:1.2rem;">GridSite</span>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </nav>
    </header>

    <aside>
      <span style="font-weight:bold; margin-bottom:12px;">Menu</span>
      <a href="#">Dashboard</a>
      <a href="#">Analytics</a>
      <a href="#">Settings</a>
      <a href="#">Profile</a>
      <a href="#">Help</a>
    </aside>

    <main>
      <h1>Dashboard</h1>
      <div class="card-grid">
        <div class="card"><h3>Revenue</h3><p>$12,430</p></div>
        <div class="card"><h3>Users</h3><p>2,847</p></div>
        <div class="card"><h3>Orders</h3><p>438</p></div>
        <div class="card"><h3>Growth</h3><p>+12.5%</p></div>
        <div class="card"><h3>Churn</h3><p>3.2%</p></div>
        <div class="card"><h3>Support</h3><p>12 open</p></div>
      </div>

      <div class="grid-lines-info">
        <strong>Explicit vs Implicit Grid:</strong> The page layout uses <code>grid-template-areas</code> for explicit row/column placement (header, sidebar, main, footer). The nested <code>.card-grid</code> uses <code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code> and <code>grid-auto-rows: 150px</code> — implicit rows are automatically sized at 150px. Grid lines run between every column and row, numbered 1, 2, 3, etc.
      </div>
    </main>

    <footer>&copy; 2026 GridSite. Built with CSS Grid.</footer>
  </div>
</body>
</html>
```

**Output:** A full-page dashboard layout with a header (spanning full width), sidebar (fixed 220px), main content area (flexible), and footer. Inside the main area, a nested card grid uses `auto-fill` and `grid-auto-rows` for responsive implicit rows.

**Explanation:** `grid-template-areas` maps named areas to rows/columns for easy layout. `grid-template-columns: 220px 1fr` creates a fixed sidebar and fluid content. The nested `.card-grid` uses `repeat(auto-fill, minmax(200px, 1fr))` to automatically create as many 200px-minimum columns as fit. `grid-auto-rows: 150px` sizes any implicit (auto-generated) rows.

## 🏢 Real World Use Case
Page-level layouts (holy grail, dashboard, admin panels), responsive card grids, image galleries, magazine-style layouts, form layouts, and any design requiring both row and column control.

## 🎯 Interview Questions
1. **Q:** What is the difference between Flexbox and CSS Grid?  
   **A:** Flexbox is one-dimensional (row OR column); Grid is two-dimensional (rows AND columns simultaneously).

2. **Q:** What does the `fr` unit represent?  
   **A:** `fr` stands for "fraction"—it distributes available space proportionally among columns/rows. `1fr 2fr` means the second column gets twice the space of the first.

3. **Q:** What is the difference between explicit and implicit grid?  
   **A:** Explicit grid is defined by `grid-template-columns` / `grid-template-rows`. Implicit grid is auto-generated for items that overflow the explicit grid, sized by `grid-auto-rows` / `grid-auto-columns`.

4. **Q:** What are grid lines?  
   **A:** Grid lines are the numbered lines between grid cells. Column lines run vertically, row lines run horizontally. They start at 1 and can be named: `[sidebar-start] 1fr [sidebar-end]`.

5. **Q:** What does `repeat(auto-fill, minmax(200px, 1fr))` do?  
   **A:** It creates as many columns of at least 200px as fit in the container, automatically wrapping, and distributing remaining space equally.

## ⚠ Common Errors / Mistakes
- Using `fr` units with `calc()` or `gap` incorrectly—`fr` distributes *remaining* space after fixed items and gaps
- Defining `grid-template-areas` with mismatched cell counts (each row must have the same number of areas)
- Forgetting that `grid-auto-rows` only affects implicit rows, not explicitly defined ones
- Using `gap` shorthand before checking browser support (older browsers need `grid-gap`)
- Confusing `auto-fill` (always fills row with tracks) vs `auto-fit` (collapses empty tracks)

## 📝 Practice Exercises
**Beginner:**
1. Create a grid with 3 equal columns using `grid-template-columns: 1fr 1fr 1fr` (or `repeat(3, 1fr)`).
2. Add a 16px gap between grid items.
3. Create a 2x2 grid (2 columns, 2 rows) with fixed first column (200px) and fluid second column (1fr).

**Intermediate:**
4. Build a page layout with header, sidebar, main content, and footer using `grid-template-areas`.
5. Create a responsive card grid using `repeat(auto-fill, minmax(250px, 1fr))`.
6. Use `grid-auto-rows: 100px` to size implicit rows in a grid where items exceed the explicit grid.

**Advanced:**
7. Build a magazine-style layout with a featured article spanning 2 columns and 2 rows, using `grid-column` and `grid-row` placement with named grid lines.
8. Create a fully responsive portfolio gallery grid where images have different spans (some 1x1, some 2x1, some 2x2) using `grid-column: span N` and `grid-row: span N`, with the grid automatically filling gaps.
