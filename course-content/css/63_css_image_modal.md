## 63. CSS Image Modal
## 📘 Introduction
An image modal (or lightbox) displays a larger version of an image in an overlay on top of the page. While JavaScript typically handles click-to-open behavior, the visual presentation—overlay, centering, close button, animations, and stacking—is entirely CSS. Mastering modal styling is essential for galleries, portfolios, and product previews.

## 🧠 Key Concepts
- **Click-to-expand** – CSS pseudo-class `:target` or checkbox `:checked` hack to show/hide the modal
- **Overlay** – `position: fixed; inset: 0;` covers the viewport with a semi-transparent background
- **Image centering** – Flexbox (`display: flex; align-items: center; justify-content: center`) on the overlay
- **Close button** – Absolutely positioned button (often "×" or "&times;")
- **Animation** – `transition` or `@keyframes` for fade-in and scale effects
- **z-index** – High value (e.g., `z-index: 9999`) ensures modal sits above all content
- **Overflow** – `overflow: hidden` on body to prevent scrolling when modal is open

## 💻 Syntax
```css
/* Modal overlay */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  align-items: center;
  justify-content: center;
}

/* Show modal with :target */
.modal:target {
  display: flex;
}

/* Modal image */
.modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s ease;
}

/* Close button */
.modal .close {
  position: absolute;
  top: 20px;
  right: 40px;
  color: #fff;
  font-size: 40px;
  text-decoration: none;
}

/* Zoom animation */
@keyframes zoomIn {
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## ✅ Example 1 - Basic
**Problem:** Create a simple image modal using the `:target` pseudo-class (no JavaScript).

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; }

  .gallery {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .gallery a img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s;
  }
  .gallery a img:hover { transform: scale(1.05); }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    z-index: 9999;
    align-items: center;
    justify-content: center;
  }
  .modal:target { display: flex; }

  .modal img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 6px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal .close {
    position: absolute;
    top: 20px;
    right: 40px;
    color: #fff;
    font-size: 48px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    line-height: 1;
  }
  .modal .close:hover { color: #f00; }
</style>
</head>
<body>
  <div class="gallery">
    <a href="#img1"><img src="https://via.placeholder.com/400/FF6B6B" alt="Red"></a>
    <a href="#img2"><img src="https://via.placeholder.com/400/4ECDC4" alt="Teal"></a>
    <a href="#img3"><img src="https://via.placeholder.com/400/45B7D1" alt="Blue"></a>
  </div>

  <div id="img1" class="modal">
    <a href="#" class="close">&times;</a>
    <img src="https://via.placeholder.com/800/FF6B6B" alt="Red Large">
  </div>
  <div id="img2" class="modal">
    <a href="#" class="close">&times;</a>
    <img src="https://via.placeholder.com/800/4ECDC4" alt="Teal Large">
  </div>
  <div id="img3" class="modal">
    <a href="#" class="close">&times;</a>
    <img src="https://via.placeholder.com/800/45B7D1" alt="Blue Large">
  </div>
</body>
</html>
```

**Output:** A thumbnail gallery. Clicking a thumbnail opens a full-viewport dark overlay with the large image centered and a close button. Clicking the close button (or pressing the browser Back button) closes the modal.

**Explanation:** The modal `<div>` has an `id` matching the anchor `href`. `:target` matches the element whose `id` is in the URL hash, changing `display` from `none` to `flex`. The close button links to `#` (removing the hash), hiding the modal. The `@keyframes fadeIn` animates the image entry.

