## 46. CSS Math Functions

## 📘 Introduction
CSS math functions — `calc()`, `min()`, `max()`, and `clamp()` — enable dynamic mathematical calculations directly in stylesheets. These functions allow you to combine different units, create responsive layouts without media queries, and implement fluid typography. They are essential tools for modern, responsive CSS design that adapts gracefully across all viewport sizes.

## 🧠 Key Concepts
- **`calc()`**: Performs basic arithmetic (+, -, *, /) with mixed units; spaces are required around + and - operators
- **`min()`**: Selects the smallest value among a comma-separated list; ideal for responsive max-widths
- **`max()`**: Selects the largest value; useful for minimum size guarantees
- **`clamp()`**: Combines min, preferred, and max values: `clamp(MIN, PREFERRED, MAX)` — fluid sizing with bounds
- **Nesting**: Math functions can be nested inside each other for complex calculations
- **Mixed units**: Combine px, em, rem, %, vw, vh, ch freely within these functions
- **Supported properties**: Any property that accepts numeric values — widths, heights, margins, paddings, font-sizes, gaps, etc.

## 💻 Syntax

```css
/* calc() - basic arithmetic */
.element {
  width: calc(100% - 40px);
  height: calc(50vh - 60px);
  font-size: calc(1rem + 0.5vw);
  padding: calc(1em + 10px);
}

/* min() - selects smallest */
.element {
  width: min(100%, 1200px);       /* Responsive width, caps at 1200px */
  font-size: min(3vw, 2rem);       /* Responsive but not too large */
}

/* max() - selects largest */
.element {
  width: max(300px, 50%);          /* At least 300px wide */
  padding: max(1rem, 2vw);
}

/* clamp() - three-value range */
.element {
  font-size: clamp(1rem, 2.5vw, 2rem);  /* Min 1rem, preferred 2.5vw, max 2rem */
  width: clamp(280px, 80%, 1200px);
}
```

## ✅ Example 1 - Basic

