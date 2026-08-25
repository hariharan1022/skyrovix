## 49. CSS Rounded Corners

## 📘 Introduction
CSS `border-radius` creates rounded corners on elements, softening the rigid boxes of web design. It supports uniform rounding, individual corner control, and elliptical (asymmetric) radii. Rounded corners are fundamental to modern UI design — used in buttons, cards, modals, avatars, and badges. Mastery of `border-radius` enables everything from subtle button rounding to perfect circles.

## 🧠 Key Concepts
- **`border-radius` shorthand**: Accepts 1-4 values for all corners, or slash-separated syntax for elliptical corners
- **Individual corners**: `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, `border-bottom-left-radius`
- **Two-value syntax**: `border-radius: 10px 20px` — top-left/bottom-right, top-right/bottom-left
- **Four-value syntax**: `border-radius: 10px 20px 30px 40px` — top-left, top-right, bottom-right, bottom-left
- **Elliptical corners**: Slash syntax `border-radius: 10px / 20px` — horizontal / vertical radii
- **Pill shape / Capsule**: `border-radius: 9999px` or `border-radius: 50vh` on a rectangular element
- **Perfect circle**: `border-radius: 50%` on a square element (equal width and height)
- **Percentage values**: Radius is relative to the element's dimensions; `50%` creates a circle/ellipse

## 💻 Syntax

```css
/* Uniform rounding */
.radius-1 { border-radius: 5px; }
.radius-2 { border-radius: 10px; }

/* Two values: top-left+bottom-right, top-right+bottom-left */
.radius-two { border-radius: 10px 20px; }

/* Four values: top-left, top-right, bottom-right, bottom-left */
.radius-four { border-radius: 10px 20px 30px 40px; }

/* Elliptical corners - horizontal / vertical */
.elliptical { border-radius: 20px / 40px; }

/* Four horizontal, four vertical */
.elliptical-all { border-radius: 10px 20px 30px 40px / 15px 25px 35px 45px; }

/* Individual corners */
.corner-tl { border-top-left-radius: 15px; }
.corner-tr { border-top-right-radius: 15px; }
.corner-br { border-bottom-right-radius: 15px; }
.corner-bl { border-bottom-left-radius: 15px; }

/* Pill shape */
.pill { border-radius: 9999px; }

/* Circle */
.circle { border-radius: 50%; }
```

## ✅ Example 1 - Basic

**Problem:** Create a set of UI elements (button, card, avatar, badge, input) with appropriate border-radius values for each component.

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
    max-width: 600px;
    background: #f0f2f5;
  }
  .card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  .btn-pill {
    border-radius: 50px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: bold;
    background: #e74c3c;
    color: #fff;
    border-radius: 4px;  /* subtle */
  }
  .badge-pill {
    border-radius: 10px;
  }
  .input-field {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    width: 100%;
    outline: none;
  }
  .input-field:focus {
    border-color: #3498db;
  }
</style>
</head>
<body>
  <div class="card">
    <img src="https://placehold.co/600x200" alt="placeholder">
    <h2>Card Title</h2>
    <p>This card uses border-radius: 12px on the container, 8px on the image.</p>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <div class="avatar">JD</div>
      <div>
        <strong>John Doe</strong>
        <div><span class="badge">New</span> <span class="badge badge-pill">Featured</span></div>
      </div>
    </div>
  </div>
  <div>
    <button class="btn">Default Button</button>
    <button class="btn btn-pill">Pill Button</button>
  </div>
  <input class="input-field" placeholder="Rounded input field">
</body>
</html>
```

**Output:** A card with 12px rounded corners, an image with 8px rounding, a circular avatar (50%), a default button with 8px rounding, a pill-shaped button (50px), subtle badge rounding (4px), a pill badge (10px), and an input with 6px rounding.

**Explanation:** Each component uses a border-radius appropriate to its role. Cards use moderate rounding (12px). Buttons use 8px for default or 50px for pill shapes. Avatars use 50% for perfect circles. Badges use minimal rounding (4px) or pill shapes (10px). The variety demonstrates that border-radius should be intentional and context-appropriate.

## 🚀 Example 2 - Intermediate