## 🚀 Example 2 - Intermediate
**Problem:** Build a modal with a caption, next/previous navigation using adjacent sibling combinators, and a backdrop blur effect.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; }

  .trigger img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(6px);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .modal-overlay:target { display: flex; }

  .modal-content {
    position: relative;
    max-width: 85%;
    text-align: center;
  }
  .modal-content img {
    max-width: 100%;
    max-height: 75vh;
    border-radius: 6px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
    animation: zoomIn 0.3s ease;
  }
  @keyframes zoomIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .modal-caption {
    color: #fff;
    font-size: 1.1rem;
    margin-top: 12px;
    font-style: italic;
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    color: #fff;
    font-size: 36px;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;
  }
  .close-btn:hover { color: #f00; }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 40px;
    text-decoration: none;
    padding: 12px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .nav-btn:hover { background: rgba(255,255,255,0.3); }
  .nav-prev { left: -60px; }
  .nav-next { right: -60px; }

  .thumbnails {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
</head>
<body>
  <h2>Image Gallery</h2>
  <div class="thumbnails">
    <a href="#modal1"><img src="https://via.placeholder.com/300/FF6B6B" alt="Sunset" width="150" height="100" style="object-fit:cover; border-radius:6px;"></a>
    <a href="#modal2"><img src="https://via.placeholder.com/300/4ECDC4" alt="Ocean" width="150" height="100" style="object-fit:cover; border-radius:6px;"></a>
    <a href="#modal3"><img src="https://via.placeholder.com/300/45B7D1" alt="Forest" width="150" height="100" style="object-fit:cover; border-radius:6px;"></a>
  </div>

  <!-- Modal 1 -->
  <div id="modal1" class="modal-overlay">
    <div class="modal-content">
      <a href="#" class="close-btn">&times;</a>
      <a href="#modal3" class="nav-btn nav-prev">&#8249;</a>
      <img src="https://via.placeholder.org/800/FF6B6B" alt="Sunset Large">
      <a href="#modal2" class="nav-btn nav-next">&#8250;</a>
      <div class="modal-caption">Sunset Over the Hills</div>
    </div>
  </div>
  <!-- Modal 2 -->
  <div id="modal2" class="modal-overlay">
    <div class="modal-content">
      <a href="#" class="close-btn">&times;</a>
      <a href="#modal1" class="nav-btn nav-prev">&#8249;</a>
      <img src="https://via.placeholder.org/800/4ECDC4" alt="Ocean Large">
      <a href="#modal3" class="nav-btn nav-next">&#8250;</a>
      <div class="modal-caption">Calm Ocean Waves</div>
    </div>
  </div>
  <!-- Modal 3 -->
  <div id="modal3" class="modal-overlay">
    <div class="modal-content">
      <a href="#" class="close-btn">&times;</a>
      <a href="#modal2" class="nav-btn nav-prev">&#8249;</a>
      <img src="https://via.placeholder.org/800/45B7D1" alt="Forest Large">
      <a href="#modal1" class="nav-btn nav-next">&#8250;</a>
      <div class="modal-caption">Deep Forest Trail</div>
    </div>
  </div>
</body>
</html>
```

**Output:** A gallery with three thumbnails. Clicking opens a blurred-backdrop modal with the image, caption, close button, and prev/next navigation arrows to cycle through images.

**Explanation:** `backdrop-filter: blur(6px)` blurs the page content behind the modal for a polished look. Navigation links point to other modal IDs, allowing cycling without JavaScript. The modal uses `display: none` / `display: flex` toggled by `:target`.

## 🏢 Real World Use Case
Portfolio websites (photographers, designers), e-commerce product zoom previews, social media image viewers, and news article photo galleries all use modals to present full-resolution images without navigating away.

## 🎯 Interview Questions
1. **Q:** What is the `:target` pseudo-class and how is it used for modals?  
   **A:** `:target` matches an element whose `id` matches the current URL fragment, allowing CSS-only show/hide toggling.

2. **Q:** How does `position: fixed` work for a modal overlay?  
   **A:** It positions the element relative to the viewport, staying in place even when the page scrolls.

3. **Q:** How do you center an image inside a modal?  
   **A:** Use `display: flex` on the overlay with `align-items: center` and `justify-content: center`.

4. **Q:** What role does `z-index` play in modal design?  
   **A:** A high `z-index` (e.g., 9999) ensures the modal overlay and content sit above all other elements on the page.

5. **Q:** How can you prevent background scrolling when a modal is open (CSS-only)?  
   **A:** Set `overflow: hidden` on `<body>` when the modal is active, though pure CSS solutions may need the `:target` trick with a body wrapper.

## ⚠ Common Errors / Mistakes
- Omitting `inset: 0` (or individual `top/left/right/bottom` values) on the fixed overlay, causing it not to cover the viewport
- Forgetting `display: flex` (or `grid`) on the overlay, so the image does not center
- Low `z-index` causing the modal to appear behind other content
- Not setting `max-width` and `max-height` on the modal image, making it overflow small screens
- Using `display: none` / `display: block` toggle without animation support

## 📝 Practice Exercises
**Beginner:**
1. Create a basic modal overlay that covers the full viewport with a semi-transparent black background.
2. Center a large image inside the modal using flexbox.
3. Add a close button ("×") in the top-right corner that closes the modal.

**Intermediate:**
4. Build a modal with `:target` that includes a zoom-in animation when the image appears.
5. Add a caption below the image inside the modal overlay.
6. Create a prev/next navigation system between multiple modals using `:target`.

**Advanced:**
7. Build a modal that uses a hidden checkbox (`<input type="checkbox">`) with `:checked` instead of `:target` to toggle visibility, allowing the Escape key to close via `<label for="...">`.
8. Create a full-featured CSS-only lightbox gallery with auto-playing slideshow using `@keyframes` and `animation-delay`.
