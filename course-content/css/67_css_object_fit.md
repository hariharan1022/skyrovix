## 67. CSS Object-fit
## 📘 Introduction
The `object-fit` property controls how a replaced element (like `<img>` or `<video>)` fills its container. It is essential for maintaining aspect ratios, creating uniform thumbnails, and building responsive media layouts. Without `object-fit`, images stretch or squash when dimensions don't match.

## 🧠 Key Concepts
- **object-fit: fill** – Default; stretches to fill container (aspect ratio may distort)
- **object-fit: contain** – Fits within container preserving aspect ratio (may leave letterboxing)
- **object-fit: cover** – Covers entire container, cropping overflow (preserves aspect ratio)
- **object-fit: none** – Shows original size, clipped if larger than container
- **object-fit: scale-down** – Chooses the smaller of `none` and `contain`
- **object-position** – Aligns the content within the box (used with `object-fit`)
- **aspect-ratio** – Sets a preferred aspect ratio for the container
- **Image containers** – Wrapper elements that enforce dimensions

## 💻 Syntax
```css
/* Cover: fills container, crops excess */
.card-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

/* Contain: shows entire image, may have bars */
.gallery-image {
  width: 300px;
  height: 200px;
  object-fit: contain;
  background: #eee;
}

/* Scale-down: uses smaller of none vs contain */
.logo {
  width: 200px;
  height: 100px;
  object-fit: scale-down;
}

/* Combined with object-position */
.focal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: 20% 80%;
}
```

## ✅ Example 1 - Basic
**Problem:** Display five images in identical containers, each using a different `object-fit` value to demonstrate the differences.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  .demo-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .demo-card {
    width: 250px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .demo-card .img-container {
    width: 250px;
    height: 180px;
    background: #ddd;
    overflow: hidden;
  }

  .demo-card .img-container img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .demo-card .card-body {
    padding: 12px 16px;
  }

  .demo-card .card-body h3 {
    font-size: 1rem;
    margin-bottom: 4px;
  }
  .demo-card .card-body p {
    font-size: 0.85rem;
    color: #666;
  }

  .fill img { object-fit: fill; }
  .contain img { object-fit: contain; }
  .cover img { object-fit: cover; }
  .none img { object-fit: none; }
  .scale-down img { object-fit: scale-down; }
</style>
</head>
<body>
  <h2>object-fit Comparison</h2>
  <div class="demo-grid">
    <div class="demo-card fill">
      <div class="img-container"><img src="https://via.placeholder.com/300x200/FF6B6B/fff?text=300x200" alt="Fill"></div>
      <div class="card-body"><h3>fill</h3><p>Stretched to fill—may distort</p></div>
    </div>
    <div class="demo-card contain">
      <div class="img-container"><img src="https://via.placeholder.com/300x200/4ECDC4/fff?text=300x200" alt="Contain"></div>
      <div class="card-body"><h3>contain</h3><p>Fits inside—may have bars</p></div>
    </div>
    <div class="demo-card cover">
      <div class="img-container"><img src="https://via.placeholder.com/300x200/45B7D1/fff?text=300x200" alt="Cover"></div>
      <div class="card-body"><h3>cover</h3><p>Covers container—may crop</p></div>
    </div>
    <div class="demo-card none">
      <div class="img-container"><img src="https://via.placeholder.com/300x200/FFA07A/fff?text=300x200" alt="None"></div>
      <div class="card-body"><h3>none</h3><p>Original size—may overflow</p></div>
    </div>
    <div class="demo-card scale-down">
      <div class="img-container"><img src="https://via.placeholder.com/300x200/98D8C8/fff?text=300x200" alt="Scale-down"></div>
      <div class="card-body"><h3>scale-down</h3><p>Smallest of none/contain</p></div>
    </div>
  </div>
</body>
</html>
```

**Output:** Five cards each showing the same image with a different `object-fit` value, demonstrating fill (distorted), contain (bars), cover (cropped), none (clipped), and scale-down (contained).

**Explanation:** All images have `width: 100%; height: 100%` in a 250×180px container. The `object-fit` value changes how the 300×200px source image is resized. `fill` ignores aspect ratio, `contain` ensures the whole image is visible, `cover` fills the area, `none` uses original dimensions, and `scale-down` picks the smaller option.

## 🚀 Example 2 - Intermediate
**Problem:** Build a responsive product grid with uniform cards where images with varying aspect ratios are consistently sized using `object-fit: cover`.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f8f9fa; }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .product-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .product-card .img-wrapper {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #eee;
  }

  .product-card .img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .product-card:hover .img-wrapper img {
    transform: scale(1.08);
  }

  .product-card .info {
    padding: 16px;
  }

  .product-card .info h3 {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  .product-card .info .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e74c3c;
  }

  .product-card .info .desc {
    font-size: 0.85rem;
    color: #777;
    margin-top: 6px;
  }
</style>
</head>
<body>
  <h2 style="text-align:center; margin-bottom:30px;">Product Grid</h2>
  <div class="product-grid">
    <div class="product-card">
      <div class="img-wrapper">
        <img src="https://via.placeholder.com/400x300/FF6B6B/fff?text=Product+A" alt="Product A">
      </div>
      <div class="info">
        <h3>Product A</h3>
        <span class="price">$29.99</span>
        <p class="desc">A wonderful item with great features.</p>
      </div>
    </div>
    <div class="product-card">
      <div class="img-wrapper">
        <img src="https://via.placeholder.com/300x300/4ECDC4/fff?text=Product+B" alt="Product B">
      </div>
      <div class="info">
        <h3>Product B</h3>
        <span class="price">$49.99</span>
        <p class="desc">Square image cropped to 4:3 area.</p>
      </div>
    </div>
    <div class="product-card">
      <div class="img-wrapper">
        <img src="https://via.placeholder.com/500x250/45B7D1/fff?text=Product+C" alt="Product C">
      </div>
      <div class="info">
        <h3>Product C</h3>
        <span class="price">$39.99</span>
        <p class="desc">Wide panorama perfectly cropped.</p>
      </div>
    </div>
    <div class="product-card">
      <div class="img-wrapper">
        <img src="https://via.placeholder.com/350x400/FFA07A/fff?text=Product+D" alt="Product D">
      </div>
      <div class="info">
        <h3>Product D</h3>
        <span class="price">$59.99</span>
        <p class="desc">Tall image—cover crops top/bottom.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A responsive grid of product cards. Each card has a 4:3 image area using `object-fit: cover`, so images with different source aspect ratios all visually fill the space uniformly. Hover triggers a subtle zoom.

**Explanation:** `aspect-ratio: 4 / 3` on the wrapper creates a consistent container regardless of image dimensions. `object-fit: cover` ensures all images fill the area, cropping as needed. The `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))` makes the layout responsive.

## 🏢 Real World Use Case
E-commerce product listings, portfolio grids, news article thumbnails, video gallery pages, and social media feeds all use `object-fit: cover` to maintain visual consistency with mixed-origin media.

## 🎯 Interview Questions
1. **Q:** What does `object-fit: cover` do?  
   **A:** It scales the image to cover the entire container while preserving aspect ratio, cropping any overflow.

2. **Q:** How is `object-fit` different from `background-size`?  
   **A:** `object-fit` applies to replaced elements (`<img>`, `<video>`) inside their content box; `background-size` applies to background images on any element.

3. **Q:** What does `object-fit: scale-down` do?  
   **A:** It selects the smaller visual result between `none` and `contain`, showing the image at its natural size if it fits or scaling down if needed.

4. **Q:** What property pairs with `object-fit` to control alignment?  
   **A:** `object-position` (e.g., `object-position: top left` or `object-position: 50% 50%`).

5. **Q:** Does `object-fit` work on `<video>` elements?  
   **A:** Yes, `object-fit` works on all replaced elements, including `<video>`, `<iframe>`, and `<embed>`.

## ⚠ Common Errors / Mistakes
- Expecting `object-fit` to work without explicit `width` and `height` on the element
- Using `object-fit` on a container element instead of the `<img>` itself
- Forgetting that `object-fit: fill` is the default, causing distorted images when container aspect ratio differs
- Not setting `height: 100%` on the image when the container has a fixed height
- Confusing `object-fit` with `background-size` or `background-repeat`

## 📝 Practice Exercises
**Beginner:**
1. Create a 300×200 image container and apply `object-fit: cover` to an image with a different aspect ratio.
2. Change to `object-fit: contain` and add a light gray background to see the letterboxing.
3. Use `object-fit: none` to show the original image clipped by the container.

**Intermediate:**
4. Build a responsive card grid where each card has a fixed-height image area (200px) using `object-fit: cover`.
5. Add a `hover` effect that transitions `object-fit` from `cover` to `contain` (or use zoom via `transform`).
6. Create a video gallery with `object-fit: cover` on `<video>` thumbnails and a play button overlay.

**Advanced:**
7. Build an image comparison slider where two images are overlaid and a draggable divider reveals each using `object-fit: cover` and `clip-path`.
8. Create a CSS-only slideshow that transitions between images using `object-fit: cover` and `@keyframes` with `object-position` to create a Ken Burns pan/zoom effect.
