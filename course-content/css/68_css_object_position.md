## 68. CSS Object-position
## 📘 Introduction
The `object-position` property works together with `object-fit` to control how the content of a replaced element (like `<img>` or `<video>`) is positioned within its box. While `object-fit` determines *how* it fits, `object-position` determines *where* it sits—ideal for framing focal points in cropped images.

## 🧠 Key Concepts
- **object-position** – Aligns replaced element content within its container
- **Values** – Keywords (`top`, `bottom`, `left`, `right`, `center`), lengths (`px`, `em`), percentages (`%`)
- **Two-value syntax** – First value is horizontal position, second is vertical (e.g., `20% 80%`)
- **Combined with object-fit** – Most useful when `object-fit` is not `fill`
- **Focal point control** – Ensures the important part of an image stays visible when cropped
- **Responsive positioning** – Percentage values adapt to container dimensions

## 💻 Syntax
```css
/* Keyword values */
img {
  object-fit: cover;
  object-position: top center;
}

/* Percentage values */
img {
  object-fit: cover;
  object-position: 25% 75%;
}

/* Length values */
img {
  object-fit: contain;
  object-position: 20px 30px;
}

/* Center (default) */
img {
  object-fit: cover;
  object-position: 50% 50%;
}
```

## ✅ Example 1 - Basic
**Problem:** Display the same image in five containers with different `object-position` values to show how the focal point shifts.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .card {
    width: 220px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .card .img-box {
    width: 220px;
    height: 180px;
    background: #ddd;
  }

  .card .img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card .label {
    padding: 10px 14px;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .pos-center img { object-position: 50% 50%; }
  .pos-top img { object-position: 50% 0%; }
  .pos-bottom img { object-position: 50% 100%; }
  .pos-left img { object-position: 0% 50%; }
  .pos-right img { object-position: 100% 50%; }
</style>
</head>
<body>
  <h2 style="text-align:center; margin-bottom:30px;">object-position Values</h2>
  <div class="grid">
    <div class="card">
      <div class="img-box pos-center"><img src="https://via.placeholder.com/400x300/FF6B6B/fff?text=Center" alt="Center"></div>
      <div class="label">center (50% 50%)</div>
    </div>
    <div class="card">
      <div class="img-box pos-top"><img src="https://via.placeholder.com/400x300/4ECDC4/fff?text=Top" alt="Top"></div>
      <div class="label">top (50% 0%)</div>
    </div>
    <div class="card">
      <div class="img-box pos-bottom"><img src="https://via.placeholder.com/400x300/45B7D1/fff?text=Bottom" alt="Bottom"></div>
      <div class="label">bottom (50% 100%)</div>
    </div>
    <div class="card">
      <div class="img-box pos-left"><img src="https://via.placeholder.com/400x300/FFA07A/fff?text=Left" alt="Left"></div>
      <div class="label">left (0% 50%)</div>
    </div>
    <div class="card">
      <div class="img-box pos-right"><img src="https://via.placeholder.com/400x300/98D8C8/fff?text=Right" alt="Right"></div>
      <div class="label">right (100% 50%)</div>
    </div>
  </div>
</body>
</html>
```

**Output:** Five identical cards showing the same image cropped to a 220×180 area. Each card aligns the visible portion differently: center, top, bottom, left, and right.

**Explanation:** With `object-fit: cover`, the image fills the 220×180 box, cropping the excess. `object-position` shifts which part of the image is visible within that box. `50% 50%` centers, `50% 0%` aligns to the top, `100% 50%` aligns to the right edge, etc.

## 🚀 Example 2 - Intermediate
**Problem:** Build a profile card where a portrait photo is cropped to a square but the face stays centered regardless of image composition, and an interactive gallery where clicking repositions the focal point.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .profile-card {
    max-width: 350px;
    margin: 0 auto 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    text-align: center;
    padding: 30px;
  }

  .profile-card .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 16px;
    overflow: hidden;
    border: 4px solid #667eea;
  }

  .profile-card .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
    display: block;
  }

  .profile-card h2 { margin-bottom: 4px; }
  .profile-card .title { color: #888; font-size: 0.9rem; }

  .gallery-demo {
    max-width: 600px;
    margin: 0 auto;
  }

  .gallery-demo h3 { margin-bottom: 12px; }

  .focal-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .focal-grid .thumb {
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border-color 0.2s;
  }

  .focal-grid .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: object-position 0.4s ease;
  }

  .focal-grid .thumb:hover img { object-position: center center; }
  .focal-grid .thumb:not(:hover) img { object-position: var(--pos, 50% 50%); }
</style>
</head>
<body>
  <div class="profile-card">
    <div class="avatar">
      <img src="https://via.placeholder.com/300x400/667EEA/fff?text=Photo" alt="Profile Photo">
    </div>
    <h2>Jane Smith</h2>
    <p class="title">UX Designer</p>
    <p style="margin-top:12px; color:#555;">object-position: 50% 20% keeps the face centered in the circle.</p>
  </div>

  <div class="gallery-demo">
    <h3>Hover to re-center focal point</h3>
    <div class="focal-grid">
      <div class="thumb" style="--pos: 0% 0%;">
        <img src="https://via.placeholder.com/300x200/FF6B6B" alt="Image 1" style="object-position: 0% 0%;">
      </div>
      <div class="thumb" style="--pos: 100% 0%;">
        <img src="https://via.placeholder.com/300x200/4ECDC4" alt="Image 2" style="object-position: 100% 0%;">
      </div>
      <div class="thumb" style="--pos: 0% 100%;">
        <img src="https://via.placeholder.com/300x200/45B7D1" alt="Image 3" style="object-position: 0% 100%;">
      </div>
      <div class="thumb" style="--pos: 100% 100%;">
        <img src="https://via.placeholder.com/300x200/FFA07A" alt="Image 4" style="object-position: 100% 100%;">
      </div>
    </div>
    <p style="margin-top:8px; font-size:0.9rem; color:#777;">Thumbnails show offset positioning; hover resets to center.</p>
  </div>
</body>
</html>
```

**Output:** A circular profile avatar crops a tall portrait to a square while keeping the face visible (top 20% position). Below, a gallery of thumbnails demonstrates custom offsets that snap to center on hover.

**Explanation:** The profile avatar uses `object-position: 50% 20%` to shift the visible area upward, essential for portrait photos where the face is in the upper portion. The gallery uses `object-position` set via inline styles with a `transition` so the focal point smoothly moves to center on hover.

## 🏢 Real World Use Case
Profile photos (cropping to square/circle while keeping faces centered), product images with specific features to highlight, responsive hero banners, video thumbnails, and any layout using `object-fit: cover` that needs focal point control.

## 🎯 Interview Questions
1. **Q:** What is the default value of `object-position`?  
   **A:** `50% 50%` (center), which positions the replaced element's content in the center of its box.

2. **Q:** How does `object-position` interact with `object-fit`?  
   **A:** `object-position` controls alignment only when the content is smaller than the container (contain/scale-down) or when it overflows (cover/none).

3. **Q:** What does `object-position: 0% 0%` do?  
   **A:** It aligns the top-left corner of the content with the top-left corner of the container.

4. **Q:** Can `object-position` be animated?  
   **A:** Yes, `object-position` is an animatable property and can be transitioned for smooth focal-point shifts.

5. **Q:** How is `object-position` different from `background-position`?  
   **A:** `object-position` positions the replaced element's content inside its own box; `background-position` positions a background image inside an element's background area.

## ⚠ Common Errors / Mistakes
- Using `object-position` without `object-fit` (or with `object-fit: fill`)—has no visible effect
- Using single-value syntax (e.g., `left`) which sets horizontal and defaults vertical to `center`
- Expecting percentage values to work like pixel offsets—`0%` aligns left/top, `100%` aligns right/bottom
- Forgetting that `object-position` repositions the *visible area*, not the element itself
- Not accounting for `object-position` in responsive designs where container proportions change

## 📝 Practice Exercises
**Beginner:**
1. Apply `object-fit: cover` and `object-position: top center` to a tall image in a square container.
2. Change `object-position` to `bottom` and observe the shift.
3. Use percentage values `25% 75%` to position the visible area.

**Intermediate:**
4. Build a profile card where a portrait image crops to a circle with the face at the top (use `object-position: 50% 20%`).
5. Create a gallery where each thumbnail has a different focal point using CSS custom properties for `object-position`.
6. Add a smooth `transition` to `object-position` so hovering a thumbnail slides the focal point to center.

**Advanced:**
7. Build a Ken Burns-style slideshow where each slide uses `@keyframes` to animate `object-position` (panning across the image) combined with `transform: scale` for zoom.
8. Create an interactive image viewer where clicking different regions of a thumbnail updates the `object-position` of a large preview, allowing the user to pan around the image.
