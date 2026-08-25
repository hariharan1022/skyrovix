## 37. CSS Image Gallery

## 📘 Introduction
Image galleries are a staple of portfolios, e-commerce sites, and photography platforms. CSS grid and flexbox make creating responsive, beautiful galleries straightforward. With additional CSS techniques like hover overlays, captions, and lightbox effects, galleries can be highly interactive.

## 🧠 Key Concepts
- **Grid gallery**: Using `display: grid` with `grid-template-columns: repeat(auto-fill, minmax(size, 1fr))` for responsive columns
- **Flexbox gallery**: Using `display: flex` with `flex-wrap: wrap` for flexible row-based layouts
- **Responsive images**: `max-width: 100%` and `height: auto` or `object-fit: cover` for consistent sizing
- **Captions**: Text overlay using `position: absolute` inside a relative container
- **Lightbox effect**: Full-screen overlay that displays a larger version of the image; typically requires JavaScript but can be approximated with `:target`
- **Hover overlays**: Semi-transparent layer with icons/text that appears on hover

## 💻 Syntax

```css
/* CSS Grid Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

/* Caption overlay */
.gallery-item {
  position: relative;
  overflow: hidden;
}
.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background: rgba(0,0,0,0.6);
  color: white;
}
```

## ✅ Example 1 - Basic (Responsive Grid Gallery with Captions)

**Problem:** Create a responsive image gallery using CSS Grid that automatically adjusts columns and has captions on each image.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background: #ecf0f1;
    padding: 30px;
  }
  .gallery-title {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 2em;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .gallery-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  .gallery-item img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s;
  }

  .gallery-item:hover img {
    transform: scale(1.05);
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px 20px;
    background: linear-gradient(transparent, rgba(0,0,0,0.75));
    color: white;
  }

  .caption h3 {
    font-size: 1em;
    margin-bottom: 4px;
  }

  .caption p {
    font-size: 0.8em;
    opacity: 0.85;
  }

  /* Featured item spans 2 columns */
  .gallery-item.featured {
    grid-column: span 2;
    grid-row: span 2;
  }
  .gallery-item.featured img {
    height: 540px;
  }
</style>
</head>
<body>
  <h1 class="gallery-title">Photo Gallery</h1>

  <div class="gallery">
    <div class="gallery-item featured">
      <img src="https://picsum.photos/600/540?random=50" alt="Featured">
      <div class="caption">
        <h3>Featured: Mountain Sunset</h3>
        <p>Breathtaking view from the summit</p>
      </div>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/280/260?random=51" alt="Image 1">
      <div class="caption">
        <h3>Forest Trail</h3>
        <p>Peaceful walk through nature</p>
      </div>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/280/260?random=52" alt="Image 2">
      <div class="caption">
        <h3>Ocean Waves</h3>
        <p>Crashing waves at golden hour</p>
      </div>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/280/260?random=53" alt="Image 3">
      <div class="caption">
        <h3>City Lights</h3>
        <p>Urban landscape at night</p>
      </div>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/280/260?random=54" alt="Image 4">
      <div class="caption">
        <h3>Desert Dunes</h3>
        <p>Endless sands stretching far</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A responsive grid gallery where items automatically rearrange based on screen width. One featured item spans 2 columns and 2 rows. Each image has a gradient caption overlay. Items zoom slightly on hover.

