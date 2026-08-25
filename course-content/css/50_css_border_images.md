## 50. CSS Border Images

## 📘 Introduction
CSS `border-image` allows you to use images as element borders, replacing the standard solid-color borders with repeating, stretching, or slicing image patterns. This is a powerful but often overlooked feature for creating ornate frames, decorative dividers, and styled buttons without extra HTML markup. Border images work by slicing an image into nine parts (four corners, four edges, and a center) and applying each part to the corresponding border section.

## 🧠 Key Concepts
- **`border-image-source`**: URL of the image to use as the border
- **`border-image-slice`**: Specifies how to slice the image (top, right, bottom, left offsets from edges); values can be numbers (pixels) or percentages
- **`border-image-width`**: Sets the width of the border image area (can differ from `border-width`)
- **`border-image-outset`**: Extends the border image beyond the element's border box
- **`border-image-repeat`**: How the edge slices are repeated — `stretch` (default), `repeat`, `round`, or `space`
- **`border-image` shorthand**: Combines all properties in one declaration
- **Image slicing**: The source image is divided into a 3×3 grid based on slice values; corners are fixed, edges are repeated/stretched
- The `fill` keyword in `border-image-slice` makes the center slice fill the element's content area

## 💻 Syntax

```css
/* Individual properties */
.border-image-demo {
  border-image-source: url('border.png');
  border-image-slice: 30;
  border-image-width: 20px;
  border-image-outset: 0;
  border-image-repeat: stretch;
}

/* Shorthand - order: source slice / width / outset / repeat */
.border-image-demo {
  border-image: url('border.png') 30 / 20px / 0 stretch;
}

/* With fill keyword - center slice fills content */
.border-image-demo {
  border-image: url('border.png') 30 fill / 20px stretch;
}

/* Percentage slices */
.border-image-demo {
  border-image: url('border.png') 25% / 15px round;
}

/* Different slice values per side */
.border-image-demo {
  border-image: url('border.png') 20 30 20 30 / 15px repeat;
}
```

## ✅ Example 1 - Basic

