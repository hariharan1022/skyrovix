## 53. CSS Gradients

## 📘 Introduction
CSS gradients allow smooth transitions between two or more specified colors, creating rich visual backgrounds without external images. The three primary gradient types — linear, radial, and conic — can produce everything from simple fades to complex geometric patterns. Repeating gradients extend these to generate tiled textures. Mastering gradients eliminates many image assets, reduces HTTP requests, and enables responsive, resolution-independent visuals.

## 🧠 Key Concepts
- **`linear-gradient()`**: Colors transition along a straight line (angle or direction keywords)
- **`radial-gradient()`**: Colors radiate outward from a center point (circle or ellipse)
- **`conic-gradient()`**: Colors transition around a center point (color wheel style)
- **`repeating-linear-gradient()`**, **`repeating-radial-gradient()`**, **`repeating-conic-gradient()`**: Tiled gradient patterns
- **Color stops**: Points along the gradient where colors are defined; can include position values (px, %, etc.)
- **Gradient angles**: `0deg` = bottom to top, `90deg` = left to right, `180deg` = top to bottom, `270deg` = right to left
- **Direction keywords**: `to top`, `to bottom`, `to left`, `to right`, `to top left`, `to bottom right`, etc.
- **Hard color stops**: Two stops at the same position create a sharp boundary (no blend)
- **Gradient patterns**: Stripes, checkers, zig-zags, grids using repeating gradients
- **Multiple gradients**: Stacking gradients creates complex layered effects

## 💻 Syntax

```css
/* Linear gradient */
.linear { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); }
.linear-stops { background: linear-gradient(90deg, red 0%, yellow 50%, blue 100%); }

/* Radial gradient */
.radial { background: radial-gradient(circle, #f093fb, #f5576c); }
.radial-pos { background: radial-gradient(circle at 30% 40%, #4facfe, #00f2fe); }

/* Conic gradient */
.conic { background: conic-gradient(from 0deg, red, yellow, green, blue, red); }
.conic-pos { background: conic-gradient(from 90deg at 50% 50%, #667eea, #764ba2); }

/* Repeating gradients */
.stripes { background: repeating-linear-gradient(45deg, #333 0px, #333 10px, #fff 10px, #fff 20px); }

/* Hard color stops for sharp transitions */
.hard-stop { background: linear-gradient(90deg, red 50%, blue 50%); }

/* Multiple gradients stacked */
.layer {
  background:
    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px),
    linear-gradient(135deg, #667eea, #764ba2);
}
```

## ✅ Example 1 - Basic

