## 29. CSS Inline-block

## 📘 Introduction
The `display: inline-block` value combines characteristics of both `inline` and `block` elements. Like inline elements, they sit next to each other horizontally. Like block elements, they respect `width`, `height`, `padding`, and `margin` on all sides. This makes `inline-block` ideal for horizontal layouts like navigation bars, button groups, and card grids.

## 🧠 Key Concepts
- **Inline-block behavior**: Elements flow horizontally like `inline` but accept box-model properties like `block`
- **Horizontal navigation**: `<li>` or `<a>` elements with `display: inline-block` create horizontal menus
- **Gaps between items**: HTML whitespace (newlines, spaces) between inline-block elements renders as a ~4px gap
- **Removing gaps**: Techniques include `font-size: 0` on parent, negative margins, comments between tags, or `flexbox`
- **Vertical alignment**: `vertical-align` property controls how inline-block elements align with each other (top, middle, bottom, baseline)
- **Text alignment on parent**: `text-align: center` on the parent centers inline-block children
- **Responsive inline-block**: `width` in percentage units allows inline-block items to reflow when the container resizes

## 💻 Syntax

```css
/* Inline-block button */
.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border-radius: 4px;
}

/* Horizontal navigation */
.nav li {
  display: inline-block;
}

.nav a {
  display: inline-block;
  padding: 10px 15px;
}

/* Fix whitespace gap */
.nav {
  font-size: 0; /* removes gap */
}
.nav li {
  font-size: 16px; /* restore font size */
}

/* Vertical alignment control */
.item {
  display: inline-block;
  vertical-align: middle;
}
```

## ✅ Example 1 - Basic (Inline-block Horizontal Navigation)

**Problem:** Create a horizontal navigation bar with links that respect padding, margins, and have hover effects.

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
    background: #f0f0f0;
    padding: 40px;
  }

  /* Remove whitespace gap */
  .nav {
    background: #2c3e50;
    border-radius: 8px;
    text-align: center;
    font-size: 0; /* kills whitespace gap */
  }

  .nav ul {
    list-style: none;
  }

  .nav li {
    display: inline-block;
    font-size: 16px; /* restore font size */
  }

  .nav li a {
    display: inline-block;
    color: white;
    text-decoration: none;
    padding: 15px 25px;
    transition: background 0.3s;
  }

  .nav li a:hover {
    background: #3498db;
  }

  .nav li a.active {
    background: #e74c3c;
  }
</style>
</head>
<body>
  <nav class="nav">
    <ul>
      <li><a href="#" class="active">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</body>
