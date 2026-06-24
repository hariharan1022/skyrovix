## 9. CSS Backgrounds
## 📘 Introduction
CSS backgrounds are used to define the background area of elements. You can set solid colors, images, gradients, and control their positioning, repetition, and sizing. Background properties are among the most commonly used in web design.

## 🧠 Key Concepts
- **background-color:** Sets a solid fill color.
- **background-image:** Sets an image using `url('path')`.
- **background-repeat:** Controls image tiling — `repeat`, `repeat-x`, `repeat-y`, `no-repeat`.
- **background-position:** Positions the image (e.g., `center`, `top right`, `50% 50%`).
- **background-size:** Sets image size — `auto`, `cover`, `contain`, specific values.
- **background-attachment:** Controls scrolling — `scroll`, `fixed`, `local`.
- **Shorthand:** `background: color image repeat position/size attachment;`
- **Gradients:** `linear-gradient()`, `radial-gradient()`, `conic-gradient()`.

## 💻 Syntax
```css
.element {
  background-color: #f0f0f0;
  background-image: url("bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  /* Shorthand */
  background: #f0f0f0 url("bg.png") no-repeat center/cover fixed;

  /* Gradient */
  background: linear-gradient(to right, red, blue);
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Set a solid background color and a non-repeating background image.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .card {
      background-color: #3498db;
      background-image: url("https://via.placeholder.com/150");
      background-repeat: no-repeat;
      background-position: right bottom;
      height: 200px;
      width: 300px;
      color: white;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="card">Card with background</div>
</body>
</html>
```
**Output:** A blue card with an image placed at the bottom-right corner, repeating disabled.
**Explanation:** `background-color` fills the card blue. The image sits at right bottom without repeating. The rest of the card shows the solid color.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a hero section with a gradient background and parallax effect.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%),
                  url("https://via.placeholder.com/1200x400") no-repeat center/cover;
      background-blend-mode: overlay;
      background-attachment: fixed;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2em;
    }
  </style>
</head>
<body>
  <div class="hero">Welcome to Our Site</div>
</body>
</html>
```
**Output:** A full-width hero section with gradient overlay on an image, fixed background for parallax scrolling effect.
**Explanation:** Multiple backgrounds are layered (gradient on top of image). `background-attachment: fixed` keeps the background stationary while content scrolls. `background-blend-mode: overlay` blends the gradient with the image.

## 🏢 Real World Use Case
A marketing website uses a full-screen hero background with a `linear-gradient` overlay on a header image for text readability. The `background-size: cover` ensures the image fills all screen sizes, and `background-position: center` keeps the focal point visible.

## 🎯 Interview Questions (5 with answers)
1. **What does `background-size: cover` do?** It scales the image to cover the entire element, possibly cropping parts of the image.
2. **What is the difference between `contain` and `cover`?** `contain` scales the image to fit entirely within the element (no cropping); `cover` fills the entire element (cropping may occur).
3. **How do you set multiple background images?** Separate them with commas: `background: url(img1.png), url(img2.png);`. The first is on top.
4. **What does `background-attachment: fixed` do?** The background remains fixed relative to the viewport while the element scrolls.
5. **How do you create a linear gradient?** `background: linear-gradient(direction, color1, color2);` e.g., `linear-gradient(to right, red, blue)`.

## ⚠ Common Errors / Mistakes
- Forgetting `url()` wrapper for `background-image` (e.g., `background-image: image.png;` instead of `url("image.png")`).
- Using shorthand `background` and accidentally omitting values, causing defaults.
- Not setting `background-size` and getting unexpected image tiling.
- Using `background: #fff url(...)` shorthand without proper ordering of values.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Set a solid background color of lightyellow on a div.
2. Add a background image that repeats horizontally.
3. Center a background image within a div.
4. Create a gradient background from top to bottom (blue to purple).
5. Use `background-size: cover` on a full-page hero section.
6. Layer two background images with different repeat settings.
7. Build a parallax scrolling page with three sections, each with a fixed background image.
8. Create a complex button style using a gradient background that changes on hover with a smooth transition.
