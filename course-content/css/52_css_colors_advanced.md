## 52. CSS Colors Advanced

## 📘 Introduction
Modern CSS color capabilities extend far beyond simple hex and rgb values. The CSS Color Module Level 4 and 5 introduce powerful features including `currentColor`, relative color syntax, wide-gamut color spaces (oklch, oklab, display-p3), and `color-mix()` for dynamic color blending. Combined with `prefers-color-scheme` for dark mode and accessibility-focused contrast checking, these tools give designers unprecedented control over color systems.

## 🧠 Key Concepts
- **`currentColor`**: Keyword that equals the element's `color` property value; useful for matching borders, shadows, SVGs to text color
- **`color-mix()`**: Mixes two colors in a given color space with specified percentages
- **Relative color syntax**: Derive new colors from existing ones by modifying channels: `rgb(from var(--color) r g b)`, `oklch(from var(--color) l c h)`
- **`oklch`** and **`oklab`**: Perceptually uniform color spaces; `oklch` uses lightness, chroma, hue — more intuitive for adjustments
- **`display-p3`**: Wide-gamut color space for brighter, more vibrant colors on supported displays
- **`prefers-color-scheme`**: Media query for light/dark mode detection
- **`prefers-contrast`**: Media query for high/low contrast preference
- **`color-contrast()`**: Selects the highest-contrast color from a list against a given background
- **`hwb()`**: Hue, Whiteness, Blackness — intuitive color specification
- **`color()`**: Function for specifying colors in any color space (display-p3, srgb, etc.)

## 💻 Syntax

```css
/* currentColor */
.button {
  color: #3498db;
  border: 2px solid currentColor;  /* matches the text color */
}
.button:hover {
  color: #2980b9;  /* border updates automatically */
}

/* color-mix() */
.mixed { background: color-mix(in srgb, red 50%, blue 50%); }
.mixed-oklch { background: color-mix(in oklch, var(--primary), var(--accent)); }

/* Relative colors (CSS Color Level 5) */
.lighter { background: oklch(from var(--primary) calc(l + 0.1) c h); }
.darker { background: oklch(from var(--primary) calc(l - 0.15) c h); }
.transparent { background: rgb(from var(--primary) r g b / 0.5); }

/* Display-P3 wide gamut */
.wide-gamut { color: color(display-p3 0 1 0.5); }

/* OKLCH colors */
.vibrant { color: oklch(0.7 0.25 280); }

/* prefers-color-scheme */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a2e; color: #e0e0e0; }
}

/* HWB */
.muted { background: hwb(200 50% 20%); }
```

## ✅ Example 1 - Basic

**Problem:** Build a themed button system that dynamically adjusts border and shadow colors to match text color, with dark mode support.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --primary: #3498db;
    --primary-light: oklch(from var(--primary) calc(l + 0.1) c h);
    --primary-dark: oklch(from var(--primary) calc(l - 0.1) c h);
  }
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: var(--bg, #fff);
    color: var(--text, #333);
    transition: background 0.3s, color 0.3s;
  }
  @media (prefers-color-scheme: dark) {
    body { --bg: #1a1a2e; --text: #e0e0e0; }
  }
  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: 2px solid currentColor;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    color: var(--primary);
  }
  .btn:hover {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent);
  }
  .btn-primary {
    background: var(--primary);
    color: #fff;
    border-color: var(--primary);
  }
  .btn-primary:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent);
  }
  .btn-outline {
    color: var(--primary);
    border-color: currentColor;
  }
  .btn-outline:hover {
    background: var(--primary-light);
    color: #fff;
  }
  /* Icon that inherits text color via currentColor */
  .btn svg {
    fill: currentColor;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 0.5em;
  }
  .demo {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid currentColor;
    background: transparent;
    cursor: pointer;
    color: var(--text);
  }
</style>
</head>
<body>
  <h2>currentColor & color-mix() Demo</h2>
  <div class="demo">
    <button class="btn">Default</button>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-outline">Outline</button>
    <button class="btn">
      <svg viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 7v4h4v-4H7zm6 0v4h4v-4h-4z"/></svg>
      Icon Button
    </button>
  </div>
