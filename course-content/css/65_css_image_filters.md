## 65. CSS Image Filters
## 📘 Introduction
CSS filters allow you to apply graphical effects like blurring, color shifting, and contrast adjustments directly to elements—no image editor needed. The `filter` property works on images, videos, and even entire sections. `backdrop-filter` extends this to the background behind an element, enabling glass-morphism effects.

## 🧠 Key Concepts
- **filter** – Applies visual effects to an element
- **blur()** – Gaussian blur (e.g., `blur(5px)`)
- **brightness()** – Adjusts brightness (e.g., `brightness(1.5)` = 150%)
- **contrast()** – Adjusts contrast (e.g., `contrast(200%)`)
- **grayscale()** – Converts to grayscale (e.g., `grayscale(100%)`)
- **hue-rotate()** – Rotates the color hue (e.g., `hue-rotate(90deg)`)
- **saturate()** – Adjusts saturation (e.g., `saturate(2)`)
- **sepia()** – Applies sepia tone (e.g., `sepia(80%)`)
- **invert()** – Inverts colors (e.g., `invert(100%)`)
- **backdrop-filter** – Applies filters to the area behind an element
- **Multiple filters** – Space-separated: `filter: brightness(1.2) contrast(1.1) saturate(1.5)`
- **Hover transitions** – Smoothly animate filter changes with `transition`

## 💻 Syntax
```css
/* Single filter */
img.blur {
  filter: blur(4px);
}

/* Multiple filters */
img.enhanced {
  filter: brightness(1.2) contrast(1.3) saturate(1.4);
}

/* Grayscale hover effect */
img.grayscale-hover {
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}
img.grayscale-hover:hover {
  filter: grayscale(0%);
}

/* Backdrop filter (glass effect) */
.glass-panel {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
}
```

