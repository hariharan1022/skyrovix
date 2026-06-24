# 58. CSS 3D Transforms

## 📘 Introduction
CSS 3D transforms extend 2D transformations into three-dimensional space, allowing elements to be rotated, positioned, and scaled along the Z axis. Combined with `perspective`, these transforms create immersive depth effects entirely in CSS.

## 🧠 Key Concepts
- **perspective**: Defines the distance from the viewer to the z=0 plane (creates depth)
- **perspective()**: A transform function applied to individual elements
- **perspective property**: Applied to a parent to create a shared 3D context for children
- **rotateX() / rotateY() / rotateZ()**: Rotation around each axis
- **translateZ()**: Moves element toward/away from the viewer
- **translate3d()**: Shorthand for translateX, translateY, translateZ
- **scaleZ()**: Scales along Z axis (affects calculated 3D depth)
- **scale3d()**: Shorthand for scaleX, scaleY, scaleZ
- **transform-style**: Controls whether children maintain their 3D positions (`preserve-3d` vs `flat`)
- **backface-visibility**: Hides the back of an element when rotated away
- **perspective-origin**: Changes the vanishing point position

## 💻 Syntax

```css
/* Perspective on parent */
.scene {
  perspective: 800px;
  perspective-origin: 50% 50%;
}

/* Individual transform perspective */
.perspective-func {
  transform: perspective(800px) rotateY(45deg);
}

/* 3D rotations */
.rotate-x { transform: rotateX(45deg); }
.rotate-y { transform: rotateY(45deg); }
.rotate-z { transform: rotateZ(45deg); }

/* 3D translations */
.translate-z { transform: translateZ(100px); }
.translate-3d { transform: translate3d(10px, 20px, 30px); }

/* 3D scaling */
.scale-z { transform: scaleZ(2) rotateX(45deg); }

/* Preserve 3D context */
.card-container {
  perspective: 1000px;
}
.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

/* Backface visibility */
.card-back {
  backface-visibility: hidden;
}

/* Full 3D flip */
.card.flipped {
  transform: rotateY(180deg);
}
```

## ✅ Example 1 - Basic: 3D Rotating Card

