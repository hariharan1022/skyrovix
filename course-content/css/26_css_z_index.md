## 26. CSS Z-index

## 📘 Introduction
The `z-index` property controls the vertical stacking order of positioned elements on the Z-axis (the axis pointing toward the viewer). It determines which elements appear in front when they overlap. Understanding `z-index` and stacking contexts is crucial for layered interfaces like modals, dropdowns, and overlapping UI components.

## 🧠 Key Concepts
- **Z-index**: Integer value determining stack position; higher values appear on top
- **Stacking order**: Elements stack in this order by default — background/border of root → negative z-index → block-level descendants → floated elements → inline descendants → positioned elements (in source order)
- **`z-index: auto`**: Creates no stacking context; element stacks with its parent
- **Stacking context**: A group of elements whose z-index values are scoped within that context; created by `position + z-index`, `opacity < 1`, `transform`, `filter`, `will-change`, `isolation: isolate`
- **Positioning and z-index**: `z-index` only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`) or flex/grid children
- **Z-index with flexbox/grid**: Flex and grid items respect `z-index` even without explicit positioning
- **Negative z-index**: Elements with negative z-index appear behind their parent's background but above the parent's content

## 💻 Syntax

```css
/* Basic stacking */
.element-front {
  position: relative;
  z-index: 10;
}

.element-back {
  position: relative;
  z-index: 1;
}

/* Creating a stacking context with isolation */
.isolate {
  isolation: isolate;
}

/* Flexbox stacking */
.flex-item {
  z-index: 5;
}

/* Negative z-index (behind parent) */
.behind {
  position: relative;
  z-index: -1;
}
```

## ✅ Example 1 - Basic (Simple Z-index Overlap)

**Problem:** Create three overlapping colored boxes and control their stacking order using `z-index`.

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
    padding: 50px;
    font-family: Arial;
    background: #f5f5f5;
  }
  .container {
    position: relative;
    width: 400px;
    height: 300px;
    margin: 0 auto;
  }
  .box {
    position: absolute;
    width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 8px;
  }
  .box-red {
    background: #e74c3c;
    top: 20px;
    left: 20px;
    z-index: 1;
  }
  .box-green {
    background: #2ecc71;
    top: 60px;
    left: 60px;
    z-index: 3;
  }
  .box-blue {
    background: #3498db;
    top: 100px;
    left: 100px;
    z-index: 2;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="box box-red">z-index: 1</div>
    <div class="box box-green">z-index: 3</div>
    <div class="box box-blue">z-index: 2</div>
  </div>
</body>
</html>
```

**Output:** Three overlapping boxes. The green box (z-index: 3) is on top, followed by blue (z-index: 2), then red (z-index: 1) at the bottom.

**Explanation:** Each box is absolutely positioned so they overlap. The `z-index` values determine the stack order — higher values are rendered in front. Even though blue is later in source order, its z-index of 2 places it between red (1) and green (3).

## 🚀 Example 2 - Intermediate (Stacking Contexts with Modal Overlay)