## ✅ Example 1 - Basic
**Problem:** Apply various filter effects to images and toggle them on hover.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; }

  .filter-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .filter-card {
    width: 180px;
    text-align: center;
  }

  .filter-card img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    transition: filter 0.3s ease;
  }

  .filter-card p {
    margin-top: 8px;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .blur img { filter: blur(3px); }
  .blur img:hover { filter: blur(0); }

  .brightness img { filter: brightness(0.5); }
  .brightness img:hover { filter: brightness(1); }

  .contrast img { filter: contrast(200%); }
  .contrast img:hover { filter: contrast(100%); }

  .grayscale img { filter: grayscale(100%); }
  .grayscale img:hover { filter: grayscale(0%); }

  .sepia img { filter: sepia(100%); }
  .sepia img:hover { filter: sepia(0); }

  .invert img { filter: invert(100%); }
  .invert img:hover { filter: invert(0); }

  .hue-rotate img { filter: hue-rotate(180deg); }
  .hue-rotate img:hover { filter: hue-rotate(0deg); }

  .saturate img { filter: saturate(3); }
  .saturate img:hover { filter: saturate(1); }
</style>
</head>
<body>
  <h2>CSS Filter Effects</h2>
  <p>Hover over each image to see the original</p>
  <div class="filter-grid">
    <div class="filter-card blur">
      <img src="https://via.placeholder.com/300/FF6B6B" alt="Blur">
      <p>blur(3px)</p>
    </div>
    <div class="filter-card brightness">
      <img src="https://via.placeholder.com/300/4ECDC4" alt="Brightness">
      <p>brightness(0.5)</p>
    </div>
    <div class="filter-card contrast">
      <img src="https://via.placeholder.com/300/45B7D1" alt="Contrast">
      <p>contrast(200%)</p>
    </div>
    <div class="filter-card grayscale">
      <img src="https://via.placeholder.com/300/FFA07A" alt="Grayscale">
      <p>grayscale(100%)</p>
    </div>
    <div class="filter-card sepia">
      <img src="https://via.placeholder.com/300/98D8C8" alt="Sepia">
      <p>sepia(100%)</p>
    </div>
    <div class="filter-card invert">
      <img src="https://via.placeholder.com/300/DDA0DD" alt="Invert">
      <p>invert(100%)</p>
    </div>
    <div class="filter-card hue-rotate">
      <img src="https://via.placeholder.com/300/FFD700" alt="Hue Rotate">
      <p>hue-rotate(180deg)</p>
    </div>
    <div class="filter-card saturate">
      <img src="https://via.placeholder.com/300/FF6B6B" alt="Saturate">
      <p>saturate(3)</p>
    </div>
  </div>
</body>
</html>
```

**Output:** An 8-card grid showing different filter presets. Hovering each image reveals the unfiltered original via smooth transition.

**Explanation:** Each card has a specific filter class. The `transition` on `filter` animates the change between the filtered and unfiltered state when hovering. All filter functions are demonstrated: blur, brightness, contrast, grayscale, sepia, invert, hue-rotate, and saturate.

## 🚀 Example 2 - Intermediate
**Problem:** Create a "glass morphism" hero section with backdrop-filter and multiple filters applied to a background image.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; }

  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: url('https://via.placeholder.com/1920x1080/4ECDC4/ffffff?text=Background') center/cover no-repeat;
    filter: brightness(0.6) saturate(1.2) blur(2px);
    transition: filter 0.5s ease;
  }

  .hero:hover .hero-bg {
    filter: brightness(0.8) saturate(1.5) blur(0);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: #fff;
    padding: 40px 60px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 12px;
  }

  .hero-content p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
</style>
</head>
<body>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1>Glass Morphism</h1>
      <p>backdrop-filter + multiple filters on background</p>
    </div>
  </section>
</body>
</html>
```

**Output:** A full-viewport hero with a background image that is dimmed, saturated, and slightly blurred. A centered glass panel with frosted effect shows text. On hover, the background sharpens and brightens.

**Explanation:** The background div uses `filter: brightness(0.6) saturate(1.2) blur(2px)`—three filters combined. The `.hero-content` card uses `backdrop-filter: blur(12px)` to blur the area behind it (the filtered background), creating the glass effect. A semi-transparent background and subtle border enhance the look.

## 🏢 Real World Use Case
Photography portfolios use grayscale-to-color hover reveals. E-commerce sites use brightness/contrast for product image touch-ups. Modern UI designs use `backdrop-filter` for navigation bars, modals, and glass-morphism cards.

## 🎯 Interview Questions
1. **Q:** What is the difference between `filter` and `backdrop-filter`?  
   **A:** `filter` applies effects to the element itself; `backdrop-filter` applies effects to the area behind the element.

2. **Q:** Can you animate CSS filters?  
   **A:** Yes, with `transition` on the `filter` property, or using `@keyframes` for keyframe animation.

3. **Q:** What are the performance considerations of `filter` and `backdrop-filter`?  
   **A:** Filters can be GPU-accelerated but heavy use (especially `blur()` on large areas) may impact performance on low-end devices.

4. **Q:** How do you apply multiple filters to one element?  
   **A:** Separate them with spaces: `filter: brightness(1.2) contrast(1.3) saturate(1.4);`

5. **Q:** Can `filter` be applied to non-image elements?  
   **A:** Yes, `filter` works on any HTML element including `<div>`, `<video>`, and `<section>`.

## ⚠ Common Errors / Mistakes
- Forgetting units—`blur(5)` is invalid; use `blur(5px)`, `hue-rotate(90deg)`
- Using commas between multiple filter functions (should be spaces)
- Applying `backdrop-filter` without a transparent or semi-transparent background—effect is invisible
- Overusing heavy filters (especially `blur`) causing janky scrolling
- Setting `filter` on a parent and expecting child elements to unaffected—children are affected too

## 📝 Practice Exercises
**Beginner:**
1. Apply a `grayscale(100%)` filter to an image.
2. Add a `transition` so the grayscale smoothly changes to color on hover.
3. Apply `brightness(1.5)` and `contrast(1.2)` together to an image.

**Intermediate:**
4. Create a card with a background image that is blurred—on hover, the blur reduces to reveal the image clearly.
5. Build a glass-morphism navbar that uses `backdrop-filter` to blur the page content behind it.
6. Create a product gallery where each image has a sepia filter that changes to color on hover, with a 0.3s transition.

**Advanced:**
7. Build a CSS-only slideshow where each slide uses a different filter combination (e.g., sepia → grayscale → hue-rotate) that transitions automatically using `@keyframes`.
8. Create an interactive photo editor panel with range sliders (using `<input type="range">`) that control filter values via CSS custom properties and JavaScript `style.setProperty()`.
