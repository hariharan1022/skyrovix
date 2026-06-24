# 57. CSS 2D Transforms

## 📘 Introduction
CSS 2D transforms modify the position, size, and shape of elements in two-dimensional space without affecting the document flow. They are essential for creating dynamic interfaces, hover effects, and spatial transitions.

## 🧠 Key Concepts
- **transform property**: Applies a 2D or 3D transformation to an element
- **translate()**: Moves an element along X and/or Y axes (takes one or two values)
- **translateX() / translateY()**: Moves along a single axis
- **rotate()**: Rotates an element around its transform-origin (degrees, radians, turns)
- **scale()**: Scales an element up or down (one value = uniform, two = separate axes)
- **scaleX() / scaleY()**: Scales along a single axis
- **skew()**: Slants an element along X and/or Y axes
- **skewX() / skewY()**: Skews along a single axis
- **transform-origin**: Defines the reference point for transformations (default center)
- **Multiple transforms**: Space-separated list applied right-to-left
- **matrix()**: Combines all 2D transforms into a single 6-value function

## 💻 Syntax

```css
/* Translate */
.translate {
  transform: translate(50px, 100px);       /* X: 50px, Y: 100px */
}
.translate-x {
  transform: translateX(40px);
}
.translate-y {
  transform: translateY(-20px);            /* Negative = up */
}

/* Rotate */
.rotate-deg {
  transform: rotate(45deg);               /* 45 degrees clockwise */
}
.rotate-rad {
  transform: rotate(1.57rad);             /* ~90 degrees in radians */
}
.rotate-turn {
  transform: rotate(0.25turn);            /* Quarter turn */
}

/* Scale */
.scale-uniform {
  transform: scale(1.5);                  /* 150% size */
}
.scale-axes {
  transform: scale(2, 0.5);               /* X: 2x, Y: 0.5x */
}

/* Skew */
.skew {
  transform: skew(10deg, 5deg);           /* X skew, Y skew */
}

/* Transform origin */
.origin-top-left {
  transform-origin: top left;
}

/* Multiple transforms */
.multiple {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* Matrix (a, b, c, d, tx, ty) */
.matrix-demo {
  transform: matrix(1, 0.5, 0, 1, 30, 30);
}
```

## ✅ Example 1 - Basic: Rotate and Scale on Hover

