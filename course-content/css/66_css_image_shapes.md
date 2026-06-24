## 66. CSS Image Shapes
## 📘 Introduction
CSS allows you to break out of the rectangular box by shaping images and content flow around them. The `shape-outside` property lets text wrap around non-rectangular shapes (circles, polygons, ellipses), while `clip-path` visually clips the element itself. Combining these creates magazine-style layouts entirely in CSS.

## 🧠 Key Concepts
- **shape-outside** – Defines a shape around which inline content wraps (requires `float`)
- **clip-path** – Clips the element itself to a shape (circle, polygon, ellipse, inset)
- **float** – Required for `shape-outside` to take effect
- **mask-image** – Uses an image or gradient to mask parts of an element
- **Text wrapping** – Content flows along the contour of the defined shape
- **clip-path vs mask** – `clip-path` cuts the element; `mask-image` uses alpha transparency
- **shape-margin** – Adds space between the shape and wrapping content

## 💻 Syntax
```css
/* Circle shape */
img.circle-shape {
  float: left;
  shape-outside: circle(50%);
  clip-path: circle(50%);
  width: 200px;
  height: 200px;
}

/* Polygon shape */
img.polygon-shape {
  float: left;
  shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Ellipse shape */
img.ellipse-shape {
  float: left;
  shape-outside: ellipse(40% 50%);
  clip-path: ellipse(40% 50%);
}

/* shape-margin */
img.shape-margin-example {
  float: left;
  shape-outside: circle(50%);
  shape-margin: 15px;
}
```

## ✅ Example 1 - Basic
**Problem:** Create a circular image with text wrapping around it.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; }

  .content {
    max-width: 600px;
    margin: 0 auto;
  }

  .content img {
    float: left;
    width: 180px;
    height: 180px;
    shape-outside: circle(50%);
    clip-path: circle(50%);
    margin-right: 24px;
    shape-margin: 16px;
  }

  .content p {
    font-size: 1.1rem;
    line-height: 1.7;
    text-align: justify;
  }
</style>
</head>
<body>
  <div class="content">
    <img src="https://via.placeholder.com/300/FF6B6B" alt="Circle Image">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
  </div>
</body>
</html>
```

**Output:** A circular image floats left; text wraps along its curved edge rather than a rectangular bounding box, creating a polished magazine-style layout.

**Explanation:** `float: left` is required for `shape-outside` to work. `shape-outside: circle(50%)` defines a circular boundary for text flow. `clip-path: circle(50%)` visually clips the rectangular image to a circle. `shape-margin: 16px` adds breathing room between the shape and text.

## 🚀 Example 2 - Intermediate
**Problem:** Create a diamond/polygon-shaped image with text flowing along its angled edges.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; padding: 40px; background: #fafafa; }

  .article {
    max-width: 700px;
    margin: 0 auto;
  }

  .article h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  .article img {
    float: left;
    width: 250px;
    height: 250px;
    margin-right: 28px;
    margin-bottom: 10px;
    shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    shape-margin: 12px;
    transition: clip-path 0.3s ease;
  }

  .article img:hover {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .article p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #333;
  }

  .pull-quote {
    float: right;
    width: 200px;
    shape-outside: ellipse(40% 50%);
    clip-path: ellipse(40% 50%);
    margin-left: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    padding: 30px 20px;
    text-align: center;
    font-style: italic;
    font-size: 1.3rem;
    border-radius: 50%;
  }
</style>
</head>
<body>
  <article class="article">
    <h1>The Diamond Age</h1>
    <img src="https://via.placeholder.com/300/667EEA" alt="Diamond shape">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    <div class="pull-quote">"Design is not just what it looks like—shape defines how content flows."</div>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
  </article>
</body>
</html>
```

**Output:** A diamond-shaped image sits on the left with text flowing along its angled edges. On hover, the clip-path expands to a full rectangle, revealing the entire image. An elliptical pull-quote floats on the right with text wrapping around it.

**Explanation:** `polygon()` coordinates define the diamond shape's four points. `shape-outside` matches `clip-path` so text wraps the visual shape. The pull-quote uses `ellipse()` and `border-radius: 50%` with a gradient background. The hover transition changes `clip-path` to a full rectangle.

## 🏢 Real World Use Case
Magazine-style editorial layouts, portfolio hero sections, biography pages with circular profile photos, promotional cards with cut-out shapes, and quote callouts in articles all benefit from CSS image shapes.

## 🎯 Interview Questions
1. **Q:** What property must be used alongside `shape-outside` for it to work?  
   **A:** `float` (either `left` or `right`). `shape-outside` only affects floated elements.

2. **Q:** What is the difference between `clip-path` and `mask-image`?  
   **A:** `clip-path` defines a vector path that clips the element; `mask-image` uses an image's alpha channel to control visibility.

3. **Q:** How does `shape-margin` differ from `margin`?  
   **A:** `shape-margin` adds space between the shape defined by `shape-outside` and wrapping content, while `margin` adds space around the element's box.

4. **Q:** Can `shape-outside` create complex organic shapes?  
   **A:** Yes, using `polygon()` with many points, or by referencing an image (`shape-outside: url(image.png)`) where the alpha channel defines the shape.

5. **Q:** Does `clip-path` affect the element's box model?  
   **A:** No. `clip-path` only visually clips the rendering; the element's box (and thus layout space) remains unchanged.

## ⚠ Common Errors / Mistakes
- Using `shape-outside` without `float`—the property has no effect
- Forgetting to add `clip-path` to match `shape-outside`—text wraps the shape but the image stays rectangular
- Using `shape-outside` on a non-floated flex or grid item
- Overlapping shapes due to missing `shape-margin` causing text to touch the image edge
- Expecting `clip-path` to change layout behavior—it only affects visual presentation

## 📝 Practice Exercises
**Beginner:**
1. Float an image left and apply `shape-outside: circle(50%)` with `clip-path: circle(50%)`.
2. Add `shape-margin: 10px` to create spacing between the circular image and surrounding text.
3. Change the shape to an ellipse with `ellipse(30% 50%)`.

**Intermediate:**
4. Create a hexagonal image shape using `polygon()` with 6 points and wrap text around it.
5. Build a two-column layout where the left column has a star-shaped image using `polygon()` with text wrapping.
6. Add a hover effect that transitions `clip-path` from a circle to a full square.

**Advanced:**
7. Create a magazine article layout with multiple shaped images left and right, a pull-quote ellipse, and a drop cap with `shape-outside`.
8. Build a CSS-only image gallery where each thumbnail has a different `clip-path` shape (circle, triangle, pentagon, star) and the image expands to full rectangle on hover.
