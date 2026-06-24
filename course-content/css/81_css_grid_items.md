## 81. CSS Grid Items - Placement & Alignment

## 📘 Introduction
CSS Grid items are the direct children of a grid container. You can precisely control their position, size, and alignment using properties like `grid-column`, `grid-row`, `grid-area`, and alignment utilities. These properties allow you to place items anywhere on the grid, span them across multiple tracks, and control their alignment within cells.

## 🧠 Key Concepts
- **grid-column** – shorthand for `grid-column-start` / `grid-column-end`; controls item horizontal placement
- **grid-row** – shorthand for `grid-row-start` / `grid-row-end`; controls item vertical placement
- **grid-area** – assigns a named area or combines all four grid lines into one shorthand
- **span** keyword – used with start/end to indicate how many tracks an item should span
- **order** – rearranges visual order without changing DOM order (default 0)
- **justify-self** – aligns item horizontally inside its cell (stretch | start | end | center)
- **align-self** – aligns item vertically inside its cell (stretch | start | end | center)
- **place-self** – shorthand for `align-self` + `justify-self`
- **Auto-placement** – when items aren't explicitly placed, the grid places them automatically row by row

## 💻 Syntax

```css
/* Grid line placement */
.item {
  grid-column: 1 / 3;       /* start at line 1, end at line 3 */
  grid-row: 2 / 4;          /* start at line 2, end at line 4 */
}

/* Shorthand with span */
.item {
  grid-column: 2 / span 3;  /* start at line 2, span 3 columns */
  grid-row: span 2;         /* span 2 rows from auto position */
}

/* Named grid areas */
.item {
  grid-area: header;        /* must match a name in grid-template-areas */
}

/* Alignment */
.item {
  justify-self: center;
  align-self: end;
  place-self: center stretch;
}

/* Visual reordering */
.item {
  order: -1;
}
```

## ✅ Example 1 - Basic: Explicit Placement & Spanning

**Problem:** Place three items in specific grid positions — header spanning full width, sidebar occupying a narrow column, and content filling the remaining area.

**HTML:**
```html
<div class="grid">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="content">Content</div>
</div>
```

**CSS:**
```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr;
  gap: 8px;
  height: 300px;
}
.header {
  grid-column: 1 / -1;
  background: #ff6b6b;
  padding: 1rem;
}
.sidebar {
  grid-row: 2 / 3;
  background: #4ecdc4;
  padding: 1rem;
}
.content {
  grid-column: 2 / 3;
  background: #ffe66d;
  padding: 1rem;
}
```

**Output:**
A two-column grid with header spanning both columns at the top, sidebar on the left, and content on the right.

**Explanation:**
`grid-column: 1 / -1` tells the header to start at the first grid line and end at the last grid line (uses negative indexing). The sidebar is placed explicitly in the second row / first column, while the content sits in the second column.

## 🚀 Example 2 - Intermediate: Named Areas & Alignment

**Problem:** Recreate a classic page layout using `grid-template-areas` and use alignment properties to center content inside cells.

**HTML:**
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 400px;
  gap: 10px;
}
header  { grid-area: header; background: slateblue; color: white; padding: 1rem; }
nav     { grid-area: nav; background: coral; padding: 1rem; }
main    { grid-area: main; background: #f4f4f4; padding: 1rem; }
aside   { grid-area: aside; background: khaki; padding: 1rem; }
footer  { grid-area: footer; background: #333; color: white; padding: 1rem; }
```

**CSS (layout + item alignment):**
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 400px;
  gap: 10px;
}
header  { grid-area: header; }
nav     { grid-area: nav; }
main    { grid-area: main; }
aside   { grid-area: aside; }
footer  { grid-area: footer; }

/* Center the logo inside header */
.logo {
  justify-self: center;
  align-self: center;
}
```

**Output:**
A classic 3-row / 3-column Holy Grail layout with named grid areas. The logo text inside the header is centered both horizontally and vertically.

**Explanation:**
`grid-template-areas` maps readable names to cells. Each item uses `grid-area: name` to snap into place. `justify-self: center` and `align-self: center` on the logo item override the default `stretch` alignment, centering the content within the header cell.

## 🏢 Real World Use Case
Dashboards and admin panels rely on explicit grid-item placement to position widgets (charts, tables, stats) across a multi-column grid, often using `grid-area` with named templates for responsive reordering. The `order` property is useful for reflowing items on smaller screens without touching HTML.

## 🎯 Interview Questions

1. **Q:** What is the difference between `grid-column: 1 / 3` and `grid-column: 1 / span 3`?
   **A:** `grid-column: 1 / 3` places the item from grid line 1 to line 3 (spanning 2 columns). `grid-column: 1 / span 3` starts at line 1 and spans 3 columns, ending at line 4.

2. **Q:** How does auto-placement work in CSS Grid?
   **A:** When items aren't explicitly placed, the grid fills each row from left to right, adding new rows as needed. Explicitly placed items leave gaps that later auto-placed items skip over.

3. **Q:** What does `place-self: center` do?
   **A:** It sets both `align-self: center` and `justify-self: center`, centering the item vertically and horizontally within its grid cell.

4. **Q:** Can `order` affect grid item placement?
   **A:** Yes. `order` changes the visual order of auto-placed items. Items with lower `order` values appear first in the placement algorithm.

5. **Q:** What happens if two items occupy the same grid cell?
   **A:** They overlap. You can control stack order with `z-index`. This is sometimes used intentionally for layered designs.

## ⚠ Common Errors / Mistakes

- Using `grid-column` or `grid-row` on elements that are not direct children of the grid container (only direct children become grid items)
- Off-by-one errors with grid lines — remember line numbers start at 1, not 0
- Forgetting that `span` counts tracks, not lines (span 2 means 2 cells wide)
- Setting both `grid-template-areas` and individual `grid-area` values inconsistently, causing broken layouts
- Expecting `order` to work on items that are explicitly placed (it only affects auto-placement order)

## 📝 Practice Exercises

**Beginner:**
1. Create a 3x3 grid and place an item in the center cell using grid-column and grid-row.
2. Build a 2-column layout where the left column is 250px wide and the right column fills the rest; place two items accordingly.
3. Use `span` to make a grid item stretch across all columns of a 4-column grid.

**Intermediate:**
4. Create a named grid-template-areas layout with header, sidebar, main, and footer sections. Reorder the sidebar to appear below the main content on small screens.
5. Use `justify-self` and `align-self` to position different items in opposite corners of their grid cells.
6. Build a photo gallery with 3 columns where the first image spans 2 columns and 2 rows using explicit placement.

**Advanced:**
7. Design an overlapping hero section where text and an image occupy the same grid cell and are layered with z-index.
8. Create a responsive card layout using auto-placement combined with explicit `order` values to change card priority at different viewport sizes without media queries.