**Problem**: Create an image gallery thumbnail that zooms and rotates slightly on hover.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .gallery {
    display: flex;
    gap: 20px;
    justify-content: center;
    padding: 40px;
    background: #f0f0f0;
  }

  .thumb {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .thumb:hover {
    transform: scale(1.15) rotate(5deg);
  }

  .thumb:active {
    transform: scale(0.95);
  }

  body { margin: 0; }
</style>
</head>
<body>
<div class="gallery">
  <div class="thumb">Item 1</div>
  <div class="thumb">Item 2</div>
  <div class="thumb">Item 3</div>
</div>
</body>
</html>
```

**Output**: Three gradient squares appear. On hover, each scales to 115% size and rotates 5 degrees clockwise. On click (active), they shrink to 95%.

**Explanation**: The `transition` on `.thumb` interpolates the `transform` property smoothly. The space-separated `scale(1.15) rotate(5deg)` applies both transforms. Order matters—scale then rotate vs rotate then scale produce different visual results.

## 🚀 Example 2 - Intermediate: Interactive Business Card with Skew and Translate

**Problem**: Design a business card that reveals a skewed background pattern and slides content on hover.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .card {
    width: 340px;
    height: 200px;
    background: #2d3436;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    font-family: 'Segoe UI', Arial, sans-serif;
    transition: transform 0.4s ease;
  }

  .card:hover {
    transform: translateY(-8px);
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    transform: skewX(-15deg) translateX(-120%);
    transition: transform 0.5s ease;
    opacity: 0.8;
  }

  .card:hover .card-bg {
    transform: skewX(-15deg) translateX(-30%);
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 30px;
    color: #fff;
    transform: translateX(-20px);
    transition: transform 0.5s ease;
  }

  .card:hover .card-content {
    transform: translateX(10px);
  }

  .card h2 {
    margin: 0 0 6px;
    font-size: 24px;
  }

  .card p {
    margin: 0;
    opacity: 0.8;
    font-size: 14px;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #dfe6e9;
  }
</style>
</head>
<body>
<div class="card">
  <div class="card-bg"></div>
  <div class="card-content">
    <h2>Jane Doe</h2>
    <p>Senior Product Designer</p>
    <p>jane.doe@example.com</p>
  </div>
</div>
</body>
</html>
```

**Output**: A dark card lifts on hover (translateY). A purple skewed panel slides in from the left using `skewX` and `translateX`. The content text slides slightly right for a parallax feel.

**Explanation**: The background overlay uses `skewX(-15deg)` for the angled edge, offset by `translateX(-120%)` to hide off-screen. On hover, `translateX(-30%)` slides it into view while maintaining the skew. The card itself and content move independently for layered depth.

## 🏢 Real World Use Case
**Dashboard draggable widgets**: A project management tool uses `transform: translate()` with JavaScript `mousedown`/`mousemove` events to enable drag-and-drop kanban cards. Using `transform` instead of `top`/`left` avoids layout reflows, keeping 60fps performance even with dozens of cards.

## 🎯 Interview Questions

1. **Q**: How is `transform: translate()` different from using `position: relative` with `top`/`left`?
   **A**: `translate()` is a compositor-only property that does not trigger layout or paint, making it GPU-accelerated and more performant. `top`/`left` triggers layout recalculation.

2. **Q**: What is the default `transform-origin` value?
   **A**: `50% 50%` (the center of the element). For `rotate()`, the element rotates around its center.

3. **Q**: How do multiple transform values compose?
   **A**: They are applied right-to-left. For example, `transform: translateX(50px) rotate(45deg)` first rotates then translates (relative to the rotated axes).

4. **Q**: What are the six parameters of `matrix(a, b, c, d, tx, ty)`?
   **A**: `a` (scale X), `b` (skew Y), `c` (skew X), `d` (scale Y), `tx` (translate X), `ty` (translate Y). It is the linear algebra representation of all 2D transforms.

5. **Q**: Does `transform` affect the layout of surrounding elements?
   **A**: No. The element's original space is preserved in the document flow. Transforms are purely visual and do not affect other elements' positions.

## ⚠ Common Errors / Mistakes
- **Commas between transform functions**: Multiple transforms must be space-separated, not comma-separated. Correct: `transform: scale(1.5) rotate(45deg)`.
- **Forgetting units on `rotate()`**: `rotate(45)` is invalid. Use `deg`, `rad`, `grad`, or `turn`.
- **Assuming `scale()` flips layout**: `scale(-1, 1)` mirrors visually but does not affect document flow or text selection direction.
- **Applying transforms to inline elements**: Transforms do not work on inline elements unless they are `inline-block` or `inline-flex`.
- **Not considering transform order**: `translate(50px, 0) rotate(45deg)` moves then rotates around the new origin, while `rotate(45deg) translate(50px, 0)` translates along the rotated X axis (different result).

## 📝 Practice Exercises

### Beginner
1. Translate a square 100px to the right and 50px down using `transform: translate()`.
2. Rotate an image 90 degrees clockwise.
3. Scale a button to 1.2× its original size on hover with a smooth transition.

### Intermediate
4. Build a "wobble" effect on an icon using alternating `skewX()` values in a keyframe animation.
5. Create a card that on hover: lifts up (translateY), grows slightly (scale), and has a colored overlay that slides in from the right using translateX.
6. Use `transform-origin: top right` to make a door-like swing animation with `rotateY()` (hint: this previews 3D transforms—keep it in 2D by using `scaleX` from the right edge instead).

### Advanced
7. Recreate a 2D isometric grid using `skew()` and `rotate()` transforms on a set of div tiles, creating a pseudo-3D floor plane using only 2D transforms.
8. Build a draggable modal dialog that uses `transform: translate()` with JavaScript mouse events. Ensure the dialog stays within viewport bounds and uses `pointer-events: none` during drag to avoid text selection issues.