**Problem**: Create a card that rotates to reveal a back face.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .scene {
    perspective: 1000px;
    width: 260px;
    height: 360px;
    margin: 60px auto;
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  .card-front {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }

  .card-back {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    transform: rotateY(180deg);
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #1a1a2e;
  }
</style>
</head>
<body>
<div class="scene">
  <div class="card">
    <div class="card-face card-front">Front</div>
    <div class="card-face card-back">Back</div>
  </div>
</div>
</body>
</html>
```

**Output**: A gradient card shows "Front". On hover, it flips 180° around the Y axis to reveal the "Back" side with a different gradient.

**Explanation**: `.scene` provides `perspective: 1000px` for depth. `.card` uses `transform-style: preserve-3d` so children maintain their 3D positions. Each face has `backface-visibility: hidden` so they disappear when rotated away. The back face starts at `rotateY(180deg)` so it is hidden until the card flips.

## 🚀 Example 2 - Intermediate: 3D Cube with Perspective-Origin

**Problem**: Build a 3D cube that rotates on all axes, with adjustable vanishing point.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .scene {
    perspective: 900px;
    perspective-origin: 50% 50%;
    width: 200px;
    height: 200px;
    margin: 100px auto;
  }

  .cube {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    animation: spin 8s infinite linear;
  }

  .face {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    opacity: 0.9;
  }

  .front  { background: #e74c3c; transform: translateZ(100px); }
  .back   { background: #8e44ad; transform: rotateY(180deg) translateZ(100px); }
  .right  { background: #27ae60; transform: rotateY(90deg) translateZ(100px); }
  .left   { background: #f39c12; transform: rotateY(-90deg) translateZ(100px); }
  .top    { background: #3498db; transform: rotateX(90deg) translateZ(100px); }
  .bottom { background: #1abc9c; transform: rotateX(-90deg) translateZ(100px); }

  @keyframes spin {
    0%   { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  body {
    background: #2c3e50;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>
</head>
<body>
<div class="scene">
  <div class="cube">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
    <div class="face right">Right</div>
    <div class="face left">Left</div>
    <div class="face top">Top</div>
    <div class="face bottom">Bottom</div>
  </div>
</div>
</body>
</html>
```

**Output**: A six-faced colored cube rotates continuously in 3D space. Each face is positioned 100px from the cube center using `translateZ` after the appropriate rotation.

**Explanation**: Each face is rotated to face outward, then translated 100px along its local Z axis. The `translateZ(100px)` value equals half the cube's 200px size. The parent `perspective-origin` controls the vanishing point. Without `perspective`, the cube would appear flat.

## 🏢 Real World Use Case
**Product showcase carousel**: An e-commerce site uses a 3D carousel (a rotating cylinder of product cards) built with `rotateY()` and `translateZ()` on each card. Users drag to rotate the carousel, and `backface-visibility: hidden` prevents cards from showing reversed content when facing away.

## 🎯 Interview Questions

1. **Q**: What is the difference between setting `perspective` as a property on a parent vs using `perspective()` as a transform function?
   **A**: The `perspective` property on a parent creates a shared vanishing point for all children. `perspective()` as a transform function applies perspective to a single element, and each element gets its own vanishing point (usually producing less realistic results).

2. **Q**: What does `transform-style: preserve-3d` do?
   **A**: It allows children of a transformed element to exist in three-dimensional space relative to their parent. Without it (or with `flat`), children are flattened into the parent's 2D plane.

3. **Q**: When would you use `backface-visibility: hidden`?
   **A**: In card-flip patterns to hide the reverse side when it is rotated away (preventing mirrored content from showing through), and for performance optimization by avoiding painting invisible elements.

4. **Q**: What is `perspective-origin` and how does it affect the scene?
   **A**: It sets the vanishing point position (default is `50% 50%`, center). Changing it to `left` or `right` shifts the perspective, similar to moving your head left or right while looking at a 3D object.

5. **Q**: How do `translateZ()` values interact with `perspective`?
   **A**: Positive `translateZ()` moves the element toward the viewer (appears larger), negative moves away (appears smaller). When `translateZ()` exceeds the perspective value, the element moves past the viewer and disappears.

## ⚠ Common Errors / Mistakes
- **Applying `perspective` to the wrong element**: Perspective must be on the parent, not the element being transformed (unless using the `perspective()` function).
- **Forgetting `transform-style: preserve-3d`**: Without it, child elements collapse to the parent's plane and lose 3D positioning.
- **Applying `backface-visibility` to the parent instead of children**: It must be set on each face element (child), not the rotating container.
- **Incorrect face positioning**: Each face needs a rotation (to face outward) followed by `translateZ()` (half the cube/dimension size). The order of rotation then translation is critical.
- **Not resetting stacking context**: Elements with `transform` create a new stacking context, which can affect z-index behavior.

## 📝 Practice Exercises

### Beginner
1. Create a 3D card that flips horizontally (rotateY) on click using a CSS class toggle.
2. Add `perspective: 600px` to a container and observe how close/far the element appears when rotating.
3. Use `backface-visibility: hidden` to hide the back of a single div that rotates 180 degrees.

### Intermediate
4. Build a 3D photo cube (6 sides) with images on each face instead of solid colors.
5. Create a "pop-out" hover effect where a card on hover uses `translateZ(80px)` to come toward the viewer, with a subtle `rotateY(-5deg)` for polish.
6. Implement a 3D pyramid with 4 triangular faces using `clip-path` combined with 3D transforms.

### Advanced
7. Build an interactive 3D carousel with 8 cards arranged in a cylinder (`rotateY(n * 45deg) translateZ(radius)`). Add mouse-drag rotation using JavaScript that maps `mousemove` delta to `rotateY` on the container.
8. Create a full 3D scene with multiple objects (cube + floor plane + sphere made from a subdivided circle) using only CSS transforms and a shared perspective-origin that responds to mouse position for a parallax depth effect.