**Problem:** Create a framed polaroid-style image using a simple border image pattern.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f0f2f5;
  }
  .polaroid {
    width: 300px;
    background: #fff;
    padding: 20px 20px 60px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    text-align: center;
    border: 20px solid transparent;
    /* Simple dashed border image created with a CSS gradient */
    border-image-source: repeating-linear-gradient(
      45deg,
      #ccc 0px,
      #ccc 5px,
      transparent 5px,
      transparent 10px
    );
    border-image-slice: 20;
    border-image-repeat: stretch;
  }
  .polaroid img {
    width: 100%;
    display: block;
  }
  .polaroid .caption {
    margin-top: 10px;
    font-style: italic;
    color: #666;
  }
  /* A second approach using an actual image border */
  .framed-border {
    border: 30px solid transparent;
    border-image: repeating-linear-gradient(
      90deg,
      #e74c3c 0px,
      #e74c3c 10px,
      #fff 10px,
      #fff 20px
    ) 30 stretch;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="polaroid">
    <img src="https://placehold.co/260x200" alt="Sample">
    <div class="caption">CSS Border Image Frame</div>
  </div>
</body>
</html>
```

**Output:** A polaroid-style card with a diagonal dashed border created entirely with CSS gradients as a border image. The border has a 20px transparent border area filled by the repeating gradient pattern sliced at 20px intervals.

**Explanation:** `border-image-source` uses a `repeating-linear-gradient` instead of an image URL — gradients work anywhere images do. `border-image-slice: 20` tells CSS to slice the gradient into 20px segments for the border. `border-width: 20px` provides space for the border image to display. The element's background and content fill the area inside the border.

## 🚀 Example 2 - Intermediate

**Problem:** Build a styled award certificate with ornate border corners, edge patterns, and a filled center background using border-image techniques.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e);
    margin: 0;
    padding: 2rem;
  }
  .certificate {
    width: 600px;
    max-width: 100%;
    background: #fff8e7;
    padding: 3rem;
    text-align: center;
    border: 30px solid transparent;
    /* Gold ornate border using repeating gradient */
    border-image: repeating-linear-gradient(
        45deg,
        #c9a84c 0px,
        #c9a84c 4px,
        #f0d68a 4px,
        #f0d68a 8px,
        #c9a84c 8px,
        #c9a84c 12px,
        #8b6914 12px,
        #8b6914 14px,
        #c9a84c 14px,
        #c9a84c 18px
      ) 30 / 30px / 0 repeat;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .certificate h1 {
    font-size: 2.5rem;
    color: #8b6914;
    margin-bottom: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .certificate .subtitle {
    font-size: 1rem;
    color: #666;
    letter-spacing: 0.2em;
    border-top: 2px solid #c9a84c;
    border-bottom: 2px solid #c9a84c;
    padding: 0.5rem 0;
    display: inline-block;
  }
  .certificate .name {
    font-size: 2rem;
    color: #2c3e50;
    margin: 1.5rem 0;
    font-family: 'Brush Script MT', cursive;
  }
  .certificate p {
    color: #555;
    line-height: 1.8;
    font-size: 1rem;
  }
  .certificate .footer {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #8b6914;
  }
  .certificate .footer span {
    border-top: 1px solid #c9a84c;
    padding-top: 0.5rem;
    min-width: 150px;
  }
  /* Decorative corner accents */
  .certificate::before,
  .certificate::after {
    content: "✦ ✦ ✦";
    display: block;
    color: #c9a84c;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .certificate::after {
    margin-top: 1rem;
    margin-bottom: 0;
  }
</style>
</head>
<body>
  <div class="certificate">
    <h1>Certificate of Excellence</h1>
    <div class="subtitle">Proudly Presented To</div>
    <div class="name">Jane Smith</div>
    <p>For outstanding achievement and dedication demonstrated throughout the Advanced CSS Training Program, having mastered border images, gradients, and creative styling techniques.</p>
    <div class="footer">
      <span>Dr. A. Mentor</span>
      <span>June 15, 2026</span>
    </div>
  </div>
</body>
</html>
```

**Output:** An elegant certificate with a repeating gold ornamental border pattern created via `border-image` and a `repeating-linear-gradient`. The border appears as a continuous decorative frame with corner continuity. The inner content area is a warm cream color on a dark background.

**Explanation:** The complex `repeating-linear-gradient` creates a pattern with gold tones, dark gold accents, and angled lines that simulate an ornate frame. `border-image-slice: 30` slices at 30px from each edge. `border-image-width: 30px` sets the border thickness. `border-image-repeat: repeat` tiles the edge slices (rather than stretching them), creating a consistent pattern around the entire perimeter. The `::before` and `::after` pseudo-elements add decorative asterisks that complement the border.

## 🏢 Real World Use Case
**Digital certificate platforms** (accredible, Credly) and **formal document generators** use border images extensively to create ornate, branded frames around credentials without server-side image processing. E-commerce store badges (e.g., "Certified Organic", "Award Winner") use border images for star-spangled or ribbon-styled frames. CSS border images also power vintage-themed UI on boutique wineries and luxury brand websites, where decorative borders create an artisanal feel without loading heavy image assets.

## 🎯 Interview Questions

**1. How does `border-image-slice` work?**
It specifies inward offsets from the top, right, bottom, and left edges of the image to create the 3×3 slicing grid. Values can be numbers (pixels at the image's native resolution) or percentages. The `fill` keyword optionally includes the center slice in the element's content area.

**2. What is the default value of `border-image-repeat`?**
The default is `stretch`, which stretches each edge slice to fill the border side. Alternative values are `repeat` (tiles the slice), `round` (tiles and scales to fit evenly), and `space` (tiles with equal spacing).

**3. Can you use gradients as border images?**
Yes. CSS gradients (`linear-gradient`, `radial-gradient`, `conic-gradient`, `repeating-linear-gradient`) are valid image values for `border-image-source`. This allows decorative borders without external image files.

**4. What is the difference between `border-image-width` and `border-width`?**
`border-width` defines the space allocated for the border box. `border-image-width` defines how wide the border image is displayed. If `border-image-width` is greater than `border-width`, the image extends into the padding area. If not set, `border-image-width` defaults to the computed `border-width`.

**5. How does `border-image-outset` affect layout?**
`border-image-outset` extends the border image beyond the element's border box without affecting the element's layout size or the position of other elements. The image can visually overflow the element's bounding box.

## ⚠ Common Errors / Mistakes
- Forgetting to set `border: X solid transparent` or `border-width` — the border area must exist for the border image to display
- Using a sliced image without matching `border-image-width` to the slice size — the pattern will not align correctly at corners
- Expecting `border-image` to work with `border-collapse: collapse` on tables — it does not
- Providing a `border-image-slice` value larger than the image dimensions — the image cannot slice properly
- Using `border-image` with `border-radius` — they are mutually compatible but require careful coordinate alignment
- Confusing `border-image-width` with `border-width` — setting only `border-width` when `border-image-width` is different can produce unexpected results

## 📝 Practice Exercises

**Beginner:**
1. Create a simple box with a 20px repeating dot-dash border using `border-image` and a `repeating-linear-gradient` as the source.
2. Build a photo frame with a 30px wide wooden-textured border using a brown gradient as the border-image source.
3. Create a notification badge with a repeating triangular pattern along its border using `border-image-repeat: repeat`.

**Intermediate:**
4. Design an award badge with a gold metallic border using `repeating-linear-gradient` with multiple color stops to simulate a brushed metal effect. Use `border-image-slice` to create proper corner miters.
5. Build a decorative pull-quote box with ornate corner ornaments (like corner brackets or filigree) using a 2×2 grid border image with distinct corner and edge treatments.
6. Create a digital certificate template with a dual-border effect (two concentric border images) using nested elements or `border-image-outset`.

**Advanced:**
7. Implement a complete border-image-based theming system for a card component library. Create 5 distinct border styles (minimal, ornate, playful, premium, festive) each using a unique `border-image` with gradient sources. Ensure proper corner continuity and slice alignment at all card sizes.
8. Build a tool that takes a source image, allows you to visually drag slice guides (top, right, bottom, left), and generates the corresponding `border-image` CSS code. Display a live preview of how the border renders on elements of various sizes.
