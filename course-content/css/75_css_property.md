## 75. CSS @property
## 📘 Introduction
The `@property` at-rule is a CSS feature that allows you to register custom properties (CSS variables) with a defined syntax, initial value, and inheritance behavior. Registered custom properties enable type checking, fallback guarantees, and—most importantly—the ability to animate custom properties in `@keyframes` or `transition`.

## 🧠 Key Concepts
- **@property** – At-rule to register a custom property
- **syntax** – Defines the allowed data type (`"<color>"`, `"<length>"`, `"<number>"`, `"<percentage>"`, `"<angle>"`, etc.)
- **initial-value** – The default value used when the property is not set
- **inherits** – Whether the property inherits from parent elements (`true` or `false`)
- **Registered custom properties** – Unlike regular `--` variables, registered ones have a defined type
- **Type checking** – The browser validates assigned values against the defined syntax
- **Animation with @property** – Registered custom properties can be animated in `@keyframes` and `transition`

## 💻 Syntax
```css
/* Register a custom property */
@property --brand-color {
  syntax: "<color>";
  initial-value: #007bff;
  inherits: false;
}

@property --box-size {
  syntax: "<length>";
  initial-value: 100px;
  inherits: false;
}

@property --rotation {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```

## ✅ Example 1 - Basic
**Problem:** Register a custom property and animate it using `@keyframes` (without JavaScript).

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  /* Register custom properties */
  @property --bg-color {
    syntax: "<color>";
    initial-value: #4361ee;
    inherits: false;
  }

  @property --scale {
    syntax: "<number>";
    initial-value: 1;
    inherits: false;
  }

  @property --corner-radius {
    syntax: "<length>";
    initial-value: 10px;
    inherits: false;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, sans-serif;
    padding: 40px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .animated-box {
    width: 200px;
    height: 200px;
    background: var(--bg-color);
    border-radius: var(--corner-radius);
    transform: scale(var(--scale));
    transition: --bg-color 1s ease, --corner-radius 1s ease, --scale 1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 20px;
    cursor: pointer;
  }

  .animated-box:hover {
    --bg-color: #f72585;
    --corner-radius: 50%;
    --scale: 1.1;
  }
</style>
</head>
<body>
  <div class="animated-box">
    Hover me — registered custom properties animate smoothly
  </div>
</body>
</html>
```

**Output:** A box with a registered custom property for background color, border radius, and scale. On hover, all three animate smoothly to new values—even though CSS variables normally cannot transition.

**Explanation:** Without `@property`, CSS variables change instantly and cannot be transitioned. By registering `--bg-color`, `--scale`, and `--corner-radius` with specific syntax types, the browser understands them as animatable values. The `transition` property then works on them.

## 🚀 Example 2 - Intermediate
**Problem:** Create a rotating gradient border animation using `@keyframes` with registered custom properties.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  /* Register a custom property for angle, used in conic-gradient */
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  @property --hue-start {
    syntax: "<integer>";
    initial-value: 200;
    inherits: false;
  }

  @property --hue-end {
    syntax: "<integer>";
    initial-value: 320;
    inherits: false;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, sans-serif;
    padding: 40px;
    background: #0f0f23;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    gap: 40px;
  }

  .gradient-card {
    width: 250px;
    height: 250px;
    border-radius: 20px;
    background: conic-gradient(
      from var(--angle),
      hsl(var(--hue-start), 80%, 60%),
      hsl(var(--hue-end), 80%, 60%),
      hsl(var(--hue-start), 80%, 60%)
    );
    animation: spin-gradient 3s linear infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }

  @keyframes spin-gradient {
    from {
      --angle: 0deg;
      --hue-start: 200;
      --hue-end: 320;
    }
    to {
      --angle: 360deg;
      --hue-start: 320;
      --hue-end: 200;
    }
  }

  .info {
    color: #aaa;
    text-align: center;
    max-width: 400px;
    font-size: 0.9rem;
  }

  .info code {
    background: #1a1a3e;
    padding: 2px 6px;
    border-radius: 4px;
    color: #818cf8;
  }
</style>
</head>
<body>
  <div class="gradient-card">@property</div>
  <div class="info">
    Registered custom properties <code>--angle</code>, <code>--hue-start</code>, and <code>--hue-end</code> are animated in <code>@keyframes</code>, creating a rotating gradient that also shifts hues.
  </div>
</body>
</html>
```

**Output:** A card with a conic-gradient background that continuously rotates and shifts colors. The `--angle` rotates 0deg to 360deg, while `--hue-start` and `--hue-end` swap hue values.

**Explanation:** Three custom properties are registered: `--angle` (type `<angle>`), `--hue-start` and `--hue-end` (type `<integer>`). The `@keyframes` animation changes these values over time. Without `@property`, the browser would not know how to interpolate these CSS variables, and the animation would not work.

## 🏢 Real World Use Case
Complex animations that require interpolating custom properties (gradient rotations, color shifts, dynamic sizing), design systems with typed design tokens, and UI patterns requiring smooth transitions of custom property values.

## 🎯 Interview Questions
1. **Q:** What is the `@property` at-rule used for?  
   **A:** It registers a custom CSS property with a defined syntax, initial value, and inheritance behavior, enabling type checking and animation.

2. **Q:** What descriptors are required in `@property`?  
   **A:** `syntax`, `initial-value`, and `inherits`.

3. **Q:** Can you animate a regular (unregistered) CSS variable?  
   **A:** No. Only custom properties registered with `@property` can be animated or transitioned.

4. **Q:** What syntax values does `@property` support?  
   **A:** `"<length>"`, `"<number>"`, `"<percentage>"`, `"<length-percentage>"`, `"<color>"`, `"<angle>"`, `"<time>"`, `"<integer>"`, `"<string>"`, `"<url>"`, and combinations with `+` (space-separated) or `#` (comma-separated).

5. **Q:** What happens if you assign a value that does not match the registered `syntax`?  
   **A:** The browser treats the assignment as invalid and falls back to the `initial-value` (or the inherited value).

## ⚠ Common Errors / Mistakes
- Using `@property` without all three required descriptors (`syntax`, `initial-value`, `inherits`)
- Using a `syntax` string that does not match the animation target (e.g., using `"<length>"` for a percentage-based value)
- Expecting `@property` to work in browsers that do not support it (check CanIUse—supported in Chrome 85+, Firefox 128+, Safari 16.6+)
- Forgetting `inherits: false` when the property should not inherit, leading to unexpected behavior
- Using `@property` inside a selector block (it must be at the top level of the stylesheet)

## 📝 Practice Exercises
**Beginner:**
1. Register a custom property `--my-color` with `syntax: "<color>"`, `initial-value: red`, and `inherits: false`.
2. Use `var(--my-color)` as a background color and change it on hover with a transition.
3. Register `--my-size` with `syntax: "<length>"` and animate it on hover.

**Intermediate:**
4. Register `--rotation` as `<angle>` and create a `@keyframes` animation that rotates an element using `transform: rotate(var(--rotation))`.
5. Register `--opacity-value` as `<number>` between 0 and 1, and create a pulsing animation.
6. Build a card that transitions `--border-radius` from 0px to 50px (circle) on hover using a registered custom property.

**Advanced:**
7. Create an animated progress bar that uses a registered `<percentage>` custom property animated in `@keyframes`.
8. Build a fully animated gradient background that shifts through multiple colors using registered custom properties for hue, saturation, and lightness, all animated simultaneously.