**Problem:** Create a fluid container that maintains 20px margins on all sides while filling the viewport, with a maximum width of 1200px — all without media queries.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; }
  .container {
    width: calc(100% - 40px);
    max-width: 1200px;
    margin: 0 auto;
    background: #f0f4f8;
    padding: 2rem;
    min-height: 100vh;
  }
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  .card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .card h3 {
    font-size: calc(1rem + 0.5vw);
    margin-bottom: 0.5rem;
  }
  .card p {
    font-size: calc(0.875rem + 0.25vw);
    line-height: 1.6;
    color: #555;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Responsive Math Functions</h1>
    <p>This layout uses calc(), min(), and minmax() — zero media queries.</p>
    <div class="content-grid">
      <div class="card">
        <h3>Card Title</h3>
        <p>Font sizes scale fluidly with calc(). Grid columns auto-adjust with min().</p>
      </div>
      <div class="card">
        <h3>Fluid Typography</h3>
        <p>Using calc(1rem + 0.5vw) for headings creates smooth scaling between devices.</p>
      </div>
      <div class="card">
        <h3>Zero Media Queries</h3>
        <p>Modern CSS math functions eliminate many media query use cases entirely.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A centered container that always has 40px less than full width (20px per side), caps at 1200px, and has fluid typography. The grid auto-adjusts column count based on available space.

**Explanation:** `calc(100% - 40px)` gives a fluid width with fixed margins. `max-width: 1200px` prevents excessive stretching. `minmax(min(300px, 100%), 1fr)` ensures grid columns are at least 300px wide (or 100% if the container is smaller) and expand to fill space. `calc(1rem + 0.5vw)` makes font sizes scale with the viewport while maintaining a 1rem baseline.

## 🚀 Example 2 - Intermediate

**Problem:** Build a hero section with fluid typography using `clamp()`, a responsive call-to-action button that scales with the viewport, and overlapping design elements positioned with `calc()`.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; }

  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }
  .hero-content {
    text-align: center;
    color: #fff;
    max-width: min(90%, 800px);
    position: relative;
    z-index: 2;
  }
  .hero h1 {
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 0.5em;
    letter-spacing: -0.02em;
  }
  .hero p {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: rgba(255,255,255,0.8);
    line-height: 1.6;
    max-width: 60ch;
    margin: 0 auto 2em;
  }
  .cta {
    display: inline-block;
    padding: clamp(0.75rem, 1.5vw, 1.25rem) clamp(1.5rem, 3vw, 3rem);
    font-size: clamp(0.875rem, 1.25vw, 1.125rem);
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
  .hero-stats {
    display: flex;
    gap: clamp(1rem, 3vw, 3rem);
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
  }
  .hero-stats .stat {
    text-align: center;
  }
  .hero-stats .number {
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-weight: 700;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .hero-stats .label {
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .decorative-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.15);
  }
  .circle-1 {
    width: clamp(200px, 40vw, 600px);
    height: clamp(200px, 40vw, 600px);
    top: calc(10% - 100px);
    right: calc(5% - 50px);
  }
  .circle-2 {
    width: clamp(150px, 25vw, 400px);
    height: clamp(150px, 25vw, 400px);
    bottom: calc(15% - 75px);
    left: calc(10% - 50px);
  }
</style>
</head>
<body>
  <section class="hero">
    <div class="decorative-circle circle-1"></div>
    <div class="decorative-circle circle-2"></div>
    <div class="hero-content">
      <h1>Build Smarter<br>with CSS Math</h1>
      <p>Use calc(), min(), max(), and clamp() to create truly fluid, responsive designs without a single media query.</p>
      <a href="#" class="cta">Get Started Free</a>
      <div class="hero-stats">
        <div class="stat">
          <div class="number">10K+</div>
          <div class="label">Users</div>
        </div>
        <div class="stat">
          <div class="number">99.9%</div>
          <div class="label">Uptime</div>
        </div>
        <div class="stat">
          <div class="number">4.9★</div>
          <div class="label">Rating</div>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
```

**Output:** A full-viewport hero with fluid typography that scales perfectly from mobile to 4K displays. The heading ranges from 2rem to 4.5rem, body text from 1rem to 1.5rem. Padding on the CTA button scales proportionally. Decorative circles use clamp() for size and calc() for positioning, maintaining proportional layout at all viewports.

**Explanation:** `clamp()` accepts three values: minimum, preferred, maximum. The preferred value (middle) uses `vw` units for fluidity. The min and max prevent values from going outside the accessible range. `calc()` allows precise positioning of the decorative elements relative to the viewport. This approach eliminates the need for breakpoint-specific adjustments.

## 🏢 Real World Use Case
**Modern design systems** like Tailwind CSS v4 and Open Props use `clamp()` for their fluid typography scales, providing consistent type sizing across devices without media queries. "Fluid containers" in frameworks like Bootstrap use `min()` with `max-width` to create responsive wrappers. E-commerce sites use `calc()` for sticky sidebar layouts: `height: calc(100vh - 80px)` for sticky elements below fixed headers. `clamp()` is increasingly used for spacing scales (paddings, margins, gaps) to create truly responsive component spacing.

## 🎯 Interview Questions

**1. Why must + and - operators in `calc()` be surrounded by whitespace?**
The `-` character is ambiguous and could be part of a negative number. Whitespace forces the parser to treat it as an operator. `*` and `/` do not require spacing but it is good practice.

**2. What happens if `min()` or `max()` are used in a context where they cannot be resolved?**
The functions resolve at computed-value time. If a value cannot be resolved, the declaration becomes invalid and is ignored.

**3. Can `calc()` be used with CSS variables?**
Yes: `width: calc(var(--spacing) * 2 + 10px);` The variable is substituted and then the calculation is performed.

**4. What is the difference between `width: min(100%, 500px)` and `width: 100%; max-width: 500px`?**
Behaviorally they are equivalent. `min()` is more concise and can be used anywhere a single value is expected, including shorthand properties, grid tracks, and `clamp()` arguments.

**5. Can math functions be nested?**
Yes. `clamp(min(1rem, 2vw), 4vw, max(3rem, 6vw))` is valid nesting, though it is best to keep nesting minimal for readability.

## ⚠ Common Errors / Mistakes
- Missing spaces around `+` and `-` in `calc()` — `calc(100%-20px)` is invalid, must be `calc(100% - 20px)`
- Using `calc()` with zero — `calc(100% - 0)` is fine but redundant; prefer `calc(100%)` which is just `100%`
- Forgetting `clamp()` order — it is `clamp(MIN, PREFERRED, MAX)`, not alphabetical or random
- Using `min()` for max constraints and `max()` for min constraints — the names are intuitive: `min(100%, 500px)` means "never exceed 500px"
- Over-nesting — nesting too many math functions harms readability; use CSS variables for intermediate values
- Expecting `calc()` to work with `auto` — `calc()` requires numeric values; `calc(auto + 20px)` is invalid

## 📝 Practice Exercises

**Beginner:**
1. Use `calc()` to create a container that is always `100%` width minus `60px` (for 30px left/right margin).
2. Create a box that uses `min(80%, 600px)` as its width. Resize the viewport and observe when it switches between percentage and pixel.
3. Use `clamp()` to create a heading that scales between `1.5rem` and `3rem` with a preferred value of `4vw`.

**Intermediate:**
4. Build a three-column card layout where each card is `min(33%, 400px)` wide. Observe how the layout behaves at different viewport widths.
5. Create a sticky sidebar with `height: calc(100vh - 120px)` that accounts for a 60px fixed header and 60px fixed footer.
6. Design a responsive pricing section with three tiers. Use `clamp()` for the card padding, font sizes, and CTA button sizing. Ensure the layout works from 320px to 1920px without media queries.

**Advanced:**
7. Implement a full-page responsive magazine layout with fluid typography (headings, body, captions) using only `clamp()` for all font sizes and `calc()` for spacing. Define a complete typographic scale where each level scales between a minimum and maximum size. Test across 5 viewport sizes.
8. Build a fluid design token system using CSS custom properties and math functions. Create tokens for `--space-xs` through `--space-xxl` using `clamp()`, and a `--font-size-fluid` scale. Use these tokens throughout a component library, then validate that all spacing and typography remain proportional from 360px to 2560px.