**Explanation:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` creates responsive columns. The `.featured` item uses `grid-column: span 2; grid-row: span 2` to stand out. `object-fit: cover` ensures images fill their container without distortion. Captions use a gradient overlay for readability.

## 🚀 Example 2 - Intermediate (Gallery with Hover Overlay Effects)

**Problem:** Build a gallery where hovering an image reveals a dark overlay with zoom, search icons, and a text caption — with smooth animations.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background: #f8f9fa;
    padding: 30px;
  }
  .gallery-title {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 2em;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .gallery-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 12px rgba(0,0,0,0.12);
  }

  .gallery-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s;
  }

  .gallery-item:hover img {
    transform: scale(1.1);
  }

  /* Overlay */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(44, 62, 80, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .gallery-item:hover .overlay {
    opacity: 1;
  }

  /* Icon buttons */
  .overlay-icons {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
  }

  .overlay-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.2);
    color: white;
    border-radius: 50%;
    text-decoration: none;
    font-size: 1.3em;
    transition: background 0.3s, transform 0.3s;
  }

  .overlay-icons a:hover {
    background: #3498db;
    transform: scale(1.1);
  }

  .overlay-text {
    color: white;
    text-align: center;
    padding: 0 20px;
  }

  .overlay-text h3 {
    font-size: 1.2em;
    margin-bottom: 5px;
  }

  .overlay-text p {
    font-size: 0.85em;
    opacity: 0.8;
  }

  /* Badge */
  .badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #e74c3c;
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.75em;
    font-weight: bold;
    z-index: 2;
  }
</style>
</head>
<body>
  <h1 class="gallery-title">Portfolio Gallery</h1>

  <div class="gallery">
    <div class="gallery-item">
      <img src="https://picsum.photos/300/300?random=60" alt="Work 1">
      <div class="badge">New</div>
      <div class="overlay">
        <div class="overlay-icons">
          <a href="#" title="View">🔍</a>
          <a href="#" title="Link">🔗</a>
        </div>
        <div class="overlay-text">
          <h3>Project Alpha</h3>
          <p>Web Design & Development</p>
        </div>
      </div>
    </div>

    <div class="gallery-item">
      <img src="https://picsum.photos/300/300?random=61" alt="Work 2">
      <div class="overlay">
        <div class="overlay-icons">
          <a href="#" title="View">🔍</a>
          <a href="#" title="Link">🔗</a>
        </div>
        <div class="overlay-text">
          <h3>Project Beta</h3>
          <p>Mobile Application</p>
        </div>
      </div>
    </div>

    <div class="gallery-item">
      <img src="https://picsum.photos/300/300?random=62" alt="Work 3">
      <div class="overlay">
        <div class="overlay-icons">
          <a href="#" title="View">🔍</a>
          <a href="#" title="Link">🔗</a>
        </div>
        <div class="overlay-text">
          <h3>Project Gamma</h3>
          <p>Brand Identity</p>
        </div>
      </div>
    </div>

    <div class="gallery-item">
      <img src="https://picsum.photos/300/300?random=63" alt="Work 4">
      <div class="overlay">
        <div class="overlay-icons">
          <a href="#" title="View">🔍</a>
          <a href="#" title="Link">🔗</a>
        </div>
        <div class="overlay-text">
          <h3>Project Delta</h3>
          <p>UI/UX Design</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A portfolio-style gallery. Hovering any image reveals a dark overlay with icon buttons and project details. The image zooms in on hover. A "New" badge appears on the first item.

**Explanation:** The `.overlay` is absolutely positioned, initially `opacity: 0`. On hover, `opacity: 1` fades it in. The image uses `transform: scale(1.1)`. The badge uses absolute positioning with `z-index` to stay above the overlay. The icon buttons are flex-centered in the overlay.

## 🏢 Real World Use Case
Portfolio websites, e-commerce product grids, photography platforms (Unsplash, 500px), real estate listings, social media feeds, and stock photo websites all use image galleries with various overlay, caption, and filtering effects.

## 🎯 Interview Questions

1. **How do you create a responsive image gallery without media queries?**
   *Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`. This automatically adjusts the number of columns based on the available width.*

2. **What is the purpose of `object-fit: cover` in image galleries?**
   *It ensures images fill their container completely while maintaining aspect ratio. Parts of the image may be cropped, but there will be no empty space or distortion.*

3. **How can you create a hover overlay effect on gallery images?**
   *Wrap the image in a `position: relative` container, add an absolutely positioned `<div>` with `opacity: 0`, and change to `opacity: 1` on parent hover. Use `transition` for smooth animation.*

4. **What is the difference between `object-fit: cover` and `object-fit: contain`?**
   *`cover` fills the entire container, cropping overflow. `contain` fits the entire image within the container with possible letterboxing (empty bars).*

5. **How would you implement a lightbox effect with CSS only?**
   *Use the `:target` pseudo-class. Each thumbnail links to a hash (e.g., `#img1`), and a full-screen overlay with `display: none` becomes `display: flex` when its ID matches the URL hash. A "close" link returns to `#`.*

## ⚠ Common Errors / Mistakes

- **Not setting `display: block` on images inside grid/flex items**: Images have `display: inline` by default, causing unexpected gaps below them
- **Using `width: 100%; height: auto` without `object-fit`**: Images may not fill a uniform grid cell size; use `object-fit: cover` with fixed `height`
- **Forgetting `overflow: hidden` on gallery items**: Content (like zooming images or overlays) spills outside rounded corners without this
- **Using fixed pixel widths in grid templates**: `repeat(auto-fill, minmax(200px, 1fr))` is more responsive than fixed values
- **Overlay text that is not accessible**: Overlay text hidden behind `opacity: 0` may not be readable by screen readers; consider `aria-label` on images

## 📝 Practice Exercises

### Beginner
1. Create a 3-column grid gallery with 6 images using `grid-template-columns: repeat(3, 1fr)`.
2. Add a simple caption below each image (not overlaid) using a `<figcaption>` element inside `<figure>`.
3. Use `object-fit: cover` to ensure all images in the gallery have the same height (200px) without distortion.

### Intermediate
4. Build a responsive grid gallery using `repeat(auto-fill, minmax(250px, 1fr))` with a hover effect that scales the image up by 10%.
5. Create a gallery where each item has a dark gradient overlay at the bottom with the title and date — visible at all times, not just on hover.
6. Add a "New" badge to the first 3 items of the gallery using `nth-child` and absolute positioning.

### Advanced
7. Build a complete lightbox gallery using only CSS (`:target`): clicking a thumbnail opens a full-screen overlay showing the larger image with a close button. Include previous/next navigation arrows (use multiple `:target` links).
8. Create a masonry-style gallery (Pinterest layout) using CSS columns (`column-count`) with varied image heights. Add hover overlays and ensure items don't break across columns using `break-inside: avoid`.
