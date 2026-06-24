## 79. CSS Flex Container
## 📘 Introduction
The flex container properties control how flex items are laid out along both the main and cross axes. These properties—`justify-content`, `align-items`, `flex-wrap`, `gap`, and `align-content`—provide powerful control over spacing, alignment, wrapping, and distribution within a flex layout.

## 🧠 Key Concepts
- **justify-content** – Aligns items along the main axis (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`)
- **align-items** – Aligns items along the cross axis (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`)
- **flex-wrap** – Controls whether items wrap to new lines (`nowrap`, `wrap`, `wrap-reverse`)
- **gap** – Sets spacing between flex items (shorthand for `row-gap` and `column-gap`)
- **align-content** – Aligns wrapped lines along the cross axis (only works with `flex-wrap: wrap`)
- **Flex container vs flex items** – Container properties affect the group; item properties (`flex`, `align-self`) override for individual items

## 💻 Syntax
```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  /* Main axis */
  justify-content: space-between;

  /* Cross axis */
  align-items: center;
  align-content: flex-start;
}
```

## ✅ Example 1 - Basic
**Problem:** Demonstrate all `justify-content` values and all `align-items` values side by side.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .demo { max-width: 900px; margin: 0 auto; }

  h2 { margin-bottom: 20px; }

  .section { margin-bottom: 30px; }

  .section h3 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #555;
  }

  .flex-container {
    display: flex;
    padding: 12px;
    background: #e3f2fd;
    border-radius: 8px;
    border: 2px dashed #90caf9;
    min-height: 80px;
    gap: 8px;
  }

  .flex-container .item {
    padding: 14px 22px;
    background: #64b5f6;
    color: #fff;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
    min-width: 40px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .label {
    font-size: 0.8rem;
    color: #888;
    text-align: center;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .justify-start { justify-content: flex-start; }
  .justify-center { justify-content: center; }
  .justify-end { justify-content: flex-end; }
  .justify-between { justify-content: space-between; }
  .justify-around { justify-content: space-around; }
  .justify-evenly { justify-content: space-evenly; }
</style>
</head>
<body>
  <div class="demo">
    <h2>justify-content (main axis)</h2>
    <div class="grid">
      <div><div class="label">flex-start</div><div class="flex-container justify-start"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">center</div><div class="flex-container justify-center"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">flex-end</div><div class="flex-container justify-end"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">space-between</div><div class="flex-container justify-between"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">space-around</div><div class="flex-container justify-around"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">space-evenly</div><div class="flex-container justify-evenly"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
    </div>

    <h2 style="margin-top:40px;">align-items (cross axis)</h2>
    <div class="grid">
      <div><div class="label">stretch</div><div class="flex-container" style="align-items:stretch; min-height:100px;"><div class="item" style="height:auto;">1</div><div class="item" style="height:auto;">2</div><div class="item" style="height:auto;">3</div></div></div>
      <div><div class="label">center</div><div class="flex-container" style="align-items:center; min-height:100px;"><div class="item">1</div><div class="item" style="padding:24px 22px;">2</div><div class="item">3</div></div></div>
      <div><div class="label">flex-start</div><div class="flex-container" style="align-items:flex-start; min-height:100px;"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">flex-end</div><div class="flex-container" style="align-items:flex-end; min-height:100px;"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div><div class="label">baseline</div><div class="flex-container" style="align-items:baseline; min-height:100px;"><div class="item" style="padding-top:30px;">1</div><div class="item">2</div><div class="item">3</div></div></div>
      <div></div>
    </div>
  </div>
</body>
</html>
```

**Output:** A 3x2 grid showing all six `justify-content` values, followed by five `align-items` values (stretch, center, flex-start, flex-end, baseline) with items at varying heights.

**Explanation:** `justify-content` distributes space along the main axis (horizontal by default). `space-between` puts equal space between items, `space-around` adds space on both sides of each item, `space-evenly` makes all gaps equal. `align-items` aligns along the cross axis—`stretch` (default) makes items fill the container height, `baseline` aligns text baselines regardless of item padding.

## 🚀 Example 2 - Intermediate
**Problem:** Build a responsive card layout using `flex-wrap`, `gap`, and `align-content` to demonstrate wrapping behavior with different align-content values.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  .demo { max-width: 900px; margin: 0 auto; }

  h2 { margin-bottom: 8px; }
  .sub { color: #888; margin-bottom: 24px; }

  .section { margin-bottom: 30px; }

  .flex-wrap-demo {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    border: 2px dashed #ccc;
    min-height: 200px;
    margin-bottom: 24px;
  }

  .flex-wrap-demo .card {
    width: 120px;
    height: 80px;
    background: #4361ee;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
  }

  .flex-wrap-demo .card:nth-child(2n) {
    height: 100px;
    background: #3a56d4;
  }

  .flex-wrap-demo .card:nth-child(3n) {
    height: 120px;
    background: #2d4ac0;
  }

  .label-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .label-row code {
    background: #e9ecef;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .align-start { align-content: flex-start; }
  .align-center { align-content: center; }
  .align-end { align-content: flex-end; }
  .align-between { align-content: space-between; }
  .align-around { align-content: space-around; }
  .align-stretch { align-content: stretch; }
</style>
</head>
<body>
  <div class="demo">
    <h2>flex-wrap & align-content</h2>
    <p class="sub">With flex-wrap: wrap, align-content controls spacing between wrapped lines along the cross axis.</p>

    <div class="section">
      <h3>flex-wrap: wrap + gap: 12px</h3>
      <div class="flex-wrap-demo">
        <div class="card">1</div>
        <div class="card">2</div>
        <div class="card">3</div>
        <div class="card">4</div>
        <div class="card">5</div>
        <div class="card">6</div>
        <div class="card">7</div>
        <div class="card">8</div>
        <div class="card">9</div>
        <div class="card">10</div>
      </div>
    </div>

    <div class="label-row">
      <span><code>align-content: flex-start</code> — packed at top</span>
    </div>
    <div class="flex-wrap-demo align-start">
      <div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
      <div class="card">6</div><div class="card">7</div><div class="card">8</div><div class="card">9</div><div class="card">10</div>
    </div>

    <div class="label-row">
      <span><code>align-content: center</code> — centered vertically</span>
    </div>
    <div class="flex-wrap-demo align-center">
      <div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
      <div class="card">6</div><div class="card">7</div><div class="card">8</div><div class="card">9</div><div class="card">10</div>
    </div>

    <div class="label-row">
      <span><code>align-content: space-between</code> — equal space between rows</span>
    </div>
    <div class="flex-wrap-demo align-between">
      <div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
      <div class="card">6</div><div class="card">7</div><div class="card">8</div><div class="card">9</div><div class="card">10</div>
    </div>

    <div class="label-row">
      <span><code>align-content: space-around</code> — space around each row</span>
    </div>
    <div class="flex-wrap-demo align-around">
      <div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
      <div class="card">6</div><div class="card">7</div><div class="card">8</div><div class="card">9</div><div class="card">10</div>
    </div>
  </div>
</body>
</html>
```

**Output:** A set of wrapped flex containers showing how `align-content` distributes multiple rows of items along the cross axis—`flex-start` (top), `center` (middle), `space-between` (pushed apart), `space-around` (even spacing).

**Explanation:** With `flex-wrap: wrap`, when items fill the container width, they wrap to new rows. The `align-content` property controls how those wrapped rows are spaced along the cross axis. Note that `align-content` only has an effect when there are multiple rows (wrapping occurs).

## 🏢 Real World Use Case
Card grids (product listings, blog posts), toolbar layouts, form alignment, navigation bars with wrapped links, dashboard widgets, and any layout requiring both axis alignment and wrapping.

## 🎯 Interview Questions
1. **Q:** What is the difference between `justify-content` and `align-items`?  
   **A:** `justify-content` aligns items along the main axis (horizontal by default); `align-items` aligns along the cross axis (vertical by default).

2. **Q:** What does `flex-wrap: wrap` do?  
   **A:** It allows flex items to wrap to new lines when they overflow the container width (instead of shrinking).

3. **Q:** When does `align-content` have a visible effect?  
   **A:** Only when `flex-wrap: wrap` is active AND there are multiple rows/columns of items.

4. **Q:** What is the difference between `space-around` and `space-evenly`?  
   **A:** `space-around` adds half-size space at the edges and full space between items; `space-evenly` makes all gaps (including edges) equal.

5. **Q:** What does `align-items: baseline` do?  
   **A:** It aligns flex items so their text baselines line up, useful when items have different font sizes or padding.

## ⚠ Common Errors / Mistakes
- Using `align-content` without `flex-wrap: wrap` (no visible effect)
- Confusing `justify-content` (main axis) with `align-items` (cross axis)
- Expecting `align-items: stretch` to work without setting a height on the container
- Forgetting that `gap` only controls spacing between items, not around the container edges
- Using `space-between` when there is only one item (no visible effect)

## 📝 Practice Exercises
**Beginner:**
1. Create a flex container with 5 items and use `justify-content: center` to center them.
2. Change to `justify-content: space-between` and observe the spacing.
3. Add `align-items: center` with a fixed height container (200px).

**Intermediate:**
4. Create a wrapping card grid using `flex-wrap: wrap` with `gap: 16px` and `justify-content: space-evenly`.
5. Use `align-content: space-between` on a wrapped flex container with multiple rows.
6. Create a navigation bar with `justify-content: space-between` for logo + links, and `align-items: center` for vertical centering.

**Advanced:**
7. Build a responsive dashboard layout with a toolbar (flex, space-between), card grid (wrap, align-content), and a footer, all using flex container properties without media queries.
8. Create a flex-based form with labels and inputs where labels are right-aligned using `align-items: baseline` for proper vertical alignment with different input sizes.