</body>
</html>
```

**Output:** Buttons with primary blue color. The border automatically matches the text color via `currentColor`. The box-shadow uses `color-mix()` to create a semi-transparent version of the primary color. In dark mode, all colors shift to maintain readability. The SVG icon inherits the button's text color without needing an explicit color declaration.

**Explanation:** `currentColor` is a powerful keyword that makes borders, shadows, and SVG fills automatically track text color changes. `color-mix(in srgb, var(--primary) 40%, transparent)` creates a tinted shadow that matches the brand color at 40% opacity. Relative colors (`oklch(from ...)`) generate lighter and darker variants from the primary hue.

## 🚀 Example 2 - Intermediate

**Problem:** Create a dynamic color theming system using OKLCH, relative colors, and color-mix for a complete UI palette with accessibility guarantees.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    /* Base brand color in OKLCH for perceptually uniform adjustments */
    --hue-primary: 250;
    --chroma-primary: 0.15;
    --lightness-base: 0.55;
    --color-primary: oklch(var(--lightness-base) var(--chroma-primary) var(--hue-primary));
    --color-primary-light: oklch(0.75 var(--chroma-primary) var(--hue-primary));
    --color-primary-dark: oklch(0.35 var(--chroma-primary) var(--hue-primary));
    --color-primary-subtle: color-mix(in oklch, var(--color-primary) 20%, transparent);

    /* Surface colors */
    --surface: oklch(0.98 0.005 var(--hue-primary));
    --surface-alt: oklch(0.95 0.01 var(--hue-primary));

    /* Text colors with high contrast */
    --text: oklch(0.15 0.02 var(--hue-primary));
    --text-secondary: oklch(0.4 0.03 var(--hue-primary));

    /* Success and danger using hue shifts */
    --color-success: oklch(0.55 0.18 150);
    --color-danger: oklch(0.55 0.2 25);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --surface: oklch(0.15 0.02 var(--hue-primary));
      --surface-alt: oklch(0.2 0.025 var(--hue-primary));
      --text: oklch(0.9 0.01 var(--hue-primary));
      --text-secondary: oklch(0.65 0.02 var(--hue-primary));
      --color-primary-subtle: color-mix(in oklch, var(--color-primary) 25%, transparent);
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 2rem;
    background: var(--surface);
    color: var(--text);
    transition: background 0.3s, color 0.3s;
  }
  .card {
    background: var(--surface-alt);
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    border: 1px solid color-mix(in oklch, var(--text) 10%, transparent);
  }
  .badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }
  .badge-primary {
    background: var(--color-primary);
    color: #fff;
  }
  .badge-success {
    background: var(--color-success);
    color: #fff;
  }
  .badge-danger {
    background: var(--color-danger);
    color: #fff;
  }
  .chip {
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    background: var(--color-primary-subtle);
    color: var(--color-primary-dark);
    border: 1px solid var(--color-primary);
  }
  h1 { color: var(--color-primary); }
  h2 { color: var(--text); }
  p { color: var(--text-secondary); }
</style>
</head>
<body>
  <h1>OKLCH Color System</h1>
  <div class="card">
    <h2>Why OKLCH?</h2>
    <p>OKLCH is perceptually uniform — a 10% lightness change looks the same to the human eye regardless of hue. This makes it ideal for design systems.</p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-danger">Danger</span>
      <span class="chip">Custom Chip</span>
    </div>
  </div>
  <div class="card">
    <h2>Relative Color Benefits</h2>
    <p>Using <code>oklch(from ...)</code>, we derived light and dark variants from a single base hue. All colors remain harmonious.</p>
  </div>
</body>
</html>
```

**Output:** A UI with a cohesive color palette derived from a single OKLCH base hue. The primary color, its light/dark variants, subtles, and text colors all harmonize. In dark mode, background and text colors invert while maintaining the same overall feel. The card, badges, and chips demonstrate the token system.

