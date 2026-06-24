## 69. CSS Masking
## 📘 Introduction
CSS masking allows you to hide or reveal portions of an element using an image or gradient as a mask. The `mask-image` property works like a stencil—the alpha channel of the mask determines visibility. Combined with `clip-path`, gradient masks, and SVG masks, you can create sophisticated visual effects like fading edges, irregular cutouts, and textured reveals.

## 🧠 Key Concepts
- **mask-image** – Specifies the mask layer (image, gradient, or SVG)
- **mask-size** – Controls mask dimensions (like `background-size`)
- **mask-repeat** – Controls mask tiling (like `background-repeat`)
- **mask-position** – Controls mask alignment (like `background-position`)
- **clip-path** – Alternative masking using vector paths (cuts the element)
- **clip-path vs mask** – `clip-path` creates a hard-edged vector cut; `mask-image` uses alpha gradients for soft transitions
- **Gradient masks** – `linear-gradient()` or `radial-gradient()` as mask for fade effects
- **SVG masks** – Referencing a `<mask>` element in SVG for complex shapes

## 💻 Syntax
```css
/* Image mask */
.element {
  mask-image: url('mask.png');
  mask-size: cover;
  mask-repeat: no-repeat;
}

/* Gradient mask (fade out) */
.element {
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

/* Radial gradient mask */
.element {
  mask-image: radial-gradient(circle, black 60%, transparent 70%);
}

/* clip-path alternative */
.element {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

## ✅ Example 1 - Basic
**Problem:** Apply a gradient mask to fade an image out at the bottom, creating a seamless blending effect.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; }

  .demo {
    max-width: 600px;
    margin: 0 auto;
  }

  .demo h2 { margin-bottom: 16px; }

  .masked-image {
    width: 100%;
    height: 350px;
    background: url('https://via.placeholder.com/600x350/FF6B6B/fff?text=Masked+Image') center/cover no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    border-radius: 12px;
  }

  .masked-image:hover {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .caption { margin-top: 12px; font-style: italic; color: #666; }
</style>
</head>
<body>
  <div class="demo">
    <h2>Gradient Mask Fade</h2>
    <div class="masked-image"></div>
    <p class="caption">The image fades into the background at the bottom. Hover to remove the mask.</p>
  </div>
</body>
</html>
```

**Output:** An image that gradually fades from fully visible at the top to completely transparent at the bottom. Hovering reveals the full image.

**Explanation:** `mask-image: linear-gradient(to bottom, black 40%, transparent 100%)` uses the gradient's alpha channel—black (100% opacity) keeps the top visible, transparent (0% opacity) hides the bottom. The `-webkit-` prefix ensures Safari/Chrome support. On hover, `mask-image: none` removes the mask, showing the full image.

