## 62. CSS Image Styling
## 📘 Introduction
Images are central to web design. CSS provides powerful properties to style images—rounding corners, controlling fit, applying filters, and ensuring responsiveness. Mastering image styling improves visual appeal, performance, and user experience across devices.

## 🧠 Key Concepts
- **border-radius** – Creates rounded or circular images
- **object-fit** – Controls how an image fills its container (`cover`, `contain`, `fill`, `none`, `scale-down`)
- **Grayscale / hover effects** – `filter: grayscale()` with `transition` for interactive effects
- **Image captions** – Using `<figure>` and `<figcaption>` for semantic captions
- **Responsive images** – `max-width: 100%` and `height: auto` to scale within parent
- **box-shadow** – Adds depth with drop shadows on images

## 💻 Syntax
```css
/* Rounded image */
img.rounded {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

/* Responsive image */
img.responsive {
  max-width: 100%;
  height: auto;
}

/* Grayscale hover */
img.grayscale {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}
img.grayscale:hover {
  filter: grayscale(0%);
}
```

## ✅ Example 1 - Basic
**Problem:** Create a circular profile image and a rounded thumbnail gallery.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #4CAF50;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  .thumbnail-grid {
    display: flex;
    gap: 16px;
    margin-top: 20px;
  }
  .thumbnail-grid img {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .thumbnail-grid img:hover {
    transform: scale(1.1);
  }
  figcaption {
    text-align: center;
    font-style: italic;
    margin-top: 4px;
  }
</style>
</head>
<body>
  <figure>
    <img src="https://via.placeholder.com/300" alt="Profile" class="profile-img">
    <figcaption>Jane Doe, Developer</figcaption>
  </figure>

  <div class="thumbnail-grid">
    <img src="https://via.placeholder.com/200/FF6B6B" alt="Photo 1">
    <img src="https://via.placeholder.com/200/4ECDC4" alt="Photo 2">
    <img src="https://via.placeholder.com/200/45B7D1" alt="Photo 3">
  </div>
</body>
</html>
```

**Output:** A circular profile image with a green border and shadow, plus three rounded thumbnails that scale up on hover.

**Explanation:** `border-radius: 50%` on a square image creates a perfect circle. `object-fit: cover` ensures the image fills the circle without distortion. The thumbnails use `border-radius: 12px` for soft corners and a hover `transform: scale(1.1)` for a zoom effect.

## 🚀 Example 2 - Intermediate
**Problem:** Build a responsive image gallery with grayscale-to-color hover and centered captions.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .gallery-item {
    position: relative;
    width: 280px;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .gallery-item img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    filter: grayscale(100%);
    transition: filter 0.4s ease, transform 0.4s ease;
  }

  .gallery-item:hover img {
    filter: grayscale(0%);
    transform: scale(1.05);
  }

  .gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: #fff;
    padding: 20px 12px 12px;
    text-align: center;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gallery-item:hover .gallery-caption {
    opacity: 1;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .gallery-item { width: 100%; }
  }
</style>
</head>
<body>
  <div class="gallery">
    <div class="gallery-item">
      <img src="https://via.placeholder.com/400/FF6B6B" alt="Sunset">
      <div class="gallery-caption">Sunset Over Hills</div>
    </div>
    <div class="gallery-item">
      <img src="https://via.placeholder.com/400/4ECDC4" alt="Ocean">
      <div class="gallery-caption">Ocean Breeze</div>
    </div>
    <div class="gallery-item">
      <img src="https://via.placeholder.com/400/45B7D1" alt="Mountain">
      <div class="gallery-caption">Mountain Peak</div>
    </div>
  </div>
</body>
</html>
```

**Output:** A responsive gallery where each image starts in grayscale and transitions to full color on hover, with a caption sliding into view from the bottom.

**Explanation:** `filter: grayscale(100%)` desaturates images by default. On `.gallery-item:hover img`, `grayscale(0%)` restores color while `transform: scale(1.05)` zooms slightly. The caption uses `position: absolute` with a gradient overlay and fades in via `opacity` transition.

## 🏢 Real World Use Case
E-commerce product galleries, portfolio showcase sites, team pages, and photography blogs all rely heavily on CSS image styling for visual impact, responsive behavior, and interactive hover effects without JavaScript.

## 🎯 Interview Questions
1. **Q:** How do you make an image circular in CSS?  
   **A:** Set `border-radius: 50%` on a square image and use `object-fit: cover` to avoid distortion.

2. **Q:** What does `object-fit: cover` do?  
   **A:** It scales the image to cover the entire container while preserving aspect ratio, cropping the excess.

3. **Q:** How do you make an image responsive without it overflowing?  
   **A:** Use `max-width: 100%` and `height: auto` so the image scales down within its parent.

4. **Q:** What is the `filter` property and give three functions it supports?  
   **A:** `filter` applies visual effects like blur, grayscale, brightness, contrast, sepia, hue-rotate, and saturate.

5. **Q:** How do you add a hover effect that smoothly transitions from grayscale to color?  
   **A:** Set `filter: grayscale(100%); transition: filter 0.3s ease;` on the image, then `filter: grayscale(0%);` on hover.

## ⚠ Common Errors / Mistakes
- Forgetting `object-fit: cover` when using `border-radius: 50%`—image appears distorted
- Not setting `height: auto` with `max-width: 100%`, causing aspect ratio issues
- Using `width: 100%` without `max-width` for layout images, making them too large on big screens
- Applying `filter: grayscale()` without a `transition`, resulting in a jarring snap effect
- Leaving `alt` text empty for purely decorative images, hurting accessibility

## 📝 Practice Exercises
**Beginner:**
1. Style an image as a circle with a 4px solid blue border.
2. Create a responsive image that scales down but never exceeds its original size.
3. Add a subtle box shadow and rounded corners (8px) to an image.

**Intermediate:**
4. Build a team member card with a circular photo, name, and role—photo turns grayscale on hover.
5. Create a thumbnail strip where clicking a thumbnail changes the main image (use CSS only with :target).
6. Build a hero section with a background image that uses `object-fit: cover` and overlay text.

**Advanced:**
7. Create a lazy-load blur-up effect where a small blurred image transitions to the full sharp image on load (using CSS filters and transitions).
8. Build a full responsive masonry-style image grid with hover zoom and caption overlays.