</html>
```

**Output:** A horizontal navigation bar with evenly spaced links. The menu items respect padding and width, with hover and active states.

**Explanation:** `display: inline-block` on `<li>` makes them sit horizontally. `font-size: 0` on parent `.nav` removes the whitespace gap caused by HTML line breaks between `<li>` elements. Font size is restored on children. Each link has padding for clickable area and a hover effect.

## 🚀 Example 2 - Intermediate (Product Card Grid with Inline-block)

**Problem:** Build a responsive grid of product cards using inline-block. Cards should flow horizontally and wrap to new lines when the container width is exceeded.

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

  .gallery {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    font-size: 0; /* remove gap */
  }

  .card {
    display: inline-block;
    width: 250px;
    margin: 10px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    font-size: 16px; /* restore */
    vertical-align: top;
    text-align: left;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  }

  .card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .card-body {
    padding: 15px;
  }

  .card-body h3 {
    color: #2c3e50;
    font-size: 1.1em;
    margin-bottom: 8px;
  }

  .card-body p {
    color: #666;
    font-size: 0.85em;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .card-body .price {
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.2em;
  }

  .card-body .btn {
    display: inline-block;
    background: #3498db;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.85em;
    transition: background 0.3s;
  }

  .card-body .btn:hover {
    background: #2980b9;
  }
</style>
</head>
<body>
  <div class="gallery">
    <div class="card">
      <img src="https://picsum.photos/250/180?random=31" alt="Product 1">
      <div class="card-body">
        <h3>Wireless Headphones</h3>
        <p>Premium sound with noise cancellation technology.</p>
        <div class="price">$79.99</div>
        <a href="#" class="btn">Add to Cart</a>
      </div>
    </div>
    <div class="card">
      <img src="https://picsum.photos/250/180?random=32" alt="Product 2">
      <div class="card-body">
        <h3>Smart Watch</h3>
        <p>Track your fitness and stay connected all day.</p>
        <div class="price">$199.99</div>
        <a href="#" class="btn">Add to Cart</a>
      </div>
    </div>
    <div class="card">
      <img src="https://picsum.photos/250/180?random=33" alt="Product 3">
      <div class="card-body">
        <h3>Laptop Stand</h3>
        <p>Ergonomic aluminum stand for better posture.</p>
        <div class="price">$39.99</div>
        <a href="#" class="btn">Add to Cart</a>
      </div>
    </div>
    <div class="card">
      <img src="https://picsum.photos/250/180?random=34" alt="Product 4">
      <div class="card-body">
        <h3>Desk Lamp</h3>
        <p>LED lamp with adjustable brightness and color.</p>
        <div class="price">$49.99</div>
        <a href="#" class="btn">Add to Cart</a>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A responsive grid of product cards. On a wide screen, 3 or more cards sit side by side. When the viewport narrows, cards wrap onto new rows.

**Explanation:** Cards use `display: inline-block` with a fixed `width: 250px`. The `font-size: 0` on the parent removes whitespace gaps. `vertical-align: top` ensures cards align at their top edges. As the container shrinks, cards automatically wrap to new lines — no media queries needed for basic reflow.

## 🏢 Real World Use Case
Button groups, horizontal navigation menus, card grids (e-commerce, portfolio), tag lists, avatar lists, pagination controls, and form element groups all commonly use `inline-block` for their layout.

## 🎯 Interview Questions

1. **How is `inline-block` different from `inline`?**
   *`inline` elements ignore `width`, `height`, and vertical `margin`/`padding`. `inline-block` respects all box model properties while still flowing horizontally like inline elements.*

2. **Why is there a gap between inline-block elements, and how do you remove it?**
   *The gap is caused by whitespace (newlines, spaces) in HTML between elements. It can be removed by `font-size: 0` on the parent, comments between elements (`<!-- -->`), negative margins, or closing the tag without spaces.*

3. **What does `vertical-align` do on inline-block elements, and what values does it accept?**
   *It controls how inline-block elements align with each other in the same line. Common values: `top`, `middle`, `bottom`, `baseline` (default).*

4. **How can you center multiple inline-block elements horizontally?**
   *Apply `text-align: center` to the parent container. Since inline-block responds to text alignment, all children will center.*

5. **Can inline-block be used for responsive layouts?**
   *Yes. Inline-block elements with percentage widths will reflow (wrap) when the container width changes, providing basic responsiveness without media queries.*

## ⚠ Common Errors / Mistakes

- **Unexpected whitespace gaps**: The most common issue — forgetting that HTML whitespace creates visual gaps
- **Forgetting `vertical-align`**: Inline-block elements default to `baseline` alignment, which can cause uneven tops if content varies
- **Using `inline-block` for complex layouts**: For advanced layouts, Flexbox or Grid offer better control over distribution and alignment
- **Applying `display: inline-block` to `<table>` rows**: Table rows naturally use `table-row` display; inline-block breaks table semantics
- **Assuming `inline-block` removes the gap without `font-size` fix**: Gap exists unless explicitly addressed

## 📝 Practice Exercises

### Beginner
1. Create three `<div>` elements with `display: inline-block`, 100px × 100px each, different background colors. Observe the gap between them.
2. Apply `font-size: 0` to the parent and restore it on the children. Verify the gap disappears.
3. Use `text-align: center` on the parent to horizontally center the three inline-block boxes from Exercise 1.

### Intermediate
4. Build a horizontal pagination component using `display: inline-block` on numbered page links. Style the active page differently.
5. Create a tag/list UI where each tag is `inline-block` with padding, border-radius, and a background color. Tags should wrap naturally when there are too many.
6. Build a two-column inline-block layout with a left column (30%) and right column (70%), using `vertical-align: top` to align both columns at the top. Include content of different heights in each column.

### Advanced
7. Create a "masonry" style grid using `inline-block` where items have varying heights and flow left-to-right with gaps, using `vertical-align: top` to prevent taller items from pushing shorter ones down.
8. Build a form layout using `display: inline-block` where labels and input fields are aligned in rows, with `width` in percentage values for responsiveness — and handle the whitespace gap while keeping the form accessible.
