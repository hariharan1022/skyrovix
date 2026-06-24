## 83. CSS @supports (Feature Queries)

## 📘 Introduction
The `@supports` rule, known as a feature query, lets you apply CSS rules only when the browser supports a specific CSS property or selector. This is essential for progressive enhancement — you can use cutting-edge features while gracefully falling back for older browsers.

## 🧠 Key Concepts
- **@supports (property: value)** – checks if a property/value combination is supported
- **@supports selector(...)** – checks if a selector is supported (e.g., `:has()`)
- **@supports not** – applies styles when a feature is NOT supported
- **@supports and / or** – combine multiple feature checks
- **Fallbacks** – define baseline styles outside `@supports`, progressive enhancement inside
- **Nesting** – `@supports` can be nested inside other `@supports` or `@media` blocks
- **Browser support** – widely supported since 2016 (IE11 is the notable exception)

## 💻 Syntax

```css
/* Basic feature query */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Selector feature query */
@supports selector(:has(a)) {
  .card:has(img) {
    border: 2px solid gold;
  }
}

/* NOT operator */
@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
}

/* AND / OR operators */
@supports (display: grid) and (gap: 10px) {
  .container { gap: 10px; }
}

@supports (display: grid) or (display: flex) {
  .container { display: flex; }
}
```

## ✅ Example 1 - Basic: Grid fallback with Flexbox

**Problem:** Use CSS Grid for a card layout, but provide a Flexbox fallback for browsers that don't support Grid.

**HTML:**
```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

**CSS:**
```css
/* Base fallback styles — browsers that don't support grid get this */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 200px;
  background: #f0f0f0;
  padding: 1.5rem;
}

/* Progressive enhancement — only if grid is supported */
@supports (display: grid) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .card {
    flex: none; /* remove flex fallback */
  }
}
```

**Output:**
In modern browsers, the cards display in an auto-filling Grid. In older browsers (IE11, older Opera Mini), the Flexbox fallback renders an acceptable row layout.

**Explanation:**
The base CSS defines a working Flexbox layout. The `@supports (display: grid)` block then overrides with a Grid layout only when the browser supports it. Browsers that don't support `@supports` itself simply ignore the entire block and keep the fallback.

## 🚀 Example 2 - Intermediate: Feature-detecting :has() with AND condition

**Problem:** Apply special styling to a form group when its label contains a required indicator, but only if the browser supports both `:has()` and CSS Grid.

**HTML:**
```html
<form class="awesome-form">
  <div class="form-group">
    <label>Email <span class="required">*</span></label>
    <input type="email" required>
  </div>
  <div class="form-group">
    <label>Name</label>
    <input type="text">
  </div>
</form>
```

**CSS:**
```css
.form-group {
  margin-bottom: 1rem;
}

@supports (display: grid) and (selector(:has(*))) {
  .awesome-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group:has(.required) {
    border-left: 4px solid #e74c3c;
    padding-left: 0.75rem;
  }

  .form-group:has(.required) label::after {
    content: " (required)";
    font-size: 0.8em;
    color: #e74c3c;
  }
}

/* Fallback for browsers without :has() */
.required {
  color: #e74c3c;
  font-weight: bold;
}
```

**Output:**
In modern browsers (Chrome 105+, Safari 15.4+), the form displays in a two-column Grid layout. Required fields have a red left border and an explicit "(required)" label suffix. In older browsers, the grid collapses to stacked layout and the red asterisk remains visible.

**Explanation:**
Two conditions must be true (`and`). The selector query `selector(:has(*))` is the least-supported feature being detected. The fallback outside `@supports` uses the simple `.required` class to show an asterisk in all browsers.

## 🏢 Real World Use Case
Sites that use modern layout features (Grid, `aspect-ratio`, `gap`, `:has()`) but need to support older browsers for a large user base. Feature queries let you serve enhanced experiences without breaking baseline functionality, especially on legacy enterprise browsers or older mobile devices.

## 🎯 Interview Questions

1. **Q:** What happens if a browser doesn't support `@supports` at all?
   **A:** The browser ignores the entire `@supports` block and applies only the styles declared outside it. This is why fallbacks should come first.

2. **Q:** Can `@supports` check for selector support?
   **A:** Yes, using `@supports selector(...)`. This was added to the spec in 2019 and is supported in all modern browsers.

3. **Q:** What is the difference between `@supports (display: grid)` and `@supports (display: grid !important)`?
   **A:** Adding `!important` inside the feature query does not change the feature detection — it only affects specificity within the rule. The spec explicitly says `!important` is ignored when evaluating support.

4. **Q:** Can you nest `@supports` inside `@media` and vice versa?
   **A:** Yes. Both at-rules can be nested inside each other, which is useful for applying feature-specific styles only at certain viewport sizes.

5. **Q:** How would you provide a fallback for `aspect-ratio` using `@supports`?
   **A:** Define a `padding-bottom` hack as the base style (outside `@supports`), then use `@supports (aspect-ratio: 1)` to set `aspect-ratio: 1` and remove the padding hack.

## ⚠ Common Errors / Mistakes

- Placing the fallback AFTER the `@supports` block, so it always overrides the enhanced styles
- Checking `@supports (grid)` instead of `@supports (display: grid)` — the rule requires a full property:value declaration
- Forgetting that `@supports` does not detect partial or buggy implementations — it only checks if the browser claims to support the syntax
- Overusing `@supports` when a simpler CSS default would work (e.g., writing `display: flex` as the default and `display: grid` in `@supports`)
- Using `@supports` to detect vendor-prefixed properties incorrectly — the unprefixed version is what should be queried

## 📝 Practice Exercises

**Beginner:**
1. Write a feature query that applies `display: grid` only when supported, with a `display: block` fallback.
2. Create a `@supports not` rule that applies a warning message background when CSS Grid is not supported.
3. Use `@supports (gap: 10px)` to apply gap in a flex container, with margin-based gutters as fallback.

**Intermediate:**
4. Build a card layout that uses `aspect-ratio: 1` inside `@supports` with a `padding-bottom` percentage hack as fallback.
5. Combine `@supports (display: grid) and (gap: 1rem)` to apply modern grid spacing, with `margin` as the fallback.
6. Use `@supports selector(:has(+ *))` to style adjacent sibling combinations, with a class-based fallback for older browsers.

**Advanced:**
7. Create a progressive enhancement system where a complex animation uses `@supports` to detect `animation-timeline: scroll()` and provides a JS-free scroll-triggered animation, with a static fallback.
8. Build a full-page layout that works in IE11 (using floats/clearfix) but upgrades to CSS Grid in all modern browsers using nested `@supports` blocks for grid, gap, and subgrid detection.