**Explanation:** The color system starts with one base hue value (`--hue-primary: 250`). Using `oklch()`, we create variants by changing only lightness while keeping hue and chroma constant. `color-mix(in oklch, ...)` creates subtle/semitransparent variants. Dark mode swaps surface and text lightness values while preserving the same hue — creating a cohesive dark theme that still feels "branded." Using OKLCH ensures perceptual uniformity across all color operations.

## 🏢 Real World Use Case
**Design systems at scale** (Adobe Spectrum, Shopify Polaris, GitHub Primer) have adopted (or are migrating to) OKLCH for their color primitives because its perceptual uniformity eliminates the "some colors look too dark/light" problem of HSL. `color-mix()` is used in component libraries to generate hover states, pressed states, and disabled variants dynamically. `currentColor` is standard in icon systems (Feather Icons, Lucide) to make SVGs inherit parent text color. `prefers-color-scheme` is universally implemented across modern web applications for automatic dark mode.

## 🎯 Interview Questions

**1. What is `currentColor` and when would you use it?**
`currentColor` represents the computed value of the `color` property. It is used in properties like `border-color`, `box-shadow`, `outline`, and SVG `fill` to automatically match the text color without duplication.

**2. What makes OKLCH better than HSL for color manipulation?**
OKLCH is perceptually uniform — a change in lightness (L) or chroma (C) produces the same visual difference regardless of hue. HSL is not uniform; yellow appears much lighter than blue at the same lightness value.

**3. How does `color-mix()` work?**
`color-mix(in <colorspace>, <color1> [percentage], <color2> [percentage])` blends two colors in a specified color space. The percentages determine the proportion of each color and should total 100%.

**4. What is relative color syntax and how is it useful?**
Relative color syntax (`oklch(from var(--base) l c h)`) creates new colors by modifying individual channels of an existing color. This is useful for generating hover, active, and disabled states from a single base color token.

**5. How do you detect and respond to dark mode in CSS?**
Use the `prefers-color-scheme` media query: `@media (prefers-color-scheme: dark) { ... }`. Inside, override CSS custom properties to swap surface and text colors.

## ⚠ Common Errors / Mistakes
- Using `currentColor` on the `color` property itself — it creates a circular reference and resolves to `inherit` (the parent's color)
- Assuming HSL and OKLCH are interchangeable — they are not; HSL does not offer perceptual uniformity
- Forgetting to define fallback colors for browsers that do not support OKLCH or `color-mix()`
- Over-complicating dark mode with per-element overrides instead of using CSS custom properties
- Relying on `color-mix()` without specifying the interpolation color space — defaults may vary
- Using `currentColor` in `background-color` unexpectedly — backgrounds will also match the text color

## 📝 Practice Exercises

**Beginner:**
1. Create a button that uses `currentColor` for its border and shadow. Style three variants (blue, green, red) by only changing the `color` property.
2. Use `color-mix(in srgb, red 60%, blue 40%)` as a background color and observe the resulting purple.
3. Build a simple dark mode toggle using `prefers-color-scheme` in CSS. Define light and dark custom properties for background and text.

**Intermediate:**
4. Design a complete color system using OKLCH with 3 hue families (primary, secondary, accent). For each, generate 5 lightness levels (0.2, 0.35, 0.55, 0.75, 0.9) with appropriate chroma values. Test perceptually.
5. Implement `color-mix()` to generate hover and active states for a button component. The button should accept a `--btn-color` custom property and derive all states from it.
6. Build a color contrast checker widget that takes two CSS colors (background and foreground), checks if they meet WCAG AA contrast ratio, and suggests adjustments using relative color syntax if they fail.

**Advanced:**
7. Implement a full design token system using OKLCH with relative color syntax. The system must include: 5 color roles (primary, secondary, accent, success, danger), each with base/hover/active/disabled/subtle variants; surface/text/border tokens for light and dark modes; and a utility to generate high-contrast overrides. All relationships must be derived mathematically, not hardcoded.
8. Build a live color palette generator that takes a single OKLCH base color and generates a complete accessible palette including: foreground, background, muted, border, hover, active, disabled, and success/danger complementary colors (using hue rotation in OKLCH). Display contrast ratios for each pair and export as CSS custom properties.