**Problem:** Create a page with a sidebar, main content, and a modal that correctly stacks above all other content, demonstrating how stacking contexts isolate z-index values.

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
  }

  /* Header — fixed at top */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #2c3e50;
    color: white;
    padding: 15px 20px;
    z-index: 100;
  }

  /* Sidebar — scrollable */
  .sidebar {
    position: fixed;
    top: 52px;
    left: 0;
    width: 220px;
    bottom: 0;
    background: #34495e;
    padding: 20px;
    z-index: 50;
  }
  .sidebar ul {
    list-style: none;
  }
  .sidebar li {
    color: #bdc3c7;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  /* Main content */
  .main {
    margin-left: 220px;
    margin-top: 52px;
    padding: 30px;
    min-height: 200vh;
  }

  /* Modal overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: white;
    padding: 40px;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .modal h2 {
    margin-bottom: 15px;
    color: #2c3e50;
  }
  .modal p {
    color: #666;
    line-height: 1.6;
  }
</style>
</head>
<body>
  <div class="header">Site Header (z-index: 100)</div>
  <div class="sidebar">
    <ul>
      <li>Dashboard</li>
      <li>Profile</li>
      <li>Settings</li>
      <li>Help</li>
    </ul>
  </div>
  <div class="main">
    <h1>Page Content</h1>
    <p>...</p>
  </div>

  <div class="overlay">
    <div class="modal">
      <h2>Modal Dialog</h2>
      <p>This modal has the highest z-index (200) and correctly overlays the header and sidebar.</p>
    </div>
  </div>
</body>
</html>
```

**Output:** A modal overlay that appears above the fixed header and sidebar. The header, sidebar, and modal each have their own z-index values within the root stacking context.

**Explanation:** The root stacking context contains all elements. The overlay (z-index: 200) stacks above the header (100) and sidebar (50). Each fixed/positioned element participates in the same root stacking context. If the header created its own stacking context (via `opacity` or `transform`), the modal might not overlay it correctly.

## 🏢 Real World Use Case
Modal dialogs must always appear above navigation bars, sidebars, and other UI layers. Dropdown menus need to overlay content below them. Tooltips must stack above everything in their vicinity. Game-like UIs use z-index for card overlaps and layered visual effects.

## 🎯 Interview Questions

1. **What creates a new stacking context?**
   *A new stacking context is created by: `position` + `z-index` other than `auto`, `opacity < 1`, `transform` (any value except `none`), `filter`, `will-change`, `isolation: isolate`, `mix-blend-mode` other than `normal`, and `contain` with certain values.*

2. **Why doesn't a child with `z-index: 9999` appear above a parent with `z-index: 1`?**
   *If the parent creates a stacking context, the child's z-index is scoped within that context. The child can only be above siblings inside the same context, not above elements in the parent's stacking context level.*

3. **What is the default stacking order if no z-index is set?**
   *From bottom: background/borders of root element → negative z-index → block-level descendants → floated elements → inline descendants → positioned elements (in source order, later elements on top).*

4. **How does `isolation: isolate` help with z-index issues?**
   *It creates a new stacking context without needing `position` or `z-index`. This isolates a subtree so its internal z-index values don't interfere with the outer page.*

5. **Does `z-index` work on flexbox and grid items?**
   *Yes. Flex and grid items respect `z-index` even without explicit `position: relative`. They also create stacking contexts within their flex/grid container.*

## ⚠ Common Errors / Mistakes

- **Applying `z-index` to a static element**: `z-index` has no effect on `position: static` elements
- **Thinking a very large z-index always wins**: Stacking contexts isolate z-index values — a child inside a low-z-index context can't out-stack an element in a higher context
- **Using z-index without understanding stacking contexts**: Adding `opacity` or `transform` to a parent creates a new stacking context, which may unexpectedly trap children's z-index values
- **Relying on z-index for layout instead of source order**: Source order is more predictable; use z-index only for intentional overlap
- **Forgetting that fixed position creates a new stacking context in some cases**: Fixed elements, especially with `will-change` or `transform`, may isolate their descendants

## 📝 Practice Exercises

### Beginner
1. Create three positioned `div` elements that overlap. Give them `z-index` values 1, 2, and 3 in a different order than their HTML source order.
2. Create a positioned element with `z-index: -1` and place it behind its parent's background.
3. Remove `position` from an element with `z-index` and observe that the z-index has no effect.

### Intermediate
4. Build a card component where an absolutely positioned badge uses `z-index` to appear above the card's content but below a hover overlay.
5. Create two sibling stacking contexts using `position: relative` + `z-index` on both. Inside each, place a child with a very high z-index. Show that the child can't escape its parent's stacking level.
6. Use `isolation: isolate` on a `<section>` to create a new stacking context without changing its position value.

### Advanced
7. Build a multi-layered UI page with a fixed header (z-index 100), a side panel (z-index 50), a notification toast (z-index 200), a dropdown menu (z-index 150), and a modal overlay (z-index 300). Ensure all elements stack correctly without interference.
8. Create a complex z-index bug scenario where a `transform` on an ancestor unexpectedly traps a popup's z-index, then fix it by restructuring the stacking contexts (using `isolation: isolate` or rearranging DOM elements).
