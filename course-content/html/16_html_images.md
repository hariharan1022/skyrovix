## 16. HTML Images
## 📘 Introduction
The `<img>` tag is used to embed images in an HTML page. Images enhance the visual appeal and user experience of a website. The `<img>` tag is self-closing and requires at least the `src` and `alt` attributes.

## 🧠 Key Concepts
- `<img>` is an empty (self-closing) tag
- `src` specifies the image path (URL or local file)
- `alt` provides alternative text for accessibility and SEO
- `width` and `height` set image dimensions
- Image maps allow clickable regions on an image
- The `<picture>` element enables responsive images with multiple sources
- `srcset` and `sizes` attributes deliver different images for different screen sizes

## 💻 Syntax
```html
<img src="path/to/image.jpg" alt="description" width="300" height="200">
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Display a simple image with fallback text.

**Code:**
```html
<img src="logo.png" alt="Company Logo" width="200" height="100">
```

**Output:** Renders the logo image at 200x100 pixels. If the image fails to load, "Company Logo" is shown as text.

**Explanation:** The `src` points to the image file. `alt` provides fallback text and improves accessibility for screen readers.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a responsive image that changes based on screen width.

**Code:**
```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive Landscape">
</picture>
```

**Output:** On desktop (>=1024px) large.jpg loads; on tablet (>=768px) medium.jpg loads; on mobile small.jpg loads.

**Explanation:** The `<picture>` element lets you define multiple sources with media queries. The `<img>` tag at the end is the fallback for unsupported browsers.

## 🏢 Real World Use Case
E-commerce product galleries use responsive images with thumbnails, zoom views, and multiple angles. Image maps are used on interactive infographics or floor plans.

## 🎯 Interview Questions (5 with answers)
**1. What does the `alt` attribute do and why is it important?**
It provides alternative text when an image cannot be displayed and improves accessibility for visually impaired users using screen readers. It also helps with SEO.

**2. How do you make an image responsive?**
Use `max-width: 100%` in CSS, or use the `<picture>` element with `srcset` and `sizes` attributes to serve different image resolutions based on viewport size.

**3. What is an image map?**
An image map defines clickable regions (hotspots) on an image using `<map>` and `<area>` tags, allowing different links based on where the user clicks.

**4. What is the difference between `srcset` and the `<picture>` element?**
`srcset` lets the browser choose from multiple resolutions of the same image. `<picture>` allows completely different images (different aspect ratios or formats) based on media conditions.

**5. Can the `<img>` tag have a closing tag?**
No, `<img>` is a void (self-closing) element. In HTML5, `<img src="...">` is correct; `<img src="..."></img>` is invalid.

## ⚠ Common Errors / Mistakes
- Forgetting the `alt` attribute (hurts accessibility and SEO)
- Using incorrect file paths (use relative paths or absolute URLs)
- Not specifying dimensions, causing layout shifts (Cumulative Layout Shift)
- Using oversized images that slow down page load
- Misspelling the `src` value

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create an `<img>` tag that displays a picture of a cat with alt text "Cute cat".
2. Add width="300" and height="200" attributes to the cat image.
3. Create an image that links to another page when clicked (hint: wrap in `<a>`).

**Intermediate:**
4. Build a responsive image group using `<picture>` with three breakpoints (mobile, tablet, desktop).
5. Create an image map with two rectangular clickable areas linking to different pages.
6. Add `srcset` with 1x, 2x, and 3x versions of an image for retina displays.

**Advanced:**
7. Build a lazy-loaded image gallery using `loading="lazy"` and explain how it improves performance.
8. Create a full responsive image setup using both `<picture>` and `srcset` together with WebP fallback.