## 🚀 Example 2 - Intermediate
**Problem:** Create a text-reveal effect using a radial gradient mask, and compare `clip-path` polygon masking with image masking.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #1a1a2e; color: #fff; }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 { text-align: center; margin-bottom: 30px; font-size: 2rem; }

  .demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .card {
    background: #16213e;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
  }

  .card h3 { margin-bottom: 12px; color: #e94560; }

  .image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-radius: 12px;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Radial gradient mask — spotlight effect */
  .mask-spotlight img {
    -webkit-mask-image: radial-gradient(circle at 30% 50%, black 30%, transparent 60%);
    mask-image: radial-gradient(circle at 30% 50%, black 30%, transparent 60%);
    transition: -webkit-mask-image 0.5s ease, mask-image 0.5s ease;
  }

  .mask-spotlight:hover img {
    -webkit-mask-image: radial-gradient(circle at 70% 50%, black 30%, transparent 60%);
    mask-image: radial-gradient(circle at 70% 50%, black 30%, transparent 60%);
  }

  /* clip-path polygon */
  .mask-clip img {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    transition: clip-path 0.4s ease;
  }

  .mask-clip:hover img {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%);
  }

  /* Combined: gradient mask + clip-path */
  .mask-combo img {
    -webkit-mask-image: linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%);
    mask-image: linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%);
    clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
    transition: all 0.4s ease;
  }

  .mask-combo:hover img {
    -webkit-mask-image: none;
    mask-image: none;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
</style>
</head>
<body>
  <div class="container">
    <h1>CSS Masking Techniques</h1>
    <div class="demo-grid">
      <div class="card mask-spotlight">
        <h3>Radial Gradient Mask</h3>
        <div class="image-wrapper"><img src="https://via.placeholder.com/400x250/FF6B6B/fff?text=Spotlight" alt="Spotlight"></div>
        <p style="margin-top:10px; font-size:0.9rem; color:#aaa;">Hover moves the spotlight</p>
      </div>
      <div class="card mask-clip">
        <h3>clip-path Polygon</h3>
        <div class="image-wrapper"><img src="https://via.placeholder.com/400x250/4ECDC4/fff?text=Hexagon" alt="Hexagon"></div>
        <p style="margin-top:10px; font-size:0.9rem; color:#aaa;">Hover expands to full rect</p>
      </div>
      <div class="card mask-combo" style="grid-column: 1 / -1; max-width:500px; margin:0 auto;">
        <h3>Mask + Clip Combined</h3>
        <div class="image-wrapper"><img src="https://via.placeholder.com/400x250/45B7D1/fff?text=Combined" alt="Combined"></div>
        <p style="margin-top:10px; font-size:0.9rem; color:#aaa;">Both gradient fade and polygon cut; hover reveals all</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** Three cards demonstrate: (1) a spotlight effect using radial gradient mask that moves on hover, (2) a hexagonal polygon clip that expands on hover, and (3) a combined gradient mask with trapezoid clip that reveals fully on hover.

**Explanation:** The radial gradient mask uses `circle at X% Y%` to control which part of the image is visible. `clip-path: polygon(...)` creates a hexagonal shape—on hover it transitions to a full rectangle. The combo card layers both techniques: a horizontal gradient fade plus a trapezoid clip.

## 🏢 Real World Use Case
Image galleries with creative transitions, hero section fade-outs, onboarding illustrations, product teasers with spotlight effects, and interactive infographics that reveal data on hover.

## 🎯 Interview Questions
1. **Q:** What is the difference between `mask-image` and `clip-path`?  
   **A:** `mask-image` uses an image/gradient's alpha channel to control visibility (supports soft edges); `clip-path` uses a vector path for hard-edged clipping.

2. **Q:** Does `mask-image` affect the element's box model?  
   **A:** No. Similar to `clip-path`, masking only affects visual rendering—the element still occupies its original layout space.

3. **Q:** How do you apply a gradient mask that fades from left to right?  
   **A:** `mask-image: linear-gradient(to right, transparent, black);`

4. **Q:** What browser prefix is commonly needed for `mask-image`?  
   **A:** `-webkit-mask-image` is needed for Safari, Chrome, and some older browsers. Firefox supports the unprefixed version.

5. **Q:** Can you animate `mask-image`?  
   **A:** Yes, with `transition` or `@keyframes`. For gradient masks, you can animate `mask-position` or the gradient stops using custom properties.

## ⚠ Common Errors / Mistakes
- Using `mask-image` without browser prefixes (`-webkit-`) leading to missing effects in Safari/Chrome
- Using color values other than black/white/transparent in gradient masks—the alpha channel is what determines visibility
- Expecting `mask-image` to crop the layout box—it only affects visual rendering
- Confusing `mask` with `background`—they share similar sub-properties but affect different aspects
- Using overly complex SVG masks without fallback strategies for older browsers

## 📝 Practice Exercises
**Beginner:**
1. Apply `mask-image: linear-gradient(to right, black, transparent)` to an image to fade it out horizontally.
2. Use `-webkit-mask-image` for cross-browser compatibility.
3. Change the gradient direction to `to bottom left` and observe the fade effect.

**Intermediate:**
4. Create a spotlight effect using `radial-gradient(circle, black 30%, transparent 60%)` as a mask.
5. Use `clip-path: circle(40%)` to clip an image into a circle, then on hover expand to `circle(100%)`.
6. Build a before/after reveal where a gradient mask slides from left to right on hover to reveal a second image underneath.

**Advanced:**
7. Create a CSS-only parallax hero section where the foreground image uses a gradient mask and the background image scrolls at a different speed.
8. Build an interactive periodic table using SVG masks where each element tile uses a clip-path polygon and mask-image gradient for a glass-morphism look.