**Problem:** Create decorative UI elements using elliptical corners, asymmetric rounding, and percentage-based radii.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
    background: #1a1a2e;
  }
  .demo-box {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
  }
  /* Elliptical corners using slash syntax */
  .ellipse {
    background: #e74c3c;
    border-radius: 75px / 35px;
  }
  /* Only two opposite corners rounded */
  .opposite {
    background: #3498db;
    border-radius: 40px 0;
  }
  /* Diagonal rounding - each corner different */
  .diagonal {
    background: #2ecc71;
    border-radius: 60px 10px 60px 10px;
  }
  /* Leaf shape - different horizontal and vertical */
  .leaf {
    background: #9b59b6;
    border-radius: 0 80px 80px 0;
  }
  /* Squircle effect */
  .squircle {
    background: #f39c12;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  /* Blob shape */
  .blob {
    background: #1abc9c;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  /* Pill with elliptical ends */
  .pill-ellipse {
    background: #e67e22;
    width: 100%;
    height: 60px;
    border-radius: 9999px / 30px;
  }
</style>
</head>
<body>
  <div class="demo-box ellipse">Elliptical<br>75px/35px</div>
  <div class="demo-box opposite">Opposite<br>40px 0</div>
  <div class="demo-box diagonal">Diagonal<br>60 10 60 10</div>
  <div class="demo-box leaf">Leaf Shape</div>
  <div class="demo-box squircle">Squircle</div>
  <div class="demo-box blob">Blob Shape</div>
  <div class="pill-ellipse demo-box" style="width: 100%">Full-width pill</div>
</body>
</html>
```

**Output:** Six 180px boxes with different border-radius treatments: elliptical smoothing, opposite-corner rounding, diagonal pattern, leaf-like shape, organic squircle, and irregular blob shape. Each demonstrates a different creative use of border-radius.

**Explanation:** The slash syntax (`horizontal / vertical`) creates elliptical corners. Four-value syntax allows completely asymmetric shapes. When horizontal and vertical radii use percentage values independently, organic "blob" shapes emerge. These techniques are used for modern organic UI design, product badges, and decorative backgrounds.

## 🏢 Real World Use Case
**Design systems** (e.g., Material Design 3, Ant Design, Shadcn/UI) define a border-radius scale as design tokens: `--radius-none: 0; --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-xl: 16px; --radius-full: 9999px;`. These tokens are applied consistently across all components. Apple's design language uses a "squircle" (squared circle) corner style for app icons, approximated in CSS as `border-radius: 22% / 22%`. Social media platforms use `border-radius: 50%` for circular profile pictures and `border-radius: 9999px` for notification badges.

## 🎯 Interview Questions

**1. What does `border-radius: 50%` do on a square vs a rectangle?**
On a square, `50%` creates a perfect circle. On a rectangle, `50%` creates an ellipse (oval). For a perfect circle, both width and height must be equal.

**2. How do you create a pill-shaped (capsule) button?**
Use `border-radius: 9999px` or `border-radius: 50vh`. The value must be larger than half the element's height. Any sufficiently large value produces the same result.

**3. What is the difference between `border-radius: 10px 20px` and `border-radius: 10px / 20px`?**
`border-radius: 10px 20px` sets two values — top-left+bottom-right (10px) and top-right+bottom-left (20px). `border-radius: 10px / 20px` sets elliptical corners with 10px horizontal radius and 20px vertical radius.

**4. How does border-radius interact with overflow: hidden?**
When an element has both `border-radius` and `overflow: hidden`, the child content is clipped to the rounded shape. This is commonly used for rounded images and cards with background colors.

**5. Can border-radius be animated or transitioned?**
Yes. `border-radius` is an animatable property. You can transition between different radius values for hover effects, though performance is generally good since it does not trigger layout or paint changes.

## ⚠ Common Errors / Mistakes
- Expecting `border-radius: 50%` to create a circle on a non-square element — it creates an ellipse
- Forgetting `overflow: hidden` when child elements overflow the rounded parent's corners
- Using `border-radius` on `<img>` without setting `object-fit` — the image maintains its aspect ratio but the corner clip may look odd
- Applying `border-radius` to inline elements without `display: inline-block` — border-radius has no effect on inline elements
- Setting `border-radius` too small to be visible — especially on small screens, test rounding at all sizes
- Using `border-radius: 50%` on an `<img>` that is not square — results in an elliptical avatar

## 📝 Practice Exercises

**Beginner:**
1. Create a perfect circle 100px in diameter with a blue background. Add text centered inside it.
2. Build a custom button with rounded corners of 8px. Style a second version as a pill using 9999px.
3. Create a card component with 16px top corners and 0px bottom corners. Add appropriate content inside.

**Intermediate:**
4. Design a set of 4 product badges with different shapes: circular, pill, rounded-square, and teardrop (using elliptical corners). Each should be compact and visually distinct.
5. Build a testimonial card with an elliptical profile image (not a perfect circle), rounded quote block, and a pill-shaped "Read More" link.
6. Create a "squircle" avatar container (square with smoothly rounded corners, not a circle) that maintains its shape at any size using percentage-based border-radius.

**Advanced:**
7. Build a CSS art piece — a simple icon or logo composed entirely of colored divs using different border-radius values. Examples: a cloud icon, a chat bubble, a flower, or an abstract geometric pattern.
8. Implement a responsive card layout where each card has a dynamically animated border-radius that morphs between different shapes (circle → square → pill → blob) on hover, controlled by CSS transitions on the `border-radius` property with different timing functions per corner.
