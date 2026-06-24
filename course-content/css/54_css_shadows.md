# 54. CSS Shadows

## 📘 Introduction
CSS shadows add depth and dimension to elements. The two primary shadow properties—`box-shadow` and `text-shadow`—allow you to create realistic lighting effects, depth cues, and visual hierarchy without images.

## 🧠 Key Concepts
- **box-shadow**: Adds shadow to an element's box (frame)
- **text-shadow**: Adds shadow to text characters
- **drop-shadow() filter**: Shadows the actual alpha mask of an element (respects transparency)
- **Offset**: Horizontal (`offset-x`) and vertical (`offset-y`) displacement
- **Blur radius**: Softens the shadow edge (higher = softer)
- **Spread radius**: Expands/shrinks the shadow size (box-shadow only)
- **Inset shadow**: Shadow cast inside the element
- **Multiple shadows**: Comma-separated list for layered effects
- **Hover transitions**: Smooth shadow changes on interaction

## 💻 Syntax

```css
/* box-shadow syntax */
box-shadow: offset-x offset-y blur-radius spread-radius color inset;

/* text-shadow syntax */
text-shadow: offset-x offset-y blur-radius color;

/* drop-shadow filter */
filter: drop-shadow(offset-x offset-y blur-radius color);

/* Examples */
.shadow-simple {
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
}

.shadow-inset {
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
}

.shadow-multiple {
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2),
              0 0 15px rgba(0,0,255,0.1);
}

.text-glow {
  text-shadow: 0 0 10px #00f, 0 0 20px #00f;
}

.drop-shadow {
  filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.4));
}
```

## ✅ Example 1 - Basic: Box Shadow and Text Shadow

**Problem**: Create a card with a subtle shadow and heading with a soft text shadow.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .card {
    width: 280px;
    padding: 24px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 4px 4px 12px rgba(0,0,0,0.1),
                0 2px 4px rgba(0,0,0,0.06);
    font-family: Arial, sans-serif;
  }
  .card h2 {
    text-shadow: 1px 1px 2px rgba(0,0,0,0.15);
    color: #333;
  }
  .card p {
    color: #666;
    line-height: 1.5;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f0f2f5;
  }
</style>
</head>
<body>
<div class="card">
  <h2>Card Title</h2>
  <p>This card uses a subtle multi-layered box-shadow and the heading has a gentle text-shadow for improved readability.</p>
</div>
</body>
</html>
```

**Output**: A white card floating above the background with a soft, realistic shadow. The heading appears slightly raised above the card surface.

**Explanation**: The `box-shadow` uses two layers—a main offset shadow and a tighter shadow near the edges—to mimic natural light. The `text-shadow` with a small offset and low opacity adds subtle depth to the heading.

## 🚀 Example 2 - Intermediate: Hover Shadow Transition & 3D Effect

**Problem**: Create a button that lifts on hover with a deeper shadow, simulating a 3D press effect.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .btn-3d {
    padding: 14px 36px;
    border: none;
    border-radius: 8px;
    background: #6c5ce7;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 6px 0 #4834d4,
                0 8px 16px rgba(108,92,231,0.3);
    transition: all 0.2s ease;
    transform: translateY(0);
  }
  .btn-3d:hover {
    box-shadow: 0 2px 0 #4834d4,
                0 12px 24px rgba(108,92,231,0.4);
    transform: translateY(-4px);
  }
  .btn-3d:active {
    box-shadow: 0 2px 0 #4834d4,
                0 4px 8px rgba(108,92,231,0.2);
    transform: translateY(4px);
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f8f9fa;
  }
</style>
</head>
<body>
<button class="btn-3d">Hover Me</button>
</body>
</html>
```

**Output**: A purple button that appears to lift (moves up, shadow grows and softens) on hover and presses down (moves down, shadow shrinks) on click.

**Explanation**: Three states use different `box-shadow` values: default (solid bottom edge + soft glow), hover (lighter bottom + larger glow + upward translate), and active (smaller shadow + downward translate). The `transition` property smoothes the change.

## 🏢 Real World Use Case
**E-commerce product cards**: Product images use `filter: drop-shadow()` to cast accurate shadows around irregular shapes (e.g., shoes, bottles). Combined with `box-shadow` on the card container for a cohesive depth hierarchy that guides user attention to featured items.

## 🎯 Interview Questions

1. **Q**: What is the difference between `box-shadow` and `filter: drop-shadow()`?
   **A**: `box-shadow` draws a shadow of the element's bounding box (rectangular). `drop-shadow()` follows the actual alpha channel of the element, so transparent PNGs or elements with `border-radius` cast shadows matching their visible shape.

2. **Q**: What does the `inset` keyword do in `box-shadow`?
   **A**: It draws the shadow inside the element's border, creating a recessed/engraved effect. The shadow is clipped by the element's padding box.

3. **Q**: Can you layer multiple shadows on one element?
   **A**: Yes. Separate each shadow definition with a comma. They are painted front-to-back (first definition on top). This allows complex lighting effects.

4. **Q**: How does the `spread-radius` parameter affect `box-shadow`?
   **A**: Positive values expand the shadow equally in all directions; negative values shrink it. It does not exist for `text-shadow`.

5. **Q**: How do you animate a shadow smoothly?
   **A**: Use the `transition` property on the element, targeting `box-shadow` or `text-shadow` as the transition property. Note that changing from one multi-shadow set to another must have the same number of shadows for smooth interpolation.

## ⚠ Common Errors / Mistakes
- **Forgetting `rgba()` or `hsla()`**: Using opaque `black` creates harsh, unnatural shadows. Always use a color with transparency.
- **No `inset` keyword placement**: `inset` must come before or after the shadow values, not in the middle. Correct: `box-shadow: inset 0 0 5px #000`.
- **Mismatched shadow count on hover**: When transitioning between multiple shadows, both states must have the same number of shadow layers, or the transition will pop.
- **Assuming `drop-shadow()` handles `blur-radius` like `box-shadow`**: The 4th value in `drop-shadow()` is **not** spread radius (spread is unsupported in `drop-shadow()`).
- **Applying `text-shadow` to container instead of text**: `text-shadow` only applies to text nodes; placing it on a container with only images or other elements will show no shadow.

## 📝 Practice Exercises

### Beginner
1. Create a card with a 5px downward shadow, 10px blur, and semi-transparent black color.
2. Add a red text-shadow with 2px offset-x, 2px offset-y, and no blur to a heading.
3. Apply an inset box-shadow to a button so it appears pressed into the page.

### Intermediate
4. Build a "neon glow" effect for text using three layered text-shadows in cyan, blue, and purple.
5. Create an avatar image that uses `drop-shadow()` to cast a natural shadow around a circular profile picture.
6. Design a pricing card with a hard 3D shadow (no blur) on the bottom and right edges, simulating a thick paper stack.

### Advanced
7. Implement a full 3D button with four distinct shadow states: default, hover (lift), active (press), and disabled (flat with no shadow). Use only CSS.
8. Create a "morphing shadow" effect on a floating element where the shadow dynamically shifts position and color based on mouse movement using CSS custom properties and JavaScript event listeners (hint: update `--mouse-x` and `--mouse-y`).