**Problem:** Create a set of UI elements demonstrating the three gradient types with color stops — a progress bar, a button, a card background, and a striped pattern.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background: #1a1a2e;
  }
  /* Linear gradient button */
  .btn-gradient {
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }
  /* Progress bar with hard stops */
  .progress-bar {
    width: 100%;
    height: 24px;
    background: #2d2d44;
    border-radius: 12px;
    overflow: hidden;
  }
  .progress-fill {
    width: 65%;
    height: 100%;
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%);
    border-radius: 12px;
  }
  /* Card with radial gradient */
  .card {
    background: radial-gradient(circle at 30% 20%, #667eea, #2d1b69);
    padding: 2rem;
    border-radius: 16px;
    color: #fff;
    max-width: 400px;
  }
  /* Striped pattern with repeating gradient */
  .striped-box {
    width: 100%;
    height: 80px;
    background: repeating-linear-gradient(
      -45deg,
      #333 0px,
      #333 10px,
      #444 10px,
      #444 20px
    );
    border-radius: 8px;
  }
  .label {
    color: rgba(255,255,255,0.7);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
</style>
</head>
<body>
  <div>
    <div class="label">Linear Gradient Button</div>
    <button class="btn-gradient">Get Started</button>
  </div>
  <div>
    <div class="label">Progress Bar (linear with multiple stops)</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
  <div>
    <div class="label">Radial Gradient Card</div>
    <div class="card">
      <h3>Radial Glow</h3>
      <p>The highlight is positioned at 30% 20%, creating a subtle light source effect atop the deep purple base.</p>
    </div>
  </div>
  <div>
    <div class="label">Repeating Linear Pattern</div>
    <div class="striped-box"></div>
  </div>
</body>
</html>
```

**Output:** A gradient button (linear, angled), a multi-color progress bar (linear with 3 stops), a card with a radial highlight effect, and a diagonal repeating striped pattern.

**Explanation:** `linear-gradient(135deg, ...)` creates an angled transition. The progress bar uses three color stops at 0%, 50%, 100% for a multi-color effect. `radial-gradient(circle at 30% 20%, ...)` positions the gradient origin off-center, creating a realistic lighting effect. `repeating-linear-gradient(-45deg, ...)` with equal color stops generates a diagonal stripe pattern.

## 🚀 Example 2 - Intermediate

**Problem:** Build a complex gradient-powered UI with layered gradients, conic gradients, hard stops for geometric patterns, and gradient-based data visualization.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background: #0f0f1a;
    align-items: center;
  }
  /* Conic gradient color wheel */
  .color-wheel {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      red, yellow, lime, aqua, blue, magenta, red
    );
    box-shadow: 0 0 30px rgba(255,255,255,0.1);
  }
  /* Donut chart with conic gradient hard stops */
  .donut {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      #3498db 0deg 120deg,
      #e74c3c 120deg 240deg,
      #2ecc71 240deg 360deg
    );
    /* Inner cutout via radial gradient overlay */
    position: relative;
  }
  .donut::after {
    content: '';
    position: absolute;
    inset: 30px;
    border-radius: 50%;
    background: #0f0f1a;
  }
  /* Gradient-generated checkerboard */
  .checkerboard {
    width: 200px;
    height: 200px;
    background:
      repeating-conic-gradient(#333 0% 25%, #555 0% 50%) 0 0 / 40px 40px;
    border-radius: 8px;
  }
  /* Gradient mesh background */
  .mesh-bg {
    width: 100%;
    min-height: 300px;
    border-radius: 16px;
    padding: 2rem;
    color: #fff;
    position: relative;
    background:
      radial-gradient(circle at 20% 30%, rgba(102,126,234,0.4), transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(118,75,162,0.4), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(240,147,251,0.2), transparent 50%),
      linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69);
    overflow: hidden;
  }
  /* Hard stop triangles */
  .triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 86px solid;
    border-bottom-color: #e74c3c;
  }
  /* Glass with gradient reflection */
  .glass {
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.1) 0%,
      rgba(255,255,255,0.05) 50%,
      transparent 50%
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    max-width: 300px;
  }
  .section-title { color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
</style>
</head>
<body>
  <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
    <div>
      <div class="section-title">Conic Color Wheel</div>
      <div class="color-wheel"></div>
    </div>
    <div>
      <div class="section-title">Donut Chart (Conic + overlay)</div>
      <div class="donut"></div>
    </div>
    <div>
      <div class="section-title">Checkerboard Pattern</div>
      <div class="checkerboard"></div>
    </div>
  </div>
  <div style="width: 100%;">
    <div class="section-title">Mesh Gradient Background</div>
    <div class="mesh-bg">
      <h2>Mesh Gradient Effect</h2>
      <p>Multiple radial gradients positioned at different points create a smooth, organic mesh-like background that mimics modern design trends.</p>
    </div>
  </div>
</body>
</html>
```

**Output:** A conic color wheel (full spectrum), a donut chart with three segments (blue, red, green) using conic hard stops, a checkerboard pattern from repeating-conic, a mesh gradient background with three radial glows on a dark base, and a glassmorphism card with a gradient reflection.

**Explanation:** `conic-gradient` with angle color stops creates pie-chart-like segments. The donut uses a `::after` overlay to punch a hole. `repeating-conic-gradient(0% 25%, 0% 50%)` at half the background size creates alternating squares. The mesh effect stacks multiple `radial-gradient` layers at different positions on a dark `linear-gradient` base. The glass card uses a diagonal linear gradient with abrupt transparency change for a reflective sheen.

## 🏢 Real World Use Case
**SaaS marketing sites** (Notion, Linear, Vercel, Stripe) use mesh gradients extensively for hero section backgrounds — combining 3-5 radial gradients with soft colors to create depth. **Data dashboards** use conic gradients for progress rings and donut charts. **Gradient pattern libraries** (like Hero Patterns, Pattern CSS) generate stripes, zigzags, and checkers purely with repeating gradients. **Gaming platforms** use hard-stop gradients for pixel-art-style decorations and health bars. **Design tools** (Figma, Canva) replicate CSS gradient syntax natively, cross-pollinating between design and code.

## 🎯 Interview Questions

**1. What is the difference between linear-gradient and repeating-linear-gradient?**
`linear-gradient()` shows the gradient once across the element. `repeating-linear-gradient()` tiles the gradient pattern repeatedly based on the last color stop position.

**2. How do you create sharp color boundaries in a gradient?**
Use hard color stops — placing two color stops at the same position creates a sharp transition: `linear-gradient(90deg, red 50%, blue 50%)` produces a clean split (red on left, blue on right).

**3. What does `conic-gradient(from 90deg at 30% 40%, ...)` mean?**
It starts the color rotation from 90 degrees (clockwise from top), with the center of rotation at 30% from the left and 40% from the top of the element.

**4. How do you create a striped pattern using CSS gradients?**
Use `repeating-linear-gradient()` with equal-width color stops: `repeating-linear-gradient(45deg, #333 0px, #333 10px, #fff 10px, #fff 20px)` creates 10px diagonal stripes.

**5. Can CSS gradients be animated?**
Yes, but only by transitioning the background-position or background-size, not the gradient itself. For animated gradient effects, you typically move the background position or layer multiple gradients and animate their opacity.

## ⚠ Common Errors / Mistakes
- Forgetting to include `from <angle>` in `conic-gradient()` syntax on older browsers — falls back to starting from top
- Using too many color stops that cause banding on low-color-display devices
- Placing radial gradient `at` position before the shape keyword — `radial-gradient(circle at center, ...)` is correct; `radial-gradient(at center circle, ...)` is not
- Adding commas between color stops inside the function — stops are space-separated with commas only between color-stop groups in repeating gradients
- Expecting `repeating-linear-gradient()` to fill the element entirely — if the final stop does not divide evenly, the pattern may cut off
- Creating gradient backgrounds that do not have enough contrast for text overlays — always add a semi-transparent overlay or check contrast ratios

## 📝 Practice Exercises

**Beginner:**
1. Create a button with a linear gradient from `#6c63ff` to `#ff6584`. Add a hover effect that reverses the gradient direction.
2. Build a progress bar using a linear gradient with three stops. Make it 75% filled with a smooth multi-color transition.
3. Create a simple striped background using `repeating-linear-gradient` with 5px wide diagonal stripes.

**Intermediate:**
4. Design a donut chart showing 4 data segments (30%, 25%, 20%, 25%) using conic gradient with hard stops. Add a legend.
5. Build a hero section with a mesh gradient background using 4 radial gradients positioned at different corners/midpoints. Add text with sufficient contrast.
6. Create a product card with a gradient-generated price badge (circular, conic gradient border), a gradient overlay on the product image, and a striped "sale" label.

**Advanced:**
7. Implement a gradient pattern generator that creates 10 distinct patterns (stripes, checkers, zigzags, diamonds, polka dots, herringbone, plaid, houndstooth, scales, waves) using only CSS gradients. Each pattern must be a single background declaration and work at any element size.
8. Build a complete gradient-based data visualization system including: bar charts (linear gradient fills), pie/donut charts (conic gradient), radial area charts (radial gradient), and a heatmap grid (combination of gradients). All must be responsive and use only CSS (no SVG/Canvas).
